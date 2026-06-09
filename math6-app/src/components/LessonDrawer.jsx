import React from 'react';

export default function LessonDrawer({ lesson, progress = {}, onClose, onStartTheory, onStartQuiz }) {
  if (!lesson) return null;

  const isEasyCompleted = !!progress[`${lesson.id}_easy`];
  const isMediumCompleted = !!progress[`${lesson.id}_medium`];

  return (
    <div className="drawer-overlay" onClick={onClose} data-testid="drawer-overlay">
      <div className="drawer-content" onClick={(e) => e.stopPropagation()} data-testid="drawer-content">
        <div className="drawer-header">
          <h3>{lesson.title}</h3>
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
              {/* Easy Level */}
              <button 
                className="btn-level easy" 
                onClick={() => onStartQuiz && onStartQuiz('easy')}
                data-testid="btn-level-easy"
              >
                <span>⭐ Cấp độ Dễ</span>
                <span>{isEasyCompleted ? '✅ Đã xong' : 'Chơi ➔'}</span>
              </button>

              {/* Medium Level */}
              <button 
                className={`btn-level medium ${!isEasyCompleted ? 'btn-locked' : ''}`} 
                onClick={() => isEasyCompleted && onStartQuiz && onStartQuiz('medium')}
                disabled={!isEasyCompleted}
                data-testid="btn-level-medium"
              >
                <span>⭐ ⭐ Cấp độ Vừa</span>
                <span>{!isEasyCompleted ? '🔒 Khóa' : isMediumCompleted ? '✅ Đã xong' : 'Chơi ➔'}</span>
              </button>

              {/* Hard Level */}
              <button 
                className={`btn-level hard ${!isMediumCompleted ? 'btn-locked' : ''}`} 
                onClick={() => isMediumCompleted && onStartQuiz && onStartQuiz('hard')}
                disabled={!isMediumCompleted}
                data-testid="btn-level-hard"
              >
                <span>⭐ ⭐ ⭐ Cấp độ Khó</span>
                <span>{!isMediumCompleted ? '🔒 Khóa' : 'Chơi ➔'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
