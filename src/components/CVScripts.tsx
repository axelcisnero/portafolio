"use client";

import { useEffect } from "react";

/**
 * Replica las interacciones del app.js original de la plantilla:
 * nav scroll, menú móvil, estrellas, reveal, i18n ES/EN, tema y formulario.
 * Se ejecuta tras la hidratación sobre el DOM ya renderizado.
 */
export function CVScripts() {
  useEffect(() => {
    /* ---------- año ---------- */
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());

    /* ---------- nav scroll ---------- */
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- menú móvil ---------- */
    const burger = document.getElementById("hamburger");
    const menu = document.getElementById("mobileMenu");
    const closeMenu = () => {
      menu?.classList.remove("open");
      burger?.classList.remove("open");
      document.body.style.overflow = "";
    };
    const onBurger = () => {
      const open = menu?.classList.toggle("open");
      burger?.classList.toggle("open", !!open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger?.addEventListener("click", onBurger);
    menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

    /* ---------- estrellas ---------- */
    const starSvg = (on: boolean) =>
      '<svg viewBox="0 0 24 24" class="' +
      (on ? "on" : "off") +
      '"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z"/></svg>';
    document.querySelectorAll<HTMLElement>("[data-stars]").forEach((el) => {
      const n = parseInt(el.getAttribute("data-stars") || "0", 10) || 0;
      let html = "";
      for (let i = 1; i <= 5; i++) html += starSvg(i <= n);
      el.innerHTML = html;
    });

    /* ---------- miniaturas de proyectos (servicio de captura) ---------- */
    document.querySelectorAll<HTMLImageElement>("img[data-thumb]").forEach((img) => {
      const url = img.getAttribute("data-thumb");
      if (!url) return;
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
      img.src = "https://image.thum.io/get/width/900/crop/680/noanimate/" + url;
    });

    /* ---------- reveal on scroll ---------- */
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      document.querySelectorAll(".reveal").forEach((el) => io?.observe(el));
    } else {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }

    /* ---------- i18n ES/EN ---------- */
    const I18N_KEY = "cv-axel-lang";
    document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
      el.setAttribute("data-es", el.innerHTML);
    });
    document.querySelectorAll<HTMLElement>("[data-en-ph]").forEach((el) => {
      el.setAttribute("data-es-ph", el.getAttribute("placeholder") || "");
    });
    const setLang = (lang: string) => {
      const en = lang === "en";
      document.documentElement.lang = en ? "en" : "es";
      document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
        el.innerHTML = en ? el.getAttribute("data-en") || "" : el.getAttribute("data-es") || "";
      });
      document.querySelectorAll<HTMLElement>("[data-en-ph]").forEach((el) => {
        el.setAttribute("placeholder", en ? el.getAttribute("data-en-ph") || "" : el.getAttribute("data-es-ph") || "");
      });
      document.querySelectorAll<HTMLElement>("#langToggle button").forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-lang") === lang);
      });
      try {
        localStorage.setItem(I18N_KEY, lang);
      } catch {}
    };
    const langBtns = document.querySelectorAll<HTMLElement>("#langToggle button");
    const langHandlers: Array<[HTMLElement, () => void]> = [];
    langBtns.forEach((b) => {
      const h = () => setLang(b.getAttribute("data-lang") || "es");
      b.addEventListener("click", h);
      langHandlers.push([b, h]);
    });
    let savedLang = "es";
    try {
      savedLang = localStorage.getItem(I18N_KEY) || "es";
    } catch {}
    if (savedLang === "en") setLang("en");

    /* ---------- tema claro / oscuro ---------- */
    const THEME_KEY = "cv-axel-theme";
    const setTheme = (theme: string) => {
      document.documentElement.setAttribute("data-dark", theme === "dark" ? "true" : "false");
      document.querySelectorAll<HTMLElement>("#themeToggle button").forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-theme") === theme);
      });
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch {}
    };
    const themeBtns = document.querySelectorAll<HTMLElement>("#themeToggle button");
    const themeHandlers: Array<[HTMLElement, () => void]> = [];
    themeBtns.forEach((b) => {
      const h = () => setTheme(b.getAttribute("data-theme") || "light");
      b.addEventListener("click", h);
      themeHandlers.push([b, h]);
    });
    let savedTheme = "light";
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || "light";
    } catch {}
    setTheme(savedTheme);

    /* ---------- formulario de contacto (mailto) ---------- */
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    const msg = document.getElementById("formMsg");
    const showMsg = (text: string, ok: boolean) => {
      if (!msg) return;
      msg.textContent = text;
      msg.className = "form-msg " + (ok ? "ok" : "err");
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const isEN = document.documentElement.lang === "en";
      const data = {
        nombre: (form.elements.namedItem("nombre") as HTMLInputElement)?.value.trim() || "",
        email: (form.elements.namedItem("email") as HTMLInputElement)?.value.trim() || "",
        asunto: (form.elements.namedItem("asunto") as HTMLInputElement)?.value.trim() || "",
        mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement)?.value.trim() || "",
      };
      const subject = encodeURIComponent(
        data.asunto || (isEN ? "Message from your CV website" : "Mensaje desde tu Hoja de Vida")
      );
      const bodyText = encodeURIComponent(
        (isEN ? "Name: " : "Nombre: ") + data.nombre + "\n" + (isEN ? "Email: " : "Correo: ") + data.email + "\n\n" + data.mensaje
      );
      window.location.href = "mailto:axel.cisnero@hotmail.com?subject=" + subject + "&body=" + bodyText;
      showMsg(isEN ? "Opening your email app…" : "Abriendo tu aplicación de correo…", true);
    };
    form?.addEventListener("submit", onSubmit);

    /* ---------- limpieza ---------- */
    return () => {
      window.removeEventListener("scroll", onScroll);
      burger?.removeEventListener("click", onBurger);
      menu?.querySelectorAll("a").forEach((a) => a.removeEventListener("click", closeMenu));
      langHandlers.forEach(([b, h]) => b.removeEventListener("click", h));
      themeHandlers.forEach(([b, h]) => b.removeEventListener("click", h));
      form?.removeEventListener("submit", onSubmit);
      io?.disconnect();
    };
  }, []);

  return null;
}
