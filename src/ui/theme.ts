import type { ThemeConfig } from '../core/types';

/**
 * Map a partial `ThemeConfig` to a flat dict of CSS custom properties.
 * Returned as `Record<string, string>` so it can be passed to JSX `style`.
 */
export function themeVars(theme: ThemeConfig | undefined): Record<string, string> {
  const vars: Record<string, string> = {};
  if (!theme) return vars;
  if (theme.bgColor) vars['--lmt-bg'] = theme.bgColor;
  if (theme.primaryColor) vars['--lmt-primary'] = theme.primaryColor;
  if (theme.accentColor) vars['--lmt-accent'] = theme.accentColor;
  if (theme.homeColor) vars['--lmt-home'] = theme.homeColor;
  if (theme.awayColor) vars['--lmt-away'] = theme.awayColor;
  if (theme.font) vars['--lmt-font'] = theme.font;
  return vars;
}
