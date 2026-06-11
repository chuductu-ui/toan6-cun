// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

export default function TableOfContentsModal({ isOpen, onClose, curriculum, progress = {}, onSelectLesson }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Re-calculate active state for each lesson in order
  const lessonStatusMap = {};
  if (curriculum && curriculum.chapters) {
    curriculum.chapters.forEach(chapter => {
      if (chapter.lessons) {
        chapter.lessons.forEach(lesson => {
          const levels = Object.keys(lesson.exercises || {});
          const isCompleted = levels.length > 0 && levels.every(level => progress[`${lesson.id}_${level}`]);
          const isActive = true; // All lessons are unlocked/active by default
          lessonStatusMap[lesson.id] = { isActive, isCompleted };
        });
      }
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div 
        className="modal-content toc-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="toc-modal-title"
      >
        <div className="modal-header">
          <h3 id="toc-modal-title">📖 Mục Lục Sách Giáo Khoa</h3>
          <button className="close-btn" onClick={onClose} aria-label="Đóng">&times;</button>
        </div>
        <div className="modal-body toc-body">
          <p className="toc-subtitle">Chọn bài học con muốn phiêu lưu. Hãy hoàn thành các bài học trước để mở khóa bài tiếp theo nhé!</p>
          <div className="toc-chapters-list">
            {curriculum && curriculum.chapters && curriculum.chapters.map((chapter) => (
              <div key={chapter.id} className="toc-chapter-section">
                <h4 className="toc-chapter-title">{chapter.title}</h4>
                {(!chapter.lessons || chapter.lessons.length === 0) ? (
                  <div className="toc-empty-chapter">Sắp ra mắt! 🚀</div>
                ) : (
                  <div className="toc-lessons-list">
                    {chapter.lessons.map((lesson) => {
                      const status = lessonStatusMap[lesson.id] || { isActive: true, isCompleted: false };
                      const isEasyCompleted = !!progress[`${lesson.id}_easy`];
                      const isMediumCompleted = !!progress[`${lesson.id}_medium`];
                      const isHardCompleted = !!progress[`${lesson.id}_hard`];
                      const statusText = status.isCompleted 
                        ? 'Đã hoàn thành' 
                        : 'Sẵn sàng học';

                      const icon = status.isCompleted 
                        ? '👑' 
                        : '📝';

                      const buttonClass = [
                        'toc-lesson-item',
                        status.isCompleted ? 'completed' : '',
                        status.isActive ? 'active' : 'locked'
                      ].filter(Boolean).join(' ');

                      return (
                        <button
                          key={lesson.id}
                          className={buttonClass}
                          disabled={!status.isActive}
                          onClick={() => {
                            if (onSelectLesson) onSelectLesson(lesson);
                            onClose();
                          }}
                          aria-label={`${lesson.title} - ${statusText}`}
                          data-testid={`toc-item-${lesson.id}`}
                        >
                          <div className="toc-lesson-left">
                            <span className="toc-lesson-icon">
                               {icon}
                            </span>
                            <span className="toc-lesson-title">{lesson.title}</span>
                          </div>
                          <div className="toc-lesson-progress">
                            <span className={`toc-badge easy ${isEasyCompleted ? 'completed' : ''}`}>Dễ</span>
                            <span className={`toc-badge medium ${isMediumCompleted ? 'completed' : ''}`}>TB</span>
                            <span className={`toc-badge hard ${isHardCompleted ? 'completed' : ''}`}>Khó</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
