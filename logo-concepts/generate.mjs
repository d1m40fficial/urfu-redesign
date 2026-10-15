// Generates 20 logo variants + a contact sheet into logo-concepts/.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
mkdirSync(dir, { recursive: true });

const INK = '#0F284D';
const AMBER = '#F2A618';
const BLUE = '#7CB0FF';
const LIGHT = '#F2F6FB';

// Square tile + monoline glyph. `w` = stroke weight, `cap` = linecap.
const sq = (g, w = 11, cap = 'round', rx = 26) =>
  `<rect width="120" height="120" rx="${rx}" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round">${g}</g>`;

// Nested V + Y (the recurring motif).
const NESTED = `<path d="M30 30 L60 82 L90 30"/><path d="M38 30 L60 58 L82 30"/><path d="M60 58 L60 100"/>`;

const variants = [
  { id: 'v01', name: 'Вложенные V + Y', note: 'Широкая V и вложенная Y с общей вертикалью. Текущий знак.', body: sq(NESTED) },
  { id: 'v02', name: 'Сквозная вертикаль', note: 'V, пронзённая вертикалью Y насквозь — явное пересечение.', body: sq(`<path d="M30 40 L60 76 L90 40"/><path d="M60 20 L60 104"/>`) },
  { id: 'v03', name: 'Диагональный крест', note: 'V пересечена диагональной ножкой Y — динамика, движение.', body: sq(`<path d="M32 30 L60 82 L88 30"/><path d="M82 24 L42 98"/>`) },
  { id: 'v04', name: 'Дуотон V + Y', note: 'Белая V и янтарная ножка Y — два акцента, сигнальный цвет.', body: `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"><path d="M30 36 L60 76 L90 36" stroke="#fff"/><path d="M60 26 L60 100" stroke="${AMBER}"/></g>` },
  { id: 'v05', name: 'Двойной шеврон', note: 'Глубокая V + мелкая V + ножка — знак читается как Y и V сразу.', body: sq(`<path d="M28 28 L60 86 L92 28"/><path d="M38 28 L60 56 L82 28"/><path d="M60 56 L60 104"/>`) },
  { id: 'v06', name: 'Плотный монограмм', note: 'Те же Y и V, но тяжёлой толщиной — «солидный» знак для малых размеров.', body: sq(`<path d="M32 30 L60 80 L88 30"/><path d="M42 30 L60 52 L78 30"/><path d="M60 52 L60 98"/>`, 13, 'round', 22) },
  { id: 'v07', name: 'Наклонный знак', note: 'Монограмм с наклоном −12° — динамика, «итальянский» курсив.', body: sq(`<g transform="rotate(-12 60 60)">${NESTED}</g>`) },
  { id: 'v08', name: 'Ломаная ножка', note: 'V с ножкой, уходящей по диагонали — характер и наклон.', body: sq(`<path d="M30 34 L60 80 L90 34"/><path d="M60 26 L60 80 L84 102"/>`) },
  { id: 'v09', name: 'Круглый знак', note: 'Тот же монограмм на круге — вариант для аватара приложения.', body: `<circle cx="60" cy="60" r="60" fill="${INK}"/><g fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${NESTED}</g>` },
  { id: 'v10', name: 'Открытая V', note: 'V с разрывом у вершины и сквозной ножкой — современный, воздушный Y.', body: sq(`<path d="M30 30 L56 78"/><path d="M90 30 L64 78"/><path d="M60 22 L60 102"/>`) },

  { id: 'v11', name: 'Компас', note: 'V и сквозная меридиана с янтарной перекладиной — «точка отсчёта».', body: `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"><path d="M30 40 L60 80 L90 40" stroke="#fff"/><path d="M60 20 L60 104" stroke="#fff"/><path d="M38 62 L82 62" stroke="${AMBER}"/></g>` },
  { id: 'v12', name: 'Двойной крест', note: 'Две скрещённые диагонали плюс ножка — решительный, техничный.', body: sq(`<path d="M30 28 L90 92"/><path d="M90 28 L30 92"/><path d="M60 60 L60 104"/>`) },
  { id: 'v13', name: 'Негатив', note: 'Тёмный монограмм на светлой плашке — версия для светлых интерфейсов.', body: `<rect width="120" height="120" rx="26" fill="${LIGHT}"/><rect x="3" y="3" width="114" height="114" rx="23" fill="none" stroke="${INK}" stroke-width="4"/><g fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${NESTED}</g>` },
  { id: 'v14', name: 'Асимметрия', note: 'Асимметричная V со смещённой ножкой — знак-«птица», движение.', body: sq(`<path d="M28 38 L58 82 L92 30"/><path d="M58 82 L58 104"/>`) },
  { id: 'v15', name: 'Диагональ 45°', note: 'Монограмм, повёрнутый на 45° — почти геральдический ромб.', body: sq(`<g transform="rotate(45 60 60)">${NESTED}</g>`) },
  { id: 'v16', name: 'Y с перекладиной', note: 'V, сквозная ножка и перекладина (мотив знака «¥») — финансово-цифровой.', body: sq(`<path d="M30 40 L60 78 L90 40"/><path d="M60 24 L60 104"/><path d="M42 62 L78 62"/>`) },
  { id: 'v17', name: 'Тонкий', note: 'Облегчённая моно-линия (вес 5) — точный, технический.', body: sq(NESTED, 5, 'round') },
  { id: 'v18', name: 'Мягкий', note: 'Тяжёлые округлые штрихи (вес 16) — дружелюбный, «плюшевый».', body: sq(`<path d="M34 34 L60 78 L86 34"/><path d="M42 34 L60 54 L78 34"/><path d="M60 54 L60 96"/>`, 16, 'round') },
  { id: 'v19', name: 'Печать', note: 'Монограмм в тонком кольце — печать/гербовая подача.', body: `<circle cx="60" cy="60" r="58" fill="${INK}"/><circle cx="60" cy="60" r="49" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/><g fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M32 34 L60 78 L88 34"/><path d="M40 34 L60 56 L80 34"/><path d="M60 56 L60 96"/></g>` },
  { id: 'v20', name: 'Монограмм YV', note: 'Две буквы рядом в компактной связке — читаются как инициалы Y и V.', body: sq(`<path d="M16 30 L36 56 L56 30"/><path d="M36 56 L36 96"/><path d="M64 30 L80 96 L96 30"/>`, 9) },

  { id: 'v21', name: 'Дуотон · прямые', note: 'Скрещено 4 + 6: плотная белая V и янтарная ножка, прямые торцы (butt).', body: `<rect width="120" height="120" rx="24" fill="${INK}"/><g fill="none" stroke-linejoin="miter"><path d="M30 40 L60 80 L90 40" stroke="#fff" stroke-width="15" stroke-linecap="butt"/><path d="M60 24 L60 100" stroke="${AMBER}" stroke-width="15" stroke-linecap="butt"/></g>` },
  { id: 'v22', name: 'Ломаная ножка · дуотон', note: 'Скрещено 4 + 8: белая V и янтарная ломаная ножка, круглые торцы.', body: `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-linejoin="round"><path d="M30 34 L60 78 L90 34" stroke="#fff" stroke-width="11" stroke-linecap="round"/><path d="M60 24 L60 78 L84 100" stroke="${AMBER}" stroke-width="11" stroke-linecap="round"/></g>` },
  { id: 'v23', name: 'Асимметрия · мягкая', note: 'Скрещено 14 + 4 + 18: мягкая асимметричная V и янтарная ножка, круглые.', body: `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-linejoin="round"><path d="M28 38 L58 82 L92 30" stroke="#fff" stroke-width="16" stroke-linecap="round"/><path d="M58 82 L58 106" stroke="${AMBER}" stroke-width="16" stroke-linecap="round"/></g>` },
  { id: 'v24', name: 'Печать · дуотон', note: 'Скрещено 19 + 4: кольцо-печать, белая V и янтарная ножка.', body: `<circle cx="60" cy="60" r="58" fill="${INK}"/><circle cx="60" cy="60" r="49" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/><g fill="none" stroke-linejoin="round"><path d="M32 34 L60 78 L88 34" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M60 26 L60 96" stroke="${AMBER}" stroke-width="10" stroke-linecap="round"/></g>` },
  { id: 'v25', name: 'Печать · три цвета', note: 'Скрещено 19 + 6: кольцо, синяя V, белая вложенная, янтарная ножка, прямые торцы.', body: `<circle cx="60" cy="60" r="58" fill="${INK}"/><circle cx="60" cy="60" r="49" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/><g fill="none" stroke-linejoin="miter"><path d="M32 32 L60 78 L88 32" stroke="${BLUE}" stroke-width="12" stroke-linecap="butt"/><path d="M40 32 L60 54 L80 32" stroke="#fff" stroke-width="12" stroke-linecap="butt"/><path d="M60 54 L60 96" stroke="${AMBER}" stroke-width="12" stroke-linecap="butt"/></g>` },
  { id: 'v26', name: 'Плотный · ломаная', note: 'Скрещено 6 + 8: тяжёлая V и янтарная ломаная ножка, прямые торцы.', body: `<rect width="120" height="120" rx="22" fill="${INK}"/><g fill="none" stroke-linejoin="miter"><path d="M30 36 L60 80 L90 36" stroke="#fff" stroke-width="15" stroke-linecap="butt"/><path d="M60 26 L60 80 L84 102" stroke="${AMBER}" stroke-width="15" stroke-linecap="butt"/></g>` },
  { id: 'v27', name: 'Мягкий · дуотон', note: 'Скрещено 18 + 4 + 6: толстая округлая V + вложенная, янтарная ножка, круглые.', body: `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-linejoin="round"><path d="M34 34 L60 78 L86 34" stroke="#fff" stroke-width="15" stroke-linecap="round"/><path d="M43 34 L60 54 L77 34" stroke="#fff" stroke-width="15" stroke-linecap="round"/><path d="M60 54 L60 96" stroke="${AMBER}" stroke-width="15" stroke-linecap="round"/></g>` },
  { id: 'v28', name: 'Асимметрия · прямые', note: 'Скрещено 14 + 8 + 4: асимметричная V и янтарная ломаная ножка, прямые торцы.', body: `<rect width="120" height="120" rx="24" fill="${INK}"/><g fill="none" stroke-linejoin="miter"><path d="M28 38 L58 82 L92 30" stroke="#fff" stroke-width="12" stroke-linecap="butt"/><path d="M58 82 L58 106" stroke="${AMBER}" stroke-width="12" stroke-linecap="butt"/></g>` },
  { id: 'v29', name: 'Плотный · дуотон', note: 'Скрещено 6 + 4: плотная вложенная монограмма, белая V и янтарная ножка, прямые торцы.', body: `<rect width="120" height="120" rx="22" fill="${INK}"/><g fill="none" stroke-linejoin="miter"><path d="M32 30 L60 80 L88 30" stroke="#fff" stroke-width="13" stroke-linecap="butt"/><path d="M42 30 L60 52 L78 30" stroke="#fff" stroke-width="13" stroke-linecap="butt"/><path d="M60 52 L60 98" stroke="${AMBER}" stroke-width="13" stroke-linecap="butt"/></g>` },
  { id: 'v30', name: 'Круг + прямая', note: 'Смешанные торцы: белая V с круглыми концами и янтарная ножка с прямыми.', body: `<rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-linejoin="round"><path d="M30 40 L60 80 L90 40" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path d="M60 24 L60 104" stroke="${AMBER}" stroke-width="13" stroke-linecap="butt"/></g>` },

  { id: 'v31', name: 'v23 × v25 · градиент', note: 'Форма v23 (асимметричная V + ножка), зазоры между линиями, общий диагональный градиент синий → белый → янтарь.', body: `<defs><linearGradient id="g31" gradientUnits="userSpaceOnUse" x1="26" y1="28" x2="94" y2="108"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g31)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M58 84 L58 112"/></g>` },
  { id: 'v32', name: 'v23 × v25 · по линиям', note: 'Форма v23 с зазорами; у каждой линии свой градиент: синий→белый, белый→янтарь, синий→янтарь.', body: `<defs><linearGradient id="g32a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient><linearGradient id="g32b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient><linearGradient id="g32c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77" stroke="url(#g32a)"/><path d="M93 31 L62 77" stroke="url(#g32b)"/><path d="M58 84 L58 112" stroke="url(#g32c)"/></g>` },
  { id: 'v33', name: 'v23 × v25 · прямые', note: 'Как v31, но с прямыми торцами: форма v23, трёхцветный градиент, зазоры.', body: `<defs><linearGradient id="g33" gradientUnits="userSpaceOnUse" x1="26" y1="28" x2="94" y2="108"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="24" fill="${INK}"/><g fill="none" stroke="url(#g33)" stroke-width="14" stroke-linecap="butt" stroke-linejoin="miter"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M58 84 L58 112"/></g>` },
  { id: 'v34', name: 'v23 × v25 · единый градиент', note: 'Форма v23, зазоры; каждая линия несёт один и тот же градиент синий → белый → янтарь вдоль своей длины.', body: `<defs><linearGradient id="g34" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g34)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M58 84 L58 112"/></g>` },
  { id: 'v35', name: 'v34 + двойная ножка', note: 'База — v34; снизу добавлена вторая ножка параллельно первой (две линии внизу).', body: `<defs><linearGradient id="g35" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g35)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M53 84 L53 114"/><path d="M65 83 L65 113"/></g>` },
  { id: 'v36', name: 'v34 + основание', note: 'База — v34; снизу добавлена горизонтальная линия-основание под всей фигурой.', body: `<defs><linearGradient id="g36" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g36)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M58 84 L58 106"/><path d="M38 114 L78 114"/></g>` },
  { id: 'v37', name: 'v34 + двойное основание', note: 'База — v34; снизу добавлены две горизонтальные линии-основания (мотив «=»).', body: `<defs><linearGradient id="g37" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g37)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M58 84 L58 100"/><path d="M40 108 L76 108"/><path d="M40 118 L76 118"/></g>` },
  { id: 'v38', name: 'v34 + продолжение правой', note: 'База — v34; нижняя линия — продолжение правой линии галочки по её направлению, с небольшим зазором.', body: `<defs><linearGradient id="g38" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g38)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M57.5 84 L43 105"/></g>` },
  { id: 'v39', name: 'v34 + длинное продолжение', note: 'Как v38, но продолжение длиннее — уходит ниже к краю.', body: `<defs><linearGradient id="g39" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g39)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M56 85 L38 112"/></g>` },
  { id: 'v40', name: 'v34 + продолжение · зазор', note: 'Как v38, но зазор между галочкой и продолжением больше.', body: `<defs><linearGradient id="g40" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="0.5" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke="url(#g40)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 L54 77"/><path d="M93 31 L62 77"/><path d="M54 88 L41 108"/></g>` },
  { id: 'v41', name: 'v40 · две нижние линии', note: 'База v40: левая верхняя — поверх правой верхней; левая нижняя — поверх всех. Снизу две линии: продолжение правой (влево-вниз) и продолжение левой (вправо-вниз) с разными градиентами.', body: `<defs><linearGradient id="g41a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient><linearGradient id="g41b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient><linearGradient id="g41c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${AMBER}"/><stop offset="1" stop-color="${BLUE}"/></linearGradient><linearGradient id="g41d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="${AMBER}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M94 30 L64 74" stroke="url(#g41b)"/><path d="M26 38 L56 74" stroke="url(#g41a)"/><path d="M61 80 L80.5 103" stroke="url(#g41d)"/><path d="M59.5 80.5 L42.5 105.5" stroke="url(#g41c)"/></g>` },
  { id: 'v42', name: 'v40 · две нижние линии (симм.)', note: 'Как v41, но симметричнее: две нижние линии расходятся вниз из-под галочки, у каждой свой градиент; левые линии сверху.', body: `<defs><linearGradient id="g42a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient><linearGradient id="g42b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient><linearGradient id="g42c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${AMBER}"/><stop offset="1" stop-color="${BLUE}"/></linearGradient><linearGradient id="g42d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M90 34 L63 72" stroke="url(#g42b)"/><path d="M30 34 L57 72" stroke="url(#g42a)"/><path d="M64 80 L82 108" stroke="url(#g42d)"/><path d="M56 80 L38 108" stroke="url(#g42c)"/></g>` },
  { id: 'v43', name: 'v40 · плетение (наложение)', note: 'Четыре линии сходятся в центре с наложением: правая верхняя и правая нижняя — под левыми; левая верхняя поверх правой верхней, левая нижняя — поверх всех. У нижних линий разные градиенты.', body: `<defs><linearGradient id="g43a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${AMBER}"/></linearGradient><linearGradient id="g43b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient><linearGradient id="g43c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="${AMBER}"/></linearGradient><linearGradient id="g43d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${AMBER}"/><stop offset="1" stop-color="${BLUE}"/></linearGradient></defs><rect width="120" height="120" rx="26" fill="${INK}"/><g fill="none" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M94 30 L57 80" stroke="url(#g43a)"/><path d="M26 36 L63 80" stroke="url(#g43b)"/><path d="M63 80 L82 106" stroke="url(#g43c)"/><path d="M57 80 L38 106" stroke="url(#g43d)"/></g>` }
];

for (const v of variants) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="УрФУ — ${v.name}">\n  ${v.body}\n</svg>\n`;
  writeFileSync(join(dir, v.id + '.svg'), svg, 'utf8');
}

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
<title>УрФУ — варианты логотипа</title>
<style>
  :root { --ink:#0F284D; --paper:#F2F6FB; --line:#D9DEE6; --muted:#495362; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--paper); color:#101B2B; font:16px/1.5 "Golos Text", system-ui, sans-serif; }
  .wrap { max-width:1120px; margin-inline:auto; padding:48px 24px 80px; }
  h1 { font-family:"Onest",sans-serif; font-weight:800; font-size:clamp(1.75rem,3vw,2.5rem); letter-spacing:-.02em; margin:0 0 8px; }
  .lede { color:var(--muted); max-width:62ch; margin:0 0 40px; }
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
  .inverse h3 { font-size:1rem; margin:0 0 14px; }
  .inverse-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:16px; background:var(--ink); border-radius:16px; padding:24px; }
  .inverse-grid img { border-radius:26px; }
  .foot { margin-top:40px; color:var(--muted); font-size:.85rem; }
</style>
</head>
<body>
  <div class="wrap">
    <h1>Логотип УрФУ — ${variants.length} вариантов</h1>
    <p class="lede">Единый мотив: скрещённые <strong>Y</strong> и <strong>V</strong>, монолинейная геометрия, палитра проекта (глубокий синий + янтарный акцент). Каждый вариант показан в реальных размерах (120 / 40 / 24 / 16&nbsp;px) и в инверсии на тёмном фоне.</p>
    <div class="grid">
${cards}
    </div>

    <div class="inverse">
      <h3>Инверсия (для тёмных фонов)</h3>
      <div class="inverse-grid">
        ${variants.map((v) => `<img src="${v.id}.svg" alt="${v.id} · ${v.name}" width="120" height="120">`).join('\n        ')}
      </div>
    </div>

    <p class="foot">Файлы: <code>v01.svg … v${String(variants.length).padStart(2, '0')}.svg</code> в этой папке. Все знаки — оригинальные предложения проекта (образец).</p>
  </div>
</body>
</html>
`;
writeFileSync(join(dir, 'index.html'), html, 'utf8');
console.log(`Wrote ${variants.length} SVGs + index.html to logo-concepts/`);
