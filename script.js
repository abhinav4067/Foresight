// Simple form submission alert
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    this.reset();
  });
  


  //for navbar
// Toggle menu on icon click
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("nav-links").classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-links").classList.remove("active");
  });
});


// scroll + auto-scroll
document.addEventListener("DOMContentLoaded", () => {
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

  // Pause auto-scroll on hover/touch
  ["mouseenter", "touchstart"].forEach(evt =>
    scrollContainer.addEventListener(evt, () => {
      isPaused = true;
    }, { passive: true })
  );

  ["mouseleave", "touchend"].forEach(evt =>
    scrollContainer.addEventListener(evt, () => {
      isPaused = false;
    }, { passive: true })
  );

  // Start auto-scroll after load
  window.addEventListener("load", () => {
    setTimeout(() => {
      startAutoScroll();
    }, 1000);
  });

  // Restart on resize
  window.addEventListener("resize", () => {
    stopAutoScroll();
    startAutoScroll();
  });
});
