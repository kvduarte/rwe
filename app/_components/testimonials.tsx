"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Amanda Bispo",
    role: "Gerente Nacional de Contas Chaves na empresa Mosaic Brasil",
    content: "Fiz aulas com o Filipe durante quase 06 anos, ele me preparou para um intercâmbio e durante esses anos deu um salto no meu inglês para negócios, isso me permitiu atingir novas posições no meu trabalho, trabalhar com equipes e lideranças globais da multinacional que eu atuo hoje. Sou grata ao Filipe, ao seu método de trabalho, ao seu profissionalismo e seu cuidado. Todas as aulas foram personalizadas com muita atenção e pensando sempre nas minhas demandas e desenvolvimento profissional.",
    image: "/aluna 1.jpeg"
  },
  {
    id: 2,
    name: "Vitória Carpani",
    role: "Analista Júnior na DSV Air & Sea Logistics",
    content: "Oii, meu nome é Vitória Carpani, eu tenho 21 anos e sempre quis aprender Inglês, desde a adolescência me interessava por músicas, séries e até livros em Inglês. Iniciei o Duolingo e acrescentava o Inglês cada dia um pouquinho mais na minha rotina, passava horas ouvindo músicas, tentando pronunciar as palavras, e procurando as traduções. Até que decidi fazer Comércio Exterior e iniciei o meu curso com o Teacher Filipe, sempre pensei que não tinha como trabalhar com Comércio Exterior e não falar o mínimo de Inglês. Aos 19 anos, consegui um estágio na minha área em uma multinacional, e isso foi uma motivação maior para investir ainda mais no idioma. Hoje, com 21 anos, sou formada em Comércio Exterior, e Analista Júnior na empresa em que iniciei meu estágio. O Inglês me abriu portas profissionais, começando pelo cargo que atuo hoje, e com isso também me trouxe grandes responsabilidades como precisar fazer uma auditoria toda em Inglês, de um dos meus clientes. Mas isso também me deu uma certeza de que estou indo pelo caminho certo! Acho que falar um segundo idioma é muito importante nos dias de hoje, e por que não falar um que é considerado o principal idioma do mundo?",
    image: "/aluna 2.jpeg"
  },
  {
    id: 3,
    name: "Matheus",
    role: "Analista de planejamento de produto - Honda",
    content: "Iniciei o curso com um nível básico de inglês, enquanto já atuava em uma posição com alta exposição ao idioma em uma multinacional. No entanto, ainda não possuía a confiança necessária para me comunicar com segurança, especialmente em reuniões e apresentações. Ao longo de quase três anos de aprendizado, tive uma evolução significativa em todos os aspectos da língua, o que foi fundamental para conquistar uma oportunidade na área de planejamento de produto na Honda. Hoje, utilizo o inglês diariamente em conversas e apresentações, inclusive in níveis executivos. Tenho certeza de que, sem as aulas do professor Filipe com foco no inglês prático, esse avanço — tanto profissional quanto no domínio do idioma — não teria sido possível",
    image: "/aluno 3.jpeg"
  },
  {
    id: 4,
    name: "Agda Souza",
    role: "Professora, Atriz e Dubladora",
    content: "Me chamo Agda souza, trabalho como professora, atriz e dubladora, e uma das minhas maiores dificuldades sempre foi a fala no inglês. Eu tinha muita vergonha, era extremamente tímida e, mesmo tendo passado por vários professores ao longo dos anos, nunca conseguia me sentir confortável nas aulas. Muitas vezes eram métodos focados apenas em folhas, exercícios escritos e atividades que pouco estimulavam a conversação. Com o professor Filipe, isso mudou completamente. Desde o começo senti afinidade e um ambiente seguro para me desafiar na fala, errar sem medo e finalmente destravar. Aos poucos fui perdendo a timidez e conseguindo me comunicar de verdade em inglês, algo que por muito tempo achei que não conseguiu. Faço aula há anos e uma das coisas que mais me marcou foi conseguir ir a um show de um artista internacional sem precisar de tradutor… e ainda traduzir as falas do artista para minhas colegas hahaha! Foi um momento simples, mas muito especial pra mim, porque percebi o quanto evoluí. Sou muito grata ao professor Filipe e às aulas, que fizeram toda diferença na minha confiança e comunicação. E sinceramente? Não tenho intenção nenhuma de parar",
    image: "/aluna 4.jpeg" 
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [index]);

  const current = testimonials[index];
  const isAmanda = current.id === 1;

  return (
    <section 
      id="testimonials" 
      className="bg-[#f8f8f8] py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        
        <div className="mb-10 md:mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <span className="text-red-600 font-bold tracking-[0.2em] sm:tracking-[0.3em] text-xs uppercase block mb-3">
              Alunos que atingiram o topo
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
              Impacto <br /> <span className="text-black/30 italic">Real</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={prevTestimonial}
              aria-label="Depoimento anterior"
              className="w-11 h-11 sm:w-12 sm:h-12 border border-black/20 text-[#1a1a1a] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 rounded-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextTestimonial}
              aria-label="Próximo depoimento"
              className="w-11 h-11 sm:w-12 sm:h-12 bg-red-600 text-white flex items-center justify-center hover:bg-black transition-all duration-300 shadow-md rounded-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="relative min-h-95 sm:min-h-105">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start transition-all duration-500 p-6 sm:p-8 md:p-12 relative ${
                isAmanda 
                ? 'bg-white border-l-4 border-red-600 shadow-lg shadow-black/5' 
                : 'bg-white border border-black/10'
              }`}
            >
              <div className="lg:col-span-4 relative mx-auto lg:mx-0 w-full max-w-70 lg:max-w-none">
                <div className="aspect-square relative z-10 overflow-hidden bg-zinc-100 border border-black/10 rounded-sm">
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400?text=Profile"; }}
                  />
                  
                  {isAmanda && (
                    <div className="absolute top-3 right-3 z-20 bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className={`absolute -bottom-3 -right-3 w-full h-full z-0 transition-all duration-700 ${
                  isAmanda 
                  ? 'border border-red-600/30 bg-red-600/5' 
                  : 'border border-black/10'
                }`} />
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`h-px transition-all duration-500 ${isAmanda ? 'w-16 sm:w-20 bg-red-600' : 'w-10 bg-black/30'}`} />
                  {isAmanda && (
                    <span className="text-red-600 text-[11px] font-black uppercase tracking-widest">
                      História de Destaque • Case de Sucesso
                    </span>
                  )}
                </div>

                <div className="relative">
                  <blockquote 
                    className={`text-lg sm:text-xl md:text-2xl leading-relaxed italic transition-all duration-500 text-zinc-800 ${
                      !isExpanded ? 'line-clamp-4 sm:line-clamp-5' : ''
                    }`}
                  >
                    "{current.content}"
                  </blockquote>
                  
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 text-red-600 text-xs font-black uppercase tracking-widest hover:text-black transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    {isExpanded ? "[ Ler menos ]" : "[ Ler depoimento completo ]"}
                  </button>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
                    {current.name}
                  </h3>
                  <p className="text-red-600 text-xs font-bold uppercase tracking-widest mt-1">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 sm:mt-16 flex justify-center sm:justify-start gap-2">
          {testimonials.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                index === i ? 'w-10 sm:w-12 bg-red-600' : 'w-3.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}