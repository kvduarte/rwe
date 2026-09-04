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
    <section id="courses" className="bg-[#f8f8f8] py-12 md:py-20 px-4 sm:px-6 text-[#1a1a1a]">
      <div className="container mx-auto max-w-7xl">
        
        <div className="mb-10 md:mb-16">
          <span className="text-red-600 font-bold tracking-[0.2em] sm:tracking-[0.3em] text-xs uppercase block mb-3">
            Nossa Jornada
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
            Níveis de <br /> <span className="text-black/30 italic">Excelência</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-black/10 p-6 sm:p-8 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity select-none">
                  <span className="text-5xl sm:text-6xl font-black text-black">{index + 1}</span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-red-600 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 text-white">
                    {course.tag}
                  </span>
                  <span className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4 uppercase tracking-tight leading-tight">
                  {course.title}
                </h3>

                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed mb-6">
                  {course.description}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-black/10 group-hover:border-red-600/40 transition-colors" />
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-widest">
            Todos os cursos incluem suporte individual
          </p>
        </div>
      </div>
    </section>
  );
}