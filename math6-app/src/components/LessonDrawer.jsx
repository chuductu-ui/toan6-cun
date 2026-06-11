// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

export default function LessonDrawer({ lesson, progress = {}, onClose, onStartTheory, onStartQuiz }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!lesson) return null;

  const exercises = lesson.exercises && Object.keys(lesson.exercises).length > 0
    ? lesson.exercises
    : { easy: [], medium: [], hard: [] };

  const levels = Object.keys(exercises);

  const levelMeta = {
    easy: { stars: '⭐', label: 'Cấp độ Dễ', className: 'easy' },
    medium: { stars: '⭐ ⭐', label: 'Cấp độ Vừa', className: 'medium' },
    hard: { stars: '⭐ ⭐ ⭐', label: 'Cấp độ Khó', className: 'hard' }
  };

  return (
    <div 
      className="drawer-overlay" 
      onClick={onClose} 
      data-testid="drawer-overlay"
      role="presentation"
    >
      <div 
        className="drawer-content" 
        onClick={(e) => e.stopPropagation()} 
        data-testid="drawer-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lesson-drawer-title"
      >
        <div className="drawer-header">
          <h3 id="lesson-drawer-title">{lesson.title}</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="drawer-body">
          <p className="lesson-desc">{lesson.description}</p>
          
          <div className="theory-block">
            <h4>📖 Phần 1: Học Lý Thuyết</h4>
            <button className="btn-primary start-theory-btn" onClick={onStartTheory}>
              Xem bài giảng & Mô phỏng đồ họa ➔
            </button>
          </div>

          <div className="exercise-block">
            <h4>🎯 Phần 2: Thử Thách Trắc Nghiệm</h4>
            <div className="level-buttons">
              {levels.map((level, index) => {
                const meta = levelMeta[level] || { stars: '⭐', label: `Cấp độ ${level}`, className: level };
                const isCompleted = !!progress[`${lesson.id}_${level}`];
                const isUnlocked = true;

                return (
                  <button
                    key={level}
                    className={`btn-level ${meta.className}`}
                    onClick={() => onStartQuiz && onStartQuiz(level)}
                    data-testid={`btn-level-${level}`}
                  >
                    <span>{meta.stars} {meta.label}</span>
                    <span>{isCompleted ? '✅ Đã xong' : 'Chơi ➔'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
