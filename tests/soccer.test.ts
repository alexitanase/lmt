import { describe, expect, it } from 'vitest';
import { LMT } from '../src/index';
import { makeFakeSocket } from './helpers/fakeSocket';
import { SOCCER_PITCH_AREA } from '../src/sports/soccer/pitch';

function loadSoccer(host: HTMLElement) {
  const fake = makeFakeSocket();
  const lmt = LMT.create({
    container: '#lmt',
    partner: 'demo',
    socketFactory: () => fake,
  });
  lmt.loadEvent('1');
  fake.trigger('connect');
  fake.trigger('verified', { message: 'ok' });
  fake.trigger('constructor', {
    message: {
      id: 1,
      en: 'Guimaraes - Rio Ave',
      es: 1,
      si: 1,
      th: { id: 1, name: 'Guimaraes' },
      ta: { id: 2, name: 'Rio Ave' },
      esc: '1:0',
      ests: {
        CORNER: { name: 'CORNER', home: 4, away: 2 },
        SHOT_ON_TARGET: { name: 'SHOT_ON_TARGET', home: 6, away: 3 },
        POSSESSION: { name: 'POSSESSION', home: '62', away: '38' },
      },
    },
  });
  return { lmt, fake, host };
}

describe('Soccer stage', () => {
  beforeEachReset();

  it('renders a soccer SVG stage for sport id 1', () => {
    const host = makeHost();
    const { lmt } = loadSoccer(host);
    const svg = host.shadowRoot!.querySelector('svg.lmt-stage--soccer');
    expect(svg).toBeTruthy();
    expect(host.shadowRoot!.querySelector('.lmt-pitch-soccer')).toBeTruthy();
    lmt.destroy();
  });

  it('places a positional action marker at the projected ball position', () => {
    const host = makeHost();
    const { lmt, fake } = loadSoccer(host);
    fake.trigger('update_event', {
      message: {
        Action: 'possession',
        Team: 'home',
        Player: 'C Silva',
        BallPosition: [0.2, 0.6],
      },
    });
    const g = host.shadowRoot!.querySelector('.lmt-ball-anim');
    expect(g).toBeTruthy();
    const transform = g!.getAttribute('transform');
    const expectedX = SOCCER_PITCH_AREA.x + 0.2 * SOCCER_PITCH_AREA.w;
    const expectedY = SOCCER_PITCH_AREA.y + 0.6 * SOCCER_PITCH_AREA.h;
    expect(transform).toBe(`translate(${expectedX} ${expectedY})`);
    // Player tip is rendered
    expect(host.shadowRoot!.textContent).toContain('C Silva');
    lmt.destroy();
  });

  it('renders the banner overlay for banner-kind actions', () => {
    const host = makeHost();
    const { lmt, fake } = loadSoccer(host);
    fake.trigger('update_event', {
      message: { Action: 'goal', Team: 'home', Player: 'C Silva' },
    });
    const banner = host.shadowRoot!.querySelector('.lmt-banner');
    expect(banner).toBeTruthy();
    expect(banner!.textContent).toContain('GOAL');
    expect(banner!.textContent).toContain('C Silva');
    lmt.destroy();
  });

  it('does NOT render a positional marker for banner actions', () => {
    const host = makeHost();
    const { lmt, fake } = loadSoccer(host);
    fake.trigger('update_event', {
      message: {
        Action: 'halftime',
        Team: 'home',
        BallPosition: [0.5, 0.5],
      },
    });
    expect(host.shadowRoot!.querySelector('.lmt-ball-anim')).toBeNull();
    expect(host.shadowRoot!.querySelector('.lmt-banner')).toBeTruthy();
    lmt.destroy();
  });

  it('falls back to a placeholder for unsupported sports', () => {
    const host = makeHost();
    const fake = makeFakeSocket();
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      socketFactory: () => fake,
    });
    lmt.loadEvent('1');
    fake.trigger('connect');
    fake.trigger('verified', { message: 'ok' });
    fake.trigger('constructor', {
      message: {
        id: 1,
        en: 'A - B',
        es: 1,
        si: 99,
        sn: 'Curling',
        th: { id: 1, name: 'A' },
        ta: { id: 2, name: 'B' },
      },
    });
    expect(host.shadowRoot!.querySelector('svg.lmt-stage--soccer')).toBeNull();
    expect(host.shadowRoot!.textContent).toContain('pendiente');
    lmt.destroy();
  });
});

// ── tiny helpers (kept local to avoid touching other test files) ───────
function makeHost(): HTMLElement {
  document.body.innerHTML = '<div id="lmt"></div>';
  return document.getElementById('lmt') as HTMLElement;
}
function beforeEachReset() {
  // vitest's beforeEach is implicit when invoked at module scope inside describe
}
