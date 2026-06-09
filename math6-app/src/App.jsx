import React, { useState, useEffect } from 'react';
import QuestMap from './components/QuestMap';
import LessonDrawer from './components/LessonDrawer';
import TheorySection from './components/TheorySection';
import QuizSection from './components/QuizSection';
import HistoryModal from './components/HistoryModal';
import { getHistory } from './utils/storage';

export default function App() {
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentView, setCurrentView] = useState({ type: 'map' }); // 'map', 'theory', 'quiz'
  const [historyOpen, setHistoryOpen] = useState(false);
  const [progress, setProgress] = useState({}); // Map of { lessonId_level: true }

  useEffect(() => {
    fetch('/lessons.json')
      .then(res => res.json())
      .then(data => {
        setCurriculum(data);
        setLoading(false);
      })
      .catch(err => console.error(err));

    // Calculate initial stars & progress from storage
    const history = getHistory();
    const loadedProgress = {};
    let calculatedStars = 0;
    history.forEach(item => {
      const key = `${item.lessonId}_${item.level}`;
      if (!loadedProgress[key]) {
        loadedProgress[key] = true;
        calculatedStars += item.score.startsWith('10') ? 3 : 1; // 3 stars for perfect score, 1 otherwise
      }
    });
    setProgress(loadedProgress);
    setStars(calculatedStars);
  }, []);

  const handleLevelCompleted = (lessonId, level, scoreText) => {
    const key = `${lessonId}_${level}`;
    if (!progress[key]) {
      const isPerfect = scoreText.startsWith('10');
      setStars(prev => prev + (isPerfect ? 3 : 1));
      setProgress(prev => ({ ...prev, [key]: true }));
    }
  };

  const recoverHearts = () => {
    setHearts(prev => Math.min(5, prev + 2));
  };

  if (loading) {
    return <div className="loading-screen">🔄 Tải dữ liệu Toán 6...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left" onClick={() => setCurrentView({ type: 'map' })}>
          <span className="logo-emoji">🦉</span>
          <div>
            <h1>Toán 6 Phiêu Lưu Ký</h1>
            <p className="student-name">Học sinh: <strong>Cún</strong></p>
          </div>
        </div>
        <div className="header-right">
          <div className="stat-badge hearts">❤️ <span className="stat-val">{hearts}/5</span></div>
          <div className="stat-badge stars">⭐ <span className="stat-val">{stars}</span></div>
          <button className="btn-history" onClick={() => setHistoryOpen(true)}>📊 Lịch sử học</button>
        </div>
      </header>

      <main className="app-main">
        {currentView.type === 'map' && (
          <>
            <QuestMap 
              curriculum={curriculum} 
              progress={progress} 
              onSelectLesson={setSelectedLesson} 
            />
            <LessonDrawer 
              lesson={selectedLesson} 
              progress={progress}
              onClose={() => setSelectedLesson(null)} 
              onStartTheory={() => setCurrentView({ type: 'theory' })}
              onStartQuiz={(level) => setCurrentView({ type: 'quiz', level })}
            />
          </>
        )}

        {currentView.type === 'theory' && (
          <TheorySection 
            lesson={selectedLesson} 
            onBack={() => setCurrentView({ type: 'map' })} 
            onRecoverHearts={recoverHearts}
          />
        )}

        {currentView.type === 'quiz' && (
          <QuizSection 
            lesson={selectedLesson} 
            level={currentView.level} 
            hearts={hearts}
            setHearts={setHearts}
            onCompleted={handleLevelCompleted}
            onBack={() => setCurrentView({ type: 'map' })} 
          />
        )}
      </main>

      <HistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}
