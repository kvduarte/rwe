"use client";

import React, { useState, useEffect } from "react";

const touristSpots = [
  {
    url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=2070",
    location: "Westminster Abbey",
    position: "object-center",
  },
  {
    url: "/catedral.avif",
    location: "Canterbury Cathedral",
    position: "object-center",
  },
  {
    url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=2070",
    location: "Big Ben",
    position: "object-center",
  },
  {
    url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070",
    location: "Tower Bridge",
    position: "object-right",
  },
  {
    url: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=2070",
    location: "London Bridge",
    position: "object-center",
  },
  {
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
    location: "River Thames",
    position: "object-right",
  },
];

const keywords = [
  "Do Zero ao Avançado",
  "Inglês Corporativo",
  "Aulas Online",
  "Suporte ao Aluno",
  "Horários Flexíveis",
  "Conversação Prática",
];

export default function Showcase() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % touristSpots.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  function slowScrollTo(id: string) {
    const element = document.getElementById(id);

    if (!element) return;

    const offset = 80;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;

    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;

    const duration = 1200;

    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;

      const progress = timestamp - start;

      const ease = (t: number) => (--t) * t * t + 1;

      window.scrollTo(
        0,
        startPosition + distance * ease(Math.min(progress / duration, 1))
      );

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  return (
    <section
      id="showcase"
      className="relative h-screen min-h-175 w-full flex items-center justify-start overflow-hidden bg-neutral-900"
    >
      {touristSpots.map((spot, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-3000 ease-in-out"
          style={{
            opacity: index === activeImage ? 0.7 : 0,
            zIndex: index === activeImage ? 1 : 0,
          }}
        >
          <img
            src={spot.url}
            alt={spot.location}
            className={`w-full h-full object-cover transition-transform duration-10000 ease-linear ${
              spot.position || "object-center"
            } ${index === activeImage ? "scale-110" : "scale-100"}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent z-10" />

      <div className="relative z-20 container mx-auto px-6 md:px-16 lg:px-24">
        <div className="space-y-6 max-w-3xl text-left">
          {/* Badge de Autoridade com Localização Dinâmica */}
          <div className="flex items-center gap-4 border-l-4 border-red-600 pl-6 py-1">
            <span className="text-white text-xs tracking-[0.2em] uppercase font-bold drop-shadow-md">
              15 anos de experiência • +8.000 horas de aula • {touristSpots[activeImage].location}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter drop-shadow-2xl">
            Real World <br />
            <span className="text-red-600">English</span>
          </h1>

          <div className="space-y-3 max-w-xl">
            <p className="text-white text-base md:text-lg leading-relaxed font-medium drop-shadow-md">
              Inglês para adultos que querem desenvolver domínio prático do idioma com método, consistência e aplicação real.
            </p>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed border-l border-white/20 pl-4 py-0.5">
              Do inglês geral, do zero ao avançado, à preparação para situações profissionais, reuniões e comunicação no mercado de trabalho.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-2">
            <button
              onClick={() => slowScrollTo("courses")}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-bold uppercase tracking-widest transition-all duration-500 flex items-center group text-sm shadow-xl"
            >
              Ver Cursos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 group-hover:translate-x-1.5 transition-transform"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <button
              onClick={() => slowScrollTo("immersion")}
              className="bg-black/20 backdrop-blur-md border-2 border-white/50 hover:border-white text-white px-10 py-4 font-bold uppercase tracking-widest transition-all duration-500 text-sm"
            >
              Como Funciona
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t border-white/10 max-w-2xl">
            {keywords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="text-white/80 text-xs md:text-sm font-semibold tracking-wider uppercase drop-shadow-sm">
                  {word}
                </span>
                {idx < keywords.length - 1 && (
                  <span className="text-red-600 font-bold text-xs">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-30 flex gap-3">
        {touristSpots.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 transition-all duration-1000 rounded-full ${
              i === activeImage ? "w-16 bg-red-600" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}