"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("showcase");
  const [isScrolling, setIsScrolling] = useState(false);

  const whatsappUrl =
    "https://wa.me/5519991518640?text=Olá! Gostaria de saber mais sobre os cursos de inglês.";

  const navLinks = [
    { name: "Sobre nós", id: "rwe" },
    { name: "Cursos", id: "courses" },
    { name: "Metodologia", id: "immersion" },
    { name: "Experiências", id: "testimonials" },
    { name: "Contato", id: "contact" },
  ];

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

      window.scrollTo(
        0,
        startPosition + distance * easeInOutCubic
      );

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
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`relative flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-transparent"
          }`}
        >
          <button
            onClick={() => slowScrollTo("showcase")}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative w-12 h-10 border border-white/10 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform shrink-0">
              <div className="absolute inset-0 bg-[#00247D]" />
              <div className="absolute top-1/2 left-0 w-full h-3 bg-white -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 w-3 h-full bg-white -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-[#CF142B] -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 w-1.5 h-full bg-[#CF142B] -translate-x-1/2" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-white text-xl font-serif font-bold tracking-tight leading-none">
                Real World
              </span>

              <span className="text-red-600 text-[11px] font-black uppercase tracking-[0.6em] leading-none mt-1 pl-1">
                English
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.name}
                  onClick={() => slowScrollTo(link.id)}
                  className={`relative text-[12px] font-bold uppercase tracking-[0.15em] transition-colors group ${
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
              Matricule-se
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-8 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <button
          className="absolute top-8 right-8 text-white hover:text-red-600 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>

        {navLinks.map((link) => {
          const isActive = activeSection === link.id;

          return (
            <button
              key={link.name}
              onClick={() => slowScrollTo(link.id)}
              className={`text-3xl font-black uppercase tracking-tight transition-colors ${
                isActive
                  ? "text-red-600"
                  : "text-white hover:text-red-600"
              }`}
            >
              {link.name}
            </button>
          );
        })}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-red-600 text-white px-10 py-4 font-black uppercase tracking-widest rounded-full text-base shadow-2xl hover:scale-105 transition-transform"
        >
          Falar no WhatsApp
        </a>
      </div>
    </nav>
  );
}