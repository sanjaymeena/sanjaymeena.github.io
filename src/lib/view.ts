/**
 * The single source of truth for the cards/list listing choice.
 *
 * Structurally the same as src/lib/theme.ts, and for the same reason: the
 * stylesheet keys off `:root[data-view]` and the pre-paint script in
 * BaseLayout sets that attribute, so all three have to agree on the key name
 * and on what the default is.
 *
 * Unlike the theme there is no OS-level preference to fall back on, so the
 * default is a constant rather than a media query.
 */
export type ViewMode = 'cards' | 'list';

/**
 * Must stay in sync with the inline pre-paint script in BaseLayout, which
 * cannot import this module because it has to run un-bundled, before paint.
 */
export const VIEW_STORAGE_KEY = 'view';

/** What a first-time reader gets, and what applies once the choice is cleared. */
export const DEFAULT_VIEW: ViewMode = 'cards';

/** Fired on `document` whenever the resolved view mode changes. */
export const VIEW_CHANGE_EVENT = 'viewchange';

export function storedView(): ViewMode | null {
  try {
    const value = localStorage.getItem(VIEW_STORAGE_KEY);
    return value === 'cards' || value === 'list' ? value : null;
  } catch {
    // Private browsing can make localStorage throw; the default applies.
    return null;
  }
}

export function resolvedView(): ViewMode {
  return storedView() ?? DEFAULT_VIEW;
}

/** Passing `null` clears the explicit choice and restores DEFAULT_VIEW. */
export function applyView(view: ViewMode | null): void {
  document.documentElement.dataset.view = view ?? DEFAULT_VIEW;
}
