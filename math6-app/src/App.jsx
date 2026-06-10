// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import QuestMap from './components/QuestMap';
import LessonDrawer from './components/LessonDrawer';
import TheorySection from './components/TheorySection';
import QuizSection from './components/QuizSection';
import HistoryModal from './components/HistoryModal';
import TableOfContentsModal from './components/TableOfContentsModal';
import { getHistory } from './utils/storage';

export default function App() {
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentView, setCurrentView] = useState({ type: 'map' }); // 'map', 'theory', 'quiz'
  const [historyOpen, setHistoryOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [progress, setProgress] = useState({}); // Map of { lessonId_level: stars_count }
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    let active = true;

    fetch('/lessons.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Không thể tải bài học. Vui lòng thử lại sau.');
        }
        return res.json();
      })
      .then(data => {
        if (active) {
          setCurriculum(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (active) {
          setError(err.message || 'Không thể tải dữ liệu bài học.');
          setLoading(false);
        }
      });

    // Calculate initial stars & progress from storage
    const history = getHistory();
    if (active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistoryList(history);

      const loadedProgress = {};
      history.forEach(item => {
        const key = `${item.lessonId}_${item.level}`;
        const isPerfect = item.score?.startsWith('10');
        const starsCount = isPerfect ? 3 : 1;
        if (!loadedProgress[key] || starsCount > loadedProgress[key]) {
          loadedProgress[key] = starsCount;
        }
      });
      setProgress(loadedProgress);
      const calculatedStars = Object.values(loadedProgress).reduce((acc, curr) => acc + curr, 0);
      setStars(calculatedStars);
    }

    return () => {
      active = false;
    };
  }, []);

  const handleLevelCompleted = (lessonId, level, scoreText) => {
    const key = `${lessonId}_${level}`;
    const isPerfect = scoreText?.startsWith('10');
    const newStarsCount = isPerfect ? 3 : 1;

    setProgress(prev => {
      const currentStarsCount = prev[key] || 0;
      if (newStarsCount > currentStarsCount) {
        const updatedProgress = { ...prev, [key]: newStarsCount };
        const newTotalStars = Object.values(updatedProgress).reduce((acc, curr) => acc + curr, 0);
        setStars(newTotalStars);
        return updatedProgress;
      }
      return prev;
    });

    setHistoryList(getHistory());
  };

  const recoverHearts = () => {
    setHearts(prev => Math.min(5, prev + 2));
  };

  const handleSelectLessonFromToc = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentView({ type: 'map' });
    setTimeout(() => {
      const element = document.getElementById(`node-${lesson.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  if (error) {
    return (
      <div className="error-banner" data-testid="error-banner" style={{ padding: '20px', textAlign: 'center', color: '#ff4d4f' }}>
        <h2>⚠️ Lỗi tải dữ liệu</h2>
        <p>{error}</p>
      </div>
    );
  }

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
          <button className="btn-toc" onClick={() => setTocOpen(true)} data-testid="btn-toc">📖 Mục lục</button>
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

      <HistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} history={historyList} />
      <TableOfContentsModal 
        isOpen={tocOpen} 
        onClose={() => setTocOpen(false)} 
        curriculum={curriculum} 
        progress={progress} 
        onSelectLesson={handleSelectLessonFromToc} 
      />
    </div>
  );
}
