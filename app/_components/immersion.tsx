"use client";

import React from 'react';

const immersionSteps = [
  {
    id: "01",
    title: "Real-Life Scenarios",
    desc: "Inglês real do dia a dia, desde cumprimentar alguém até situações que envolvam o uso do inglês em contextos específicos."
  },
  {
    id: "02",
    title: "Cultural Deep Dive",
    desc: "Inglês não é só a fala, mas também particularidades do idioma em diferentes contextos e culturas."
  },
  {
    id: "03",
    title: "Native Echo",
    desc: "Foco total na fonética e no ritmo da fala (Connected Speech), eliminando barreiras entre você e a compreensão de um nativo."
  }
];

export default function Immersion() {
  return (
    <section id="immersion" className="bg-black py-16 md:py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-80 sm:h-105 md:h-150 w-full overflow-hidden group rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=2070" 
                alt="Big Ben and Westminster Bridge" 
                loading="lazy"
                className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-black/95 text-white p-4 sm:p-6 backdrop-blur-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-red-500 mb-1">Location</p>
                <p className="text-sm font-serif italic text-white">Big Ben, Westminster SW1A</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8 md:space-y-12">
            <div className="space-y-4">
              <span className="text-red-600 font-bold tracking-[0.4em] text-[10px] uppercase block">
                Methodology
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter">
                A Imersão <br /> 
                <span className="text-red-600 italic">Definitiva</span>
              </h2>
              <p className="text-zinc-300 text-base md:text-lg max-w-md font-light">
                Esqueça os livros didáticos genéricos. Nossa metodologia é baseada na vivência do mundo real.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {immersionSteps.map((step) => (
                <div key={step.id} className="group flex gap-5 sm:gap-6 border-b border-zinc-800 pb-6 sm:pb-8">
                  <span className="text-2xl font-serif italic text-red-500/60 group-hover:text-red-500 transition-colors">
                    {step.id}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed group-hover:text-zinc-200 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}