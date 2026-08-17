(() => {
  'use strict';

  /* ---------- hero: interactive kitchen (doors/drawers open on hover) ---------- */
  const heroImg = document.getElementById('heroKitchenImg');
  if (heroImg) {
    const HERO_POS_X = 0.20, HERO_POS_Y = 0.5; // must match .hero-photo img { object-position }
    const heroCopy = document.querySelector('.hero-copy');

    const rectsOverlap = (a, b) =>
      a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

    const layoutHeroHotspots = () => {
      const container = heroImg.parentElement;
      const cw = container.clientWidth, ch = container.clientHeight;
      const iw = heroImg.naturalWidth, ih = heroImg.naturalHeight;
      if (!iw || !ih || !cw || !ch) return;

      const containerRatio = cw / ch, imgRatio = iw / ih;
      let renderW, renderH;
      if (imgRatio > containerRatio) { renderH = ch; renderW = ch * imgRatio; }
      else { renderW = cw; renderH = cw / imgRatio; }
      const offsetX = (cw - renderW) * HERO_POS_X;
      const offsetY = (ch - renderH) * HERO_POS_Y;
      const scale = renderW / iw;
      const src = heroImg.currentSrc || heroImg.src;

      const containerRect = container.getBoundingClientRect();
      const copyRect = heroCopy ? heroCopy.getBoundingClientRect() : null;
      const copyRectLocal = copyRect ? {
        left: copyRect.left - containerRect.left, right: copyRect.right - containerRect.left,
        top: copyRect.top - containerRect.top, bottom: copyRect.bottom - containerRect.top
      } : null;

      document.querySelectorAll('.hero-hotspot').forEach(el => {
        const x = parseFloat(el.dataset.x), y = parseFloat(el.dataset.y);
        const w = parseFloat(el.dataset.w), h = parseFloat(el.dataset.h);
        const left = offsetX + x * scale, top = offsetY + y * scale;
        const width = w * scale, height = h * scale;

        if (copyRectLocal && rectsOverlap(
          { left, right: left + width, top, bottom: top + height }, copyRectLocal
        )) {
          el.style.display = 'none';
          return;
        }
        el.style.display = '';

        el.style.left = left + 'px';
        el.style.top = top + 'px';
        el.style.width = width + 'px';
        el.style.height = height + 'px';
        const front = el.querySelector('.front');
        if (front) {
          front.style.backgroundImage = `url('${src}')`;
          front.style.backgroundSize = renderW + 'px ' + renderH + 'px';
          front.style.backgroundPosition = (offsetX - left) + 'px ' + (offsetY - top) + 'px';
        }
      });
    };

    if (heroImg.complete && heroImg.naturalWidth) layoutHeroHotspots();
    heroImg.addEventListener('load', layoutHeroHotspots);
    window.addEventListener('resize', layoutHeroHotspots);
  }

  /* ---------- header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = document.documentElement.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      document.documentElement.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    const setState = (open) => {
      item.classList.toggle('is-open', open);
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0px';
    };
    setState(item.classList.contains('is-open'));
    btn.addEventListener('click', () => setState(!item.classList.contains('is-open')));
    window.addEventListener('resize', () => {
      if (item.classList.contains('is-open')) ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  });

  /* ---------- shared project data (использовано на главной и в портфолио) ---------- */
  const CASES = [
    { mono: 'Кх', tag: 'Кухня', cat: 'kitchen', title: 'Угловая кухня со встроенной техникой',
      area: '12–14 м²', material: 'МДФ эмаль, ЛДСП Egger', days: '18 дней', price: 'от 320 000 ₽',
      note: 'Типовой формат для новостройки: угловой гарнитур, встроенная техника, барная стойка по запросу.',
      photo: 'assets/photos/case-kh.jpg' },
    { mono: 'Шк', tag: 'Шкаф-купе', cat: 'wardrobe', title: 'Шкаф-купе в прихожую со стеклянными фасадами',
      area: 'до потолка', material: 'ЛДСП, стекло', days: '20 дней', price: 'от 195 000 ₽',
      note: 'Максимум места хранения без визуального утяжеления коридора — фасады в цвет стен или контрастные.' },
    { mono: 'Гд', tag: 'Гардеробная', cat: 'dressing', title: 'Гардеробная с системой хранения',
      area: 'от 3 м²', material: 'ЛДСП, металл', days: '21 день', price: 'от 260 000 ₽',
      note: 'Открытые и закрытые модули, штанги, выдвижные ящики — наполнение считаем под ваш гардероб.' },
    { mono: 'Ко', tag: 'Кухня-остров', cat: 'kitchen', title: 'Кухня с полуостровом и обеденной группой',
      area: '18–22 м²', material: 'МДФ эмаль, фурнитура Blum', days: '24 дня', price: 'от 480 000 ₽',
      note: 'Формат для просторных кухонь-гостиных: остров как рабочая зона и место для общения.',
      photo: 'assets/photos/case-ko.jpg' },
    { mono: 'Вк', tag: 'Вся квартира', cat: 'apartment', title: 'Меблировка квартиры целиком',
      area: 'кухня + шкафы + прихожая', material: 'по проекту', days: '30 дней', price: 'от 640 000 ₽',
      note: 'Один подрядчик и единый стиль на всю квартиру — без стыковки разных производителей между собой.' },
    { mono: 'Км', tag: 'Компакт', cat: 'kitchen', title: 'Компактная кухня для студии',
      area: 'до 8 м²', material: 'МДФ, ЛДСП', days: '12 дней', price: 'от 210 000 ₽',
      note: 'Минимум площади — максимум функции: открытые полки и продуманное хранение для небольшой кухни.',
      photo: 'assets/photos/case-km.jpg' },
    { mono: 'Шс', tag: 'Шкаф-купе', cat: 'wardrobe', title: 'Встроенный шкаф-купе в спальню',
      area: 'ниша 2,4 м', material: 'ЛДСП, фурнитура с бронзовым профилем', days: '14 дней', price: 'от 175 000 ₽',
      note: 'Встроенная конструкция без боковых стенок — использует нишу целиком, открытый стеллаж сбоку под мелочи.',
      photo: 'assets/photos/case-shs.jpg' },
    { mono: 'Гм', tag: 'Гардеробная', cat: 'dressing', title: 'Гардеробная в мансарде',
      area: 'скошенный потолок', material: 'ЛДСП, металл', days: '23 дня', price: 'от 290 000 ₽',
      note: 'Наполнение спроектировано под скошенные потолки мансарды — нестандартная геометрия без потери места хранения.' },
    { mono: 'Кг', tag: 'Кухня-гостиная', cat: 'kitchen', title: 'Кухня-гостиная со встроенной техникой',
      area: '20–26 м²', material: 'МДФ, камень, ДСП под дерево', days: '26 дней', price: 'от 520 000 ₽',
      note: 'Кухня как часть гостиной: встроенная техника, каменная столешница, тёплый акцент дерева в фасадах.',
      photo: 'assets/photos/case-kg.jpg' },
    { mono: 'Пх', tag: 'Прихожая', cat: 'apartment', title: 'Прихожая с системой хранения',
      area: '4–6 м²', material: 'ЛДСП, МДФ', days: '10 дней', price: 'от 150 000 ₽',
      note: 'Встроенные шкафы для входной группы — обувь, верхняя одежда, сезонные вещи в одном модуле.' },
    { mono: 'Нс', tag: 'Новостройка', cat: 'apartment', title: 'Мебель для новостройки под ключ',
      area: 'кухня + прихожая + шкафы', material: 'по проекту', days: '28 дней', price: 'от 590 000 ₽',
      note: 'Типовой запрос после сдачи ЖК: меблировка сразу после ремонта, один подрядчик на весь объём.' },
    { mono: 'Шр', tag: 'Шкаф-купе', cat: 'wardrobe', title: 'Радиусный шкаф-купе',
      area: 'угловой, радиус 900 мм', material: 'ЛДСП, гнутое стекло', days: '25 дней', price: 'от 310 000 ₽',
      note: 'Скруглённый корпус вместо острого угла — сложнее в производстве, но существенно экономит проходное пространство.' }
  ];

  function woodBg(i) {
    return `assets/wood/wood-${(i % 4) + 1}.jpg`;
  }

  function caseCardHTML(item, i) {
    const bg = item.photo || woodBg(i);
    const mono = item.photo ? '' : `<div class="case-mono">${item.mono}</div>`;
    return `
      <div class="case-swatch" style="background-image:url('${bg}')">
        <span class="case-tag">${item.tag}</span>
        ${mono}
      </div>
      <div class="case-meta">
        <h4>${item.title}</h4>
        <p>${item.days}</p>
      </div>`;
  }

  /* ---------- portfolio carousel (главная): "Кинопоиск"-приём — активная карточка укрупняется ---------- */
  const track = document.getElementById('carouselTrack');
  const detail = document.getElementById('caseDetail');
  if (track && detail) {
    function renderDetail(item) {
      detail.innerHTML = `
        <div class="lead">
          <h3>${item.title}</h3>
          <div class="stars">★★★★★ <span style="color:var(--walnut-2);font-weight:400">фиксированная цена после замера</span></div>
        </div>
        <dl class="case-stat"><dt>Формат</dt><dd>${item.area}</dd></dl>
        <dl class="case-stat"><dt>Материал</dt><dd>${item.material}</dd></dl>
        <dl class="case-stat"><dt>Срок</dt><dd>${item.days}</dd></dl>
        <dl class="case-stat"><dt>Стоимость</dt><dd>${item.price}</dd></dl>
        <p class="case-quote">${item.note}</p>
      `;
    }
    CASES.slice(0, 6).forEach((item, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'case-card' + (i === 0 ? ' is-active' : '');
      card.setAttribute('aria-label', item.title);
      card.innerHTML = caseCardHTML(item, i);
      card.addEventListener('click', () => {
        track.querySelectorAll('.case-card').forEach(c => c.classList.remove('is-active'));
        card.classList.add('is-active');
        renderDetail(item);
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      track.appendChild(card);
    });
    renderDetail(CASES[0]);
  }

  /* ---------- portfolio grid (portfolio.html): фильтр по категориям + "показать ещё" ---------- */
  const grid = document.getElementById('portfolioGrid');
  if (grid) {
    const PAGE_SIZE = 6;
    let activeCat = 'all';
    let shown = PAGE_SIZE;

    function currentSet() {
      return activeCat === 'all' ? CASES : CASES.filter(c => c.cat === activeCat);
    }

    function render() {
      const set = currentSet();
      grid.innerHTML = set.slice(0, shown).map((item, i) => `<a class="grid-card" href="#cta">${caseCardHTML(item, i)}</a>`).join('');
      const btn = document.getElementById('loadMoreBtn');
      if (btn) btn.hidden = shown >= set.length;
    }

    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        activeCat = chip.dataset.filter;
        shown = PAGE_SIZE;
        render();
      });
    });
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => { shown += PAGE_SIZE; render(); });

    render();
  }

  /* ---------- generic media grid (services.html, materials.html) ---------- */
  document.querySelectorAll('[data-media-grid]').forEach(container => {
    let items;
    try { items = JSON.parse(container.getAttribute('data-media-grid')); } catch (e) { items = []; }
    container.innerHTML = items.map((item, i) => `
      <div class="grid-card">
        <div class="case-swatch" style="background-image:url('${woodBg(i)}')">
          <div class="case-mono">${item.mono}</div>
        </div>
        <div class="case-meta">
          <h4>${item.title}</h4>
          ${item.meta ? `<p>${item.meta}</p>` : ''}
        </div>
        ${item.desc ? `<p style="margin-top:.5rem;color:var(--walnut-2);font-size:.9rem">${item.desc}</p>` : ''}
      </div>
    `).join('');
  });

  /* ---------- lead form -> WhatsApp deep link ---------- */
  const form = document.getElementById('leadForm');
  const status = document.getElementById('formStatus');
  const WHATSAPP_NUMBER = '79267739777';

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const project = (data.get('project') || '').toString().trim();
      const comment = (data.get('comment') || '').toString().trim();

      if (!name || !phone) {
        status.hidden = false;
        status.textContent = 'Укажите имя и телефон — так мы сможем связаться с вами.';
        status.style.color = '#b5453a';
        return;
      }

      const lines = [
        `Здравствуйте! Меня зовут ${name}.`,
        `Телефон: ${phone}`,
        project ? `Интересует: ${project}` : null,
        comment ? `Комментарий: ${comment}` : null
      ].filter(Boolean);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      status.hidden = false;
      status.style.color = '';
      status.textContent = 'Открываем WhatsApp с готовым сообщением…';
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

  /* ---------- map link: open Yandex Maps by address ---------- */
  const mapLink = document.getElementById('mapLink');
  if (mapLink) {
    mapLink.href = 'https://yandex.ru/maps/?text=' + encodeURIComponent('Москва, г. Троицк, Дальняя улица, 6');
    mapLink.target = '_blank';
    mapLink.rel = 'noopener';
  }

  /* ---------- video slot: click-to-load YouTube embed (facade pattern) ---------- */
  const videoSlot = document.getElementById('videoSlot');
  if (videoSlot) {
    videoSlot.addEventListener('click', () => {
      const id = videoSlot.dataset.ytId;
      videoSlot.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Видеоотзыв клиента" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    });
  }
})();
