"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Amanda Bispo",
    role: "Gerente Nacional de Vendas de Contas Chaves",
    content: "Fiz aulas com o Filipe durante quase 06 anos, ele me preparou para um intercâmbio e durante esses deu um salto no meu inglês para negócios, isso me permitiu atingir novas posições no meu trabalho, trabalhar com equipes e lideranças globais da multinacional que eu atuo hoje. Sou grata ao Filipe, ao seu método de trabalho, ao seu profissionalismo e seu cuidado. Todas as aulas foram personalizadas com muita atenção e pensando sempre nas minhas demandas e desenvolvimento profissional.",
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
    content: "Iniciei o curso com um nível básico de inglês, enquanto já atuava em uma posição com alta exposição ao idioma em uma multinacional. No entanto, ainda não possuía a confiança necessária para me comunicar com segurança, especialmente em reuniões e apresentações. Ao longo de quase três anos de aprendizado, tive uma evolução significativa em todos os aspectos da língua, o que foi fundamental para conquistar uma oportunidade na área de planejamento de produto na Honda. Hoje, utilizo o inglês diariamente em conversas e apresentações, inclusive em níveis executivos. Tenho certeza de que, sem as aulas do professor Filipe com foco no inglês prático, esse avanço — tanto profissional quanto no domínio do idioma — não teria sido possível",
    image: "/aluno 3.jpeg"
  },
  {
    id: 4,
    name: "Agda Souza",
    role: "Professora, Atriz e Dubladora",
    content: "Me chamo Agda souza, trabalho como professora, atriz e dubladora, e uma das minhas maiores dificuldades sempre foi a fala no inglês. Eu tinha muita vergonha, era extremamente tímida e, mesmo tendo passado por vários professores ao longo dos anos, nunca conseguia me sentir confortável nas aulas. Muitas vezes eram métodos focados apenas em folhas, exercícios escritos e atividades que pouco estimulavam a conversação. Com o professor Filipe, isso mudou completamente. Desde o começo senti afinidade e um ambiente seguro para me desafiar na fala, errar sem medo e finalmente destravar. Aos poucos fui perdendo a timidez e conseguindo me comunicar de verdade em inglês, algo que por muito tempo achei que não conseguiria. Faço aula há anos e uma das coisas que mais me marcou foi conseguir ir a um show de um artista internacional sem precisar de tradutor… e ainda traduzir as falas do artista para minhas colegas hahaha! Foi um momento simples, mas muito especial pra mim, porque percebi o quanto evoluí. Sou muito grata ao professor Filipe e às aulas, que fizeram toda diferença na minha confiança e comunicação. E sinceramente? Não tenho intenção nenhuma de parar",
    image: "/aluna 4.jpeg" 
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, 20000); 

    return () => clearInterval(timer);
  }, [nextTestimonial, index, isVisible]);

  useEffect(() => {
    setIsExpanded(false);
  }, [index]);

  const current = testimonials[index];

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="bg-[#f8f8f8] py-24 px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        
        <div className="mb-16 flex justify-between items-end">
          <div>
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase block mb-4">
              Alunos que atingiram o topo
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
              Impacto <br /> <span className="text-black/20 italic">Real</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-red-600 text-white flex items-center justify-center hover:bg-black transition-all duration-300 shadow-lg shadow-red-600/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="relative min-h-115">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              <div className="lg:col-span-4 relative">
                <div className="aspect-square hover:grayscale-0 transition-all duration-700 relative z-10 overflow-hidden bg-gray-200">
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400?text=Profile"; }}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600 z-0" />
              </div>

              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-red-600" />
                </div>

                <div className="relative mb-10">
                  <blockquote 
                    className={`text-xl md:text-2xl font-medium text-[#1a1a1a] leading-relaxed italic transition-all duration-500 ${!isExpanded ? 'line-clamp-5' : ''}`}
                  >
                    "{current.content}"
                  </blockquote>
                  
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 text-red-600 text-xs font-black uppercase tracking-widest hover:text-black transition-colors"
                  >
                    {isExpanded ? "[ Ler menos ]" : "[ Ler depoimento completo ]"}
                  </button>
                </div>

                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
                    {current.name}
                  </h4>
                  <p className="text-red-600 text-xs font-bold uppercase tracking-widest mt-1">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex gap-2">
          {testimonials.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 transition-all duration-500 rounded-full ${index === i ? 'w-12 bg-red-600' : 'w-4 bg-black/10'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}