/**
 * @file components/landing/QuizSection.tsx
 * @purpose Renders an optional, interactive quiz to engage users.
 */
import React, { useState, useRef } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { useOnScreen } from '../../hooks/useOnScreen';

interface QuizSectionProps {
    content: typeof INITIAL_SITE_CONTENT['quiz'];
}

const QuizSection: React.FC<QuizSectionProps> = ({ content }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const quizData = content.data;

    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedOptionIndex(optionIndex);

        if (quizData[currentQuestionIndex].options[optionIndex].correct) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < quizData.length - 1) {
                setCurrentQuestionIndex(i => i + 1);
                setIsAnswered(false);
                setSelectedOptionIndex(null);
            } else {
                setQuizCompleted(true);
            }
        }, 2000);
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOptionIndex(null);
        setIsAnswered(false);
        setQuizCompleted(false);
    };

    const currentQuestion = quizData[currentQuestionIndex];
    const feedback = isAnswered
        ? currentQuestion.options[selectedOptionIndex!].correct
            ? currentQuestion.options[selectedOptionIndex!].feedback
            : currentQuestion.incorrectFeedback
        : '';

    return (
        <section id="quiz" className="py-20 bg-slate-50" ref={sectionRef}>
            <div className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
                    {content.description}
                </p>

                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    {!quizCompleted ? (
                        <div>
                            <p className="text-slate-500 mb-2 font-medium">Domanda {currentQuestionIndex + 1} / {quizData.length}</p>
                            <h3 className="text-2xl font-semibold text-slate-800 mb-6">{currentQuestion.question}</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedOptionIndex === index;
                                    const isCorrect = option.correct;
                                    let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 font-medium disabled:cursor-not-allowed';

                                    if (isAnswered && isSelected) {
                                        buttonClass += isCorrect ? ' bg-green-100 border-green-500 text-green-800' : ' bg-red-100 border-red-500 text-red-800';
                                    } else if (isAnswered && isCorrect) {
                                        buttonClass += ' bg-green-100 border-green-500 text-green-800';
                                    } else {
                                        buttonClass += ' bg-slate-50 border-slate-200 hover:bg-teal-50 hover:border-teal-400';
                                    }

                                    return (
                                        <button key={index} onClick={() => handleAnswer(index)} disabled={isAnswered} className={buttonClass}>
                                            <div className="flex items-center justify-between">
                                                <span>{option.text}</span>
                                                {isAnswered && isSelected && isCorrect && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                                {isAnswered && isSelected && !isCorrect && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-red-600"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className={`mt-4 text-sm min-h-[20px] transition-opacity duration-300 ${isAnswered ? 'opacity-100' : 'opacity-0'}`}>
                                {feedback}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            {score >= 3 ? (
                                <>
                                    <h3 className="text-2xl font-bold text-teal-600 mb-2">Congratulazioni, sei un vero esperto di Villetta Rachele!</h3>
                                    <p className="text-slate-600 mb-6">Hai superato il test a pieni voti. Non ti resta che prenotare e trasformare la teoria in pratica. Ti aspettiamo in Puglia!</p>
                                    <a href="#availability" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Richiedi Disponibilità</a>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Mmmh, forse hai bisogno di ripassare... o di una vacanza!</h3>
                                    <p className="text-slate-600 mb-6">Nessun problema, l'importante è che ora sai tutto. Villetta Rachele è il posto perfetto per rilassarsi. Che ne dici di prenotare?</p>
                                    <a href="#contact" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Contattaci</a>
                                </>
                            )}
                             <button onClick={handleRestart} className="mt-4 text-sm text-slate-500 hover:text-slate-800">Riprova il Quiz</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default QuizSection;