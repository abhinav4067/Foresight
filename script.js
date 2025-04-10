document.addEventListener("DOMContentLoaded", () => {
  // ✅ Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      this.reset();
    });
  }

  // ✅ Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const navLinks = document.getElementById("nav-links");
  const socialSidebar = document.querySelector(".social-sidebar"); // 👉 Moved inside

  if (menuToggle && menuClose && navLinks) {
    menuToggle.addEventListener("click", function () {
      console.log("Menu toggle clicked ✅");
      navLinks.classList.add("active");
      socialSidebar?.classList.add("move-left"); // 👈 Move to left
    });

    menuClose.addEventListener("click", () => {
      navLinks.classList.remove("active");
      socialSidebar?.classList.remove("move-left"); // 👈 Back to right
    });

    document.querySelectorAll("#nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        socialSidebar?.classList.remove("move-left");
      });
    });

    document.addEventListener("click", (event) => {
      const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
      if (!isClickInside && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        socialSidebar?.classList.remove("move-left");
      }
    });
  }

  // ✅ Scroll + Auto-scroll
  const scrollContainer = document.getElementById("scroll-container");
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");

  const scrollAmount = 300;
  let autoScrollInterval = null;
  let scrollDirection = 1;
  let isPaused = false;
  let pauseTimeout = null;

  function isScrollable() {
    return scrollContainer.scrollWidth > scrollContainer.clientWidth + 10;
  }

  function startAutoScroll() {
    stopAutoScroll();
    if (!isScrollable()) return;

    autoScrollInterval = setInterval(() => {
      if (!isPaused) {
        scrollContainer.scrollBy({ left: scrollDirection, behavior: "auto" });

        const atEnd = Math.ceil(scrollContainer.scrollLeft + scrollContainer.clientWidth) >= scrollContainer.scrollWidth;
        const atStart = scrollContainer.scrollLeft <= 0;

        if (atEnd || atStart) scrollDirection *= -1;
      }
    }, 15);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  function temporarilyPauseAutoScroll(duration = 3000) {
    isPaused = true;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      isPaused = false;
    }, duration);
  }

  scrollLeftBtn?.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    temporarilyPauseAutoScroll();
  });

  scrollRightBtn?.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    temporarilyPauseAutoScroll();
  });

  ["mouseenter", "touchstart"].forEach(evt =>
    scrollContainer?.addEventListener(evt, () => {
      isPaused = true;
    }, { passive: true })
  );

  ["mouseleave", "touchend"].forEach(evt =>
    scrollContainer?.addEventListener(evt, () => {
      isPaused = false;
    }, { passive: true })
  );

  window.addEventListener("load", () => {
    setTimeout(() => {
      startAutoScroll();
    }, 500);
  });

  window.addEventListener("resize", () => {
    stopAutoScroll();
    startAutoScroll();
  });
});



