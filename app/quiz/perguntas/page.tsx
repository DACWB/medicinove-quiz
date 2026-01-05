'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { questions } from '@/lib/questions';

export default function Perguntas() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const router = useRouter();

  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const progress = ((currentPage + 1) / totalPages) * 100;

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('quizToken');
    const id = localStorage.getItem('studentId');
    
    if (!token || !id) {
      router.push('/');
      return;
    }

    setStudentId(id);

    // Carregar respostas salvas
    loadAnswers(id);
  }, [router]);

  const loadAnswers = async (id: string) => {
    try {
      const response = await fetch(`/api/quiz/answer?studentId=${id}`);
      const data = await response.json();
      if (data.answers) {
        setAnswers(data.answers);
      }
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
    }
  };

  const handleAnswer = (questionId: number, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultipleChoice = (questionId: number, option: string, maxSelections?: number) => {
    const current = answers[questionId] || [];
    const newValue = current.includes(option)
      ? current.filter((v: string) => v !== option)
      : maxSelections && current.length >= maxSelections
      ? current
      : [...current, option];
    
    handleAnswer(questionId, newValue);
  };

  const saveAnswers = async () => {
    setLoading(true);
    try {
      // Salvar apenas as respostas da página atual
      for (const question of currentQuestions) {
        if (answers[question.id] !== undefined) {
          await fetch('/api/quiz/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId,
              questionId: question.id,
              answer: answers[question.id]
            })
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar respostas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    // Validar respostas obrigatórias
    const unanswered = currentQuestions.find(
      q => q.required && !answers[q.id]
    );

    if (unanswered) {
      alert('Por favor, responda todas as perguntas obrigatórias antes de continuar.');
      return;
    }

    await saveAnswers();

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Finalizar quiz
      await finishQuiz();
    }
  };

  const handlePrevious = async () => {
    await saveAnswers();
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const finishQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quiz/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      });

      if (response.ok) {
        router.push('/quiz/obrigado');
      } else {
        alert('Erro ao finalizar questionário. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao finalizar:', error);
      alert('Erro ao finalizar questionário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question: typeof questions[0]) => {
    const value = answers[question.id];

    switch (question.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-4 bg-bg-main border border-border rounded-lg cursor-pointer hover:border-action transition-colors"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-4 h-4 text-action"
                />
                <span className="text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.maxSelections && (
              <p className="text-sm text-text-muted mb-2">
                Escolha até {question.maxSelections} opções
              </p>
            )}
            {question.options?.map((option) => {
              const selected = value?.includes(option) || false;
              return (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-4 bg-bg-main border border-border rounded-lg cursor-pointer hover:border-action transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleMultipleChoice(question.id, option, question.maxSelections)}
                    className="w-4 h-4 text-action"
                  />
                  <span className="text-text-primary">{option}</span>
                </label>
              );
            })}
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
            className="w-full"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
            rows={5}
            className="w-full"
          />
        );

      case 'slider':
        return (
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="10"
              value={value || 5}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-text-muted">
              <span>0</span>
              <span className="text-2xl font-bold text-action">{value || 5}</span>
              <span>10</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <Image
            src="/images/logo.png"
            alt="MediciNove"
            width={200}
            height={67}
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">Questionário SOAPIA</h1>
          <p className="text-text-secondary">
            Página {currentPage + 1} de {totalPages}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-action h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-text-muted mt-2 text-center">
            {Math.round(progress)}% concluído
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8 mb-8">
          {currentQuestions.map((question, index) => (
            <div key={question.id} className="bg-bg-card p-6 rounded-2xl border border-border">
              {/* Section Header */}
              {(index === 0 || currentQuestions[index - 1]?.section !== question.section) && (
                <div className="mb-4 pb-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-action">
                    {question.section}
                  </h2>
                </div>
              )}

              {/* Question */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-text-primary mb-1">
                  {question.question}
                  {question.required && <span className="text-error ml-1">*</span>}
                </h3>
              </div>

              {/* Answer Input */}
              {renderQuestion(question)}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0 || loading}
            className="px-6 py-3 bg-bg-card border border-border text-text-primary rounded-lg hover:border-action transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={loading}
            className="px-8 py-3 bg-action hover:bg-action-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Salvando...' : currentPage === totalPages - 1 ? 'Finalizar' : 'Próxima →'}
          </button>
        </div>

        {/* Save Progress Info */}
        <div className="mt-6 text-center text-sm text-text-muted">
          <p>Suas respostas são salvas automaticamente a cada página</p>
        </div>
      </div>
    </div>
  );
}
