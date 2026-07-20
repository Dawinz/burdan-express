/**
 * SafariPlus v2 integration config (official docs):
 * https://demo.safariyetu.com/safariplus/v1/examples/embed.html
 * https://demo.safariyetu.com/safariplus/v2/docs
 *
 * Prefer REACT_APP_SAFARIPLUS_API_KEY from env. Do not commit secrets.
 */
export const SAFARIPLUS_OPERATOR_ID = '2203260042';
export const SAFARIPLUS_BRAND = 'Burdan Express';
export const SAFARIPLUS_API_BASE = 'https://www.safariyetu.com/safariplus';
export const SAFARIPLUS_API_KEY =
  process.env.REACT_APP_SAFARIPLUS_API_KEY || '';

export function withSafariPlusAuth(options = {}) {
  return {
    apiKey: SAFARIPLUS_API_KEY,
    operatorId: SAFARIPLUS_OPERATOR_ID,
    brand: SAFARIPLUS_BRAND,
    ...options,
  };
}

/** Configure the widget once after the SafariPlus script loads. */
export function configureSafariPlusWidget() {
  if (typeof window === 'undefined') return;
  if (!SAFARIPLUS_API_KEY) {
    console.warn('SafariPlus API key is missing. Set REACT_APP_SAFARIPLUS_API_KEY.');
    return;
  }
  const apply = () => {
    if (window.safariplus && typeof window.safariplus.configure === 'function') {
      window.safariplus.configure({ apiKey: SAFARIPLUS_API_KEY });
      return true;
    }
    return false;
  };
  if (apply()) return;
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (apply() || attempts > 40) clearInterval(timer);
  }, 250);
}
