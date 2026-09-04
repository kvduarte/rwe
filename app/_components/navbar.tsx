"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("showcase");
  const [isScrolling, setIsScrolling] = useState(false);

  const whatsappUrl =
    "https://wa.me/5519991518640?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20cursos%20de%20ingl%C3%AAs.";

  const navLinks = [
    { name: "Sobre nós", id: "rwe" },
    { name: "Cursos", id: "courses" },
    { name: "Metodologia", id: "immersion" },
    { name: "Experiências", id: "testimonials" },
    { name: "Contato", id: "contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      setScrolled(window.scrollY > 50);

      const sections = [
        "showcase",
        "rwe",
        "courses",
        "immersion",
        "testimonials",
        "contact",
      ];

      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

  function slowScrollTo(id: string) {
    setIsOpen(false);

    const element = document.getElementById(id);

    if (!element) return;

    setIsScrolling(true);

    const navbarOffset = 80;

    const targetPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200;

    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        setIsScrolling(false);
      }
    }

    requestAnimationFrame(animation);
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-transparent" : "py-6 bg-linear-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className={`relative flex items-center justify-between px-6 sm:px-8 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-transparent"
          }`}
        >
          <button
            onClick={() => slowScrollTo("showcase")}
            className="flex items-center gap-3.5 group cursor-pointer outline-none text-left"
            aria-label="Ir para o início"
          >
            <div className="relative w-11 h-7 sm:w-12 sm:h-8 border border-white/15 overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 shrink-0 rounded-sm">
              <svg
                viewBox="0 0 60 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
              >
                <rect width="60" height="30" fill="#012169" />
                <path d="M0 0L60 30M60 0L0 30" stroke="#FFF" strokeWidth="6" />
                <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
                <path d="M30 0V30M0 15H60" stroke="#FFF" strokeWidth="10" />
                <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-white text-lg sm:text-xl font-serif font-bold tracking-tight leading-none">
                Real World
              </span>
              <span className="text-red-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] leading-none mt-1 pl-0.5">
                English
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.name}
                  onClick={() => slowScrollTo(link.id)}
                  className={`relative text-[12px] font-bold uppercase tracking-[0.15em] transition-colors group cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white hover:bg-white hover:text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl inline-block active:scale-95"
            >
              Falar pelo WhatsApp
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 w-[68%] max-w-85 bg-black/85 backdrop-blur-2xl border-l border-white/10 px-8 py-10 flex flex-col justify-center z-50 transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-8 right-6 text-white/60 hover:text-white p-2 transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-7 text-left">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <button
                key={link.name}
                onClick={() => slowScrollTo(link.id)}
                className={`text-left text-base uppercase tracking-[0.25em] font-normal transition-colors ${
                  isActive
                    ? "text-red-500 font-medium"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            );
          })}

          <div className="pt-4 mt-2 border-t border-white/10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-red-500 hover:text-red-400 transition-colors"
            >
              Falar pelo WhatsApp →
            </a>
          </div>
        </div>
      </aside>
    </nav>
  );
}