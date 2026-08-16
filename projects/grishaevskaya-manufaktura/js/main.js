(() => {
  'use strict';

  /* ---------- header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile nav ---------- */
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  burger.addEventListener('click', () => {
    const open = document.documentElement.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    document.documentElement.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  }));

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

  /* ---------- portfolio carousel ("Кинопоиск"-приём: активная карточка укрупняется и "выступает") ---------- */
  const CASES = [
    {
      icon: 'icon-kitchen', tag: 'Кухня', title: 'Угловая кухня со встроенной техникой',
      area: '12–14 м²', material: 'МДФ эмаль, ЛДСП Egger', days: '18 дней', price: 'от 320 000 ₽',
      note: 'Типовой формат для новостройки: угловой гарнитур, встроенная техника, барная стойка по запросу.'
    },
    {
      icon: 'icon-wardrobe', tag: 'Шкаф-купе', title: 'Шкаф-купе в прихожую со стеклянными фасадами',
      area: 'до потолка', material: 'ЛДСП, стекло', days: '20 дней', price: 'от 195 000 ₽',
      note: 'Максимум места хранения без визуального утяжеления коридора — фасады в цвет стен или контрастные.'
    },
    {
      icon: 'icon-hanger', tag: 'Гардеробная', title: 'Гардеробная с системой хранения',
      area: 'от 3 м²', material: 'ЛДСП, металл', days: '21 день', price: 'от 260 000 ₽',
      note: 'Открытые и закрытые модули, штанги, выдвижные ящики — наполнение считаем под ваш гардероб.'
    },
    {
      icon: 'icon-kitchen', tag: 'Кухня-остров', title: 'Кухня с островом и обеденной группой',
      area: '18–22 м²', material: 'МДФ эмаль, фурнитура Blum', days: '24 дня', price: 'от 480 000 ₽',
      note: 'Формат для просторных кухонь-гостиных: остров как рабочая зона и место для общения.'
    },
    {
      icon: 'icon-home', tag: 'Вся квартира', title: 'Меблировка квартиры целиком',
      area: 'кухня + шкафы + прихожая', material: 'по проекту', days: '30 дней', price: 'от 640 000 ₽',
      note: 'Один подрядчик и единый стиль на всю квартиру — без стыковки разных производителей между собой.'
    },
    {
      icon: 'icon-drawer', tag: 'Компакт', title: 'Компактная кухня для студии',
      area: 'до 8 м²', material: 'МДФ, ЛДСП', days: '12 дней', price: 'от 210 000 ₽',
      note: 'Минимум площади — максимум функции: продуманное хранение для небольшой кухни.'
    }
  ];

  const track = document.getElementById('carouselTrack');
  const detail = document.getElementById('caseDetail');

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

  CASES.forEach((item, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'case-card' + (i === 0 ? ' is-active' : '');
    card.setAttribute('aria-label', item.title);
    card.innerHTML = `
      <div class="case-swatch" style="background:linear-gradient(155deg,#8a6353,#714E44 45%,#4a322b)">
        <span class="case-tag">${item.tag}</span>
        <svg class="grain" aria-hidden="true"><use href="#grain-pattern" preserveAspectRatio="xMidYMid slice"/></svg>
        <div class="icon-pop"><svg viewBox="0 0 24 24"><use href="#${item.icon}"/></svg></div>
      </div>
      <div class="case-meta">
        <h4>${item.title}</h4>
        <p>${item.area} · ${item.days}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      track.querySelectorAll('.case-card').forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
      renderDetail(item);
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    track.appendChild(card);
  });
  renderDetail(CASES[0]);

  /* ---------- lead form -> WhatsApp deep link ---------- */
  const form = document.getElementById('leadForm');
  const status = document.getElementById('formStatus');
  const WHATSAPP_NUMBER = '79267739777';

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

  /* ---------- map link: open Yandex Maps by address ---------- */
  const mapLink = document.getElementById('mapLink');
  if (mapLink) {
    mapLink.href = 'https://yandex.ru/maps/?text=' + encodeURIComponent('Москва, г. Троицк, Дальняя улица, 6');
    mapLink.target = '_blank';
    mapLink.rel = 'noopener';
  }
})();
