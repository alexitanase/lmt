import { describe, it, expect } from 'vitest';
import { LMT, VERSION } from '../src/index';

describe('LMT bootstrap', () => {
  it('exposes a semver-ish version string', () => {
    expect(typeof VERSION).toBe('string');
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('LMT.create returns an instance with destroy()', () => {
    const instance = LMT.create({ container: 'body', partner: 'demo-feedh' });
    expect(typeof instance.destroy).toBe('function');
    instance.destroy();
  });
});
