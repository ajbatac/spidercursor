/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Top-down dorsal view Procedural Spider with authentic arachnid anatomy:
 * Carapace with striae, tapered jointed legs, pedipalps, fangs, dorsal markings,
 * and realistic ground drop-shadows.
 */

import * as THREE from 'three';
import { SpiderColorPalette, SpiderConfig } from './types';

// Pre-allocated vectors for 0 garbage collection inside animation loop
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _hipWorld = new THREE.Vector3();
const _kneePos = new THREE.Vector3();
const _anklePos = new THREE.Vector3();

export interface LegDef {
  index: number;
  isLeft: boolean;
  group: 'A' | 'B';
  baseAngle: number;
  reach: number;
  hipOffset: THREE.Vector3;
  neutralOffset: THREE.Vector3;
  femurLen: number;
  tibiaLen: number;
  tarsusLen: number;

  // Gait state
  isStepping: boolean;
  stepProgress: number;
  worldFootPos: THREE.Vector3;
  stepStartPos: THREE.Vector3;
  stepTargetPos: THREE.Vector3;
  currentFootPos: THREE.Vector3;
  idealFootPos: THREE.Vector3;

  // Segment Meshes (Dorsal View)
  femurMesh: THREE.Mesh;
  patellaKneeMesh: THREE.Mesh;
  tibiaMesh: THREE.Mesh;
  tarsusMesh: THREE.Mesh;
  clawMesh: THREE.Mesh;

  // Drop Shadows (Critical for top-down depth)
  footShadowMesh: THREE.Mesh;
  femurShadowMesh: THREE.Mesh;
  tibiaShadowMesh: THREE.Mesh;
}

export class SpiderModel {
  public group: THREE.Group;
  public bodyGroup: THREE.Group;
  public shadowGroup: THREE.Group;
  public silkLine: THREE.Line | null = null;

  // Anatomical components
  private carapaceMesh!: THREE.Mesh;
  private abdomenMesh!: THREE.Mesh;
  private pedicelMesh!: THREE.Mesh;
  private markingsMesh!: THREE.Mesh;
  private cheliceraeLeft!: THREE.Mesh;
  private cheliceraeRight!: THREE.Mesh;
  private fangLeft!: THREE.Mesh;
  private fangRight!: THREE.Mesh;
  private pedipalpLeft!: THREE.Group;
  private pedipalpRight!: THREE.Group;
  private eyesGroup!: THREE.Group;
  private bodyShadowMesh!: THREE.Mesh;
  private spinneretMesh!: THREE.Mesh;

  // 8 Articulated legs with authentic alternating tetrapod gait
  public legs: LegDef[] = [];
  public gaitPhase: number = 0;
  private prevGaitPhase: number = 0;
  private initialized: boolean = false;
  private lastBodyPos: THREE.Vector2 = new THREE.Vector2();

  // Materials
  private bodyMaterial!: THREE.MeshStandardMaterial;
  private legMaterial!: THREE.MeshStandardMaterial;
  private jointMaterial!: THREE.MeshStandardMaterial;
  private markingMaterial!: THREE.MeshStandardMaterial;
  private eyeMaterial!: THREE.MeshStandardMaterial;
  private fangMaterial!: THREE.MeshStandardMaterial;
  private shadowMaterial!: THREE.MeshBasicMaterial;
  private silkMaterial!: THREE.LineBasicMaterial;

  private geometries: THREE.BufferGeometry[] = [];

  // Silk dragline
  private silkPositions: THREE.Vector3[] = [];
  private maxSilkPoints: number = 35;
  private silkGeometry: THREE.BufferGeometry | null = null;

  // Secondary animations
  public headingAngle: number = 0;
  public breathePhase: number = 0;
  public palpTwitch: number = 0;
  public bodyWiggle: number = 0;

  // Audio callback
  public onFootstep?: (speedRatio: number) => void;

  constructor(public config: SpiderConfig, palette: SpiderColorPalette) {
    this.group = new THREE.Group();
    this.shadowGroup = new THREE.Group();
    this.bodyGroup = new THREE.Group();

    // In top-down 2D-screen projection:
    // Shadow group sits directly beneath the spider with realistic directional offset
    this.group.add(this.shadowGroup);
    this.group.add(this.bodyGroup);

    this.initMaterials(palette);
    this.buildCephalothorax();
    this.buildAbdomen();
    this.buildMouthparts();
    this.buildEyes();
    this.buildLegs();
    this.buildSilkDragline();

    this.applyScale(this.config.size);
  }

  private regGeo<T extends THREE.BufferGeometry>(geo: T): T {
    this.geometries.push(geo);
    return geo;
  }

  private initMaterials(palette: SpiderColorPalette) {
    this.bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.body),
      roughness: 0.45,
      metalness: 0.15,
      flatShading: false,
    });

    this.legMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.legs),
      roughness: 0.4,
      metalness: 0.2,
      flatShading: false,
    });

    this.jointMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.joints),
      roughness: 0.6,
      metalness: 0.1,
    });

    this.markingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.body === '#1e293b' ? '#0f172a' : '#f8fafc'),
      roughness: 0.5,
      metalness: 0.1,
    });

    this.fangMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7f1d1d'),
      roughness: 0.2,
      metalness: 0.8,
    });

    this.eyeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.eyes),
      roughness: 0.1,
      metalness: 0.95,
      emissive: new THREE.Color(palette.eyes),
      emissiveIntensity: 0.4,
    });

    this.shadowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#000000'),
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });

    this.silkMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(palette.silk),
      transparent: true,
      opacity: 0.4,
      linewidth: 1.2,
    });
  }

  /**
   * Cephalothorax (Prosoma): Broad, flattened dorsal carapace
   * with sculpted lateral margins, cervical groove, and fovea depression.
   */
  private buildCephalothorax() {
    // Sculpted carapace shape from top view
    const shape = new THREE.Shape();
    // Heart/shield shaped carapace contour
    shape.moveTo(0, 14);
    shape.bezierCurveTo(7, 13, 11, 7, 11, 0);
    shape.bezierCurveTo(11, -8, 8, -12, 4, -13);
    shape.lineTo(-4, -13);
    shape.bezierCurveTo(-8, -12, -11, -8, -11, 0);
    shape.bezierCurveTo(-11, 7, -7, 13, 0, 14);

    const extrudeSettings = {
      depth: 3.5,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 1.2,
      bevelThickness: 1.2,
    };

    const cephGeo = this.regGeo(new THREE.ExtrudeGeometry(shape, extrudeSettings));
    cephGeo.center();
    this.carapaceMesh = new THREE.Mesh(cephGeo, this.bodyMaterial);
    this.carapaceMesh.position.set(0, 2, 4);
    this.bodyGroup.add(this.carapaceMesh);

    // Carapace center ridge / fovea groove
    const foveaGeo = this.regGeo(new THREE.ConeGeometry(1.2, 5, 4));
    foveaGeo.rotateX(Math.PI / 2);
    const fovea = new THREE.Mesh(foveaGeo, this.jointMaterial);
    fovea.position.set(0, 0, 6.2);
    this.bodyGroup.add(fovea);
  }

  /**
   * Opisthosoma (Abdomen): Plump egg-shaped with authentic dorsal folium markings & spinnerets
   */
  private buildAbdomen() {
    // Pedicel (slender connection)
    const pedicelGeo = this.regGeo(new THREE.CylinderGeometry(1.8, 2.2, 4, 8));
    pedicelGeo.rotateX(Math.PI / 2);
    this.pedicelMesh = new THREE.Mesh(pedicelGeo, this.jointMaterial);
    this.pedicelMesh.position.set(0, -9, 3.5);
    this.bodyGroup.add(this.pedicelMesh);

    // Abdomen body
    const abdShape = new THREE.Shape();
    abdShape.moveTo(0, 0);
    abdShape.bezierCurveTo(9, -2, 14, -12, 13, -24);
    abdShape.bezierCurveTo(12, -34, 6, -38, 0, -39);
    abdShape.bezierCurveTo(-6, -38, -12, -34, -13, -24);
    abdShape.bezierCurveTo(-14, -12, -9, -2, 0, 0);

    const abdExtrude = {
      depth: 6.0,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 2.2,
      bevelThickness: 2.5,
    };

    const abdGeo = this.regGeo(new THREE.ExtrudeGeometry(abdShape, abdExtrude));
    abdGeo.center();
    this.abdomenMesh = new THREE.Mesh(abdGeo, this.bodyMaterial);
    this.abdomenMesh.position.set(0, -25, 4.8);
    this.bodyGroup.add(this.abdomenMesh);

    // Dorsal chevron / folium markings (spooky spider back stripes)
    const markGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const w = 7 - i * 1.3;
      const chevronGeo = this.regGeo(new THREE.PlaneGeometry(w, 1.2));
      const chevron = new THREE.Mesh(chevronGeo, this.markingMaterial);
      chevron.position.set(0, -18 - i * 4.8, 8.5);
      chevron.rotation.z = (i % 2 === 0 ? 0.08 : -0.08);
      markGroup.add(chevron);
    }
    this.markingsMesh = markGroup as unknown as THREE.Mesh;
    this.bodyGroup.add(markGroup);

    // Spinnerets at rear
    const spinGeo = this.regGeo(new THREE.ConeGeometry(1.5, 3.5, 6));
    spinGeo.rotateX(-Math.PI / 2);
    this.spinneretMesh = new THREE.Mesh(spinGeo, this.jointMaterial);
    this.spinneretMesh.position.set(0, -42, 3.8);
    this.bodyGroup.add(this.spinneretMesh);

    // Body ground drop shadow (offset down and right)
    const bodyShadowGeo = this.regGeo(new THREE.PlaneGeometry(36, 58));
    this.bodyShadowMesh = new THREE.Mesh(bodyShadowGeo, this.shadowMaterial);
    this.bodyShadowMesh.position.set(4, -18, 0.05);
    this.shadowGroup.add(this.bodyShadowMesh);
  }

  /**
   * Chelicerae & venomous fangs, plus pedipalp sensory arms
   */
  private buildMouthparts() {
    const jawGeo = this.regGeo(new THREE.CylinderGeometry(1.4, 2.0, 5, 8));
    jawGeo.rotateX(Math.PI / 2);

    this.cheliceraeLeft = new THREE.Mesh(jawGeo, this.jointMaterial);
    this.cheliceraeLeft.position.set(-2.5, 14.5, 3.2);
    this.cheliceraeRight = new THREE.Mesh(jawGeo, this.jointMaterial);
    this.cheliceraeRight.position.set(2.5, 14.5, 3.2);
    this.bodyGroup.add(this.cheliceraeLeft, this.cheliceraeRight);

    // Curved sharp venom fangs
    const fangGeo = this.regGeo(new THREE.ConeGeometry(0.7, 3.5, 6));
    fangGeo.rotateX(Math.PI / 2);

    this.fangLeft = new THREE.Mesh(fangGeo, this.fangMaterial);
    this.fangLeft.position.set(-2.2, 17.5, 2.5);
    this.fangLeft.rotation.z = -0.3;

    this.fangRight = new THREE.Mesh(fangGeo, this.fangMaterial);
    this.fangRight.position.set(2.2, 17.5, 2.5);
    this.fangRight.rotation.z = 0.3;
    this.bodyGroup.add(this.fangLeft, this.fangRight);

    // Pedipalps (front sensory feelers)
    const palpGeo1 = this.regGeo(new THREE.CylinderGeometry(0.7, 0.9, 7, 6));
    const palpGeo2 = this.regGeo(new THREE.CylinderGeometry(0.4, 0.7, 8, 6));

    // Left palp
    this.pedipalpLeft = new THREE.Group();
    this.pedipalpLeft.position.set(-5.5, 12.5, 3.5);
    const p1L = new THREE.Mesh(palpGeo1, this.legMaterial);
    p1L.position.set(-1.5, 3.5, 0);
    p1L.rotation.z = 0.35;
    const p2L = new THREE.Mesh(palpGeo2, this.legMaterial);
    p2L.position.set(-3.2, 9.5, 0);
    p2L.rotation.z = -0.25;
    this.pedipalpLeft.add(p1L, p2L);
    this.bodyGroup.add(this.pedipalpLeft);

    // Right palp
    this.pedipalpRight = new THREE.Group();
    this.pedipalpRight.position.set(5.5, 12.5, 3.5);
    const p1R = new THREE.Mesh(palpGeo1, this.legMaterial);
    p1R.position.set(1.5, 3.5, 0);
    p1R.rotation.z = -0.35;
    const p2R = new THREE.Mesh(palpGeo2, this.legMaterial);
    p2R.position.set(3.2, 9.5, 0);
    p2R.rotation.z = 0.25;
    this.pedipalpRight.add(p1R, p2R);
    this.bodyGroup.add(this.pedipalpRight);
  }

  /**
   * Cluster of 8 glossy eyes arranged on the ocular tubercle
   */
  private buildEyes() {
    this.eyesGroup = new THREE.Group();
    const eyeGeo = this.regGeo(new THREE.SphereGeometry(0.9, 8, 8));

    const eyeLayout = [
      [-1.8, 12.2, 6.2, 1.2],
      [1.8, 12.2, 6.2, 1.2],
      [-4.2, 11.2, 5.8, 0.9],
      [4.2, 11.2, 5.8, 0.9],
      [-2.2, 9.8, 6.5, 1.0],
      [2.2, 9.8, 6.5, 1.0],
      [-4.8, 9.2, 6.0, 0.85],
      [4.8, 9.2, 6.0, 0.85],
    ];

    eyeLayout.forEach(([x, y, z, s]) => {
      const eye = new THREE.Mesh(eyeGeo, this.eyeMaterial);
      eye.position.set(x, y, z);
      eye.scale.setScalar(s);
      this.eyesGroup.add(eye);
    });

    this.bodyGroup.add(this.eyesGroup);
  }

  /**
   * 8 Jointed Tapered Legs viewed from top perspective:
   * Coxa root -> Femur (tapered) -> Patella (knee) -> Tibia (shank) -> Tarsus (foot & claw)
   */
  private buildLegs() {
    // Authentic arachnid leg angles & proportional reach:
    // Left legs (-X) and Right legs (+X) are perfectly mirrored.
    // Alternating tetrapod gait groupings:
    // Group A: L1 (0), R2 (5), L3 (2), R4 (7)
    // Group B: R1 (4), L2 (1), R3 (6), L4 (3)
    const legSpecs = [
      // Left legs (0 to 3)
      { isLeft: true, group: 'A' as const, angle: 0.95, reach: 52, neutral: new THREE.Vector3(-28, 44, 0), hip: new THREE.Vector3(-7.0, 7.5, 4.0), femur: 28, tibia: 30, tarsus: 20 },
      { isLeft: true, group: 'B' as const, angle: 1.52, reach: 60, neutral: new THREE.Vector3(-50, 20, 0), hip: new THREE.Vector3(-8.5, 3.0, 4.0), femur: 32, tibia: 34, tarsus: 22 },
      { isLeft: true, group: 'A' as const, neutral: new THREE.Vector3(-48, -18, 0), angle: 2.05, reach: 58, hip: new THREE.Vector3(-8.5, -2.5, 4.0), femur: 32, tibia: 34, tarsus: 22 },
      { isLeft: true, group: 'B' as const, neutral: new THREE.Vector3(-32, -46, 0), angle: 2.65, reach: 68, hip: new THREE.Vector3(-7.0, -7.5, 4.0), femur: 36, tibia: 38, tarsus: 26 },

      // Right legs (4 to 7) - symmetrical mirror across X axis
      { isLeft: false, group: 'B' as const, neutral: new THREE.Vector3(28, 44, 0), angle: -0.95, reach: 52, hip: new THREE.Vector3(7.0, 7.5, 4.0), femur: 28, tibia: 30, tarsus: 20 },
      { isLeft: false, group: 'A' as const, neutral: new THREE.Vector3(50, 20, 0), angle: -1.52, reach: 60, hip: new THREE.Vector3(8.5, 3.0, 4.0), femur: 32, tibia: 34, tarsus: 22 },
      { isLeft: false, group: 'B' as const, neutral: new THREE.Vector3(48, -18, 0), angle: -2.05, reach: 58, hip: new THREE.Vector3(8.5, -2.5, 4.0), femur: 32, tibia: 34, tarsus: 22 },
      { isLeft: false, group: 'A' as const, neutral: new THREE.Vector3(32, -46, 0), angle: -2.65, reach: 68, hip: new THREE.Vector3(7.0, -7.5, 4.0), femur: 36, tibia: 38, tarsus: 26 },
    ];

    const kneeGeo = this.regGeo(new THREE.SphereGeometry(1.3, 8, 8));
    const clawGeo = this.regGeo(new THREE.ConeGeometry(0.5, 2.2, 5));
    const footShadowGeo = this.regGeo(new THREE.CircleGeometry(2.8, 10));

    legSpecs.forEach((spec, idx) => {
      const hipOffset = spec.hip.clone();

      // Tapered segment cylinders:
      // Femur: thick at hip (1.4) tapering to knee (1.0)
      const femurGeo = this.regGeo(new THREE.CylinderGeometry(1.0, 1.4, spec.femur, 6));
      // Tibia: knee (1.0) tapering to ankle (0.65)
      const tibiaGeo = this.regGeo(new THREE.CylinderGeometry(0.65, 1.0, spec.tibia, 6));
      // Tarsus: ankle (0.65) tapering to sharp tip (0.3)
      const tarsusGeo = this.regGeo(new THREE.CylinderGeometry(0.3, 0.65, spec.tarsus, 5));

      const femurMesh = new THREE.Mesh(femurGeo, this.legMaterial);
      const patellaKneeMesh = new THREE.Mesh(kneeGeo, this.jointMaterial);
      const tibiaMesh = new THREE.Mesh(tibiaGeo, this.legMaterial);
      const tarsusMesh = new THREE.Mesh(tarsusGeo, this.legMaterial);
      const clawMesh = new THREE.Mesh(clawGeo, this.jointMaterial);

      // Shadow meshes for legs:
      // Flat black cylinders projected on ground plane create stunning top-down silhouette
      const femurShadowMesh = new THREE.Mesh(femurGeo, this.shadowMaterial);
      const tibiaShadowMesh = new THREE.Mesh(tibiaGeo, this.shadowMaterial);
      const footShadowMesh = new THREE.Mesh(footShadowGeo, this.shadowMaterial);

      this.group.add(femurMesh, patellaKneeMesh, tibiaMesh, tarsusMesh, clawMesh);
      this.shadowGroup.add(femurShadowMesh, tibiaShadowMesh, footShadowMesh);

      const neutralPos = spec.neutral.clone();

      this.legs.push({
        index: idx,
        isLeft: spec.isLeft,
        group: spec.group,
        baseAngle: spec.angle,
        reach: spec.reach,
        hipOffset,
        neutralOffset: spec.neutral.clone(),
        femurLen: spec.femur,
        tibiaLen: spec.tibia,
        tarsusLen: spec.tarsus,
        isStepping: false,
        stepProgress: 0,
        worldFootPos: neutralPos.clone(),
        stepStartPos: neutralPos.clone(),
        stepTargetPos: neutralPos.clone(),
        currentFootPos: neutralPos.clone(),
        idealFootPos: neutralPos.clone(),
        femurMesh,
        patellaKneeMesh,
        tibiaMesh,
        tarsusMesh,
        clawMesh,
        femurShadowMesh,
        tibiaShadowMesh,
        footShadowMesh,
      });
    });
  }

  private buildSilkDragline() {
    this.silkPositions = [];
    const maxPoints = 40;
    const pos = new Float32Array(maxPoints * 3);
    this.silkGeometry = this.regGeo(new THREE.BufferGeometry());
    this.silkGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.silkLine = new THREE.Line(this.silkGeometry, this.silkMaterial);
    this.group.add(this.silkLine);
  }

  public applyScale(scale: number) {
    this.group.scale.setScalar(scale);
  }

  public updatePalette(palette: SpiderColorPalette) {
    this.bodyMaterial.color.set(palette.body);
    this.legMaterial.color.set(palette.legs);
    this.jointMaterial.color.set(palette.joints);
    this.eyeMaterial.color.set(palette.eyes);
    this.eyeMaterial.emissive.set(palette.eyes);
    this.silkMaterial.color.set(palette.silk);
    this.markingMaterial.color.set(palette.body === '#1e293b' || palette.body === '#18181b' ? '#f4f4f5' : '#18181b');
    this.shadowMaterial.color.set(palette.shadow);
  }

  private updateSilkDragline(bodyX: number, bodyY: number) {
    if (!this.config.webSilk || !this.silkLine || !this.silkGeometry) {
      if (this.silkLine) this.silkLine.visible = false;
      return;
    }
    this.silkLine.visible = true;

    // Spinneret world position
    const spinWorld = _v1.set(0, -42, 3.8).applyMatrix4(this.bodyGroup.matrixWorld);

    if (this.silkPositions.length === 0) {
      this.silkPositions.push(spinWorld.clone());
    } else {
      const dist = this.silkPositions[0].distanceTo(spinWorld);
      if (dist > 15) {
        this.silkPositions.unshift(spinWorld.clone());
        if (this.silkPositions.length > this.maxSilkPoints) {
          this.silkPositions.pop();
        }
      } else {
        this.silkPositions[0].copy(spinWorld);
      }
    }

    const posAttr = this.silkGeometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    let idx = 0;
    for (let i = 0; i < this.silkPositions.length; i++) {
      _v2.copy(this.silkPositions[i]).sub(this.group.position);
      arr[idx++] = _v2.x;
      arr[idx++] = _v2.y;
      arr[idx++] = 0.2;
    }
    for (let i = this.silkPositions.length; i < this.maxSilkPoints; i++) {
      const last = this.silkPositions[this.silkPositions.length - 1];
      _v2.copy(last).sub(this.group.position);
      arr[idx++] = _v2.x;
      arr[idx++] = _v2.y;
      arr[idx++] = 0.2;
    }
    posAttr.needsUpdate = true;
    this.silkGeometry.setDrawRange(0, this.silkPositions.length);
  }

  /**
   * Main per-frame update loop with authentic arachnid crawling kinematics:
   * Stance feet remain locked to ground coordinates (no sliding/gliding),
   * while swing feet lift in parabolic vertical arcs and snap to predictive landing targets.
   */
  public update(
    delta: number,
    bodyX: number,
    bodyY: number,
    headingAngle: number,
    velocity: THREE.Vector2,
    isMoving: boolean
  ) {
    this.headingAngle = headingAngle;
    const speed = velocity.length();
    const speedRatio = Math.min(speed / 3.0, 2.5);

    // Position spider in screen coordinates
    this.group.position.set(bodyX, bodyY, 0);

    const cosH = Math.cos(headingAngle);
    const sinH = Math.sin(headingAngle);

    // First-frame initialization or major position teleport
    if (!this.initialized) {
      this.initialized = true;
      this.lastBodyPos.set(bodyX, bodyY);
      for (let i = 0; i < this.legs.length; i++) {
        const leg = this.legs[i];
        const nx = leg.neutralOffset.x * this.config.size;
        const ny = leg.neutralOffset.y * this.config.size;
        const rx = nx * cosH - ny * sinH;
        const ry = nx * sinH + ny * cosH;
        leg.worldFootPos.set(bodyX + rx, bodyY + ry, 0);
        leg.stepStartPos.copy(leg.worldFootPos);
        leg.stepTargetPos.copy(leg.worldFootPos);
        leg.currentFootPos.set(rx, ry, 0);
        leg.isStepping = false;
        leg.stepProgress = 0;
      }
    }

    // Teleport detection (e.g. window resize or rapid cursor hop)
    const bodyDist = _v1.set(bodyX, bodyY, 0).distanceTo(_v2.set(this.lastBodyPos.x, this.lastBodyPos.y, 0));
    if (bodyDist > 240 * this.config.size) {
      for (let i = 0; i < this.legs.length; i++) {
        const leg = this.legs[i];
        const nx = leg.neutralOffset.x * this.config.size;
        const ny = leg.neutralOffset.y * this.config.size;
        const rx = nx * cosH - ny * sinH;
        const ry = nx * sinH + ny * cosH;
        leg.worldFootPos.set(bodyX + rx, bodyY + ry, 0);
        leg.stepStartPos.copy(leg.worldFootPos);
        leg.stepTargetPos.copy(leg.worldFootPos);
        leg.isStepping = false;
        leg.stepProgress = 0;
      }
    }
    this.lastBodyPos.set(bodyX, bodyY);

    // Natural breathing in abdomen
    this.breathePhase += delta * 3.2;
    const breathe = 1.0 + Math.sin(this.breathePhase) * 0.05;
    this.abdomenMesh.scale.set(breathe, breathe, breathe);

    // Sensory palp twitching
    this.palpTwitch += delta * (isMoving ? 14.0 : 4.5);
    const pTwitch = Math.sin(this.palpTwitch) * 0.18;
    this.pedipalpLeft.rotation.z = pTwitch;
    this.pedipalpRight.rotation.z = -pTwitch;

    // Detect turning in place from foot drift
    let maxFootDrift = 0;
    for (let i = 0; i < this.legs.length; i++) {
      const leg = this.legs[i];
      const nx = leg.neutralOffset.x * this.config.size;
      const ny = leg.neutralOffset.y * this.config.size;
      const rx = nx * cosH - ny * sinH;
      const ry = nx * sinH + ny * cosH;
      _v1.set(bodyX + rx, bodyY + ry, 0);
      const drift = leg.worldFootPos.distanceTo(_v1);
      if (drift > maxFootDrift) maxFootDrift = drift;
    }

    const isTurningInPlace = !isMoving && maxFootDrift > 20.0 * this.config.size;
    const isCrawling = isMoving || isTurningInPlace;

    // Alternating Tetrapod Gait Cycle:
    // Group A: L1 (0), R2 (5), L3 (2), R4 (7)
    // Group B: R1 (4), L2 (1), R3 (6), L4 (3)
    if (isCrawling) {
      // Natural cadence: rapid staccato scuttle frequency
      const cycleRate = (isMoving
        ? Math.max(2.4, Math.min(speed / 24.0, 7.0))
        : 3.5) * this.config.speed;

      const prevPhase = this.gaitPhase;
      this.gaitPhase = (this.gaitPhase + delta * cycleRate) % 1.0;

      // Group transitions (Group A lands at 0.5, Group B lands at 0.0)
      const crossedToB = prevPhase < 0.5 && this.gaitPhase >= 0.5;
      const crossedToA = prevPhase > 0.5 && this.gaitPhase < 0.5;

      if (crossedToB || crossedToA) {
        if (this.onFootstep) {
          this.onFootstep(speedRatio);
        }
      }
    }

    // Cephalothorax & Abdomen scuttling heave and sway
    if (isCrawling) {
      // Lateral roll/yaw sway synced to alternating gait groups
      const sway = Math.sin(this.gaitPhase * Math.PI * 2) * 0.045;
      this.bodyGroup.rotation.z = headingAngle + sway;

      // Vertical heave (carapace bobs with every step push)
      const heaveZ = Math.abs(Math.sin(this.gaitPhase * Math.PI * 2)) * (2.4 * this.config.size);
      this.bodyGroup.position.z = heaveZ;

      // Secondary Abdomen waggle (connected via pedicel waist, soft mass inertia)
      const abdomenWaggle = Math.sin(this.gaitPhase * Math.PI * 2 - 0.4) * 0.07;
      this.abdomenMesh.rotation.z = abdomenWaggle;
    } else {
      this.bodyGroup.rotation.z = headingAngle;
      this.bodyGroup.position.z = 0;
      this.abdomenMesh.rotation.z = 0;
    }

    // Shadow follows body rotation with a slight sunlight offset
    this.bodyShadowMesh.rotation.z = this.bodyGroup.rotation.z;

    // Active swinging group vs stance group
    const activeGroup: 'A' | 'B' = this.gaitPhase < 0.5 ? 'A' : 'B';
    const rawProgress = (this.gaitPhase % 0.5) / 0.5; // 0.0 to 1.0

    // Non-linear step swing curve: fast initial acceleration, high leg lift, sharp snap-down
    const swingEase = rawProgress < 0.5
      ? 4 * rawProgress * rawProgress * rawProgress
      : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

    for (let i = 0; i < this.legs.length; i++) {
      const leg = this.legs[i];
      const isSwingingGroup = isCrawling && leg.group === activeGroup;

      // Calculate ideal target landing point in world coordinates
      const nx = leg.neutralOffset.x * this.config.size;
      const ny = leg.neutralOffset.y * this.config.size;
      const rx = nx * cosH - ny * sinH;
      const ry = nx * sinH + ny * cosH;
      const neutralWorldX = bodyX + rx;
      const neutralWorldY = bodyY + ry;

      // Predictive stride lead ahead of body travel direction
      let targetX = neutralWorldX;
      let targetY = neutralWorldY;

      if (isMoving && speed > 1) {
        const strideLead = Math.min(44.0 * this.config.size, Math.max(14.0 * this.config.size, speed * 0.17 * this.config.speed));
        const dirX = velocity.x / speed;
        const dirY = velocity.y / speed;
        targetX += dirX * strideLead;
        targetY += dirY * strideLead;
      }

      leg.idealFootPos.set(neutralWorldX, neutralWorldY, 0);

      if (isSwingingGroup) {
        if (!leg.isStepping) {
          // Initiate swing: record launch origin and landing target
          leg.isStepping = true;
          leg.stepStartPos.copy(leg.worldFootPos);
          leg.stepTargetPos.set(targetX, targetY, 0);
        }

        leg.stepProgress = rawProgress;

        // Interpolate world position from stepStartPos to stepTargetPos
        leg.worldFootPos.lerpVectors(leg.stepStartPos, leg.stepTargetPos, swingEase);

        // Natural parabolic step lift in Z (vertical arc towards viewer)
        // Leading feelers and rear pushers lift higher for dramatic silhouette
        const liftPeak = (leg.index === 0 || leg.index === 4 || leg.index === 3 || leg.index === 7) ? 22.0 : 16.0;
        const lift = Math.sin(rawProgress * Math.PI) * (liftPeak * this.config.size);
        leg.worldFootPos.z = lift;

      } else {
        // STANCE PHASE: Firmly planted on the ground!
        // World coordinates do NOT move with the body, locking foot to ground
        if (leg.isStepping) {
          leg.isStepping = false;
          leg.worldFootPos.copy(leg.stepTargetPos);
          leg.worldFootPos.z = 0;
        } else {
          leg.worldFootPos.z = 0;
        }

        // Idle stance settling: smoothly return any overstretched feet to resting posture
        if (!isCrawling) {
          _v1.set(neutralWorldX, neutralWorldY, 0);
          const stretch = leg.worldFootPos.distanceTo(_v1);
          if (stretch > 18.0 * this.config.size) {
            leg.worldFootPos.lerp(_v1, delta * 7.0);
          }
        }
      }

      // Convert World Foot Position to spider-local coordinates for Three.js rendering
      leg.currentFootPos.set(
        leg.worldFootPos.x - bodyX,
        leg.worldFootPos.y - bodyY,
        leg.worldFootPos.z
      );

      // Solve Top-Down 3-Joint Arachnid Kinematics
      this.solveTopDownLegIK(leg);
    }

    this.updateSilkDragline(bodyX, bodyY);
  }

  /**
   * Top-Down Dorsal Inverse Kinematics Solver:
   * Accurately constructs the authentic arachnid profile from the top:
   * Coxa (hip) -> Femur bends outwards/upwards -> Knee (patella) arches high ->
   * Tibia points back inwards/downwards -> Tarsus reaches to the contact tip.
   */
  private solveTopDownLegIK(leg: LegDef) {
    _hipWorld.copy(leg.hipOffset).applyMatrix4(this.bodyGroup.matrix);
    const foot = leg.currentFootPos;

    // Vector from Hip to Foot
    _v1.subVectors(foot, _hipWorld);
    const d = _v1.length();

    const femurL = leg.femurLen * this.config.size;
    const tibiaL = leg.tibiaLen * this.config.size;
    const tarsusL = leg.tarsusLen * this.config.size;
    const totalReach = (femurL + tibiaL + tarsusL) * 0.99;
    const distClamped = Math.min(d, totalReach);

    // Upward knee arch vector in top-down view:
    // Spiders have knees that jut outwards and arch upwards:
    // In top-down view, knees are positioned outwards perpendicular to hip-foot axis
    const midDir = _v2.set(_v1.x, _v1.y, 0);
    if (midDir.lengthSq() > 0.001) {
      midDir.normalize();
    } else {
      midDir.set(leg.isLeft ? -1 : 1, 0, 0);
    }
    const perpDir = _v3.set(-midDir.y, midDir.x, 0).multiplyScalar(leg.isLeft ? 1 : -1);

    // Knee apex calculation: outward knee flare (spiders legs bow outward widely!)
    const kneeFlare = (18.0 + (leg.isStepping ? Math.sin(leg.stepProgress * Math.PI) * 6.0 : 0)) * this.config.size;
    const kneeForward = distClamped * 0.44;
    const kneeZ = _hipWorld.z + 14.0 * this.config.size + (leg.currentFootPos.z * 0.65);

    _kneePos.set(
      _hipWorld.x + midDir.x * kneeForward + perpDir.x * kneeFlare,
      _hipWorld.y + midDir.y * kneeForward + perpDir.y * kneeFlare,
      kneeZ
    );

    // Ankle position: between knee and foot
    const ankleForward = distClamped * 0.76;
    const ankleFlare = kneeFlare * 0.42;
    const ankleZ = Math.max(0, leg.currentFootPos.z) + 4.0 * this.config.size;

    _anklePos.set(
      _hipWorld.x + midDir.x * ankleForward + perpDir.x * ankleFlare,
      _hipWorld.y + midDir.y * ankleForward + perpDir.y * ankleFlare,
      ankleZ
    );

    // Position Knee mesh
    leg.patellaKneeMesh.position.copy(_kneePos);

    // Align Femur (Hip -> Knee)
    this.alignSegment(leg.femurMesh, _hipWorld, _kneePos, leg.femurLen);

    // Align Tibia (Knee -> Ankle)
    this.alignSegment(leg.tibiaMesh, _kneePos, _anklePos, leg.tibiaLen);

    // Align Tarsus (Ankle -> Foot)
    this.alignSegment(leg.tarsusMesh, _anklePos, foot, leg.tarsusLen);

    // Claw at foot tip
    leg.clawMesh.position.copy(foot);

    // Shadows (Top-down lighting casting drop shadows down & right)
    // Sunlight shadow offset
    const shadowOffset = _v1.set(8.0 * this.config.size, -10.0 * this.config.size, 0.05);

    // Foot shadow on ground
    const footLift = Math.max(0, foot.z);
    const shadowScale = Math.max(0.3, 1.0 - footLift / 22.0);
    const shadowAlpha = Math.max(0.08, 0.38 - footLift / 28.0);

    leg.footShadowMesh.position.set(foot.x + shadowOffset.x, foot.y + shadowOffset.y, 0.04);
    leg.footShadowMesh.scale.setScalar(shadowScale * this.config.size);
    (leg.footShadowMesh.material as THREE.MeshBasicMaterial).opacity = shadowAlpha;

    // Projected leg segment shadows on ground
    const hipShadow = _hipWorld.clone().add(shadowOffset);
    hipShadow.z = 0.03;
    const kneeShadow = _kneePos.clone().add(shadowOffset);
    kneeShadow.z = 0.03;
    const ankleShadow = _anklePos.clone().add(shadowOffset);
    ankleShadow.z = 0.03;

    this.alignSegment(leg.femurShadowMesh, hipShadow, kneeShadow, leg.femurLen);
    this.alignSegment(leg.tibiaShadowMesh, kneeShadow, ankleShadow, leg.tibiaLen);
  }

  private alignSegment(mesh: THREE.Mesh, p1: THREE.Vector3, p2: THREE.Vector3, nominalLen: number) {
    _v2.addVectors(p1, p2).multiplyScalar(0.5);
    mesh.position.copy(_v2);

    _v3.subVectors(p2, p1);
    const len = _v3.length();

    mesh.scale.set(this.config.size, (len / nominalLen) * this.config.size, this.config.size);
    _v3.normalize();
    mesh.quaternion.setFromUnitVectors(_v1.set(0, 1, 0), _v3);
  }

  public dispose() {
    this.geometries.forEach(g => g.dispose());
    this.geometries = [];

    this.bodyMaterial.dispose();
    this.legMaterial.dispose();
    this.jointMaterial.dispose();
    this.markingMaterial.dispose();
    this.fangMaterial.dispose();
    this.eyeMaterial.dispose();
    this.shadowMaterial.dispose();
    this.silkMaterial.dispose();
  }
}
