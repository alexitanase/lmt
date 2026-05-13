import { describe, expect, it } from 'vitest';
import { LMT } from '../src/index';
import { makeFakeSocket } from './helpers/fakeSocket';

function makeHost(): HTMLElement {
  document.body.innerHTML = '<div id="lmt"></div>';
  return document.getElementById('lmt') as HTMLElement;
}

describe('UI shell (Fase 2)', () => {
  it('attaches a Shadow DOM with the LMT root inside', () => {
    const host = makeHost();
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      socketFactory: () => makeFakeSocket(),
    });
    const shadow = host.shadowRoot;
    expect(shadow).toBeTruthy();
    const root = shadow?.querySelector('.lmt-root') as HTMLElement | null;
    expect(root).toBeTruthy();
    expect(root?.getAttribute('data-lmt-version')).toMatch(/^\d+\.\d+\.\d+$/);
    expect(shadow?.querySelector('style')).toBeTruthy();
    lmt.destroy();
  });

  it('renders the 5 documented tabs', () => {
    const host = makeHost();
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      socketFactory: () => makeFakeSocket(),
    });
    const tabs = Array.from(
      host.shadowRoot!.querySelectorAll('.lmt-tab'),
    ).map((b) => b.getAttribute('data-tab'));
    expect(tabs).toEqual([
      'stats',
      'player-stats',
      'timeline',
      'lineups',
      'table',
    ]);
    lmt.destroy();
  });

  it('switches active tab on click', () => {
    const host = makeHost();
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      socketFactory: () => makeFakeSocket(),
    });
    const timelineTab = host.shadowRoot!.querySelector<HTMLButtonElement>(
      '[data-tab="timeline"]',
    )!;
    timelineTab.click();
    expect(timelineTab.getAttribute('aria-selected')).toBe('true');
    lmt.destroy();
  });

  it('renders score and team names after constructor', () => {
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
        en: 'Guimaraes - Rio Ave',
        es: 1,
        si: 1,
        th: { id: 1, name: 'Guimaraes' },
        ta: { id: 2, name: 'Rio Ave' },
        esc: '1:0',
      },
    });

    const text = host.shadowRoot!.textContent ?? '';
    expect(text).toContain('Guimaraes');
    expect(text).toContain('Rio Ave');
    expect(host.shadowRoot!.querySelector('.lmt-score__score')!.textContent).toBe('10');
    lmt.destroy();
  });

  it('reflects In Possession in the footer after a possession action', () => {
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
        th: { id: 1, name: 'Guimaraes' },
        ta: { id: 2, name: 'Rio Ave' },
        esc: '1:0',
      },
    });
    fake.trigger('update_event', {
      message: { Action: 'possession', Team: 'home' },
    });
    const footer = host.shadowRoot!.querySelector('.lmt-footer__text');
    expect(footer?.textContent).toContain('Guimaraes');
    expect(footer?.textContent).toContain('In Possession');
    lmt.destroy();
  });

  it('applies theme CSS vars and updates them on setTheme', () => {
    const host = makeHost();
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      theme: { primaryColor: '#ff0000', accentColor: '#00ff00' },
      socketFactory: () => makeFakeSocket(),
    });
    const root = host.shadowRoot!.querySelector(
      '.lmt-root',
    ) as HTMLElement;
    expect(root.style.getPropertyValue('--lmt-primary')).toBe('#ff0000');
    expect(root.style.getPropertyValue('--lmt-accent')).toBe('#00ff00');

    lmt.setTheme({ primaryColor: '#123456' });
    const root2 = host.shadowRoot!.querySelector(
      '.lmt-root',
    ) as HTMLElement;
    expect(root2.style.getPropertyValue('--lmt-primary')).toBe('#123456');
    expect(root2.style.getPropertyValue('--lmt-accent')).toBe('#00ff00');
    lmt.destroy();
  });

  it('destroy() clears the Shadow DOM contents', () => {
    const host = makeHost();
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      socketFactory: () => makeFakeSocket(),
    });
    expect(host.shadowRoot!.querySelector('.lmt-root')).toBeTruthy();
    lmt.destroy();
    expect(host.shadowRoot!.querySelector('.lmt-root')).toBeNull();
  });
});
