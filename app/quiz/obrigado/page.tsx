'use client';

import Image from 'next/image';

export default function Obrigado() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="MediciNove"
            width={300}
            height={100}
            className="h-20 w-auto mx-auto"
          />
        </div>

        <div className="bg-bg-card p-12 rounded-2xl border border-border">
          <div className="mb-6">
            <div className="w-20 h-20 bg-action rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Questionário Concluído!
            </h1>
            <p className="text-xl text-text-secondary mb-6">
              Obrigado por dedicar seu tempo para responder
            </p>
          </div>

          <div className="bg-bg-main p-6 rounded-xl border border-border mb-6">
            <p className="text-text-primary mb-4">
              Suas respostas foram salvas com sucesso e já estão sendo analisadas.
            </p>
            <p className="text-text-secondary">
              Em breve, o Dr. Danilo Aedo entrará em contato com você com seu perfil personalizado e a trilha de mentoria recomendada.
            </p>
          </div>

          <div className="text-sm text-text-muted">
            <p>Você pode fechar esta página.</p>
            <p className="mt-2">Qualquer dúvida, entre em contato conosco.</p>
          </div>
        </div>

        <div className="mt-8 text-xs text-text-muted">
          <p>&copy; 2026 MediciNove. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
