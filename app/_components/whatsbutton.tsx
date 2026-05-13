"use client"

import Image from "next/image"
import { WhatsappLogo } from "@phosphor-icons/react"

export function WhatsappButton() {
  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center group">
      
      <span className="mr-3 bg-black/80 backdrop-blur-lg border border-white/10 text-white text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-sm shadow-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden sm:block">
        Quero ser aluno
      </span>
      <a
        href="https://wa.me/5519991518640"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-[#25D366] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 animate-bounce-slow"
      >
        <WhatsappLogo size={32} weight="fill" color="white" />
        
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </a>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}