// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function QuestMap({ curriculum, progress = {}, onSelectLesson }) {
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
                const isActive = true; // All lessons are unlocked
                const isCurrent = !isCompleted;

                const completionText = isCompleted 
                  ? 'Hoàn thành' 
                  : 'Sẵn sàng học';

                const emoji = isCompleted 
                  ? '👑' 
                  : '📝';

                const buttonClass = [
                  'lesson-node',
                  isCompleted ? 'completed' : '',
                  isCurrent ? 'active' : ''
                ].filter(Boolean).join(' ');

                return (
                  <button 
                    key={lesson.id} 
                    id={`node-${lesson.id}`}
                    className={buttonClass}
                    onClick={() => onSelectLesson && onSelectLesson(lesson)}
                    disabled={!isActive}
                    aria-label={`${lesson.title} - ${completionText}`}
                    data-testid={`lesson-node-${lesson.id}`}
                  >
                    <div className="node-button">
                      {emoji}
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
