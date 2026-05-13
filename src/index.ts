/**
 * LMT — Live Match Tracker
 * Public entry. The full API lands in Fase 1.
 */

export const VERSION = '0.0.1';

export interface LMTConfigStub {
  container: string | HTMLElement;
  partner: string;
}

export const LMT = {
  VERSION,
  create(_config: LMTConfigStub): { destroy(): void } {
    return {
      destroy() {
        /* no-op stub */
      },
    };
  },
};

export default LMT;
