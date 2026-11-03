(() => {
  const root = document.documentElement;
  root.classList.remove("no-js");

  // Theme: follow the OS unless the visitor picked one.
  const stored = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (stored) root.dataset.theme = stored;
  const btn = document.querySelector(".theme-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch {}
    });
  }

  // Header hairline once the page scrolls.
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fade sections in as they arrive.
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      // Also reveal anything already scrolled past (anchor jumps skip over sections).
      for (const e of entries) {
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add("in"); io.unobserve(e.target); }
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // Looping videos play only while on screen; thumbnails play on hover.
  const autoplay = document.querySelectorAll("video[data-autoplay]");
  if (reduceMotion) {
    autoplay.forEach((v) => { v.controls = true; });
  } else if ("IntersectionObserver" in window) {
    const vio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target;
        if (e.isIntersecting) { v.play().catch(() => { v.controls = true; }); } else { v.pause(); }
      }
    }, { threshold: 0.25 });
    autoplay.forEach((v) => vio.observe(v));
  }

  document.querySelectorAll(".work-link").forEach((link) => {
    const v = link.querySelector("video[data-hover]");
    if (!v || reduceMotion) return;
    link.addEventListener("mouseenter", () => v.play().catch(() => {}));
    link.addEventListener("mouseleave", () => v.pause());
  });

  // Click an image to see it larger.
  const zoomables = document.querySelectorAll(".zoomable img");
  if (zoomables.length) {
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.innerHTML = '<img alt=""><p></p>';
    document.body.appendChild(dlg);
    const img = dlg.querySelector("img");
    const cap = dlg.querySelector("p");
    zoomables.forEach((el) => {
      el.parentElement.setAttribute("role", "button");
      el.parentElement.setAttribute("tabindex", "0");
      const open = () => {
        img.src = el.currentSrc || el.src;
        img.alt = el.alt;
        cap.textContent = el.alt;
        dlg.showModal();
      };
      el.parentElement.addEventListener("click", open);
      el.parentElement.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    dlg.addEventListener("click", () => dlg.close());
  }
})();
