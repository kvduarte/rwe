"use client";

import React, { useState } from 'react';

export default function AboutUs() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <section id="rwe" className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-red-600 z-10" />
            <div className="relative h-125 w-full overflow-hidden hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1887" 
                alt="London Street" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-3000"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 p-8 hidden md:block">
              <p className="text-2xl font-black italic tracking-tighter">EST. 2026</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase">
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter italic">
                Muito além do <br />
                <span className="text-white/40">"The book is on the table"</span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed font-light">
              A <span className="text-white font-medium">Real World English</span> nasceu da frustração com métodos tradicionais e ineficazes de aprender inglês, os quais falham em levar o aluno ao seu objetivo final.
              <br />
              Nós não apenas ensinamos inglês; ensinamos a comunicação no idioma e tudo o que envolve esse universo: situações do dia a dia, profissionais e pessoais.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="border-l-2 border-red-600 pl-4">
                <h4 className="font-bold uppercase text-sm tracking-widest mb-1">Imersão Total</h4>
                <p className="text-gray-500 text-sm">Foco 100% na comunicação.</p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <h4 className="font-bold uppercase text-sm tracking-widest mb-1">Professor</h4>
                <p className="text-gray-500 text-sm">Aprenda com quem atua há mais de 15 anos no mercado, possui certificações internacionais e mais de 8 mil horas de estudo do idioma.</p>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-red-600 transition-colors cursor-pointer"
              >
                {showHistory ? "Fechar história" : "Conheça nossa história"}
                <div className={`h-px bg-red-600 transition-all ${showHistory ? 'w-20' : 'w-12 group-hover:w-20'}`} />
              </button>

              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showHistory ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                <div className="bg-neutral-900/50 p-6 border-l-2 border-red-600 italic">
                  <p className="text-gray-300 leading-relaxed">
                    "Comecei a dar aula de inglês em 2010 e por 2 anos tive uma mentoria onde aprendi verdadeiramente a como ensinar. Trabalhei em diversas escolas até passar 1 ano em Manchester, na Inglaterra, onde pude mergulhar na cultura local e dominar o idioma real. Hoje faço o que amo: transformar sonhos em realidade através da minha paixão pelo inglês."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}