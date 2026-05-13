"use client";

import React from "react";
import Image from "next/image";
import {
  EnvelopeSimple,
  Phone,
  ArrowRight,
  ArrowUp,
} from "@phosphor-icons/react";

export default function Contact() {
  const scrollToTop = () => {
    const element = document.getElementById("showcase");

    if (!element) return;

    const offset = 80;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;

    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;

    const duration = 1200;

    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;

      const progress = timestamp - start;

      const ease = (t: number) => (--t) * t * t + 1;

      window.scrollTo(
        0,
        startPosition + distance * ease(Math.min(progress / duration, 1))
      );

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  };

  return (
    <section
      id="contact"
      className="bg-black py-24 px-6 border-t border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="space-y-12">
            <div>
              <span className="text-red-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
                Get in Touch
              </span>

              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Inicie sua <br />{" "}
                <span className="text-red-600 italic">Jornada</span>
              </h2>

              <p className="text-gray-400 max-w-md leading-relaxed text-lg font-light">
                Dúvidas sobre o método Mastery ou deseja um plano
                personalizado? Nossa equipe está pronta para elevar o seu
                inglês ao padrão de excelência.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:filipevieira14@gmail.com"
                className="flex items-center gap-6 group w-fit"
              >
                <div className="w-14 h-14 bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <EnvelopeSimple size={24} weight="thin" />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    Email
                  </p>

                  <p className="text-lg font-bold text-white group-hover:text-red-600 transition-colors">
                    filipevieira14@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/5519991518640"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 group w-fit"
              >
                <div className="w-14 h-14 bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <Phone size={24} weight="thin" />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    WhatsApp
                  </p>

                  <p className="text-lg font-bold text-white group-hover:text-red-600 transition-colors">
                    +55 19 99151-8640
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-[#0A0A0A] p-8 lg:p-14 relative border border-white/10 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-red-600" />

            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600/30" />

            <form className="space-y-8">
              <div className="group space-y-2">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors"
                >
                  Seu Nome
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="DIGITE SEU NOME COMPLETO"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium placeholder:text-white/5 placeholder:text-[10px]"
                />
              </div>

              <div className="group space-y-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors"
                >
                  E-mail Corporativo
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="EMAIL@EXEMPLO.COM"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium placeholder:text-white/5 placeholder:text-[10px]"
                />
              </div>

              <div className="group space-y-2">
                <label
                  htmlFor="message"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors"
                >
                  Mensagem
                </label>

                <textarea
                  id="message"
                  rows={2}
                  placeholder="COMO PODEMOS AJUDAR?"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium resize-none placeholder:text-white/5 placeholder:text-[10px]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all duration-500 group relative"
              >
                Enviar Mensagem

                <ArrowRight
                  size={16}
                  weight="bold"
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 relative">

          <button
            onClick={scrollToTop}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-white/10 w-12 h-12 flex items-center justify-center text-white/30 hover:text-red-600 hover:border-red-600 transition-all duration-500 group"
          >
            <ArrowUp
              size={20}
              weight="bold"
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>

          <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="text-white/10 text-[9px] font-bold uppercase tracking-[0.5em]">
                Real World English © 2026 • High-End Learning Experience
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em]">
                Built by
              </span>

              <a
                href="https://kduarte.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-28 h-14 rounded-sm transition-all duration-500 border border-white/5 hover:border-red-600/50 hover:bg-red-600/5"
              >
                <Image
                  src="/k.svg"
                  alt="KDuarte Logo"
                  width={80}
                  height={30}
                  className="opacity-40 invert brightness-200 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-500 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}