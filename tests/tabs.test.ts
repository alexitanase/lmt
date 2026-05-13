import { describe, expect, it } from 'vitest';
import { LMT } from '../src/index';
import { makeFakeSocket } from './helpers/fakeSocket';

function makeHost(): HTMLElement {
  document.body.innerHTML = '<div id="lmt"></div>';
  return document.getElementById('lmt') as HTMLElement;
}

function setup(): {
  host: HTMLElement;
  lmt: ReturnType<typeof LMT.create>;
  fake: ReturnType<typeof makeFakeSocket>;
} {
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
      si: 1,
      sn: 'Soccer',
      cgn: 'Primeira Liga',
      th: { id: 1, name: 'Guimaraes' },
      ta: { id: 2, name: 'Rio Ave' },
      esc: '1:0',
      ecp: 2,
      ests: {
        CORNER: { name: 'CORNER', home: 4, away: 2 },
        POSSESSION: { name: 'POSSESSION', home: '62', away: '38' },
      },
    },
  });
  return { host, lmt, fake };
}

function clickTab(host: HTMLElement, tab: string) {
  host
    .shadowRoot!.querySelector<HTMLButtonElement>(`[data-tab="${tab}"]`)!
    .click();
}

describe('Tabs', () => {
  it('Stats tab renders one row per ests entry', () => {
    const { host, lmt } = setup();
    clickTab(host, 'stats');
    const rows = host.shadowRoot!.querySelectorAll('.lmt-stat');
    expect(rows.length).toBe(2);
    expect(host.shadowRoot!.textContent).toContain('Corners');
    expect(host.shadowRoot!.textContent).toContain('Possession');
    lmt.destroy();
  });

  it('Timeline tab lists action entries reverse chronologically', () => {
    const { host, lmt, fake } = setup();
    fake.trigger('update_event', {
      message: { Action: 'attack', Team: 'home', Seconds: 60, Player: 'C Silva' },
    });
    fake.trigger('update_event', {
      message: { Action: 'goal', Team: 'home', Seconds: 120, Player: 'C Silva' },
    });
    clickTab(host, 'timeline');
    const items = host.shadowRoot!.querySelectorAll('.lmt-timeline__item');
    expect(items.length).toBe(2);
    expect(items[0]!.textContent).toContain('GOAL');
    expect(items[1]!.textContent).toContain('Attack');
    lmt.destroy();
  });

  it('Player Stats tab aggregates actions per player', () => {
    const { host, lmt, fake } = setup();
    fake.trigger('update_event', {
      message: { Action: 'attack', Team: 'home', Player: 'C Silva' },
    });
    fake.trigger('update_event', {
      message: { Action: 'attack', Team: 'home', Player: 'C Silva' },
    });
    fake.trigger('update_event', {
      message: { Action: 'goal', Team: 'home', Player: 'C Silva' },
    });
    clickTab(host, 'player-stats');
    const entry = host.shadowRoot!.querySelector('.lmt-pstat--home');
    expect(entry).toBeTruthy();
    expect(entry!.textContent).toContain('C Silva');
    expect(entry!.textContent).toContain('Attack ×2');
    expect(entry!.textContent).toContain('GOAL!');
    lmt.destroy();
  });

  it('Lineups tab shows team names', () => {
    const { host, lmt } = setup();
    clickTab(host, 'lineups');
    expect(host.shadowRoot!.textContent).toContain('Guimaraes');
    expect(host.shadowRoot!.textContent).toContain('Rio Ave');
    lmt.destroy();
  });

  it('Table tab shows tournament/category/status from EVENT_MODEL', () => {
    const { host, lmt } = setup();
    clickTab(host, 'table');
    const text = host.shadowRoot!.textContent ?? '';
    expect(text).toContain('Primeira Liga');
    expect(text).toContain('Live');
    expect(text).toContain('1:0');
    lmt.destroy();
  });
});
