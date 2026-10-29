/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Procedural Web Audio chitin sound synthesizer for Spider footsteps and scuttling.
 * 100% zero-dependency, generated with short band-passed impulses.
 */

export class SpiderAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private lastStepTime: number = 0;

  constructor(enabled: boolean = false) {
    this.enabled = enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (val && !this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      } catch {
        this.enabled = false;
      }
    }
  }

  public playFootstep(speedRatio: number = 1.0) {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastStepTime < 45) return; // rate limit
    this.lastStepTime = now;

    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
        return;
      }

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Bandpass around 2800Hz - 4200Hz for high-frequency dry chitin tap
      const baseFreq = 2600 + Math.random() * 1400;
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq, t);
      filter.Q.setValueAtTime(4.0, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.025);

      const vol = Math.min(0.045 * speedRatio, 0.08);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.03);
    } catch {
      // Audio context may be restricted by autoplay policy until user gesture
    }
  }

  public playScare() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.12);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);
    } catch {
      // ignore
    }
  }

  public playCrunch() {
    if (!this.enabled) return;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const t = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const offset = i * 0.045;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550 + Math.random() * 300, t + offset);
        osc.frequency.exponentialRampToValueAtTime(110, t + offset + 0.04);

        gain.gain.setValueAtTime(0.08, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.045);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + 0.05);
      }
    } catch {
      // ignore
    }
  }

  public dispose() {
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
