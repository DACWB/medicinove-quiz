'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Identificacao() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar se tem token
    const token = localStorage.getItem('quizToken');
    if (!token) {
      router.push('/');
      return;
    }

    // Verificar se já tem identificação salva
    const savedStudent = localStorage.getItem('studentData');
    if (savedStudent) {
      const student = JSON.parse(savedStudent);
      setName(student.name);
      setEmail(student.email);
      setWhatsapp(student.whatsapp);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          token: localStorage.getItem('quizToken')
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar dados');
      }

      // Salvar dados do estudante
      localStorage.setItem('studentData', JSON.stringify(data.student));
      localStorage.setItem('studentId', data.student.id);

      // Redirecionar para o quiz
      router.push('/quiz/perguntas');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
            Identificação
          </h1>
          <p className="text-text-secondary">
            Precisamos de algumas informações para você poder continuar o questionário depois
          </p>
        </div>

        <div className="bg-bg-card p-8 rounded-2xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                WhatsApp (com DDD) *
              </label>
              <input
                type="tel"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            {error && (
              <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-action hover:bg-action-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Continuar para o Questionário'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-muted">
            <p>Seus dados estão protegidos conforme a LGPD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
