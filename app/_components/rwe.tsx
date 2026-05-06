"use client";

import React from 'react';

export default function AboutUs() {
  return (
    <section id="rwe" className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo: Imagem com Moldura Estilizada */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-red-600 z-10" />
            <div className="relative h-[500px] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1887" 
                alt="London Street" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[3000ms]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 p-8 hidden md:block">
              <p className="text-4xl font-black italic tracking-tighter">EST. 2026</p>
            </div>
          </div>

          {/* Lado Direito: Conteúdo Textual */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase">
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter italic">
                Muito além do <br />
                <span className="text-white/40">"The book is on the table"</span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed font-light">
              A <span className="text-white font-medium">Real World English</span> nasceu da frustração com métodos tradicionais que ensinam gramática, mas esquecem da vida. Nós não apenas ensinamos inglês; nós transportamos você para as ruas de Londres.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="border-l-2 border-red-600 pl-4">
                <h4 className="font-bold uppercase text-sm tracking-widest mb-1">Imersão Total</h4>
                <p className="text-gray-500 text-sm">Foco 100% na cultura, sotaque e cotidiano britânico real.</p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <h4 className="font-bold uppercase text-sm tracking-widest mb-1">Nativos</h4>
                <p className="text-gray-500 text-sm">Aprenda com quem vive o idioma na sua forma mais pura.</p>
              </div>
            </div>

            <div className="pt-6">
              <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-red-600 transition-colors">
                Conheça nossa história
                <div className="h-[1px] w-12 bg-red-600 group-hover:w-20 transition-all" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}