"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  EnvelopeSimple,
  Phone,
  ArrowRight,
  ArrowUp,
} from "@phosphor-icons/react";

declare global {
  interface Window {
    grecaptcha: any;
    gtag?: (...args: any[]) => void;
  }
}

export default function Contact() {
  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "init" | "sending" | "success" | "error"
  >("init");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function getRecaptchaToken() {
    if (!SITE_KEY)
      throw new Error("Site key do reCAPTCHA não configurada.");

    if (!window.grecaptcha)
      throw new Error("reCAPTCHA não carregado.");

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then((token: string) => resolve(token))
          .catch(reject);
      });
    });
  }

  function gtag_report_conversion() {
    console.log("Google Ads: tentando registrar conversão...");

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-18358577900/cbcfCOiYsd8cEOzVhrJE",
      });

      console.log("Google Ads: conversão enviada!");
    } else {
      console.warn(
        "Google Ads: window.gtag não está carregado."
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage(null);

    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone,
          mensagem: formData.message,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      console.log("STATUS DA API:", response.status);
      console.log("RESULTADO DA API:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Erro ao enviar mensagem."
        );
      }

      // Google Ads: registra a conversão somente após o envio bem-sucedido
      gtag_report_conversion();

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => setStatus("init"), 5000);
    } catch (error: any) {
      console.error("Erro no envio:", error);

      setStatus("error");

      setErrorMessage(
        error.message || "Erro interno no servidor."
      );
    }
  }

  const scrollToTop = () => {
    const startPosition = window.scrollY;

    const duration = 900;

    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (!startTime) startTime = currentTime;

      const timeElapsed = currentTime - startTime;

      const progress = Math.min(timeElapsed / duration, 1);

      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(
        0,
        startPosition * (1 - easeInOutCubic)
      );

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-8 sm:px-10 lg:px-12 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Coluna da Esquerda (Mantida à esquerda com recuo seguro) */}
          <div className="space-y-8 sm:space-y-12 text-left pl-2 sm:pl-0">
            <div>
              <span className="text-red-600 font-bold tracking-[0.3em] sm:tracking-[0.4em] text-xs uppercase block mb-4">
                Get in Touch
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6 sm:mb-8">
                Inicie sua <br />
                <span className="text-red-600 italic">
                  Jornada
                </span>
              </h2>

              <p className="text-gray-300 max-w-md leading-relaxed text-base sm:text-lg font-light">
                Dúvidas sobre o método Mastery ou deseja um plano personalizado?
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:filipevieira14@gmail.com"
                className="flex items-center gap-4 sm:gap-6 group w-fit text-left"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#111] border border-white/20 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 rounded-sm shrink-0">
                  <EnvelopeSimple size={24} weight="thin" className="text-white" />
                </div>

                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Email
                  </p>

                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-red-600 transition-colors break-all">
                    filipevieira14@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/5519991518640"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 sm:gap-6 group w-fit text-left"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#111] border border-white/20 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 rounded-sm shrink-0">
                  <Phone size={24} weight="thin" className="text-white" />
                </div>

                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    WhatsApp
                  </p>

                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-red-600 transition-colors">
                    +55 19 99151-8640
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Card do Formulário */}
          <div className="bg-[#0A0A0A] p-6 sm:p-10 lg:p-14 relative border border-white/15 shadow-2xl backdrop-blur-sm rounded-sm">

            <div className="absolute top-0 right-0 w-10 sm:w-12 h-10 sm:h-12 border-t-2 border-r-2 border-red-600" />

            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600/40" />

            <form
              onSubmit={handleSubmit}
              className="space-y-6 sm:space-y-8"
            >
              <div className="group space-y-2 text-left">
                <label
                  htmlFor="name"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-red-600 transition-colors block"
                >
                  Seu Nome
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="DIGITE SEU NOME COMPLETO"
                  className="w-full bg-transparent border-b border-white/40 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium text-sm sm:text-base placeholder:text-gray-500 placeholder:text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

                <div className="group space-y-2 text-left">
                  <label
                    htmlFor="email"
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-red-600 transition-colors block"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL@EXEMPLO.COM"
                    className="w-full bg-transparent border-b border-white/40 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium text-sm sm:text-base placeholder:text-gray-500 placeholder:text-xs"
                  />
                </div>

                <div className="group space-y-2 text-left">
                  <label
                    htmlFor="phone"
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-red-600 transition-colors block"
                  >
                    WhatsApp
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-transparent border-b border-white/40 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium text-sm sm:text-base placeholder:text-gray-500 placeholder:text-xs"
                  />
                </div>
              </div>

              <div className="group space-y-2 text-left">
                <label
                  htmlFor="message"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-red-600 transition-colors block"
                >
                  Mensagem
                </label>

                <textarea
                  id="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="COMO PODEMOS AJUDAR?"
                  className="w-full bg-transparent border-b border-white/40 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium text-sm sm:text-base resize-none placeholder:text-gray-500 placeholder:text-xs"
                />
              </div>

              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-white text-black py-4 sm:py-5 font-black uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all duration-500 group disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                  {status === "sending"
                    ? "Enviando..."
                    : "Enviar Mensagem"}

                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed uppercase tracking-widest">
                  This site is protected by reCAPTCHA and the Google
                  <br />

                  <a
                    href="https://policies.google.com/privacy"
                    className="underline text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>

                  {" "}and{" "}

                  <a
                    href="https://policies.google.com/terms"
                    className="underline text-gray-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>

                  {" "}apply.
                </p>
              </div>

              {status === "success" && (
                <p className="text-green-400 text-xs font-bold uppercase tracking-widest text-center">
                  ✅ Mensagem enviada com sucesso!
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                  ❌ {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-20 sm:mt-32 pt-10 sm:pt-12 border-t border-white/10 relative">

          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-white/20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-red-600 hover:border-red-600 transition-all duration-500 group rounded-sm"
          >
            <ArrowUp
              size={20}
              weight="bold"
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>

          <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8 items-start md:items-center text-left">

            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.25em]">
                Real World English © 2026 • High-End Learning Experience
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">

              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                Built by
              </span>

              <a
                href="https://kduarte.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-20 h-12 rounded-sm border border-white/10 hover:border-red-600/50 hover:bg-red-600/5 transition-all duration-300"
              >
                <Image
                  src="/k.svg"
                  alt="KDuarte Logo"
                  width={60}
                  height={30}
                  className="w-auto h-auto object-contain opacity-60 invert brightness-200 group-hover:opacity-100 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}