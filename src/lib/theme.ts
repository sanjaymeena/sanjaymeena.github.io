/**
 * The single source of truth for the light/dark choice.
 *
 * Precedence: an explicit stored choice wins; otherwise the OS preference
 * decides. global.css mirrors exactly this precedence — `:root[data-theme]`
 * plus a `prefers-color-scheme` media query guarded by
 * `:not([data-theme='light'])` — so the stylesheet and this module can never
 * disagree about which palette is showing.
 */
export type Theme = 'light' | 'dark';

/**
 * Must stay in sync with the inline pre-paint script in BaseLayout, which
 * cannot import this module because it has to run un-bundled, before paint.
 */
export const THEME_STORAGE_KEY = 'theme';

/** Fired on `document` whenever the resolved theme changes. */
export const THEME_CHANGE_EVENT = 'themechange';

export function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    // Private browsing can make localStorage throw; the OS preference applies.
    return null;
  }
}

export function resolvedTheme(): Theme {
  return (
    storedTheme() ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
}

/** Passing `null` clears the explicit choice and hands control back to the OS. */
export function applyTheme(theme: Theme | null): void {
  if (theme) document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
}
