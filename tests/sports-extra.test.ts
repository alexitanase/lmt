import { describe, expect, it } from 'vitest';
import { LMT } from '../src/index';
import { Sports } from '../src/core/types';
import { makeFakeSocket } from './helpers/fakeSocket';
import { VOLLEYBALL_ACTIONS } from '../src/sports/volleyball/actions';
import { TABLETENNIS_ACTIONS } from '../src/sports/tabletennis/actions';
import { HANDBALL_ACTIONS } from '../src/sports/handball/actions';
import { RUGBY_ACTIONS } from '../src/sports/rugby/actions';
import { BASEBALL_ACTIONS } from '../src/sports/baseball/actions';
import { AMERICANFOOTBALL_ACTIONS } from '../src/sports/americanfootball/actions';
import { CRICKET_ACTIONS } from '../src/sports/cricket/actions';

function makeHost(): HTMLElement {
  document.body.innerHTML = '<div id="lmt"></div>';
  return document.getElementById('lmt') as HTMLElement;
}

function loadSport(si: number, sn: string) {
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
      si,
      sn,
      th: { id: 1, name: 'Home' },
      ta: { id: 2, name: 'Away' },
      esc: '0:0',
    },
  });
  return { host, fake, lmt };
}

const cases: Array<{
  name: string;
  si: number;
  sn: string;
  cls: string;
  pitchClass: string;
  banner: { action: string; label: string };
  registry: Record<string, unknown>;
  requiredActions: string[];
}> = [
  {
    name: 'Volleyball',
    si: Sports.Volleyball,
    sn: 'Volleyball',
    cls: 'svg.lmt-stage--volleyball',
    pitchClass: '.lmt-pitch-volleyball',
    banner: { action: 'point-scored', label: 'POINT' },
    registry: VOLLEYBALL_ACTIONS,
    requiredActions: [
      'timeout',
      'point-scored',
      'fault',
      'stat',
      'end-of-set',
      'rally',
      '?-timeout',
      'golden-set',
      'match-ended',
    ],
  },
  {
    name: 'Table Tennis',
    si: Sports.TableTennis,
    sn: 'Table Tennis',
    cls: 'svg.lmt-stage--tabletennis',
    pitchClass: '.lmt-pitch-tabletennis',
    banner: { action: 'point-scored', label: 'POINT' },
    registry: TABLETENNIS_ACTIONS,
    requiredActions: [
      'serve',
      'point-scored',
      'end-of-set',
      'end-of-1st-set',
      'end-of-2nd-set',
      'end-of-3rd-set',
      'end-of-4th-set',
      'end-of-final-set',
      'match-ended',
    ],
  },
  {
    name: 'Handball',
    si: Sports.Handball,
    sn: 'Handball',
    cls: 'svg.lmt-stage--handball',
    pitchClass: '.lmt-pitch-handball',
    banner: { action: 'goal', label: 'GOAL' },
    registry: HANDBALL_ACTIONS,
    requiredActions: ['possession', 'goal', 'match-ended'],
  },
  {
    name: 'Rugby',
    si: Sports.Rugby,
    sn: 'Rugby',
    cls: 'svg.lmt-stage--rugby',
    pitchClass: '.lmt-pitch-rugby',
    banner: { action: 'try', label: 'TRY' },
    registry: RUGBY_ACTIONS,
    requiredActions: ['possession', 'try', 'penalty', 'match-ended'],
  },
  {
    name: 'Baseball',
    si: Sports.Baseball,
    sn: 'Baseball',
    cls: 'svg.lmt-stage--baseball',
    pitchClass: '.lmt-pitch-baseball',
    banner: { action: 'home-run', label: 'HOME RUN' },
    registry: BASEBALL_ACTIONS,
    requiredActions: ['hit', 'home-run', 'match-ended'],
  },
  {
    name: 'American Football',
    si: Sports.AmericanFootball,
    sn: 'American Football',
    cls: 'svg.lmt-stage--americanfootball',
    pitchClass: '.lmt-pitch-americanfootball',
    banner: { action: 'touchdown', label: 'TOUCHDOWN' },
    registry: AMERICANFOOTBALL_ACTIONS,
    requiredActions: ['touchdown', 'field-goal', 'match-ended'],
  },
  {
    name: 'Cricket',
    si: Sports.Cricket,
    sn: 'Cricket',
    cls: 'svg.lmt-stage--cricket',
    pitchClass: '.lmt-pitch-cricket',
    banner: { action: 'wicket', label: 'WICKET' },
    registry: CRICKET_ACTIONS,
    requiredActions: ['run', 'wicket', 'match-ended'],
  },
];

describe.each(cases)('$name stage', (c) => {
  it(`renders ${c.name} SVG for si=${c.si}`, () => {
    const { host, lmt } = loadSport(c.si, c.sn);
    expect(host.shadowRoot!.querySelector(c.cls)).toBeTruthy();
    expect(host.shadowRoot!.querySelector(c.pitchClass)).toBeTruthy();
    lmt.destroy();
  });

  it('covers the documented action set', () => {
    for (const a of c.requiredActions) {
      expect(c.registry, `${a} should be registered`).toHaveProperty(a);
    }
  });

  it(`renders banner for ${c.banner.action}`, () => {
    const { host, fake, lmt } = loadSport(c.si, c.sn);
    fake.trigger('update_event', {
      message: { Action: c.banner.action, Team: 'home', Player: 'X' },
    });
    expect(host.shadowRoot!.querySelector('.lmt-banner')?.textContent).toContain(
      c.banner.label,
    );
    lmt.destroy();
  });
});
