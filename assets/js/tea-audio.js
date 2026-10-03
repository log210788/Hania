/**
 * 🫖 Web Audio Synthesizer & British RP Speech Engine
 * Specially created for Hania's English Afternoon Tea Salon
 */

(function () {
  'use strict';

  window.TeaAudio = {
    audioCtx: null,
    speechRate: 0.95,
    britishVoice: null,

    // Initialize Web Audio Context safely on first user gesture
    getContext: function () {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    },

    // 1. Porcelain Teacup Clink (Pure, delicate chime)
    playCupClink: function () {
      try {
        const ctx = this.getContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Primary bell frequency
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1760, now); // A6
        osc1.frequency.exponentialRampToValueAtTime(1600, now + 0.35);

        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        // High shimmer overtone
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(3520, now);
        osc2.frequency.exponentialRampToValueAtTime(3200, now + 0.2);

        gain2.gain.setValueAtTime(0.12, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.45);
        osc2.start(now);
        osc2.stop(now + 0.3);
      } catch (e) {
        console.warn('Audio synthesis note:', e);
      }
    },

    // 2. Victorian Tea Bell Chime
    playTeaBell: function () {
      try {
        const ctx = this.getContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        const chord = [880, 1318.51, 1760]; // A5, E6, A6
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);

          gain.gain.setValueAtTime(0.2, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.1);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 1.0);
        });
      } catch (e) {
        console.warn('Audio note:', e);
      }
    },

    // 3. Harp Glissando (Success / Matching Chime)
    playHarpChime: function () {
      try {
        const ctx = this.getContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        // Pentatonic harp sweep
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);

          gain.gain.setValueAtTime(0.18, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.55);
        });
      } catch (e) {
        console.warn('Audio note:', e);
      }
    },

    // 4. Authentic British RP Speech Synthesis
    speakBritish: function (text, callback) {
      if (!window.speechSynthesis) {
        alert('Speech synthesis is not supported on this browser.');
        return;
      }

      window.speechSynthesis.cancel(); // Cancel any existing speech

      const cleanText = text.replace(/‿/g, ' ').replace(/\//g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Select authentic British voice (en-GB)
      const voices = window.speechSynthesis.getVoices();
      let bestVoice = voices.find(v => v.lang === 'en-GB' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Oliver') || v.name.includes('Victoria')));
      if (!bestVoice) {
        bestVoice = voices.find(v => v.lang === 'en-GB' || v.lang.startsWith('en-GB') || v.lang === 'en_GB');
      }
      if (!bestVoice) {
        bestVoice = voices.find(v => v.lang.startsWith('en'));
      }

      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = 'en-GB';
      }

      utterance.rate = this.speechRate || 0.95;
      utterance.pitch = 1.05;

      if (callback) {
        utterance.onend = callback;
        utterance.onerror = callback;
      }

      window.speechSynthesis.speak(utterance);
    },

    // Set speech speed
    setRate: function (rate) {
      this.speechRate = parseFloat(rate);
    }
  };

  // Pre-load voices
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function () {
      const voices = window.speechSynthesis.getVoices();
      window.TeaAudio.britishVoice = voices.find(v => v.lang === 'en-GB');
    };
  }
})();
