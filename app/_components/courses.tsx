"use client";

import React from 'react';

const courses = [
  {
    level: "Essential",
    tag: "A1 - A2",
    title: "The Groundwork",
    description: "Para quem está começando do zero. Foco em situações cotidianas, pronúncia britânica básica e confiança para as primeiras conversas."
  },
  {
    level: "Intermediate",
    tag: "B1 - B2",
    title: "Cultural Bridge",
    description: "Onde a fluência ganha forma. Explore nuances do idioma, gírias locais e domine reuniões internacionais com naturalidade."
  },
  {
    level: "Advanced",
    tag: "C1 - C2",
    title: "British Mastery",
    description: "Refinamento máximo. Discussões complexas, negócios e o domínio do sotaque para quem busca a excelência de um nativo."
  }
];

export default function CourseLevels() {
  return (
    // Mudamos de bg-[#0a0a0a] para um off-white elegante
    <section id="courses" className="bg-[#f8f8f8] py-24 px-6 text-[#1a1a1a]">
      <div className="container mx-auto max-w-6xl">
        
        <div className="mb-16">
          <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase block mb-4">
            Nossa Jornada
          </span>
          {/* Título agora em preto com cinza suave */}
          <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
            Níveis de <br /> <span className="text-black/20 italic">Excelência</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index} 
              // Card agora é branco puro com uma sombra bem leve
              className="group relative bg-white border border-black/5 p-10 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-black text-black">{index + 1}</span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 text-white">
                    {course.tag}
                  </span>
                  <span className="text-black/40 text-xs font-bold uppercase tracking-widest">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-[#1a1a1a] mb-6 uppercase tracking-tight">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 group-hover:border-red-600/30 transition-colors">
                <button className="text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-red-600 transition-colors">
                  Saiba mais 
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-black/30 text-sm uppercase tracking-widest">
            Todos os cursos incluem suporte individual e imersão cultural.
          </p>
        </div>
      </div>
    </section>
  );
}