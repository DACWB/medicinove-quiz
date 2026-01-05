'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (token.toLowerCase() !== 'embarque10') {
      setError('Token inválido. Por favor, verifique e tente novamente.');
      setLoading(false);
      return;
    }

    // Salvar token no localStorage e redirecionar
    localStorage.setItem('quizToken', token);
    router.push('/quiz/identificacao');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="MediciNove"
              width={300}
              height={100}
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo à Mentoria MediciNove
          </h1>
          <p className="text-text-secondary">
            Questionário de Onboarding SOAPIA
          </p>
        </div>

        <div className="bg-bg-card p-8 rounded-2xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="token" className="block text-sm font-medium mb-2">
                Token de Acesso
              </label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Digite seu token"
                className="w-full"
                required
              />
              {error && (
                <p className="text-error text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-action hover:bg-action-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-muted">
            <p>Não tem um token?</p>
            <p>Entre em contato com a equipe MediciNove</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-text-muted">
          <p>&copy; 2026 MediciNove. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
