'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BoasVindas() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se tem token
    const token = localStorage.getItem('quizToken');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-lg">
            <Image 
              src="/images/logo.png" 
              alt="MediciNove" 
              width={200} 
              height={60}
              className="h-auto"
            />
          </div>
        </div>

        {/* Card de Boas-vindas */}
        <div className="bg-[#1C1F26] border border-[#2A2E37] rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Boas-vindas
          </h1>

          <div className="space-y-4 text-[#B0B4BC] text-lg leading-relaxed">
            <p>
              Olá! Aqui é o Dr. Danilo Aedo. Obrigado pela confiança.
            </p>
            
            <p>
              Você entrou numa mentoria feita para médicos que querem usar IA de verdade: com método, execução e segurança.
            </p>
            
            <p>
              Eu conheço os obstáculos: falta de tempo, excesso de ferramentas, receio de errar, LGPD, equipe que não acompanha. A gente atravessa isso junto — com caminho claro e entregas reais.
            </p>
            
            <p>
              Eu me comprometo 100% com o seu resultado, e este onboarding é o primeiro passo para personalizar sua rota.
            </p>
            
            <p>
              Aqui não existe pergunta boba: dúvida é sinal de inteligência em movimento — é a porta que a gente abre pra evoluir mais rápido.
            </p>
            
            <p>
              Vamos preencher isso como um SOAP, só que versão Medicinove: <strong className="text-white">SOAPIA</strong>.
            </p>
            
            <p>
              A diferença é simples: além de entender, a gente implementa IA no seu dia a dia com segurança e consistência.
            </p>
          </div>

          {/* Botão */}
          <div className="mt-10">
            <button
              onClick={() => router.push('/quiz/identificacao')}
              className="w-full bg-[#3A7AFE] hover:bg-[#5C8CFF] text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
            >
              Começar Questionário
            </button>
          </div>
        </div>

        {/* LGPD */}
        <p className="text-center text-[#8A8F98] text-sm mt-6">
          Seus dados estão protegidos conforme a LGPD
        </p>
      </div>
    </div>
  );
}
