import React, { useState, useEffect, useMemo } from 'react';
import { saveAttempt, formatZaloMessage } from '../utils/storage';

export default function QuizSection({ lesson, level, hearts, setHearts, onCompleted, onBack }) {
  const questions = lesson?.exercises?.[level] || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showResultCard, setShowResultCard] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(false);

  if (!lesson || questions.length === 0) {
    return (
      <div className="quiz-empty-card" data-testid="quiz-empty-card">
        <h3>Thử thách chưa sẵn sàng</h3>
        <p>Hiện tại cấp độ này chưa có câu hỏi nào. Bố Mẹ sẽ sớm cập nhật file lessons.json trên GitHub nhé!</p>
        <button className="btn-back" onClick={onBack} data-testid="btn-back-empty">Quay lại Bản đồ</button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  // Shuffle options without mutating the original array, and memoize by current question index
  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    const opts = [...currentQ.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentIdx, currentQ]);

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    setSelectedOpt(option);
  };

  const handleVerifyAnswer = () => {
    if (!selectedOpt) return;
    setIsAnswered(true);
    const correct = selectedOpt === currentQ.correctAnswer;
    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleFinishedQuiz();
    }
  };

  const handleFinishedQuiz = () => {
    const timeTaken = Math.max(0, Math.floor((Date.now() - startTime) / 1000));
    setElapsedTime(timeTaken);
    const scoreStr = `${correctCount}/${questions.length}`;
    
    const attempt = {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      level,
      score: scoreStr,
      timeTaken
    };

    saveAttempt(attempt);
    const pass = correctCount >= Math.ceil(questions.length * 0.8);
    if (pass) {
      onCompleted(lesson.id, level, scoreStr);
      setIsCompletedState(true);
    } else {
      setIsCompletedState(false);
    }
    setShowResultCard(true);
  };

  const handleZaloShare = () => {
    const levelLabels = { easy: 'Dễ (Easy)', medium: 'Vừa (Medium)', hard: 'Khó (Hard)' };
    const scoreStr = `${correctCount}/${questions.length}`;

    const message = formatZaloMessage(lesson.title, levelLabels[level] || level, scoreStr, elapsedTime);
    navigator.clipboard.writeText(message)
      .then(() => {
        alert('Đã tự động sao chép kết quả học tập của con vào bộ nhớ tạm! App sẽ mở Zalo để con gửi kết quả cho Bố Mẹ.');
        window.open('https://zalo.me/', '_blank');
      })
      .catch(err => {
        console.error(err);
        alert('Không thể tự động sao chép. Con hãy sao chép dòng kết quả thủ công nhé.');
      });
  };

  if (hearts <= 0) {
    return (
      <div className="quiz-fail-card" data-testid="quiz-fail-card">
        <span className="fail-emoji">💔</span>
        <h2>Hết sinh mệnh mất rồi!</h2>
        <p>Con đừng buồn nhé! Hãy quay lại phần lý thuyết và chơi các mô phỏng trực quan để nạp lại thêm sinh mệnh ❤️ nhé.</p>
        <button className="btn-primary" onClick={onBack} data-testid="btn-back-fail">Quay lại Bản đồ</button>
      </div>
    );
  }

  if (showResultCard) {
    return (
      <div className="quiz-result-overlay" data-testid="quiz-result-overlay">
        <div className="result-card">
          <span className="celebrate-emoji">{isCompletedState ? '🎉' : '💪'}</span>
          <h2>{isCompletedState ? 'Tuyệt Vời, Cún Ơi!' : 'Hãy Thử Lại Nhé!'}</h2>
          <p className="subtitle">{isCompletedState ? 'Con đã chinh phục thành công thử thách này!' : 'Cố gắng lên một chút nữa là đạt rồi!'}</p>
          
          <div className="score-summary">
            <div className="summary-item">
              <span className="label">ĐIỂM SỐ</span>
              <span className="value green" data-testid="quiz-final-score">{correctCount} / {questions.length}</span>
            </div>
            <div className="summary-item">
              <span className="label">THỜI GIAN</span>
              <span className="value dark">
                {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
              </span>
            </div>
          </div>

          <div className="actions-buttons">
            <button className="btn-zalo" onClick={handleZaloShare} data-testid="btn-zalo">
              💬 Gửi kết quả qua Zalo
            </button>
            <button className="btn-secondary" onClick={onBack} data-testid="btn-back-success">
              Quay lại Bản đồ chính
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress percent for current question
  const progressPercent = Math.min(100, Math.floor((currentIdx / questions.length) * 100));

  return (
    <div className="quiz-section-container" data-testid="quiz-section">
      <div className="quiz-header-bar">
        <button className="btn-back-flat" onClick={onBack} data-testid="btn-back-cancel">← Hủy bỏ</button>
        <span className="quiz-level-indicator" data-testid="quiz-level-indicator">Thử thách: {level.toUpperCase()}</span>
        <div className="quiz-header-stats">
          <span className="quiz-hearts-indicator" data-testid="quiz-hearts-indicator">❤️ {hearts}</span>
          <span className="quiz-counter" data-testid="quiz-counter">Câu {currentIdx + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="quiz-progress-container">
        <div 
          className="quiz-progress-bar" 
          data-testid="quiz-progress-bar"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="quiz-main-card">
        <h3 className="quiz-question" data-testid="quiz-question">{currentQ.question}</h3>
        
        <div className="options-grid">
          {shuffledOptions.map((opt, optIndex) => {
            const isSelected = selectedOpt === opt;
            const isCorrectOpt = opt === currentQ.correctAnswer;
            
            let optClass = '';
            if (isAnswered) {
              if (isCorrectOpt) optClass = 'correct';
              else if (isSelected) optClass = 'incorrect';
            } else if (isSelected) {
              optClass = 'selected';
            }

            return (
              <button 
                key={opt} 
                className={`option-card ${optClass}`} 
                onClick={() => handleAnswerSelect(opt)}
                disabled={isAnswered}
                type="button"
                data-testid={`option-card-${optIndex}`}
                aria-pressed={isSelected}
              >
                <span className="option-letter">{String.fromCharCode(65 + optIndex)}</span>
                <span className="option-text">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="quiz-footer-actions">
          {!isAnswered ? (
            <button 
              className="btn-verify-quiz" 
              disabled={!selectedOpt} 
              onClick={handleVerifyAnswer}
              data-testid="btn-verify-quiz"
            >
              Kiểm tra kết quả
            </button>
          ) : (
            <div className="explanation-drawer" data-testid="explanation-drawer">
              <p className="exp-text">💡 <strong>Giải thích:</strong> {currentQ.explanation}</p>
              <button 
                className="btn-next-quiz" 
                onClick={handleNextQuestion}
                data-testid="btn-next-quiz"
              >
                {currentIdx + 1 < questions.length ? 'Tiếp tục ➔' : 'Xem kết quả'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
