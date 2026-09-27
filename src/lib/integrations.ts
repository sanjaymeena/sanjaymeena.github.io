/**
 * Third-party integration gating.
 *
 * Both integrations are opt-in at build time and production-only, so `npm run dev`
 * and any build without the env vars ship zero analytics and zero ad bytes.
 *
 * Env vars must be prefixed PUBLIC_ to reach the client bundle (Astro's default
 * `vite.envPrefix`); see .env.example.
 */

/** GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Empty when unset. */
export function ga4MeasurementId(): string {
  return (import.meta.env.PUBLIC_GA4_ID ?? '').trim();
}

export function analyticsEnabled(): boolean {
  return import.meta.env.PROD && ga4MeasurementId() !== '';
}

export function adsEnabled(): boolean {
  return import.meta.env.PROD && import.meta.env.PUBLIC_ADSENSE_ENABLED === 'true';
}
