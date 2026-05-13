import { render } from 'preact';
import type { Store } from '../core/store';
import { Shell } from './Shell';
import { baseStyles } from './styles';

/**
 * Attach the LMT UI to `host` inside a Shadow DOM so its CSS cannot
 * leak to (or be overridden by) the host site. Returns an unmount
 * function that tears the UI down idempotently.
 */
export function mountUI(host: HTMLElement, store: Store): () => void {
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

  // Idempotent re-mount: clear previous contents.
  while (shadow.firstChild) shadow.removeChild(shadow.firstChild);

  const style = document.createElement('style');
  style.textContent = baseStyles;
  shadow.appendChild(style);

  const mountPoint = document.createElement('div');
  mountPoint.className = 'lmt-mount';
  shadow.appendChild(mountPoint);

  const renderShell = () =>
    render(<Shell state={store.getState()} store={store} />, mountPoint);

  renderShell();
  const unsubscribe = store.subscribe(renderShell);

  return () => {
    unsubscribe();
    render(null, mountPoint);
    while (shadow.firstChild) shadow.removeChild(shadow.firstChild);
  };
}
