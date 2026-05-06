"use client";

import React, { useState, useEffect } from 'react';

const touristSpots = [
  {
    url: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=2070',
    location: 'Westminster Abbey',
    position: 'object-center'
  },
  {
    // Agora usando o seu arquivo local
    url: '/catedral.avif', 
    location: 'Canterbury Cathedral',
    position: 'object-center'
  },
  {
    url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=2070',
    location: 'Big Ben',
    position: 'object-center' // Ajuste para focar no topo da torre à direita
  },
  {
    url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070',
    location: 'London Eye',
    position: 'object-right'
  },
  {
    url: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=2070',
    location: 'Stonehenge',
    position: 'object-center'
  },
  {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070',
    location: 'Tower Bridge',
    position: 'object-right'
  }
];

export default function Showcase() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % touristSpots.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="showcase" className="relative h-screen min-h-[700px] w-full flex items-center justify-start overflow-hidden bg-neutral-900 font-sans">
      {/* Background Images */}
      {touristSpots.map((spot, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{
            opacity: index === activeImage ? 0.7 : 0,
            zIndex: index === activeImage ? 1 : 0,
          }}
        >
          <img 
            src={spot.url} 
            alt={spot.location}
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
              spot.position || 'object-center'
            } ${index === activeImage ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-16 lg:px-24">
        <div className="space-y-8 max-w-3xl text-left">
          
          <div className="flex items-center gap-4 border-l-4 border-red-600 pl-6 py-1">
            <span className="text-white text-xs tracking-[0.2em] uppercase font-bold drop-shadow-md">
              Metodologia 100% Britânica • {touristSpots[activeImage].location}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter drop-shadow-2xl">
            Real World <br /> 
            <span className="text-red-600">English</span>
          </h1>

          <p className="text-white text-lg md:text-xl max-w-md leading-relaxed font-medium drop-shadow-md">
            Não aprenda apenas gramática. Viva o idioma. A <span className="text-white font-black underline decoration-red-600 underline-offset-4">RWE</span> conecta você diretamente com o cotidiano da Inglaterra.
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center group text-sm shadow-xl">
              Ver Cursos
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1.5 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <button className="bg-black/20 backdrop-blur-md border-2 border-white/50 hover:border-white text-white px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 text-sm">
              Como Funciona
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-30 flex gap-3">
        {touristSpots.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 transition-all duration-700 rounded-full ${i === activeImage ? 'w-16 bg-red-600' : 'w-4 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}