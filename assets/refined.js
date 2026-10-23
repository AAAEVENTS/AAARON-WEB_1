/* Independent homepage image carousel — no third-party framework required. */
(() => {
 'use strict';
 const hero = document.getElementById('hero');
 if (!hero) return;
 const slides = Array.from(hero.querySelectorAll('.hero-slide'));
 const counter = document.getElementById('heroSlideNumber');
 const photoCredit = document.getElementById('heroPhotoCredit');
 const credits = ['Elephant Shield', 'Silikal', 'Seal Coatings'];
 const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let active = 0, interval = null;
 function update(index) {
   active = (index + slides.length) % slides.length;
   slides.forEach((slide, i) => {
     const selected = i === active;
     slide.classList.toggle('is-active', selected);
     slide.setAttribute('aria-hidden', String(!selected));
   });
   if (counter) counter.textContent = String(active + 1).padStart(2,'0');
   if (photoCredit) {
     const ar = document.documentElement.lang === 'ar';
     photoCredit.textContent = ar ? 'صورة تطبيق من الشركة المصنّعة · ' + (active === 0 ? 'إليفانت شيلد' : active === 1 ? 'سيليكال' : 'سيل كوتينغز') : 'Manufacturer application photograph · ' + credits[active];
   }
 }
 function stop() { if (interval) { clearInterval(interval); interval = null; } }
 function play() {
   if (reduceMotion || document.hidden || interval || !hero.closest('.page.active')) return;
   interval = setInterval(() => update(active + 1), 7400);
 }
 const prev = document.getElementById('slidePrev'), next = document.getElementById('slideNext');
 if (prev) prev.addEventListener('click', () => { update(active - 1); stop(); play(); });
 if (next) next.addEventListener('click', () => { update(active + 1); stop(); play(); });
 hero.addEventListener('mouseenter', stop);
 hero.addEventListener('mouseleave', play);
 hero.addEventListener('focusin', stop);
 hero.addEventListener('focusout', play);
 document.addEventListener('visibilitychange', () => { stop(); play(); });
 window.addEventListener('hashchange', () => { stop(); play(); });
 const lang = document.getElementById('languageToggle');
 if (lang) lang.addEventListener('click', () => requestAnimationFrame(() => update(active)));
 const mobileLang = document.getElementById('mobileLang');
 if (mobileLang) mobileLang.addEventListener('click', () => requestAnimationFrame(() => update(active)));
 update(0);
 play();
})();
