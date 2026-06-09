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
                const isCompleted = progress[`${lesson.id}_easy`] && progress[`${lesson.id}_medium`] && progress[`${lesson.id}_hard`];
                const isActive = unlocked;
                const isCurrent = isActive && !isCompleted;
                
                // Next lesson is locked unless this one is fully completed
                if (!isCompleted) unlocked = false;

                return (
                  <div 
                    key={lesson.id} 
                    className={`lesson-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${!isActive ? 'locked' : ''}`}
                    onClick={() => isActive && onSelectLesson && onSelectLesson(lesson)}
                    data-testid={`lesson-node-${lesson.id}`}
                  >
                    <div className="node-button">
                      {isCompleted ? '👑' : !isActive ? '🔒' : '📝'}
                    </div>
                    <span className="node-label">{lesson.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
