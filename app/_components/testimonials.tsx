"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Elizabeth Windsor",
    role: "Diplomatic Consultant",
    content: "A precisão linguística e o refinamento cultural oferecidos aqui transcendem o ensino tradicional. É a diferença entre falar inglês e dominar a arte da comunicação britânica.",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Arthur Shelby",
    role: "Business Director",
    content: "Aprendi a me posicionar com autoridade em reuniões internacionais. O sotaque britânico polido abriu portas que eu nem sabia que existiam.",
    location: "São Paulo, BR",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Victoria Harrison",
    role: "Content Creator",
    content: "O foco na pronúncia e nas gírias locais me deu a confiança que faltava. Hoje transito por Brighton e Manchester com total naturalidade.",
    location: "Brighton, UK",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section id="testimonials" className="bg-[#f8f8f8] py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        
        <div className="mb-16 flex justify-between items-end">
          <div>
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase block mb-4">
              Alunos que atingiram o topo
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
              Impacto <br /> <span className="text-black/20 italic">Real</span>
            </h2>
          </div>

          {/* Botões de Navegação Minimalistas */}
          <div className="flex gap-2">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-red-600 text-white flex items-center justify-center hover:bg-black transition-all duration-300 shadow-lg shadow-red-600/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="relative min-h-[450px] lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Foto com moldura estilizada */}
              <div className="lg:col-span-4 relative">
                <div className="aspect-square grayscale hover:grayscale-0 transition-all duration-700 relative z-10">
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Elemento Decorativo (Quadrado Vermelho atrás) */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600 -z-0" />
              </div>

              {/* Conteúdo */}
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-red-600" />
                  <span className="text-black/40 text-xs font-bold uppercase tracking-[0.2em]">
                    {current.location}
                  </span>
                </div>

                <blockquote className="text-2xl md:text-4xl font-medium text-[#1a1a1a] leading-tight mb-10 italic">
                  "{current.content}"
                </blockquote>

                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
                    {current.name}
                  </h4>
                  <p className="text-red-600 text-xs font-bold uppercase tracking-widest mt-1">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicador de progresso discreto */}
        <div className="mt-20 flex gap-2">
          {testimonials.map((_, i) => (
            <div 
              key={i}
              className={`h-[2px] transition-all duration-500 ${index === i ? 'w-12 bg-red-600' : 'w-4 bg-black/10'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}