import { describe, expect, it } from 'vitest';
import { LMT } from '../src/index';
import { makeFakeSocket } from './helpers/fakeSocket';
import {
  BASKETBALL_ACTIONS,
} from '../src/sports/basketball/actions';
import {
  ICEHOCKEY_ACTIONS,
} from '../src/sports/icehockey/actions';
import { TENNIS_ACTIONS } from '../src/sports/tennis/actions';
import {
  SUPPORTED_SPORTS,
  getSportStage,
} from '../src/sports/registry';
import { Sports } from '../src/core/types';

function makeHost(): HTMLElement {
  document.body.innerHTML = '<div id="lmt"></div>';
  return document.getElementById('lmt') as HTMLElement;
}

function loadSport(_host: HTMLElement, si: number, sn: string) {
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
      si,
      sn,
      th: { id: 1, name: 'Home FC' },
      ta: { id: 2, name: 'Away FC' },
      esc: '0:0',
      etsc: ['6:4', '4:6'],
    },
  });
  return { lmt, fake };
}

describe('Sport registry', () => {
  it('exposes all 11 implemented sports', () => {
    expect(SUPPORTED_SPORTS.sort((a, b) => a - b)).toEqual([
      Sports.Soccer,
      Sports.IceHockey,
      Sports.Basketball,
      Sports.Tennis,
      Sports.Baseball,
      Sports.Volleyball,
      Sports.Rugby,
      Sports.Handball,
      Sports.TableTennis,
      Sports.AmericanFootball,
      Sports.Cricket,
    ].sort((a, b) => a - b));
  });
  it('returns null for unsupported sport ids', () => {
    expect(getSportStage(99)).toBeNull();
    expect(getSportStage(undefined)).toBeNull();
  });
});

describe('Basketball stage', () => {
  it('renders the basketball SVG for sport id 3', () => {
    const host = makeHost();
    const { lmt } = loadSport(host, Sports.Basketball, 'Basketball');
    expect(host.shadowRoot!.querySelector('svg.lmt-stage--basketball')).toBeTruthy();
    expect(host.shadowRoot!.querySelector('.lmt-pitch-basketball')).toBeTruthy();
    lmt.destroy();
  });

  it('covers the documented basketball actions', () => {
    const required = [
      'possession', '1-pts', '2-pts', '3-pts',
      'freethrow', 'freethrow-scored', 'freethrow-missed',
      'throw-missed', 'timeout', 'quarter-end', 'half-end', 'overtime',
      'foul', 'quarter-1', 'quarter-2', 'quarter-3', 'quarter-4',
      'half-first', 'half-second', 'match-ended',
    ];
    for (const a of required) {
      expect(BASKETBALL_ACTIONS, `${a} should be registered`).toHaveProperty(a);
    }
  });

  it('renders banner overlay for 3-pts', () => {
    const host = makeHost();
    const { lmt, fake } = loadSport(host, Sports.Basketball, 'Basketball');
    fake.trigger('update_event', {
      message: { Action: '3-pts', Team: 'home', Player: 'LeBron' },
    });
    expect(host.shadowRoot!.querySelector('.lmt-banner')?.textContent).toContain('+3 PTS');
    lmt.destroy();
  });
});

describe('Ice Hockey stage', () => {
  it('renders the ice hockey SVG for sport id 2', () => {
    const host = makeHost();
    const { lmt } = loadSport(host, Sports.IceHockey, 'Ice Hockey');
    expect(host.shadowRoot!.querySelector('svg.lmt-stage--icehockey')).toBeTruthy();
    expect(host.shadowRoot!.querySelector('.lmt-pitch-icehockey')).toBeTruthy();
    lmt.destroy();
  });

  it('covers the documented ice hockey actions', () => {
    const required = [
      'possession', 'goal', 'penalty', 'penalty-shot',
      'penalty-shot-missed', 'penalty-overplay', 'shot',
      'pulled-keeper', 'keeper-back-in-goal', 'faceoff',
      'puck-dropped', 'faceoff-winner', 'event-timeout',
      'icing', 'powerplay', 'match-ended',
    ];
    for (const a of required) {
      expect(ICEHOCKEY_ACTIONS, `${a} should be registered`).toHaveProperty(a);
    }
  });

  it('places a positional marker for `shot`', () => {
    const host = makeHost();
    const { lmt, fake } = loadSport(host, Sports.IceHockey, 'Ice Hockey');
    fake.trigger('update_event', {
      message: {
        Action: 'shot',
        Team: 'home',
        Player: 'Crosby',
        BallPosition: [0.7, 0.5],
      },
    });
    expect(host.shadowRoot!.querySelector('.lmt-ball-anim')).toBeTruthy();
    lmt.destroy();
  });
});

describe('Tennis stage', () => {
  it('renders the tennis SVG for sport id 4', () => {
    const host = makeHost();
    const { lmt } = loadSport(host, Sports.Tennis, 'Tennis');
    expect(host.shadowRoot!.querySelector('svg.lmt-stage--tennis')).toBeTruthy();
    expect(host.shadowRoot!.querySelector('.lmt-pitch-tennis')).toBeTruthy();
    lmt.destroy();
  });

  it('covers the documented tennis actions', () => {
    const required = [
      'serve', 'point-scored', 'fault', 'doble-fault',
      'break-points', 'stat', 'let-1st-serve', 'let-2nd-serve',
      'game-set-match', 'end-of-set', 'tie-break',
      'rain-delay', 'second-set', 'third-set', 'fourth-set',
      'final-set', 'match-ended',
    ];
    for (const a of required) {
      expect(TENNIS_ACTIONS, `${a} should be registered`).toHaveProperty(a);
    }
  });

  it('shows the sets badge from etsc', () => {
    const host = makeHost();
    const { lmt } = loadSport(host, Sports.Tennis, 'Tennis');
    expect(host.shadowRoot!.textContent).toContain('sets:');
    expect(host.shadowRoot!.textContent).toContain('6:4');
    lmt.destroy();
  });
});
