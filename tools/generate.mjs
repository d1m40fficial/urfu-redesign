// Dev-only generator: derives every page from index.html's canonical chrome.
// Output is committed to prototype/ so the site stays buildless.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', 'prototype');
const src = readFileSync(join(root, 'index.html'), 'utf8');
const mainStart = src.indexOf('<main id="main">');
const mainEnd = src.indexOf('</main>');
if (mainStart < 0 || mainEnd < 0) throw new Error('index.html chrome markers not found');
const chromeTop = src.slice(0, mainStart);
const chromeBottom = src.slice(mainEnd + '</main>'.length);

const BC = (items) => `<nav class="container-wide" aria-label="Хлебные крошки"><ol class="breadcrumb">${items
  .map((it, i) => (i === items.length - 1
    ? `<li aria-current="page">${it.label}</li>`
    : `<li><a href="${it.href}">${it.label}</a></li>`)).join('')}</ol></nav>`;

const pages = [
  {
    file: 'admissions.html', title: 'Поступление — УрФУ', nav: 'admissions.html',
    desc: 'Как поступить в УрФУ: программы, сроки, документы, стоимость и этапы приёмной кампании 2026.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Поступление' }])}
  <section class="pagehead">
    <div class="container-wide">
      <div class="pagehead__grid">
        <div>
          <span class="label">Приёмная кампания 2026</span>
          <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">Поступление в УрФУ</h1>
          <p class="lead mt-lg prose">Пять понятных шагов от выбора программы до зачисления. Ниже — сроки, документы и правила. Данные приведены как образец.</p>
          <div class="hero__cta">
            <a class="btn" href="#steps">Смотреть шаги</a>
            <a class="btn btn--ghost" href="programs.html">Выбрать программу</a>
          </div>
        </div>
        <dl class="factbox" aria-label="Ключевые даты">
          <div class="factbox__row"><dt>Начало приёма документов</dt><dd class="mono">20.06</dd></div>
          <div class="factbox__row"><dt>Завершение приёма</dt><dd class="mono">25.07</dd></div>
          <div class="factbox__row"><dt>Вступительные испытания</dt><dd class="mono">10–25.07</dd></div>
          <div class="factbox__row"><dt>Согласие на зачисление</dt><dd class="mono">до 28.07</dd></div>
          <div class="factbox__row"><dt>Приёмная комиссия</dt><dd><a href="contacts.html">Мира, 19</a></dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section section--paper" id="steps" aria-labelledby="steps-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Этапы</span><h2 id="steps-h">Как поступить, шаг за шагом</h2></div></div>
      <div class="steps">
        <article class="step is-current"><span class="step__num" aria-hidden="true">1</span><div class="step__body"><h3>Выбрать программу</h3><p>Определитесь с направлением и формой обучения. Проверьте предметы ЕГЭ в карточке программы.</p><p><a class="link-arrow" href="programs.html">Открыть каталог <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></p></div></article>
        <article class="step"><span class="step__num" aria-hidden="true">2</span><div class="step__body"><h3>Собрать документы</h3><p>Паспорт, аттестат, результаты ЕГЭ, фотографии. Для отдельных категорий — подтверждающие документы.</p><span class="deadline"><span class="mono">до 25.07</span></span></div></article>
        <article class="step"><span class="step__num" aria-hidden="true">3</span><div class="step__body"><h3>Подать заявление</h3><p>Через Госуслуги, лично в приёмной комиссии или по почте. Можно подать на несколько программ.</p><a class="link-arrow" href="admissions.html">Подать через Госуслуги <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div></article>
        <article class="step"><span class="step__num" aria-hidden="true">4</span><div class="step__body"><h3>Пройти испытания</h3><p>ЕГЭ или внутренние экзамены. Результаты публикуются в личном кабинете абитуриента.</p></div></article>
        <article class="step"><span class="step__num" aria-hidden="true">5</span><div class="step__body"><h3>Подтвердить и зачислиться</h3><p>Следите за рейтингом, принесите оригинал аттестата и подайте согласие на зачисление.</p></div></article>
      </div>
    </div>
  </section>

  <section class="section section--canvas" aria-labelledby="who-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Основания</span><h2 id="who-h">Как можно поступить</h2></div></div>
      <div class="grid grid-3">
        <article class="card"><div class="card__body"><span class="tag">По ЕГЭ</span><span class="card__title mt-lg">По результатам ЕГЭ</span><span class="card__text">Основной путь для выпускников школ. Нужны действующие результаты по профильным предметам.</span></div></article>
        <article class="card"><div class="card__body"><span class="tag">Экзамены</span><span class="card__title mt-lg">По внутренним испытаниям</span><span class="card__text">Для иностранных граждан, выпускников СПО и отдельных категорий.</span></div></article>
        <article class="card"><div class="card__body"><span class="tag tag--accent">Без экзаменов</span><span class="card__title mt-lg">По олимпиадам и льготам</span><span class="card__text">Победители олимпиад, дети участников СВО и другие особые права.</span></div></article>
      </div>
    </div>
  </section>

  <section class="section section--paper section--rule" aria-labelledby="cost-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Стоимость</span><h2 id="cost-h">Стоимость обучения 2026</h2><p>Фрагмент. Полный перечень — в личном кабинете абитуриента.</p></div></div>
      <div class="table-wrap">
        <table class="data">
          <caption class="sr-only">Стоимость обучения по уровням, образец данных</caption>
          <thead><tr><th scope="col">Уровень</th><th scope="col">Форма</th><th scope="col" class="num">Бюджетных мест</th><th scope="col" class="num">Стоимость, ₽/год</th></tr></thead>
          <tbody>
            <tr><td>Бакалавриат</td><td>Очная</td><td class="num">1 240</td><td class="num">140 000</td></tr>
            <tr><td>Бакалавриат</td><td>Заочная</td><td class="num">310</td><td class="num">72 000</td></tr>
            <tr><td>Магистратура</td><td>Очная</td><td class="num">640</td><td class="num">158 000</td></tr>
            <tr><td>Аспирантура</td><td>Очная</td><td class="num">220</td><td class="num">162 000</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section section--canvas" aria-labelledby="faq-h">
    <div class="container">
      <div class="split">
        <div><span class="label">Вопросы</span><h2 id="faq-h" class="mt-lg">Частые вопросы</h2><p class="lead mt-lg">Не нашли ответ? <a href="contacts.html">Напишите приёмной комиссии</a>.</p></div>
        <div>
          <details class="acc" open><summary>Сколько программ можно указать в заявлении?</summary><div class="acc__body">До пяти направлений в одном вузе. Рекомендуем распределить их по приоритету.</div></details>
          <details class="acc"><summary>Нужно ли приезжать лично?</summary><div class="acc__body">Нет, документы можно подать через Госуслуги. Оригинал приносится только на этапе подтверждения.</div></details>
          <details class="acc"><summary>Как учитываются индивидуальные достижения?</summary><div class="acc__body">За них начисляются дополнительные баллы — до 10. Перечень достижений опубликован в правилах приёма.</div></details>
          <details class="acc"><summary>Есть ли общежитие для иногородних?</summary><div class="acc__body">Да, места предоставляются по рейтингу. Подробности — в разделе «Студентам».</div></details>
        </div>
      </div>
    </div>
  </section>`
  },
  {
    file: 'programs.html', title: 'Каталог программ — УрФУ', nav: 'programs.html',
    desc: 'Каталог образовательных программ УрФУ: фильтры по уровню, институту и форме обучения.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Образование', href: 'programs.html' }, { label: 'Каталог программ' }])}
  <section class="pagehead">
    <div class="container-wide">
      <span class="label">Образование</span>
      <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">Каталог программ</h1>
      <p class="lead mt-lg prose">Найдите программу по интересам, уровню и форме обучения. Данные — образец.</p>
    </div>
  </section>

  <section class="section section--paper" data-catalogue aria-labelledby="cat-h">
    <div class="container-wide">
      <h2 id="cat-h" class="sr-only">Список программ</h2>
      <div class="split">
        <form class="filters" role="search" onsubmit="return false" aria-label="Фильтры каталога">
          <div class="field">
            <label for="f-q">Поиск</label>
            <input class="input" id="f-q" type="search" data-filter-q placeholder="Название или ключевое слово" autocomplete="off">
          </div>
          <div class="field">
            <label for="f-level">Уровень</label>
            <select class="select" id="f-level" data-filter-level>
              <option value="">Все уровни</option>
              <option value="bachelor">Бакалавриат</option>
              <option value="master">Магистратура</option>
              <option value="postgrad">Аспирантура</option>
            </select>
          </div>
          <div class="field">
            <label for="f-inst">Институт</label>
            <select class="select" id="f-inst" data-filter-institute>
              <option value="">Все институты</option>
              <option value="it">Институт радиоэлектроники и ИТ</option>
              <option value="econ">Институт экономики и управления</option>
              <option value="eng">Инженерный институт</option>
              <option value="soc">Институт социальных наук</option>
            </select>
          </div>
          <div class="field">
            <label for="f-form">Форма</label>
            <select class="select" id="f-form" data-filter-form>
              <option value="">Любая форма</option>
              <option value="full">Очная</option>
              <option value="part">Очно-заочная</option>
              <option value="ext">Заочная</option>
            </select>
          </div>
          <div class="filter-group">
            <h4>Сортировка</h4>
            <select class="select" data-sort aria-label="Сортировка">
              <option value="popular">По популярности</option>
              <option value="title">По названию</option>
              <option value="budget">По бюджетным местам</option>
            </select>
          </div>
          <p class="muted small">Показано программ: <strong data-count>0</strong></p>
        </form>

        <div>
          <div data-program-list>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Прикладная математика и информатика" data-level="bachelor" data-institute="it" data-form="full" data-budget="120" data-popularity="98">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Бакалавриат</span><span>Очная</span></span><h3 class="mt-lg">Прикладная математика и информатика</h3><p class="card__text">Институт радиоэлектроники и информационных технологий</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">120</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Программная инженерия" data-level="bachelor" data-institute="it" data-form="full" data-budget="90" data-popularity="94">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Бакалавриат</span><span>Очная</span></span><h3 class="mt-lg">Программная инженерия</h3><p class="card__text">Институт радиоэлектроники и информационных технологий</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">90</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Экономика" data-level="bachelor" data-institute="econ" data-form="full" data-budget="75" data-popularity="88">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Бакалавриат</span><span>Очная</span></span><h3 class="mt-lg">Экономика</h3><p class="card__text">Институт экономики и управления</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">75</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Теплоэнергетика и теплотехника" data-level="bachelor" data-institute="eng" data-form="full" data-budget="60" data-popularity="70">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Бакалавриат</span><span>Очная</span></span><h3 class="mt-lg">Теплоэнергетика и теплотехника</h3><p class="card__text">Инженерный институт</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">60</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Data Science и машинное обучение" data-level="master" data-institute="it" data-form="full" data-budget="45" data-popularity="96">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Магистратура</span><span>Очная</span></span><h3 class="mt-lg">Data Science и машинное обучение</h3><p class="card__text">Институт радиоэлектроники и информационных технологий</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">45</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Управление проектами" data-level="master" data-institute="econ" data-form="part" data-budget="30" data-popularity="80">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Магистратура</span><span>Очно-заочная</span></span><h3 class="mt-lg">Управление проектами</h3><p class="card__text">Институт экономики и управления</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">30</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Психология" data-level="bachelor" data-institute="soc" data-form="full" data-budget="40" data-popularity="74">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Бакалавриат</span><span>Очная</span></span><h3 class="mt-lg">Психология</h3><p class="card__text">Институт социальных наук</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">40</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Материаловедение и технологии" data-level="master" data-institute="eng" data-form="full" data-budget="28" data-popularity="62">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Магистратура</span><span>Очная</span></span><h3 class="mt-lg">Материаловедение и технологии</h3><p class="card__text">Инженерный институт</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">28</div><div class="small muted">бюджетных мест</div></div>
            </a>
            <a class="row-card mt-lg" href="program.html" data-program data-title="Физика" data-level="postgrad" data-institute="eng" data-form="full" data-budget="15" data-popularity="55">
              <div class="row-card__media" aria-hidden="true"></div>
              <div><span class="card__meta"><span class="tag">Аспирантура</span><span>Очная</span></span><h3 class="mt-lg">Физика</h3><p class="card__text">Инженерный институт</p></div>
              <div style="text-align:right"><div class="stat__num" style="font-size:1.5rem">15</div><div class="small muted">бюджетных мест</div></div>
            </a>
          </div>

          <div class="empty mt-xl" data-empty hidden>
            <h3>Ничего не найдено</h3>
            <p class="muted">Попробуйте изменить фильтры или сбросить поисковый запрос.</p>
          </div>

          <nav class="pagination" aria-label="Страницы каталога">
            <button type="button" aria-label="Предыдущая страница" disabled>‹</button>
            <button type="button" aria-current="page">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button" aria-label="Следующая страница">›</button>
          </nav>
        </div>
      </div>
    </div>
  </section>`
  },
  {
    file: 'program.html', title: 'Прикладная математика и информатика — УрФУ', nav: 'programs.html',
    desc: 'Карточка образовательной программы УрФУ: требования, учебный план, карьера.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Каталог', href: 'programs.html' }, { label: 'Прикладная математика и информатика' }])}
  <section class="pagehead">
    <div class="container-wide">
      <div class="pagehead__grid">
        <div>
          <span class="label">Бакалавриат · Институт радиоэлектроники и ИТ</span>
          <h1 class="display mt-lg" style="font-size: clamp(2rem, 1.4rem + 2.6vw, 3rem)">Прикладная математика и информатика</h1>
          <p class="lead mt-lg prose">Программа готовит специалистов по математическому моделированию и разработке ПО. Данные — образец.</p>
          <div class="chipset mt-lg"><span class="tag">Очная</span><span class="tag">4 года</span><span class="tag">ЕГЭ: математика, информатика, русский</span></div>
          <div class="hero__cta"><a class="btn" href="#">Подать документы</a><a class="btn btn--ghost" href="programs.html">Все программы</a></div>
        </div>
        <dl class="factbox" aria-label="Параметры программы">
          <div class="factbox__row"><dt>Уровень</dt><dd>Бакалавриат</dd></div>
          <div class="factbox__row"><dt>Форма</dt><dd>Очная</dd></div>
          <div class="factbox__row"><dt>Срок</dt><dd>4 года</dd></div>
          <div class="factbox__row"><dt>Бюджетных мест</dt><dd class="mono">120</dd></div>
          <div class="factbox__row"><dt>Платных мест</dt><dd class="mono">25</dd></div>
          <div class="factbox__row"><dt>Проходной балл 2025</dt><dd class="mono">258</dd></div>
          <div class="factbox__row"><dt>Язык</dt><dd>Русский, English-модули</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="container-wide">
      <div class="split">
        <div style="position:sticky; top:120px">
          <div class="tabs" role="tablist" aria-label="Разделы программы" style="flex-direction:column; overflow:visible; border:0; gap:2px">
            <button class="tab" role="tab" id="t1" aria-controls="p1" aria-selected="true" style="text-align:left">О программе</button>
            <button class="tab" role="tab" id="t2" aria-controls="p2" aria-selected="false" style="text-align:left" tabindex="-1">Учебный план</button>
            <button class="tab" role="tab" id="t3" aria-controls="p3" aria-selected="false" style="text-align:left" tabindex="-1">Требования</button>
            <button class="tab" role="tab" id="t4" aria-controls="p4" aria-selected="false" style="text-align:left" tabindex="-1">Карьера</button>
          </div>
        </div>
        <div>
          <div class="tabpanel" id="p1" role="tabpanel" aria-labelledby="t1">
            <h2>О программе</h2>
            <div class="prose mt-lg"><p>Вы научитесь строить математические модели, проектировать алгоритмы и разрабатывать программные системы. Программа сочетает фундаментальную подготовку с проектной работой в лабораториях института.</p><p>Ключевые темы: алгоритмы и структуры данных, машинное обучение, численные методы, высокопроизводительные вычисления.</p></div>
            <div class="grid grid-3 mt-xl">
              <div class="card"><div class="card__body"><span class="card__title">Проектное обучение</span><span class="card__text">Реальные задачи от индустриальных партнёров с первого курса.</span></div></div>
              <div class="card"><div class="card__body"><span class="card__title">Сильная математика</span><span class="card__text">Фундамент, который не устаревает вместе с фреймворками.</span></div></div>
              <div class="card"><div class="card__body"><span class="card__title">Гибкий трек</span><span class="card__text">Профили: ИИ и данные, системная разработка, финтех.</span></div></div>
            </div>
          </div>
          <div class="tabpanel" id="p2" role="tabpanel" aria-labelledby="t2" hidden>
            <h2>Учебный план</h2>
            <div class="table-wrap mt-lg">
              <table class="data">
                <caption class="sr-only">Ключевые дисциплины по курсам, образец</caption>
                <thead><tr><th scope="col">Курс</th><th scope="col">Дисциплины</th><th scope="col" class="num">Зач. ед.</th></tr></thead>
                <tbody>
                  <tr><td>1 курс</td><td>Математический анализ, линейная алгебра, программирование</td><td class="num">60</td></tr>
                  <tr><td>2 курс</td><td>Алгоритмы, теория вероятностей, базы данных</td><td class="num">60</td></tr>
                  <tr><td>3 курс</td><td>Машинное обучение, численные методы, проектирование систем</td><td class="num">60</td></tr>
                  <tr><td>4 курс</td><td>Спецкурсы, проектная работа, выпускная квалификация</td><td class="num">60</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tabpanel" id="p3" role="tabpanel" aria-labelledby="t3" hidden>
            <h2>Требования</h2>
            <ul class="stack mt-lg">
              <li class="flex gap-sm center"><span class="tag">ЕГЭ</span> Математика (профиль) — обязательный предмет</li>
              <li class="flex gap-sm center"><span class="tag">ЕГЭ</span> Информатика или физика — на выбор</li>
              <li class="flex gap-sm center"><span class="tag">ЕГЭ</span> Русский язык</li>
              <li class="flex gap-sm center"><span class="tag tag--accent">Доп.</span> Дипломы олимпиад и индивидуальные достижения — до 10 баллов</li>
            </ul>
          </div>
          <div class="tabpanel" id="p4" role="tabpanel" aria-labelledby="t4" hidden>
            <h2>Карьера</h2>
            <div class="prose mt-lg"><p>Выпускники работают разработчиками, аналитиками данных и исследователями в ИТ-компаниях, банках и научных центрах.</p></div>
            <div class="grid grid-3 mt-xl">
              <div class="card"><div class="card__body"><span class="label">Зарплата, от</span><div class="stat__num" style="font-size:1.75rem">80 000 ₽</div><span class="card__text">стартовые позиции, образец</span></div></div>
              <div class="card"><div class="card__body"><span class="label">Трудоустройство</span><div class="stat__num" style="font-size:1.75rem">92%</div><span class="card__text">в течение года, образец</span></div></div>
              <div class="card"><div class="card__body"><span class="label">Партнёры</span><span class="card__text">ИТ-компании и лаборатории региона.</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--canvas section--rule" aria-labelledby="similar-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><h2 id="similar-h">Похожие программы</h2></div></div>
      <div class="grid grid-3">
        <a class="card" href="program.html"><div class="card__media card__media--a" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Бакалавриат</span></span><span class="card__title">Программная инженерия</span></div></a>
        <a class="card" href="program.html"><div class="card__media card__media--b" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Магистратура</span></span><span class="card__title">Data Science и машинное обучение</span></div></a>
        <a class="card" href="program.html"><div class="card__media card__media--c" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Бакалавриат</span></span><span class="card__title">Информационная безопасность</span></div></a>
      </div>
    </div>
  </section>`
  },
  {
    file: 'news.html', title: 'Новости — УрФУ', nav: 'about.html',
    desc: 'Новости УрФУ: наука, студенческая жизнь, поступление и события. Единая лента с фильтрами.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Университет' }, { label: 'Новости' }])}
  <section class="pagehead">
    <div class="container-wide">
      <span class="label">Пульс университета</span>
      <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">Новости</h1>
      <p class="lead mt-lg prose">Одна лента вместо десятков категорий. Выберите тему — остальное уберите. Данные — образец.</p>
    </div>
  </section>

  <section class="section section--paper" data-filter-list aria-labelledby="news-h">
    <div class="container">
      <h2 id="news-h" class="sr-only">Список новостей</h2>
      <div class="chipset">
        <button class="chip" type="button" data-filter="all" aria-pressed="true">Все</button>
        <button class="chip" type="button" data-filter="science" aria-pressed="false">Наука</button>
        <button class="chip" type="button" data-filter="life" aria-pressed="false">Студенческая жизнь</button>
        <button class="chip" type="button" data-filter="admission" aria-pressed="false">Поступление</button>
        <button class="chip" type="button" data-filter="sport" aria-pressed="false">Спорт</button>
      </div>
      <p class="sr-only" role="status" data-filter-status></p>
      <div class="grid grid-3 mt-xl">
        <a class="card reveal" href="article.html" data-topic="science"><div class="card__media card__media--a" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Наука</span><span>12 октября</span></span><span class="card__title">Астрономы УрФУ научили смартфон предсказывать северное сияние</span><span class="card__text">Метод использует данные магнитометра и камеру телефона.</span></div></a>
        <a class="card reveal" href="article.html" data-topic="life"><div class="card__media card__media--c" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Студенческая жизнь</span><span>10 октября</span></span><span class="card__title">Кампус на Мира, 19: как изменится студгородок</span><span class="card__text">Новые коворкинги, лаборатории и пространства.</span></div></a>
        <a class="card reveal" href="article.html" data-topic="admission"><div class="card__media card__media--b" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Поступление</span><span>8 октября</span></span><span class="card__title">Открыта регистрация на дни открытых дверей</span><span class="card__text">Экскурсии по институтам и встречи с приёмной комиссией.</span></div></a>
        <a class="card" href="article.html" data-topic="science"><div class="card__media card__media--d" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Наука</span><span>5 октября</span></span><span class="card__title">Материаловеды получили грант на новые сплавы</span><span class="card__text">Проект по ресурсосберегающей металлургии.</span></div></a>
        <a class="card" href="article.html" data-topic="sport"><div class="card__media card__media--a" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Спорт</span><span>3 октября</span></span><span class="card__title">Сборная УрФУ выиграла универсиаду Урала</span><span class="card__text">Медальный зачёт по шести видам спорта.</span></div></a>
        <a class="card" href="article.html" data-topic="life" hidden data-more><div class="card__media card__media--b" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Студенческая жизнь</span><span>1 октября</span></span><span class="card__title">Студенческий театр отпраздновал сезон премьерой</span><span class="card__text">Новый спектакль на сцене Дворца культуры.</span></div></a>
        <a class="card" href="article.html" data-topic="science" hidden data-more><div class="card__media card__media--c" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Наука</span><span>28 сентября</span></span><span class="card__title">Учёные представили модель городской жары</span><span class="card__text">Исследование микроклимата Екатеринбурга.</span></div></a>
        <a class="card" href="article.html" data-topic="admission" hidden data-more><div class="card__media card__media--d" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span class="tag">Поступление</span><span>25 сентября</span></span><span class="card__title">УрФУ рассказал о новой модели образования</span><span class="card__text">Что изменится для абитуриентов 2026 года.</span></div></a>
      </div>
      <div class="flex" style="justify-content:center; margin-top: var(--space-2xl)">
        <button class="btn btn--ghost" type="button" data-loadmore="#news-list-none">Показать ещё</button>
      </div>
    </div>
  </section>`
  },
  {
    file: 'article.html', title: 'Северное сияние и смартфон — УрФУ', nav: 'about.html',
    desc: 'Новость УрФУ: астрономы научили смартфон предсказывать северное сияние.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Новости', href: 'news.html' }, { label: 'Наука' }])}
  <article class="section section--paper">
    <div class="container">
      <div class="article">
        <span class="label">Наука · 12 октября 2026</span>
        <h1 class="display mt-lg" style="font-size: clamp(2rem, 1.4rem + 2.8vw, 3.25rem)">Астрономы УрФУ научили смартфон предсказывать северное сияние</h1>
        <p class="article__lede">Метод объединяет данные магнитометра, камеру телефона и простую модель прогноза — так сияние можно заметить заранее даже в средних широтах.</p>
        <div class="byline"><span class="avatar" aria-hidden="true"></span><span>Пресс-служба УрФУ · 4 мин чтения</span></div>
        <div class="card__media card__media--a" style="aspect-ratio:16/9; border-radius:var(--radius-card); border:1px solid var(--color-hairline)" aria-hidden="true"></div>
        <div class="article__body mt-2xl prose">
          <p>Магнитные бури и вызванные ими полярные сияния плохо поддаются точному прогнозу. Команда института предложила прикладной подход, доступный каждому: использовать смартфон как датчик и индикатор.</p>
          <h2>Как это работает</h2>
          <p>Наблюдатель делает снимок ночного неба, приложение анализирует шум и цвет, сопоставляет данные с открытыми потоками телеметрии магнитного поля и выдаёт оценку вероятности.</p>
          <blockquote>«Мы хотели снять порог входа: чтобы про сияние узнавали не только специалисты, но и школьники».</blockquote>
          <h2>Что это даёт региону</h2>
          <ul>
            <li>Доступный инструмент для школ и фотографов.</li>
            <li>Набор наблюдений, который можно использовать в исследованиях.</li>
            <li>Популяризацию науки о космосе в средних широтах.</li>
          </ul>
          <p>Пилотный набор данных и методику планируют опубликовать в открытом доступе. Материал приведён как образец.</p>
        </div>
        <div class="empty mt-2xl">Пояснение: цитаты, числа и имена в этом материале — демонстрационные. Реальные данные уточняются у пресс-службы.</div>
      </div>
    </div>
  </article>

  <section class="section section--canvas section--rule" aria-labelledby="more-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><h2 id="more-h">Смотрите также</h2></div><a class="link-arrow" href="news.html">Все новости <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
      <div class="grid grid-3">
        <a class="card" href="article.html"><div class="card__media card__media--c" aria-hidden="true"></div><div class="card__body"><span class="card__title">Кампус на Мира, 19: как изменится студгородок</span></div></a>
        <a class="card" href="article.html"><div class="card__media card__media--d" aria-hidden="true"></div><div class="card__body"><span class="card__title">Материаловеды получили грант на новые сплавы</span></div></a>
        <a class="card" href="article.html"><div class="card__media card__media--b" aria-hidden="true"></div><div class="card__body"><span class="card__title">Открыта регистрация на дни открытых дверей</span></div></a>
      </div>
    </div>
  </section>`
  },
  {
    file: 'events.html', title: 'События — УрФУ', nav: 'about.html',
    desc: 'Календарь событий УрФУ: дни открытых дверей, лекции, конференции и студенческие мероприятия.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Университет' }, { label: 'События' }])}
  <section class="pagehead">
    <div class="container-wide">
      <span class="label">Календарь</span>
      <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">События</h1>
      <p class="lead mt-lg prose">Дни открытых дверей, лекции и конференции. Фильтруйте по теме. Данные — образец.</p>
    </div>
  </section>

  <section class="section section--paper" data-filter-list aria-labelledby="ev-h">
    <div class="container">
      <h2 id="ev-h" class="sr-only">Список событий</h2>
      <div class="chipset">
        <button class="chip" type="button" data-filter="all" aria-pressed="true">Все</button>
        <button class="chip" type="button" data-filter="admission" aria-pressed="false">Поступление</button>
        <button class="chip" type="button" data-filter="science" aria-pressed="false">Наука</button>
        <button class="chip" type="button" data-filter="culture" aria-pressed="false">Культура</button>
      </div>
      <p class="sr-only" role="status" data-filter-status></p>
      <div class="timeline-rail mt-xl">
        <a class="row-card row-card--timeline" href="event.html" data-topic="admission">
          <div><div class="stat__num" style="font-size:1.75rem">18</div><div class="small muted">октября · 11:00</div></div>
          <div><span class="card__meta"><span class="tag tag--accent">Поступление</span></span><h3 class="mt-lg">День открытых дверей институтов</h3><p class="card__text">Мира, 19 · очно и онлайн</p></div>
          <span class="badge-open">Запись открыта</span>
        </a>
        <a class="row-card row-card--timeline" href="event.html" data-topic="science">
          <div><div class="stat__num" style="font-size:1.75rem">21</div><div class="small muted">октября · 18:30</div></div>
          <div><span class="card__meta"><span class="tag">Наука</span></span><h3 class="mt-lg">Научно-популярная лекция о космосе</h3><p class="card__text">Актовый зал · вход свободный</p></div>
          <span class="badge-open">Запись открыта</span>
        </a>
        <a class="row-card row-card--timeline" href="event.html" data-topic="culture">
          <div><div class="stat__num" style="font-size:1.75rem">25</div><div class="small muted">октября · 19:00</div></div>
          <div><span class="card__meta"><span class="tag">Культура</span></span><h3 class="mt-lg">Премьера студенческого театра</h3><p class="card__text">Дворец культуры · 16+</p></div>
          <span class="tag tag--neutral">Регистрация</span>
        </a>
        <a class="row-card row-card--timeline" href="event.html" data-topic="admission">
          <div><div class="stat__num" style="font-size:1.75rem">02</div><div class="small muted">ноября · 12:00</div></div>
          <div><span class="card__meta"><span class="tag tag--accent">Поступление</span></span><h3 class="mt-lg">Онлайн-консультация приёмной комиссии</h3><p class="card__text">Трансляция · без регистрации</p></div>
          <span class="badge-open">Запись открыта</span>
        </a>
      </div>
    </div>
  </section>`
  },
  {
    file: 'event.html', title: 'День открытых дверей — УрФУ', nav: 'about.html',
    desc: 'День открытых дверей УрФУ: программа, регистрация и как добраться.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'События', href: 'events.html' }, { label: 'День открытых дверей' }])}
  <section class="pagehead">
    <div class="container-wide">
      <div class="pagehead__grid">
        <div>
          <span class="label">Событие · 18 октября 2026</span>
          <h1 class="display mt-lg" style="font-size: clamp(2rem, 1.4rem + 2.6vw, 3rem)">День открытых дверей институтов</h1>
          <p class="lead mt-lg prose">Экскурсии по лабораториям, знакомство с институтами и консультации приёмной комиссии. Данные — образец.</p>
          <div class="hero__cta"><a class="btn" href="#register">Зарегистрироваться</a><a class="btn btn--ghost" href="events.html">Все события</a></div>
        </div>
        <dl class="factbox" aria-label="Параметры события">
          <div class="factbox__row"><dt>Дата</dt><dd class="mono">18.10.2026</dd></div>
          <div class="factbox__row"><dt>Начало</dt><dd class="mono">11:00</dd></div>
          <div class="factbox__row"><dt>Место</dt><dd>Мира, 19</dd></div>
          <div class="factbox__row"><dt>Формат</dt><dd>Очно и онлайн</dd></div>
          <div class="factbox__row"><dt>Стоимость</dt><dd>Бесплатно</dd></div>
          <div class="factbox__row"><dt>Запись</dt><dd><span class="badge-open">Открыта</span></dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="prog-h">
    <div class="container-wide">
      <div class="split">
        <div>
          <h2 id="prog-h">Программа дня</h2>
          <div class="steps mt-lg">
            <article class="step"><span class="step__num" aria-hidden="true">11:00</span><div class="step__body"><h3>Открытие и приветствие</h3><p>Актовый зал, главный корпус.</p></div></article>
            <article class="step"><span class="step__num" aria-hidden="true">11:30</span><div class="step__body"><h3>Экскурсии по институтам</h3><p>Группы по 15 человек, лаборатории и учебные пространства.</p></div></article>
            <article class="step"><span class="step__num" aria-hidden="true">13:00</span><div class="step__body"><h3>Консультации приёмной комиссии</h3><p>Как выбрать программу, что с ЕГЭ, как подать документы.</p></div></article>
            <article class="step"><span class="step__num" aria-hidden="true">14:30</span><div class="step__body"><h3>Студенческие клубы</h3><p>Спорт, творчество и научные общества.</p></div></article>
          </div>
        </div>
        <div>
          <div class="map" role="img" aria-label="Схема расположения корпуса на Мира, 19"><span class="map__pin" aria-hidden="true"></span></div>
          <p class="small muted mt-lg">Учебный корпус, Мира, 19. Рядом — остановки и метро.</p>
          <div id="register" class="card mt-xl"><div class="card__body">
            <h3>Регистрация на событие</h3>
            <p class="card__text">Оставьте контакт — придёт подтверждение и ссылка на трансляцию.</p>
            <form class="mt-lg" data-contact-form>
              <div class="field"><label for="ev-name">Имя</label><input class="input" id="ev-name" data-required><span class="hint">Как к вам обращаться</span><span class="error">Укажите имя</span></div>
              <div class="field"><label for="ev-email">Email</label><input class="input" id="ev-email" type="email" data-required><span class="error">Проверьте адрес</span></div>
              <button class="btn" type="submit">Отправить</button>
              <p class="small mt-lg" role="status" data-form-status></p>
            </form>
          </div></div>
        </div>
      </div>
    </div>
  </section>`
  },
  {
    file: 'institute.html', title: 'Институт радиоэлектроники и ИТ — УрФУ', nav: 'institute.html',
    desc: 'Институт радиоэлектроники и информационных технологий УрФУ: направления, лаборатории, люди.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Образование', href: 'programs.html' }, { label: 'Институты' }])}
  <section class="pagehead">
    <div class="container-wide">
      <div class="pagehead__grid">
        <div>
          <span class="label">Институт</span>
          <h1 class="display mt-lg" style="font-size: clamp(2rem, 1.4rem + 2.6vw, 3rem)">Радиоэлектроники и информационных технологий</h1>
          <p class="lead mt-lg prose">Ведущий инженерный институт УрФУ: электроника, информационные технологии и искусственный интеллект. Данные — образец.</p>
          <div class="hero__cta"><a class="btn" href="programs.html">Программы института</a><a class="btn btn--ghost" href="contacts.html">Контакты</a></div>
        </div>
        <dl class="factbox" aria-label="Ключевые показатели института">
          <div class="factbox__row"><dt>Студентов</dt><dd class="mono">6 400</dd></div>
          <div class="factbox__row"><dt>Программ</dt><dd class="mono">48</dd></div>
          <div class="factbox__row"><dt>Кафедр</dt><dd class="mono">11</dd></div>
          <div class="factbox__row"><dt>Лабораторий</dt><dd class="mono">26</dd></div>
          <div class="factbox__row"><dt>Директор</dt><dd>И. И. Иванов</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section section--paper section--rule" aria-labelledby="dir-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Направления</span><h2 id="dir-h">Чему учат</h2></div></div>
      <div class="grid grid-3">
        <a class="card" href="program.html"><div class="card__media card__media--a" aria-hidden="true"></div><div class="card__body"><span class="card__title">Информатика и вычислительная техника</span></div></a>
        <a class="card" href="program.html"><div class="card__media card__media--b" aria-hidden="true"></div><div class="card__body"><span class="card__title">Электроника и радиотехника</span></div></a>
        <a class="card" href="program.html"><div class="card__media card__media--c" aria-hidden="true"></div><div class="card__body"><span class="card__title">Искусственный интеллект</span></div></a>
      </div>
    </div>
  </section>

  <section class="section section--canvas" aria-labelledby="people-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Люди</span><h2 id="people-h">Кто здесь работает</h2></div></div>
      <div class="grid grid-4">
        <div class="card"><div class="card__body"><span class="avatar" aria-hidden="true"></span><span class="card__title mt-lg">И. И. Иванов</span><span class="card__text">Директор института, д.т.н.</span></div></div>
        <div class="card"><div class="card__body"><span class="avatar" aria-hidden="true"></span><span class="card__title mt-lg">А. П. Петрова</span><span class="card__text">Руководитель лаборатории ИИ</span></div></div>
        <div class="card"><div class="card__body"><span class="avatar" aria-hidden="true"></span><span class="card__title mt-lg">С. В. Кузнецов</span><span class="card__text">Профессор, электроника</span></div></div>
        <div class="card"><div class="card__body"><span class="avatar" aria-hidden="true"></span><span class="card__title mt-lg">М. О. Смирнова</span><span class="card__text">Доцент, программная инженерия</span></div></div>
      </div>
    </div>
  </section>

  <section class="section section--paper section--rule" aria-labelledby="inews-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><h2 id="inews-h">Новости института</h2></div><a class="link-arrow" href="news.html">Все новости <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
      <div class="grid grid-3">
        <a class="card" href="article.html"><div class="card__media card__media--a" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span>2 октября</span></span><span class="card__title">Студенты института победили на хакатоне</span></div></a>
        <a class="card" href="article.html"><div class="card__media card__media--b" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span>27 сентября</span></span><span class="card__title">Открыта новая лаборатория микроэлектроники</span></div></a>
        <a class="card" href="article.html"><div class="card__media card__media--c" aria-hidden="true"></div><div class="card__body"><span class="card__meta"><span>19 сентября</span></span><span class="card__title">Профессор института получил грант РНФ</span></div></a>
      </div>
    </div>
  </section>`
  },
  {
    file: 'students.html', title: 'Студентам — УрФУ', nav: 'students.html',
    desc: 'Личный кабинет студента УрФУ: расписание, рейтинг БРС, стипендии, документы и поддержка.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Студентам' }])}
  <section class="pagehead">
    <div class="container-wide">
      <span class="label">Сервисы</span>
      <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">Студентам</h1>
      <p class="lead mt-lg prose">Всё, что нужно каждый день: расписание, рейтинг, стипендии и помощь. Войдите в личный кабинет для персональных данных. Данные — образец.</p>
      <div class="hero__cta"><a class="btn" href="#quick">Быстрые действия</a><a class="btn btn--ghost" href="contacts.html">Помощь</a></div>
    </div>
  </section>

  <section class="section section--paper" id="quick" aria-labelledby="q-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Быстрые действия</span><h2 id="q-h">Сделать за пару шагов</h2></div></div>
      <div class="grid grid-3">
        <a class="card" href="#"><div class="card__body"><span class="tag">Учёба</span><span class="card__title mt-lg">Расписание занятий</span><span class="card__text">Актуальное расписание по группе и преподавателю.</span></div></a>
        <a class="card" href="#"><div class="card__body"><span class="tag">Учёба</span><span class="card__title mt-lg">Рейтинг БРС</span><span class="card__text">Ваши баллы по дисциплинам текущего семестра.</span></div></a>
        <a class="card" href="#"><div class="card__body"><span class="tag">Деньги</span><span class="card__title mt-lg">Стипендии и выплаты</span><span class="card__text">Виды стипендий, условия и график выплат.</span></div></a>
        <a class="card" href="#"><div class="card__body"><span class="tag">Документы</span><span class="card__title mt-lg">Справки и документы</span><span class="card__text">Заказать справку об обучении онлайн.</span></div></a>
        <a class="card" href="#"><div class="card__body"><span class="tag">Быт</span><span class="card__title mt-lg">Общежитие и питание</span><span class="card__text">Поселение, столовые и кампусная карта.</span></div></a>
        <a class="card" href="#"><div class="card__body"><span class="tag">Помощь</span><span class="card__title mt-lg">Учебный офис</span><span class="card__text">Обращения по учебным вопросам.</span></div></a>
      </div>
    </div>
  </section>

  <section class="section section--ink section--tight" aria-labelledby="status-h">
    <div class="container">
      <div class="section-head" style="margin-bottom:0">
        <div class="section-head__text"><span class="label">Сейчас в университете</span><h2 id="status-h">Осенний семестр 2026/27</h2><p>Сессия — с 12 января. Расписание зачётов доступно в личном кабинете.</p></div>
        <span class="badge-open" style="color:#C6CEDB">Образец статуса</span>
      </div>
    </div>
  </section>

  <section class="section section--paper section--rule" aria-labelledby="sup-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Поддержка</span><h2 id="sup-h">Если нужна помощь</h2></div></div>
      <div class="grid grid-3">
        <div class="card"><div class="card__body"><span class="card__title">Психологическая поддержка</span><span class="card__text">Конфиденциальные консультации для студентов.</span></div></div>
        <div class="card"><div class="card__body"><span class="card__title">Меры поддержки</span><span class="card__text">Материальная помощь и особые права.</span></div></div>
        <div class="card"><div class="card__body"><span class="card__title">Трудоустройство</span><span class="card__text">Стажировки и карьерные консультации.</span></div></div>
      </div>
      <h3 class="mt-2xl">Частые вопросы студентов</h3>
      <details class="acc mt-lg" open><summary>Как получить справку об обучении?</summary><div class="acc__body">Закажите справку в личном кабинете — готовая придёт на почту или будет ждать в деканате.</div></details>
      <details class="acc"><summary>Как перевестись с платного на бюджет?</summary><div class="acc__body">По результатам рейтинга успеваемости. Заявления принимаются дважды в год.</div></details>
    </div>
  </section>`
  },
  {
    file: 'about.html', title: 'Об университете — УрФУ', nav: 'about.html',
    desc: 'Об УрФУ: история, миссия, цифры, кампус и руководство крупнейшего федерального университета Урала.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Университет' }])}
  <section class="pagehead">
    <div class="container-wide">
      <div class="pagehead__grid">
        <div>
          <span class="label">Об университете</span>
          <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">Точка отсчёта на карте России</h1>
          <p class="lead mt-lg prose">УрФУ — крупнейший федеральный университет на границе Европы и Азии. Мы соединяем классическое образование, инженерную школу и исследования мирового уровня. Данные — образец.</p>
        </div>
        <div class="card__media card__media--b" style="aspect-ratio:4/3; border-radius:var(--radius-card); border:1px solid var(--color-hairline)" aria-hidden="true"></div>
      </div>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="num2-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">В цифрах</span><h2 id="num2-h">УрФУ сегодня</h2></div><p class="small muted">Показатели — образец.</p></div>
      <div class="stats">
        <div class="stat"><div class="stat__num">1920</div><div class="stat__cap">год основания</div></div>
        <div class="stat"><div class="stat__num">30 000<span class="accent">+</span></div><div class="stat__cap">студентов</div></div>
        <div class="stat"><div class="stat__num">100<span class="accent">+</span></div><div class="stat__cap">стран, откуда приехали студенты</div></div>
        <div class="stat"><div class="stat__num">1 900</div><div class="stat__cap">преподавателей и исследователей</div></div>
      </div>
    </div>
  </section>

  <section class="section section--canvas" aria-labelledby="mis-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><span class="label">Миссия</span><h2 id="mis-h">Во что мы верим</h2></div></div>
      <div class="grid grid-3">
        <div class="card"><div class="card__body"><span class="tag">01</span><span class="card__title mt-lg">Знание как ориентир</span><span class="card__text">Даём людям точку опоры, чтобы выбирать и двигаться дальше.</span></div></div>
        <div class="card"><div class="card__body"><span class="tag">02</span><span class="card__title mt-lg">Открытость</span><span class="card__text">Доступное образование, открытые данные и партнёрства.</span></div></div>
        <div class="card"><div class="card__body"><span class="tag">03</span><span class="card__title mt-lg">Связь с регионом</span><span class="card__text">Исследования и выпускники, которые меняют Урал.</span></div></div>
      </div>
    </div>
  </section>

  <section class="section section--paper section--rule" aria-labelledby="camp-h">
    <div class="container">
      <div class="split">
        <div>
          <span class="label">Кампус</span>
          <h2 id="camp-h" class="mt-lg">Город как учебный план</h2>
          <p class="lead mt-lg">Учебные корпуса, общежития, спорткомплексы и творческие площадки расположены рядом — от Мира, 19 до Ленина, 51.</p>
        </div>
        <div class="map" role="img" aria-label="Схема кампуса"><span class="map__pin" aria-hidden="true"></span></div>
      </div>
    </div>
  </section>`
  },
  {
    file: 'contacts.html', title: 'Контакты — УрФУ', nav: '',
    desc: 'Контакты УрФУ: приёмная комиссия, контакт-центр, пресс-служба и адреса корпусов.',
    body: `
  ${BC([{ label: 'Главная', href: 'index.html' }, { label: 'Контакты' }])}
  <section class="pagehead">
    <div class="container-wide">
      <span class="label">Свяжитесь с нами</span>
      <h1 class="display mt-lg" style="font-size: clamp(2.25rem, 1.5rem + 3vw, 3.5rem)">Контакты</h1>
      <p class="lead mt-lg prose">Контакт-центр, приёмная комиссия и службы университета. Данные — образец.</p>
    </div>
  </section>

  <section class="section section--paper">
    <div class="container">
      <div class="grid grid-2" style="gap:var(--space-3xl); align-items:start">
        <div>
          <div class="map" role="img" aria-label="Карта: Екатеринбург, Мира, 19"><span class="map__pin" aria-hidden="true"></span></div>
          <p class="small muted mt-lg">Главный корпус: 620002, Екатеринбург, ул. Мира, 19.</p>
        </div>
        <div>
          <div class="contact-grid contact-grid--2">
            <div class="card"><div class="card__body"><span class="label">Контакт-центр</span><span class="card__title mt-lg mono">8-800-100-50-44</span><span class="card__text">Звонок по России бесплатный</span></div></div>
            <div class="card"><div class="card__body"><span class="label">Приёмная комиссия</span><span class="card__title mt-lg mono">+7 (343) 375-44-74</span><span class="card__text">priem@urfu.ru · Мира, 19, ГУК-100</span></div></div>
            <div class="card"><div class="card__body"><span class="label">Пресс-служба</span><span class="card__title mt-lg mono">+7 (343) 375-97-33</span><span class="card__text">news@urfu.ru</span></div></div>
            <div class="card"><div class="card__body"><span class="label">Техподдержка</span><span class="card__title mt-lg mono">+7 (343) 227-20-70</span><span class="card__text">support@urfu.ru</span></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--canvas section--rule" aria-labelledby="form-h">
    <div class="container">
      <div class="split">
        <div><span class="label">Обратная связь</span><h2 id="form-h" class="mt-lg">Написать нам</h2><p class="lead mt-lg">Выберите тему и оставьте сообщение — ответим на указанную почту.</p></div>
        <form class="card" data-contact-form style="padding:var(--space-xl)">
          <div class="field"><label for="c-topic">Тема</label>
            <select class="select" id="c-topic"><option>Поступление</option><option>Обучение и сервисы</option><option>Сотрудничество</option><option>Пресса</option><option>Другое</option></select>
          </div>
          <div class="field"><label for="c-name">Имя</label><input class="input" id="c-name" data-required><span class="error">Укажите имя</span></div>
          <div class="field"><label for="c-email">Email</label><input class="input" id="c-email" type="email" data-required><span class="hint">Для ответа</span><span class="error">Проверьте адрес электронной почты</span></div>
          <div class="field"><label for="c-msg">Сообщение</label><textarea class="textarea" id="c-msg" data-required></textarea><span class="error">Напишите сообщение</span></div>
          <label class="check"><input type="checkbox" required> Согласен на обработку персональных данных</label>
          <button class="btn mt-lg" type="submit">Отправить сообщение</button>
          <p class="small mt-lg" role="status" data-form-status></p>
        </form>
      </div>
    </div>
  </section>

  <section class="section section--paper section--rule" aria-labelledby="dept-h">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><h2 id="dept-h">Контакты служб</h2></div></div>
      <div class="table-wrap">
        <table class="data">
          <caption class="sr-only">Телефоны и адреса служб, образец</caption>
          <thead><tr><th scope="col">Служба</th><th scope="col">Телефон</th><th scope="col">Email</th><th scope="col">Адрес</th></tr></thead>
          <tbody>
            <tr><td>Приёмная комиссия</td><td class="mono">+7 (343) 375-44-74</td><td>priem@urfu.ru</td><td>Мира, 19, ГУК-100</td></tr>
            <tr><td>Корреспонденция ректору</td><td class="mono">—</td><td>rector@urfu.ru</td><td>Мира, 19</td></tr>
            <tr><td>Техническая поддержка</td><td class="mono">+7 (343) 227-20-70</td><td>support@urfu.ru</td><td>—</td></tr>
            <tr><td>Редакция портала</td><td class="mono">—</td><td>site@urfu.ru</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>`
  },
  {
    file: 'search.html', title: 'Поиск — УрФУ', nav: '',
    desc: 'Поиск по порталу УрФУ: программы, новости, страницы и документы.',
    body: `
  <section class="section section--canvas" data-search-form aria-labelledby="s-h">
    <div class="container">
      <span class="label">Поиск по порталу</span>
      <h1 id="s-h" class="display mt-lg" style="font-size: clamp(2rem, 1.4rem + 2.8vw, 3rem)">Что вы ищете?</h1>
      <form class="mt-xl" role="search" action="search.html" method="get">
        <div class="search-inline" style="max-width:640px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="search" name="q" data-search-input placeholder="Программы, новости, документы" aria-label="Поисковый запрос">
        </div>
        <button class="btn mt-lg" type="submit">Найти</button>
      </form>

      <p class="mt-xl muted">Результаты по запросу «<strong data-search-echo>…</strong>» — образец данных.</p>
      <div class="chipset mt-lg">
        <button class="chip" type="button" aria-pressed="true">Все</button>
        <button class="chip" type="button" aria-pressed="false">Программы</button>
        <button class="chip" type="button" aria-pressed="false">Новости</button>
        <button class="chip" type="button" aria-pressed="false">Страницы</button>
      </div>

      <div class="grid mt-xl" style="grid-template-columns:1fr; max-width:820px; gap:var(--space-sm)">
        <a class="row-card row-card--compact" href="program.html">
          <div><span class="tag">Программа</span><h3 class="mt-lg">Прикладная математика и информатика</h3><p class="card__text">Бакалавриат · Институт радиоэлектроники и ИТ</p></div>
          <span class="link-arrow">Открыть</span>
        </a>
        <a class="row-card row-card--compact" href="article.html">
          <div><span class="tag">Новость</span><h3 class="mt-lg">Астрономы УрФУ научили смартфон предсказывать северное сияние</h3><p class="card__text">12 октября · Наука</p></div>
          <span class="link-arrow">Открыть</span>
        </a>
        <a class="row-card row-card--compact" href="admissions.html">
          <div><span class="tag">Страница</span><h3 class="mt-lg">Поступление в УрФУ</h3><p class="card__text">Приёмная кампания 2026 · сроки и документы</p></div>
          <span class="link-arrow">Открыть</span>
        </a>
      </div>

      <div class="empty mt-2xl" hidden>
        <h3>Ничего не найдено</h3>
        <p class="muted">Уточните запрос или посмотрите каталог программ.</p>
      </div>
    </div>
  </section>`
  },
  {
    file: '404.html', title: 'Страница не найдена — УрФУ', nav: '',
    desc: 'Страница не найдена. Вернитесь на главную или воспользуйтесь поиском.',
    body: `
  <section class="section section--canvas" style="min-height:60vh; display:flex; align-items:center">
    <div class="container" style="max-width:720px; text-align:center">
      <div class="mono" style="font-size:clamp(4rem,3rem+8vw,8rem); font-weight:600; color:var(--color-brand-700); letter-spacing:-0.04em">404</div>
      <h1 class="display" style="font-size:clamp(1.75rem,1.3rem+2vw,2.5rem)">Здесь нет страницы</h1>
      <p class="lead mt-lg">Возможно, адрес изменился. Вернитесь на главную или найдите нужное через поиск.</p>
      <div class="hero__cta" style="justify-content:center">
        <a class="btn" href="index.html">На главную</a>
        <a class="btn btn--ghost" href="search.html">Поиск по сайту</a>
      </div>
    </div>
  </section>`
  }
];

let written = 0;
for (const p of pages) {
  let chrome = chromeTop.replace(' aria-current="page"', '');
  if (p.nav) {
    const needle = `<a class="nav__link" href="${p.nav}"`;
    if (!chrome.includes(needle)) throw new Error('nav link not found: ' + p.nav);
    chrome = chrome.replace(needle, `<a class="nav__link" href="${p.nav}" aria-current="page"`);
  }
  chrome = chrome.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title}</title>`);
  chrome = chrome.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${p.desc}">`);
  const html = chrome + '<main id="main">' + p.body + '\n</main>' + chromeBottom;
  writeFileSync(join(root, p.file), html, 'utf8');
  written++;
}
console.log('Generated ' + written + ' pages into prototype/');
