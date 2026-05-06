"use client";

import React from 'react';
import Image from "next/image";
// Certifique-se de importar a sua logo 'K' aqui
// import K from "@/public/caminho-da-sua-logo.svg"; 
import { EnvelopeSimple, Phone, ArrowRight } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#121212] py-24 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Lado Esquerdo: Identidade e Contatos */}
          <div className="space-y-12">
            <div>
              <span className="text-red-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
                Get in Touch
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                Inicie sua <br /> <span className="text-red-600 italic">Jornada</span>
              </h2>
              <p className="text-gray-400 max-w-md leading-relaxed text-lg font-light">
                Dúvidas sobre o método Mastery ou deseja um plano personalizado? Nossa equipe está pronta para elevar o seu inglês ao padrão de excelência.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-[#1a1a1a] border border-white/5 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-2xl">
                  <EnvelopeSimple size={24} weight="thin" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Email</p>
                  <p className="text-lg font-bold text-white">hello@rwe.com.br</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-[#1a1a1a] border border-white/5 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-2xl">
                  <Phone size={24} weight="thin" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">WhatsApp</p>
                  <p className="text-lg font-bold text-white">+55 62 99700-6167</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="bg-[#1a1a1a] p-10 lg:p-16 relative border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-red-600/30" />
            
            <form className="space-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Seu Nome</label>
                <input 
                  type="text" 
                  placeholder="EX: ARTHUR SHELBY"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-colors text-white font-medium placeholder:text-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">E-mail Corporativo</label>
                <input 
                  type="email" 
                  placeholder="EMAIL@EXEMPLO.COM"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-colors text-white font-medium placeholder:text-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Mensagem</label>
                <textarea 
                  rows={3}
                  placeholder="COMO PODEMOS AJUDAR?"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-colors text-white font-medium resize-none placeholder:text-white/5"
                />
              </div>

              <button className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all duration-500 group overflow-hidden relative">
                <span className="relative z-10">Enviar Mensagem</span>
                <ArrowRight size={16} weight="bold" className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer com Selo de Desenvolvimento */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-white/10 text-[9px] font-bold uppercase tracking-[0.5em]">
              Real World English © 2026 • All Rights Reserved
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em]">Developed by</span>
            <a
              href="https://kduarte.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex text-white items-center justify-center w-24 h-14 rounded-xl transition-all duration-500 border border-white/5 hover:border-red-600 hover:bg-red-600/10"
            >
              <Image
                // Substitua 'K' pela sua variável de imagem ou path
                src="/k.svg" 
                alt="KDuarte Logo"
                width={70}
                height={35}
                className="w-18 h-auto object-contain brightness-200 invert group-hover:brightness-100 transition-all duration-500"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}