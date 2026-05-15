"use client";

import React from 'react';

const courses = [
  {
    level: "Essential",
    tag: "A1 - A2",
    title: "The Groundwork",
    description: "Para quem está começando do zero. Foco em comunicação básica e confiança para as primeiras conversas."
  },
  {
    level: "Intermediate",
    tag: "B1 - B2",
    title: "Cultural Bridge",
    description: "Explore nuances do idioma e tenha mais confiança em conversas que exijam um vocabulário mais amplo."
  },
  {
    level: "Advanced",
    tag: "C1 - C2",
    title: "British Mastery",
    description: "Refinamento máximo do idioma. Discussões complexas e a possibilidade de se comunicar com o mundo."
  },
  {
    level: "Corporate",
    tag: "B2 - C2",
    title: "Business English",
    description: "Aprenda desde passar em uma entrevista de emprego até viver o dia a dia da vida corporativa (reuniões, apresentações de projetos e viagens a negócios)."
  }
];

export default function CourseLevels() {
  return (
    <section id="courses" className="bg-[#f8f8f8] py-20 px-6 text-[#1a1a1a]">
      <div className="container mx-auto max-w-350">
        
        <div className="mb-16">
          <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase block mb-4">
            Nossa Jornada
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
            Níveis de <br /> <span className="text-black/20 italic">Excelência</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-black/5 p-8 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-500 flex flex-col"
            >
              {/* Número de fundo */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-black text-black">{index + 1}</span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 text-white">
                  {course.tag}
                </span>
                <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                  {course.level}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-6 uppercase tracking-tight leading-[0.9]">
                {course.title}
              </h3>

              {/* Descrição - Removi o mb-8 para o texto ficar mais próximo da linha */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Linha decorativa - Agora ela segue o fluxo do texto sem pular pro final */}
              <div className="w-full pt-4 border-t border-black/5 group-hover:border-red-600/30 transition-colors" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-black/30 text-sm uppercase tracking-widest">
            Todos os cursos incluem suporte individual
          </p>
        </div>
      </div>
    </section>
  );
}