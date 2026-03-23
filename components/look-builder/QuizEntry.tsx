"use client";

import { QuizQuestion } from "@/types/lookBuilder";

interface QuizEntryProps {
  questions: QuizQuestion[];
  currentIndex: number;
  onSelect: (questionId: string, optionId: string) => void;
  onRestart: () => void;
  answers: Record<string, string>;
  isComplete: boolean;
}

export function QuizEntry({
  questions,
  currentIndex,
  onSelect,
  onRestart,
  answers,
  isComplete
}: QuizEntryProps) {
  const question = questions[currentIndex];

  if (isComplete || !question) {
    return (
      <section className="quiz-card">
        <p className="eyebrow">Quiz complete</p>
        <h3>Your recommendations are ready.</h3>
        <button className="button-secondary" onClick={onRestart}>
          Retake Quiz
        </button>
      </section>
    );
  }

  return (
    <section className="quiz-card">
      <p className="eyebrow">Style quiz</p>
      <h3>{question.title}</h3>
      <div className="quiz-options">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`quiz-option ${answers[question.id] === option.id ? "selected" : ""}`}
            onClick={() => onSelect(question.id, option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="quiz-step">
        Question {currentIndex + 1} / {questions.length}
      </p>
    </section>
  );
}
