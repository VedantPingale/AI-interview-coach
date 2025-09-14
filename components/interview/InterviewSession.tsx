import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import type { Answer } from '../../types';
import useTextToSpeech from '../../hooks/useTextToSpeech';

interface InterviewSessionProps {
  questions: string[];
  onFinish: (answers: Answer[]) => void;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({ questions, onFinish }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { speak, stop, isSpeaking, hasTTSSupport } = useTextToSpeech();

  useEffect(() => {
    const questionText = questions[currentQIndex];

    // Prefill answer if user navigates back
    const existingAnswer = answers.find(a => a.question === questionText);
    setCurrentAnswer(existingAnswer ? existingAnswer.answer : '');
    textAreaRef.current?.focus();

    // Automatically read the question aloud.
    if (questionText && hasTTSSupport) {
      speak(questionText);
    }

    // Cleanup: stop speaking if the component unmounts or the question changes.
    return () => {
      stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQIndex, questions]);

  const handleNext = () => {
    const newAnswer: Answer = { question: questions[currentQIndex], answer: currentAnswer };

    const finalAnswers = [...answers];
    const existingAnswerIndex = finalAnswers.findIndex(a => a.question === newAnswer.question);

    if (existingAnswerIndex > -1) {
      finalAnswers[existingAnswerIndex] = newAnswer;
    } else {
      finalAnswers.push(newAnswer);
    }
    setAnswers(finalAnswers);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      onFinish(finalAnswers);
    }
  };

  const handleAudioClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(questions[currentQIndex]);
    }
  };

  const progressPercentage = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <p className="text-sm text-yellow-400">Question {currentQIndex + 1} of {questions.length}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="p-8 bg-gray-800 rounded-lg shadow-2xl mb-6 relative">
        <h2 className="text-3xl font-semibold leading-relaxed pr-16">{questions[currentQIndex]}</h2>
        {hasTTSSupport && (
          <button
            onClick={handleAudioClick}
            aria-label={isSpeaking ? 'Stop reading question' : 'Read question aloud'}
            className="absolute top-8 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-700 hover:bg-gray-600 text-white"
          >
            <i className={`fas ${isSpeaking ? 'fa-stop' : 'fa-volume-high'}`}></i>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          ref={textAreaRef}
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Type your answer here."
          className="w-full h-48 p-4 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Button
          onClick={() => setCurrentQIndex(currentQIndex - 1)}
          disabled={currentQIndex === 0}
          variant="ghost"
        >
          Previous
        </Button>
        <Button onClick={handleNext} variant="primary">
          {currentQIndex === questions.length - 1 ? 'Finish & Analyze' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default InterviewSession;
