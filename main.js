const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-show');
    } else {
      entry.target.classList.remove('scroll-show');
    }
  });
});

document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));


document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.mySwiper', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    speed: 2000, // Higher = slower, lower = faster
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    freeMode: true,
    freeModeMomentum: false,
    breakpoints: {
      576: { slidesPerView: 6 },
      768: { slidesPerView: 7 }
    }
  });
});
window.addEventListener('scroll', () => {
  const heroHeight = document.querySelector('.hero-bg').offsetHeight;
  const fixedNav = document.querySelector('.site-navbar-fixed');

  if (window.scrollY > heroHeight - 80) {
    fixedNav.classList.remove('nav-fade-out');
    fixedNav.classList.add('nav-fade-in');
  } else {
    fixedNav.classList.remove('nav-fade-in');
    fixedNav.classList.add('nav-fade-out');
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const scope = document.getElementById("schoolProjectsAccordion");
  const collapses = Array.from(scope.querySelectorAll(".collapse"));
  const buttons = collapses
    .map(c => scope.querySelector(`[data-bs-target="#${c.id}"]`))
    .filter(Boolean);

  // Stop Bootstrap from auto-toggling; we will control it.
  buttons.forEach(btn => btn.removeAttribute("data-bs-toggle"));

  function openOnly(target) {
    collapses.forEach(c => {
      const inst = bootstrap.Collapse.getOrCreateInstance(c, { toggle: false });
      if (c === target) inst.show(); else inst.hide();
    });
  }

  // Ensure one is open on load (use your HTML "show" class to avoid flicker; this is a fallback)
  const initiallyOpen = collapses.find(c => c.classList.contains("show")) || collapses[0];
  if (initiallyOpen) openOnly(initiallyOpen);

  // Click handling: keep exactly one open; block closing the last one.
  buttons.forEach(btn => {
    const selector = btn.getAttribute("data-bs-target");
    const target = scope.querySelector(selector);

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = target.classList.contains("show");
      const openNow = collapses.filter(c => c.classList.contains("show"));

      // If this is the only open and user clicks it: do nothing (can't close last one)
      if (isOpen && openNow.length === 1) return;

      // Otherwise: open target and close others
      openOnly(target);
    }, true); // capture to beat any other handlers
  });

  // Keep icons and aria-expanded synced
  function syncUI(active) {
    collapses.forEach(c => {
      const btn = scope.querySelector(`[data-bs-target="#${c.id}"]`);
      const icon = scope.querySelector(`[data-bs-target="#${c.id}"] .plus-rotate`);
      const isActive = c === active && c.classList.contains("show");
      if (btn) btn.setAttribute("aria-expanded", isActive ? "true" : "false");
      if (icon) icon.textContent = isActive ? "−" : "+";
    });
  }

  collapses.forEach(c => {
    c.addEventListener("shown.bs.collapse", () => syncUI(c));
    c.addEventListener("hidden.bs.collapse", () => syncUI(
      collapses.find(x => x.classList.contains("show")) || null
    ));
  });

  // Initial sync
  syncUI(collapses.find(x => x.classList.contains("show")) || null);
});

