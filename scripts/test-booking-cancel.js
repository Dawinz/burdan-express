const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'browser-test-results');
fs.mkdirSync(OUT, { recursive: true });

async function shot(page, name) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
  console.log('SHOT:', name);
}

async function state(page, label) {
  const info = await page.evaluate(() => {
    const root = document.querySelector('#root > div');
    const Shell = customElements.get('safari-shell');
    const active = Shell?.activeShells?.length || 0;
    return {
      url: location.href,
      hasBlurClass: !!(root && root.className.includes('blur')),
      filter: root ? getComputedStyle(root).filter : null,
      activeShells: active,
      bodyOverflow: document.body.style.overflow || getComputedStyle(document.body).overflow,
    };
  });
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(info, null, 2));
  return info;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.addInitScript(() => {
    try { localStorage.setItem('burdan-app-download-dismissed', String(Date.now())); } catch {}
  });

  await page.goto('https://burdan-express.vercel.app/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1500);

  // Dismiss modal if still there
  await page.evaluate(() => {
    try { localStorage.setItem('burdan-app-download-dismissed', String(Date.now())); } catch {}
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) dialog.remove();
    document.body.style.overflow = '';
  });
  await page.waitForTimeout(300);

  const lang = page.locator('nav button').filter({ hasText: /\bEN\b|\bSW\b/ }).first();
  if (await lang.count()) {
    const t = await lang.innerText();
    if (t.includes('EN')) await lang.click({ force: true });
  }
  await page.waitForTimeout(400);

  const desktop = page.locator('section.hidden.md\\:block');
  await desktop.scrollIntoViewIfNeeded();
  await desktop.locator('button').filter({ hasText: /→/ }).first().click();
  const d = new Date(); d.setDate(d.getDate() + 2);
  await desktop.locator('input[type="date"]').fill(d.toISOString().slice(0, 10));
  await shot(page, '01-ready');
  await desktop.locator('button[type="submit"]').click();
  console.log('Submitted booking search');

  let opened = false;
  for (let i = 1; i <= 20; i++) {
    await page.waitForTimeout(800);
    const s = await state(page, `wait ${i}`);
    if (i <= 4 || s.activeShells > 0) await shot(page, `02-open-${i}`);
    if (s.activeShells > 0) { opened = true; break; }
  }

  if (!opened) {
    console.log('SUMMARY: dialog never opened (activeShells stayed 0)');
    await browser.close();
    return;
  }

  await page.waitForTimeout(1500);
  await shot(page, '03-dialog-open');

  // Click the close (X) inside closed shadow via _shadow reference
  const closeResult = await page.evaluate(() => {
    const Shell = customElements.get('safari-shell');
    const shell = Shell?.activeShells?.[0];
    if (!shell) return { ok: false, reason: 'no shell' };

    const shadow = shell._shadow || shell.shadowRoot;
    if (!shadow) return { ok: false, reason: 'no shadow', keys: Object.keys(shell) };

    const all = Array.from(shadow.querySelectorAll('button, a, [role="button"], svg, span, div, i'));
    const candidates = all.map((el) => ({
      tag: el.tagName,
      text: (el.textContent || '').trim().slice(0, 30),
      aria: el.getAttribute('aria-label'),
      cls: String(el.className).slice(0, 50),
    }));

    // Prefer explicit close
    let clicked = null;
    for (const el of all) {
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      const cls = String(el.className || '').toLowerCase();
      const txt = (el.textContent || '').trim().toLowerCase();
      if (
        aria.includes('close') || cls.includes('close') ||
        txt === '×' || txt === '✕' || txt === 'x' ||
        cls.includes('cancel') || aria.includes('cancel')
      ) {
        el.click();
        clicked = { aria, cls, txt: txt.slice(0, 20) };
        break;
      }
    }

    // Fallback: last small button-like in header area
    if (!clicked) {
      const buttons = Array.from(shadow.querySelectorAll('button'));
      if (buttons.length) {
        const last = buttons[buttons.length - 1];
        last.click();
        clicked = { fallback: true, text: (last.textContent || '').slice(0, 20) };
      }
    }

    return { ok: true, clicked, candidateCount: candidates.length, candidates: candidates.slice(0, 25) };
  });
  console.log('Close result:', JSON.stringify(closeResult, null, 2));

  await page.waitForTimeout(1000);
  await shot(page, '04-after-x-click');
  await state(page, 'AFTER X');

  // Watch for reload up to 10s
  let reloaded = false;
  let shellsGone = false;
  const start = Date.now();
  while (Date.now() - start < 10000) {
    await page.waitForTimeout(500);
    try {
      const s = await state(page, 'watch');
      if (s.activeShells === 0) shellsGone = true;
      if (s.activeShells === 0 && !s.hasBlurClass) break;
    } catch {
      reloaded = true;
      break;
    }
  }

  let final = null;
  try {
    await shot(page, '05-final');
    final = await state(page, 'FINAL');
  } catch {
    reloaded = true;
  }

  console.log('\n===== SUMMARY =====');
  console.log('Dialog opened (activeShells):', opened);
  console.log('Shells gone after X:', shellsGone);
  console.log('Page reloaded:', reloaded);
  console.log('Final blur:', final?.hasBlurClass);
  console.log('Final activeShells:', final?.activeShells);
  console.log('Screenshots:', OUT);

  await browser.close();
})().catch((e) => {
  console.error('TEST FAILED:', e);
  process.exit(1);
});
