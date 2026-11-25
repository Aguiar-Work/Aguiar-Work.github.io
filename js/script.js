document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const currentYear = document.getElementById("currentYear");
  const presentationVideo = document.querySelector(".presentation-video");
  const presentationStatus = document.querySelector(".presentation-status");

  // Atualiza o ano automaticamente no rodapé.
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Atualiza o status do vídeo sem interferir nos controles nativos.
  if (presentationVideo && presentationStatus) {
    const statusLabel = presentationStatus.querySelector(".presentation-status-label");
    const updateStatus = (value) => { if (statusLabel) statusLabel.textContent = value; };
    presentationVideo.addEventListener("play", () => updateStatus("PLAYING"));
    presentationVideo.addEventListener("pause", () => { if (!presentationVideo.ended) updateStatus("PAUSED"); });
    presentationVideo.addEventListener("ended", () => updateStatus("PLAYBACK_COMPLETE"));
  }

  // Abre e fecha o menu em telas menores.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
      if (!clickedInside && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  // Revela elementos conforme entram na área visível da tela.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }
});
