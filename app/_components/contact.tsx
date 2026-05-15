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

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
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

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Erro ao enviar mensagem."
        );
      }

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
                Inicie sua <br />
                <span className="text-red-600 italic">
                  Jornada
                </span>
              </h2>

              <p className="text-gray-400 max-w-md leading-relaxed text-lg font-light">
                Dúvidas sobre o método Mastery ou deseja um plano personalizado?
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

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
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
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="DIGITE SEU NOME COMPLETO"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium placeholder:text-white/5 placeholder:text-[10px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="group space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors"
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
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium placeholder:text-white/5 placeholder:text-[10px]"
                  />
                </div>

                <div className="group space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors"
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
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium placeholder:text-white/5 placeholder:text-[10px]"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label
                  htmlFor="message"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors"
                >
                  Mensagem
                </label>
///
                <textarea
                  id="message"
                  rows={2}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="COMO PODEMOS AJUDAR?"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-red-600 transition-all duration-300 text-white font-medium resize-none placeholder:text-white/5 placeholder:text-[10px]"
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all duration-500 group disabled:opacity-50 disabled:cursor-not-allowed"
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

                <p className="text-[8px] text-white/20 text-center leading-relaxed uppercase tracking-widest">
                  This site is protected by reCAPTCHA and the Google
                  <br />
                  <a
                    href="https://policies.google.com/privacy"
                    className="underline hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                  {" "}and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    className="underline hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>

                  {" "}apply.
                </p>
              </div>

              {status === "success" && (
                <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest text-center">
                  ✅ Mensagem enviada com sucesso!
                </p>
              )}

              {status === "error" && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                  ❌ {errorMessage}
                </p>
              )}
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
                className="group relative flex items-center justify-center w-20 h-12 rounded-sm border border-white/5 hover:border-red-600/50 hover:bg-red-600/5 transition-all duration-300"
              >
                <Image
                  src="/k.svg"
                  alt="KDuarte Logo"
                  width={60}
                  height={30}
                  className="w-auto h-auto object-contain opacity-40 invert brightness-200 group-hover:opacity-80 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}