// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function QuestMap({ curriculum, progress = {}, onSelectLesson }) {
  let unlocked = true; // First lesson is unlocked

  return (
    <div className="quest-map">
      <h2 className="section-title">📍 Bản Đồ Bài Học</h2>
      <div className="map-path">
        {curriculum && curriculum.chapters && curriculum.chapters.map((chapter) => (
          <div key={chapter.id} className="chapter-group">
            <h3 className="chapter-title">{chapter.title}</h3>
            <div className="lessons-list">
              {chapter.lessons && chapter.lessons.map((lesson) => {
                const levels = Object.keys(lesson.exercises || {});
                const isCompleted = levels.length > 0 && levels.every(level => progress[`${lesson.id}_${level}`]);
                const isActive = unlocked;
                const isCurrent = isActive && !isCompleted;
                
                // Next lesson is locked unless this one is fully completed
                if (!isCompleted) unlocked = false;

                const completionText = isCompleted ? 'Hoàn thành' : isActive ? 'Sẵn sàng học' : 'Đang khóa';

                return (
                  <button 
                    key={lesson.id} 
                    className={`lesson-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${!isActive ? 'locked' : ''}`}
                    onClick={() => onSelectLesson && onSelectLesson(lesson)}
                    disabled={!isActive}
                    aria-label={`${lesson.title} - ${completionText}`}
                    data-testid={`lesson-node-${lesson.id}`}
                  >
                    <div className="node-button">
                      {isCompleted ? '👑' : !isActive ? '🔒' : '📝'}
                    </div>
                    <span className="node-label">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
