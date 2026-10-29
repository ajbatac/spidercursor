/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SpiderCursor: Framework-Agnostic Lightweight Three.js Procedural Spider
 * Realistic Leg Kinematics, Cursor Tracking, Light/Dark Mode Adaptation.
 */

import * as THREE from 'three';
import { SpiderModel } from './SpiderModel';
import { SpiderAudioSynthesizer } from './audio';
import {
  SpiderBehaviorMode,
  SpiderColorPalette,
  SpiderConfig,
  SpiderInstance,
  SpiderThemeMode,
} from './types';

export const THEME_PALETTES: Record<'light' | 'dark', SpiderColorPalette> = {
  light: {
    body: '#1e293b',    // deep slate / charcoal chitin
    legs: '#334155',    // dark slate
    joints: '#475569',  // metallic slate
    eyes: '#0f172a',    // obsidian gloss
    shadow: '#0f172a',  // soft shadow
    silk: '#94a3b8',    // silver silk
  },
  dark: {
    body: '#e2e8f0',    // pale bone / titanium silver
    legs: '#cbd5e1',    // polished metallic legs
    joints: '#94a3b8',  // joint accents
    eyes: '#38bdf8',    // bioluminescent cyan glint
    shadow: '#000000',  // deep shadow
    silk: '#e2e8f0',    // luminous silk
  },
};

export const DEFAULT_CONFIG: SpiderConfig = {
  size: 1.0,
  speed: 1.0,
  theme: 'auto',
  mode: 'hunt',
  stopDistance: 38,
  webSilk: true,
  zIndex: 9999,
  pointerEventsNone: true,
  sound: false,
  maxFps: 60,
  pauseWhenHidden: true,
  swarmCount: 0,
};

export class SpiderCursor implements SpiderInstance {
  public config: SpiderConfig;

  // DOM elements
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private isExternalCanvas: boolean = false;

  // Three.js Core
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private spiderModel!: SpiderModel;
  private miniSpiders: {
    model: SpiderModel;
    pos: THREE.Vector2;
    target: THREE.Vector2;
    vel: THREE.Vector2;
    heading: number;
    offset: THREE.Vector2;
  }[] = [];
  private audioSynth: SpiderAudioSynthesizer;

  // Lights
  private dirLight!: THREE.DirectionalLight;
  private hemiLight!: THREE.HemisphereLight;
  private eyeGlintLight!: THREE.PointLight;

  // Motion state (Screen coordinates: x: 0..W, y: 0..H)
  private currentPos = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
  private targetPos = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
  private velocity = new THREE.Vector2(0, 0);
  private heading: number = -Math.PI / 2;
  private isFleeing: boolean = false;
  private fleeTimer: number = 0;
  private wanderTimer: number = 0;
  private isMouseActive: boolean = false;
  private baitTarget: THREE.Vector2 | null = null;
  private baitTimer: number = 0;
  private onBaitConsumedCallback?: () => void;

  // Performance & Loop
  private animFrameId: number | null = null;
  private lastTime: number = 0;
  private isDestroyed: boolean = false;
  private isPaused: boolean = false;
  private mediaQueryDark: MediaQueryList | null = null;

  // Software WebGL detection
  private isSoftwareGl: boolean = false;

  constructor(userConfig?: Partial<SpiderConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...userConfig };
    this.container = this.config.container || document.body;

    this.audioSynth = new SpiderAudioSynthesizer(this.config.sound);

    // Initial position
    if (this.config.initialPosition) {
      this.currentPos.set(this.config.initialPosition[0], this.config.initialPosition[1]);
      this.targetPos.copy(this.currentPos);
    } else {
      this.currentPos.set(window.innerWidth * 0.45, window.innerHeight * 0.45);
      this.targetPos.copy(this.currentPos);
    }

    // Create overlay canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'spider-cursor-canvas';
    this.applyCanvasStyles();
    this.container.appendChild(this.canvas);

    this.initThree();
    this.bindEvents();
    this.startLoop();
  }

  private applyCanvasStyles() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.zIndex = String(this.config.zIndex);
    this.canvas.style.pointerEvents = this.config.pointerEventsNone ? 'none' : 'auto';
    this.canvas.style.touchAction = 'none';
  }

  private initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Detect software WebGL
    try {
      const probeGl = document.createElement('canvas').getContext('webgl2');
      if (probeGl) {
        const ext = probeGl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probeGl.RENDERER;
        const gpu = String(probeGl.getParameter(param));
        probeGl.getExtension('WEBGL_lose_context')?.loseContext();
        this.isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      }
    } catch {
      this.isSoftwareGl = false;
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();

    // 1:1 Orthographic Camera aligned with screen pixels
    // X goes 0 -> width (right), Y goes 0 -> -height (down)
    this.camera = new THREE.OrthographicCamera(0, width, 0, -height, -500, 1000);
    this.camera.position.set(0, 0, 500);
    this.camera.lookAt(0, 0, 0);

    // Studio Lighting Rig optimized for top-down dorsal view
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333, 1.4);
    this.scene.add(this.hemiLight);

    // Directional light from top-left, casting soft drop shadow down and right
    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    this.dirLight.position.set(-160, 220, 400);
    this.scene.add(this.dirLight);

    this.eyeGlintLight = new THREE.PointLight(0xffffff, 1.2, 350);
    this.eyeGlintLight.position.set(0, 0, 150);
    this.scene.add(this.eyeGlintLight);

    // Alpha Spider Model
    const initialPalette = this.resolvePalette();
    this.spiderModel = new SpiderModel(this.config, initialPalette);
    this.scene.add(this.spiderModel.group);

    // Synchronize baby spiderlings if configured
    this.syncSwarm();

    // Hook footstep audio
    this.spiderModel.onFootstep = (speedRatio) => {
      if (this.config.sound) {
        this.audioSynth.playFootstep(speedRatio);
      }
    };
  }

  private syncSwarm() {
    const targetCount = this.config.swarmCount || 0;
    while (this.miniSpiders.length < targetCount) {
      const idx = this.miniSpiders.length;
      const angle = (idx / Math.max(1, targetCount)) * Math.PI * 2;
      const dist = 45 + Math.random() * 35;
      const offset = new THREE.Vector2(Math.cos(angle) * dist, Math.sin(angle) * dist);

      const miniConfig: SpiderConfig = {
        ...this.config,
        size: this.config.size * 0.38,
        speed: this.config.speed * 1.35,
        webSilk: false,
      };

      const miniModel = new SpiderModel(miniConfig, this.resolvePalette());
      this.scene.add(miniModel.group);

      this.miniSpiders.push({
        model: miniModel,
        pos: new THREE.Vector2(this.currentPos.x + offset.x, this.currentPos.y + offset.y),
        target: new THREE.Vector2(this.currentPos.x + offset.x, this.currentPos.y + offset.y),
        vel: new THREE.Vector2(0, 0),
        heading: this.heading,
        offset,
      });
    }

    while (this.miniSpiders.length > targetCount) {
      const removed = this.miniSpiders.pop();
      if (removed) {
        this.scene.remove(removed.model.group);
        removed.model.dispose();
      }
    }
  }

  private resolvePalette(): SpiderColorPalette {
    let mode = this.config.theme;
    if (mode === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      mode = prefersDark ? 'dark' : 'light';
    }

    if (mode === 'custom' && this.config.colors) {
      const base = THEME_PALETTES.light;
      return {
        body: this.config.colors.body || base.body,
        legs: this.config.colors.legs || base.legs,
        joints: this.config.colors.joints || base.joints,
        eyes: this.config.colors.eyes || base.eyes,
        shadow: this.config.colors.shadow || base.shadow,
        silk: this.config.colors.silk || base.silk,
      };
    }

    return THEME_PALETTES[mode as 'light' | 'dark'] || THEME_PALETTES.light;
  }

  private onPointerMove = (e: MouseEvent | TouchEvent) => {
    this.isMouseActive = true;

    // If actively stalking pumpkin bait, don't let cursor movement divert the spider!
    if (this.baitTarget && this.baitTimer > 0) {
      return;
    }

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (this.config.mode === 'hunt') {
      this.targetPos.set(clientX, clientY);
    } else if (this.config.mode === 'flee') {
      // Run away in opposite direction of cursor
      const diff = new THREE.Vector2(this.currentPos.x - clientX, this.currentPos.y - clientY);
      const dist = diff.length();
      if (dist < 180) {
        diff.normalize().multiplyScalar(220);
        this.targetPos.copy(this.currentPos).add(diff);
        this.clampTargetToScreen();
      }
    }
  };

  private onPointerDown = (e: MouseEvent) => {
    // Left click pounces toward point if not actively stalking bait
    if (!this.baitTarget || this.baitTimer <= 0) {
      this.pounce(e.clientX, e.clientY);
    }
  };

  private onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.right = width;
    this.camera.bottom = -height;
    this.camera.updateProjectionMatrix();
  };

  private onVisibilityChange = () => {
    if (!this.config.pauseWhenHidden) return;
    this.isPaused = document.hidden;
    if (!this.isPaused && !this.animFrameId) {
      this.lastTime = performance.now();
      this.startLoop();
    }
  };

  private bindEvents() {
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });
    window.addEventListener('touchmove', this.onPointerMove, { passive: true });
    window.addEventListener('touchstart', this.onPointerMove, { passive: true });
    window.addEventListener('mousedown', this.onPointerDown, { passive: true });
    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // Listen to OS theme changes
    if (window.matchMedia) {
      this.mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQueryDark.addEventListener('change', () => {
        if (this.config.theme === 'auto') {
          this.spiderModel.updatePalette(this.resolvePalette());
        }
      });
    }
  }

  private clampTargetToScreen() {
    const pad = 40;
    this.targetPos.x = Math.max(pad, Math.min(window.innerWidth - pad, this.targetPos.x));
    this.targetPos.y = Math.max(pad, Math.min(window.innerHeight - pad, this.targetPos.y));
  }

  private startLoop() {
    this.lastTime = performance.now();
    const tick = (now: number) => {
      if (this.isDestroyed) return;
      if (this.isPaused) {
        this.animFrameId = null;
        return;
      }

      this.animFrameId = requestAnimationFrame(tick);

      const delta = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;

      this.updatePhysics(delta, now);
      this.renderer.render(this.scene, this.camera);
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  private updatePhysics(delta: number, nowMs: number) {
    // Mode specific logic
    if (this.config.mode === 'wander') {
      this.wanderTimer += delta;
      if (this.wanderTimer > 2.5 + Math.random() * 2.0) {
        this.wanderTimer = 0;
        // Pick new random spot in screen
        this.targetPos.set(
          60 + Math.random() * (window.innerWidth - 120),
          60 + Math.random() * (window.innerHeight - 120)
        );
      }
    } else if (this.config.mode === 'perch') {
      // Only move if target was explicitly changed
    }

    if (this.isFleeing) {
      this.fleeTimer -= delta;
      if (this.fleeTimer <= 0) {
        this.isFleeing = false;
      }
    }

    // Pumpkin bait stalking logic
    if (this.baitTarget) {
      this.baitTimer -= delta;
      // Lock target position directly onto bait
      this.targetPos.copy(this.baitTarget);

      const toBait = new THREE.Vector2().subVectors(this.baitTarget, this.currentPos);
      const distToBait = toBait.length();
      const eatDistance = Math.max(38, 42 * this.config.size);

      if (distToBait <= eatDistance) {
        // Spider has caught and eaten the bait!
        this.audioSynth.playCrunch();
        if (this.onBaitConsumedCallback) {
          const cb = this.onBaitConsumedCallback;
          this.onBaitConsumedCallback = undefined;
          cb();
        }
        this.baitTarget = null;
        this.baitTimer = 0;
        this.velocity.multiplyScalar(0.2);
      } else if (this.baitTimer <= 0) {
        this.baitTarget = null;
      }
    }

    // Vector to target
    const toTarget = new THREE.Vector2().subVectors(this.targetPos, this.currentPos);
    const dist = toTarget.length();

    const stopDist = this.config.stopDistance * this.config.size;
    let targetSpeed = 0;

    if (dist > stopDist || this.isFleeing) {
      // Smooth deceleration near destination
      const baseMaxSpeed = (this.isFleeing ? 320 : 190) * this.config.speed;
      targetSpeed = Math.min(baseMaxSpeed, (dist - stopDist) * 3.5);
    }

    // Steering & Angular velocity
    if (dist > 4) {
      // Three.js screen Y is flipped (-Y)
      // Screen target angle in radians
      const targetAngle = Math.atan2(toTarget.y, toTarget.x) - Math.PI / 2;

      // Smooth shortest-arc angle interpolation
      let angleDiff = targetAngle - this.heading;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      const turnSpeed = this.isFleeing ? 14.0 : 8.5;
      this.heading += angleDiff * Math.min(1.0, turnSpeed * delta);
    }

    // Velocity update
    if (targetSpeed > 0) {
      const headingDir = new THREE.Vector2(Math.sin(-this.heading), Math.cos(-this.heading));
      const desiredVel = headingDir.multiplyScalar(targetSpeed);
      this.velocity.lerp(desiredVel, Math.min(1.0, 7.5 * delta));
    } else {
      this.velocity.lerp(new THREE.Vector2(0, 0), Math.min(1.0, 9.0 * delta));
    }

    // Apply movement with natural scuttle pulse (legs push the body in rhythmic thrusts)
    let crawlPulse = 1.0;
    if (this.velocity.length() > 2.0 && this.spiderModel) {
      crawlPulse = 1.0 + 0.28 * Math.sin(this.spiderModel.gaitPhase * Math.PI * 2);
    }
    const movementStep = this.velocity.clone().multiplyScalar(delta * crawlPulse);
    this.currentPos.add(movementStep);

    // Keep within screen bounds
    this.currentPos.x = Math.max(20, Math.min(window.innerWidth - 20, this.currentPos.x));
    this.currentPos.y = Math.max(20, Math.min(window.innerHeight - 20, this.currentPos.y));

    // Update Three.js Spider Model
    // Screen coords (x, y) map to (x, -y) in our OrthographicCamera
    const threeX = this.currentPos.x;
    const threeY = -this.currentPos.y;
    const isMoving = this.velocity.length() > 2.0;

    // Headlight / Eye light follows spider
    this.eyeGlintLight.position.set(threeX, threeY, 120);

    // Directional light subtle dynamic cast
    this.dirLight.position.set(threeX + 120, threeY + 120, 240);

    this.spiderModel.update(
      delta,
      threeX,
      threeY,
      this.heading,
      this.velocity,
      isMoving
    );

    // Update mini spiderlings in swarm
    for (let i = 0; i < this.miniSpiders.length; i++) {
      const mini = this.miniSpiders[i];
      // Mini target tracks main spider with dynamic orbiting offset
      mini.target.set(
        this.currentPos.x + mini.offset.x + (isMoving ? Math.sin(nowMs * 0.003 + i) * 15 : 0),
        this.currentPos.y + mini.offset.y + (isMoving ? Math.cos(nowMs * 0.003 + i) * 15 : 0)
      );

      const toMiniTarget = new THREE.Vector2().subVectors(mini.target, mini.pos);
      const mDist = toMiniTarget.length();

      if (mDist > 8) {
        const mAngle = Math.atan2(toMiniTarget.y, toMiniTarget.x) - Math.PI / 2;
        let diff = mAngle - mini.heading;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        mini.heading += diff * Math.min(1.0, 10.0 * delta);

        const mSpeed = Math.min(240 * this.config.speed, mDist * 5.0);
        const mDir = new THREE.Vector2(Math.sin(-mini.heading), Math.cos(-mini.heading));
        mini.vel.lerp(mDir.multiplyScalar(mSpeed), Math.min(1.0, 9.0 * delta));
      } else {
        mini.vel.lerp(new THREE.Vector2(0, 0), Math.min(1.0, 10.0 * delta));
      }

      let miniPulse = 1.0;
      if (mini.vel.length() > 2.0 && mini.model) {
        miniPulse = 1.0 + 0.28 * Math.sin(mini.model.gaitPhase * Math.PI * 2);
      }
      mini.pos.addScaledVector(mini.vel, delta * miniPulse);
      const miniIsMoving = mini.vel.length() > 2.0;

      mini.model.update(
        delta,
        mini.pos.x,
        -mini.pos.y,
        mini.heading,
        mini.vel,
        miniIsMoving
      );
    }
  }

  // --- Public API ---

  public updateConfig(newConfig: Partial<SpiderConfig>) {
    const oldTheme = this.config.theme;
    const oldColors = this.config.colors;
    const oldSize = this.config.size;
    const oldSound = this.config.sound;
    const oldZIndex = this.config.zIndex;
    const oldSwarm = this.config.swarmCount;

    this.config = { ...this.config, ...newConfig };

    if (newConfig.size !== undefined && newConfig.size !== oldSize) {
      this.spiderModel.applyScale(this.config.size);
      this.miniSpiders.forEach(m => m.model.applyScale(this.config.size * 0.38));
    }

    if (newConfig.theme !== undefined || newConfig.colors !== undefined) {
      const palette = this.resolvePalette();
      this.spiderModel.updatePalette(palette);
      this.miniSpiders.forEach(m => m.model.updatePalette(palette));
    }

    if (newConfig.swarmCount !== undefined && newConfig.swarmCount !== oldSwarm) {
      this.syncSwarm();
    }

    if (newConfig.sound !== undefined) {
      this.audioSynth.setEnabled(this.config.sound);
    }

    if (newConfig.zIndex !== undefined && newConfig.zIndex !== oldZIndex) {
      this.canvas.style.zIndex = String(this.config.zIndex);
    }

    if (newConfig.pointerEventsNone !== undefined) {
      this.canvas.style.pointerEvents = this.config.pointerEventsNone ? 'none' : 'auto';
    }
  }

  public scare(force: number = 1.0) {
    this.isFleeing = true;
    this.fleeTimer = 1.4 * force;

    // Pick random retreat vector away from current position
    const escapeAngle = this.heading + Math.PI + (Math.random() - 0.5) * 1.2;
    const escapeDist = 260 * force;
    this.targetPos.set(
      this.currentPos.x + Math.cos(escapeAngle) * escapeDist,
      this.currentPos.y + Math.sin(escapeAngle) * escapeDist
    );
    this.clampTargetToScreen();

    // Scatter mini spiderlings in all directions
    this.miniSpiders.forEach((m, idx) => {
      const scatterAngle = (idx / this.miniSpiders.length) * Math.PI * 2 + Math.random() * 0.8;
      const sDist = 180 + Math.random() * 120;
      m.pos.add(new THREE.Vector2(Math.cos(scatterAngle) * 30, Math.sin(scatterAngle) * 30));
      m.target.set(
        m.pos.x + Math.cos(scatterAngle) * sDist,
        m.pos.y + Math.sin(scatterAngle) * sDist
      );
    });

    if (this.config.sound) {
      this.audioSynth.playScare();
    }
  }

  public feed(x: number, y: number, onConsumed?: () => void) {
    this.baitTarget = new THREE.Vector2(x, y);
    this.baitTimer = 10.0; // bait persists up to 10 seconds unless consumed earlier
    this.targetPos.set(x, y);
    this.isFleeing = false;
    this.onBaitConsumedCallback = onConsumed;

    this.miniSpiders.forEach(m => {
      m.target.set(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60);
    });
  }

  public clearBait() {
    this.baitTarget = null;
    this.baitTimer = 0;
    this.onBaitConsumedCallback = undefined;
  }

  public pounce(x: number, y: number) {
    this.targetPos.set(x, y);
    this.velocity.multiplyScalar(2.0);
  }

  public setTarget(x: number, y: number) {
    this.targetPos.set(x, y);
  }

  public getPosition() {
    return {
      x: this.currentPos.x,
      y: this.currentPos.y,
      angle: this.heading,
    };
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('touchmove', this.onPointerMove);
    window.removeEventListener('touchstart', this.onPointerMove);
    window.removeEventListener('mousedown', this.onPointerDown);
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    this.miniSpiders.forEach(m => {
      this.scene.remove(m.model.group);
      m.model.dispose();
    });
    this.miniSpiders = [];

    this.spiderModel.dispose();
    this.renderer.dispose();
    this.audioSynth.dispose();

    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }
}
