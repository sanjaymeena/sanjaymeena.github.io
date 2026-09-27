/**
 * Build-time environment variables exposed to the client bundle.
 * Astro's default `vite.envPrefix` is "PUBLIC_", so only these reach the browser.
 */
interface ImportMetaEnv {
  /**
   * GA4 Measurement ID, e.g. "G-XXXXXXXXXX".
   * Unset or empty -> <Analytics /> renders nothing.
   */
  readonly PUBLIC_GA4_ID?: string;

  /**
   * Set to the string "true" to render AdSense units.
   * Any other value (or unset) -> <AdSenseLoader /> and <AdSense /> render nothing.
   */
  readonly PUBLIC_ADSENSE_ENABLED?: string;
}
