// Generates 10 logo variants + a contact sheet into logo-concepts/.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
mkdirSync(dir, { recursive: true });

const INK = '#0F284D';
const AMBER = '#F2A618';

const variants = [
  {
    id: 'v01', name: 'Вложенные V + Y', note: 'Широкая V и вложенная Y с общей вертикалью. Текущий знак.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M30 30 L60 82 L90 30"/><path d="M38 30 L60 58 L82 30"/><path d="M60 58 L60 100"/>`
  },
  {
    id: 'v02', name: 'Сквозная вертикаль', note: 'V, пронзённая вертикалью Y насквозь — явное пересечение.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M30 40 L60 76 L90 40"/><path d="M60 20 L60 104"/>`
  },
  {
    id: 'v03', name: 'Диагональный крест', note: 'V пересечена диагональной ножкой Y — динамика, движение.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M32 30 L60 82 L88 30"/><path d="M82 24 L42 98"/>`
  },
  {
    id: 'v04', name: 'Дуотон V + Y', note: 'Белая V и янтарная ножка Y — два акцента, сигнальный цвет.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M30 36 L60 76 L90 36" stroke="#fff"/><path d="M60 26 L60 100" stroke="${AMBER}"/>`
  },
  {
    id: 'v05', name: 'Двойной шеврон', note: 'Глубокая V + мелкая V + ножка — знак читается как Y и V сразу.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M28 28 L60 86 L92 28"/><path d="M38 28 L60 56 L82 28"/><path d="M60 56 L60 104"/>`
  },
  {
    id: 'v06', name: 'Плотный монограмм', note: 'Те же Y и V, но тяжёлой толщиной — «солидный» знак для малых размеров.',
    tile: (g) => `<rect width="120" height="120" rx="22" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M32 30 L60 80 L88 30"/><path d="M42 30 L60 52 L78 30"/><path d="M60 52 L60 98"/>`
  },
  {
    id: 'v07', name: 'Наклонный знак', note: 'Тот же монограмм с наклоном −12° — динамика, «итальянский» курсив.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<g transform="rotate(-12 60 60)"><path d="M30 30 L60 82 L90 30"/><path d="M38 30 L60 58 L82 30"/><path d="M60 58 L60 100"/></g>`
  },
  {
    id: 'v08', name: 'Ломаная ножка', note: 'V с ножкой, уходящей по диагонали — характер и наклон.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M30 34 L60 80 L90 34"/><path d="M60 26 L60 80 L84 102"/>`
  },
  {
    id: 'v09', name: 'Круглый знак', note: 'Тот же монограмм на круге — вариант для аватара приложения.',
    tile: (g) => `<circle cx="60" cy="60" r="60" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M30 30 L60 82 L90 30"/><path d="M38 30 L60 58 L82 30"/><path d="M60 58 L60 100"/>`
  },
  {
    id: 'v10', name: 'Открытая V', note: 'V с разрывом у вершины и сквозной ножкой — современный, воздушный Y.',
    tile: (g) => `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${g}</g>`,
    g: `<path d="M30 30 L56 78"/><path d="M90 30 L64 78"/><path d="M60 22 L60 102"/>`
  }
];

for (const v of variants) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="УрФУ — ${v.name}">\n  ${v.tile(v.g)}\n</svg>\n`;
  writeFileSync(join(dir, v.id + '.svg'), svg, 'utf8');
}

const darkGlyph = (v) => v.tile(v.g);

const cards = variants.map((v) => `
  <article class="card">
    <div class="stage">
      <img src="${v.id}.svg" alt="Вариант ${v.id}: ${v.name}" width="120" height="120">
      <div class="sizes">
        <img src="${v.id}.svg" alt="" width="40" height="40">
        <img src="${v.id}.svg" alt="" width="24" height="24">
        <span class="fav" style="width:16px;height:16px"></span>
      </div>
    </div>
    <h3>${v.id} · ${v.name}</h3>
    <p>${v.note}</p>
  </article>`).join('\n');

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>УрФУ — 10 вариантов логотипа</title>
<style>
  :root { --ink:#0F284D; --paper:#F2F6FB; --line:#D9DEE6; --muted:#495362; --brand:#2466C3; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--paper); color:#101B2B; font:16px/1.5 "Golos Text", system-ui, sans-serif; }
  .wrap { max-width:1120px; margin-inline:auto; padding:48px 24px 80px; }
  h1 { font-family:"Onest",sans-serif; font-weight:800; font-size:clamp(1.75rem,3vw,2.5rem); letter-spacing:-.02em; margin:0 0 8px; }
  .lede { color:var(--muted); max-width:60ch; margin:0 0 40px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
  .card { background:#fff; border:1px solid var(--line); border-radius:16px; padding:20px; }
  .stage { display:flex; align-items:center; gap:20px; }
  .stage > img:first-child { border-radius:26px; }
  .sizes { display:flex; align-items:flex-end; gap:14px; }
  .sizes img { border-radius:8px; }
  .sizes .fav { display:inline-block; border-radius:4px; background:var(--ink); position:relative; }
  .sizes .fav::after { content:""; position:absolute; inset:3px; border:2px solid #fff; border-radius:2px; opacity:.9; }
  h3 { font-family:"Onest",sans-serif; font-size:1rem; margin:18px 0 4px; }
  p { margin:0; color:var(--muted); font-size:.9rem; }
  .inverse { margin-top:56px; }
  .inverse-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:16px; background:var(--ink); border-radius:16px; padding:24px; }
  .inverse-grid img { border-radius:26px; }
  .foot { margin-top:40px; color:var(--muted); font-size:.85rem; }
</style>
</head>
<body>
  <div class="wrap">
    <h1>Логотип УрФУ — 10 вариантов</h1>
    <p class="lede">Единый мотив: скрещённые <strong>Y</strong> и <strong>V</strong>, монолинейная геометрия, палитра проекта (глубокий синий + янтарный акцент). Каждый вариант показан в реальных размерах (120 / 40 / 24 / 16&nbsp;px) и на тёмном фоне.</p>
    <div class="grid">
${cards}
    </div>

    <div class="inverse">
      <h3 style="margin-bottom:14px">Инверсия (для тёмных фонов)</h3>
      <div class="inverse-grid">
        ${variants.map((v) => `<img src="${v.id}.svg" alt="${v.id}" width="120" height="120">`).join('\n        ')}
      </div>
    </div>

    <p class="foot">Файлы: <code>v01.svg … v10.svg</code> в этой папке. Все знаки — оригинальные предложения проекта (образец).</p>
  </div>
</body>
</html>
`;
writeFileSync(join(dir, 'index.html'), html, 'utf8');
console.log('Wrote 10 SVGs + index.html to logo-concepts/');
