"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappUrl = "https://wa.me/5519991518640?text=Olá! Gostaria de saber mais sobre os cursos de inglês.";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre nós', href: '#rwe' },
    { name: 'Cursos', href: '#courses' },
    { name: 'Metodologia', href: '#immersion' },
    { name: 'Experiências', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6' // Diminuído de 6/10 para 3/6
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`relative flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}>
          
          {/* Logo - Tamanho levemente reduzido para compactar a altura */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 border border-white/10 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-[#00247D]" />
              <div className="absolute top-1/2 left-0 w-full h-2 bg-white -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 w-2 h-full bg-white -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-1 bg-[#CF142B] -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 w-1 h-full bg-[#CF142B] -translate-x-1/2" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-white text-xl font-serif font-bold tracking-tight">
                Real World
              </span>
              <span className="text-red-600 text-[9px] font-black uppercase tracking-[0.45em] mt-1">
                English
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white text-[12px] font-bold uppercase tracking-[0.12em] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Botão Matricule-se - Padding reduzido */}
          <div className="hidden lg:block">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white hover:bg-white hover:text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl inline-block active:scale-95"
            >
              Matricule-se
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-8 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <button 
          className="absolute top-8 right-8 text-white hover:text-red-600 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>
        
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-red-600 text-white px-10 py-4 font-black uppercase tracking-widest rounded-full text-base shadow-2xl hover:scale-105 transition-transform"
        >
          Falar no WhatsApp
        </a>
      </div>
    </nav>
  );
}