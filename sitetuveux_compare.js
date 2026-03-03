const { chromium } = require('playwright');

const targets = [
  { name: 'live', url: 'https://www.sitetuveux.com/' },
  { name: 'local', url: 'http://localhost:8080/' }
];

async function extract(page) {
  return await page.evaluate(() => {
    const qs = (s) => document.querySelector(s);
    const qsa = (s) => Array.from(document.querySelectorAll(s));
    const pick = (...sels) => sels.map(qs).find(Boolean) || null;

    const navLinks = qsa('header nav a, .nav-list a').map((a) => {
      const cs = getComputedStyle(a);
      return { text: a.textContent.trim(), fs: cs.fontSize, ff: cs.fontFamily, fst: cs.fontStyle, fw: cs.fontWeight };
    });

    const title = pick('.hero-title', 'h1');
    const subtitle = pick('.hero-subtitle', '.hero p', 'p');
    const tags = qsa('.tag-list li').map((el) => {
      const cs = getComputedStyle(el);
      return { text: el.textContent.trim(), fs: cs.fontSize, ff: cs.fontFamily, fst: cs.fontStyle, lh: cs.lineHeight };
    });
    const logo = pick('.home-logo img', 'img[alt*="Site tu veux"]', 'img[alt*="site tu veux"]');
    const hero = pick('.hero', 'section');

    const bodyCs = getComputedStyle(document.body);
    const heroCs = hero ? getComputedStyle(hero) : null;
    const titleCs = title ? getComputedStyle(title) : null;
    const subCs = subtitle ? getComputedStyle(subtitle) : null;

    return {
      title: document.title,
      bodyBg: bodyCs.backgroundColor,
      bodyFont: bodyCs.fontFamily,
      navLinks,
      logo: logo
        ? {
            src: logo.getAttribute('src') || '',
            w: getComputedStyle(logo).width,
            h: getComputedStyle(logo).height,
          }
        : null,
      hero: heroCs
        ? {
            display: heroCs.display,
            cols: heroCs.gridTemplateColumns,
            minHeight: heroCs.minHeight,
            bg: heroCs.backgroundColor,
          }
        : null,
      heroTitle: title
        ? {
            text: title.textContent.trim(),
            fs: titleCs.fontSize,
            ff: titleCs.fontFamily,
            fst: titleCs.fontStyle,
            fw: titleCs.fontWeight,
            lh: titleCs.lineHeight,
            color: titleCs.color,
          }
        : null,
      heroSubtitle: subtitle
        ? {
            text: subtitle.textContent.trim().slice(0, 180),
            fs: subCs.fontSize,
            ff: subCs.fontFamily,
            fst: subCs.fontStyle,
            fw: subCs.fontWeight,
            color: subCs.color,
          }
        : null,
      tags,
    };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const t of targets) {
    const page = await browser.newPage({ viewport: { width: 1510, height: 982 } });
    await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `/tmp/${t.name}-home.png`, fullPage: true });
    results[t.name] = await extract(page);
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
