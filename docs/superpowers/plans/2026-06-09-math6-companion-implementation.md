# Math 6 Interactive Learning Companion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a gamified, mobile-friendly interactive web application for Grade 6 students to learn Math definitions visually and practice exercises with local history tracking and Zalo progress sharing.

**Architecture:** A pure client-side React SPA driven by a single static JSON config (`lessons.json`). Progress and attempts are recorded in the browser's `localStorage` for offline review, and Zalo integration is done using clipboard-based sharing and deep linking.

**Tech Stack:** React (Vite template), Vanilla CSS (responsive flex/grid, glassmorphism), Vitest + React Testing Library (TDD/unit testing), Lucide React (for UI icons).

---

## File Structure

The project files will be structured inside the `math6-app` directory:

```text
math6-app/
├── public/
│   └── lessons.json               # Textbook content database (JSON)
├── src/
│   ├── components/
│   │   ├── visualizers/
│   │   │   ├── VennDiagram.jsx    # Interactive Sets visualizer
│   │   │   ├── NumberLine.jsx     # Interactive Number line (negatives/positives)
│   │   │   ├── DivisibilitySieve.jsx # Prime/divisors grid visualizer
│   │   │   └── SymmetryLab.jsx    # Shape symmetry grid
│   │   ├── QuestMap.jsx           # Vertical path map of lessons
│   │   ├── LessonDrawer.jsx       # Selection drawer with Easy/Medium/Hard tabs
│   │   ├── TheorySection.jsx      # Holds the active lesson theory & visualizer
│   │   ├── QuizSection.jsx        # Handles the level exercises and heart system
│   │   └── HistoryModal.jsx       # Displays all past scores from localStorage
│   ├── utils/
│   │   └── storage.js             # LocalStorage & Zalo sharing message formatter
│   ├── App.jsx                    # State coordinator & layout shell
│   ├── index.css                  # Design tokens, typography, gamification styles
│   └── main.jsx                   # React entry point
└── tests/
    ├── storage.test.js            # Storage utilities tests
    └── App.test.jsx               # Integration and state flow tests
```

---

## Tasks

### Task 1: Setup Testing Environment (Vitest & JSDOM)

**Files:**
- Create: `math6-app/vite.config.js`
- Create: `math6-app/tests/setup.js`
- Modify: `math6-app/package.json`

- [ ] **Step 1: Write test dependency updates and scripts**
  Add test scripts and devDependencies to `math6-app/package.json`:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^14.2.1",
    "jsdom": "^24.0.0",
    "vitest": "^1.3.1"
  }
  ```

- [ ] **Step 2: Run npm install**
  Run: `npm install` inside `C:\Users\Hi\Desktop\Math_Cun_Tho\math6-app`
  Expected: Installation completes successfully.

- [ ] **Step 3: Configure Vitest in Vite Config**
  Replace contents of `math6-app/vite.config.js` with:
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.js',
    },
  });
  ```

- [ ] **Step 4: Create setup.js**
  Write `math6-app/tests/setup.js`:
  ```javascript
  import '@testing-library/jest-dom';
  ```

- [ ] **Step 5: Write a simple failing test**
  Create `math6-app/tests/sanity.test.js`:
  ```javascript
  import { describe, it, expect } from 'vitest';

  describe('Sanity Check', () => {
    it('should fail first', () => {
      expect(true).toBe(false);
    });
  });
  ```

- [ ] **Step 6: Run tests and verify failure**
  Run: `npm run test -- --run` inside `C:\Users\Hi\Desktop\Math_Cun_Tho\math6-app`
  Expected: FAIL (1 test failed)

- [ ] **Step 7: Fix the test to pass**
  Replace content of `math6-app/tests/sanity.test.js`:
  ```javascript
  import { describe, it, expect } from 'vitest';

  describe('Sanity Check', () => {
    it('should pass now', () => {
      expect(true).toBe(true);
    });
  });
  ```

- [ ] **Step 8: Run tests to verify pass**
  Run: `npm run test -- --run` inside `C:\Users\Hi\Desktop\Math_Cun_Tho\math6-app`
  Expected: PASS

- [ ] **Step 9: Commit**
  Run: `git add math6-app/package.json math6-app/vite.config.js math6-app/tests`
  Run: `git commit -m "chore: setup Vitest testing environment"`


### Task 2: Create Textbook Curriculum JSON Database

**Files:**
- Create: `math6-app/public/lessons.json`

- [ ] **Step 1: Write lessons.json**
  Write curriculum data for Chapter 1 and Chapter 4 into `math6-app/public/lessons.json`:
  ```json
  {
    "chapters": [
      {
        "id": "chapter-1",
        "title": "Chương I: Tập hợp các số tự nhiên",
        "lessons": [
          {
            "id": "bai-1-tap-hop",
            "title": "Bài 1: Tập hợp",
            "description": "Làm quen với tập hợp, phần tử và quan hệ thuộc/không thuộc.",
            "theory": {
              "explanation": "Tập hợp chứa các đối tượng được gọi là phần tử. Ký hiệu ∈ nghĩa là thuộc, ∉ nghĩa là không thuộc.",
              "visualizerType": "VennDiagram",
              "visualizerConfig": {
                "setA": {
                  "name": "Tập A: Số lẻ < 10",
                  "elements": [1, 3, 5, 7, 9]
                },
                "setB": {
                  "name": "Tập B: Số nguyên tố < 10",
                  "elements": [2, 3, 5, 7]
                }
              }
            },
            "exercises": {
              "easy": [
                {
                  "id": "q1",
                  "type": "multiple-choice",
                  "question": "Cho tập hợp A = {2, 4, 6, 8}. Khẳng định nào sau đây đúng?",
                  "options": ["2 ∈ A", "5 ∈ A", "4 ∉ A", "8 ∉ A"],
                  "correctAnswer": "2 ∈ A",
                  "explanation": "Số 2 nằm trong tập hợp A nên ta ghi 2 ∈ A."
                }
              ],
              "medium": [
                {
                  "id": "q2",
                  "type": "multiple-choice",
                  "question": "Giao của hai tập hợp A = {1, 3, 5} và B = {3, 5, 7} là tập hợp nào?",
                  "options": ["{3, 5}", "{1, 7}", "{1, 3, 5, 7}", "Rỗng"],
                  "correctAnswer": "{3, 5}",
                  "explanation": "Các phần tử chung của cả hai tập hợp A và B là 3 và 5."
                }
              ],
              "hard": [
                {
                  "id": "q3",
                  "type": "multiple-choice",
                  "question": "Cho hai tập hợp X = {x ∈ N | x < 5} và Y = {2, 4, 6}. Tập hợp các phần tử thuộc X nhưng không thuộc Y là gì?",
                  "options": ["{0, 1, 3}", "{0, 1, 3, 4}", "{2, 4}", "{6}"],
                  "correctAnswer": "{0, 1, 3}",
                  "explanation": "X = {0, 1, 2, 3, 4}. Loại bỏ các số thuộc Y ({2, 4}), ta còn lại {0, 1, 3}."
                }
              ]
            }
          }
        ]
      }
    ]
  }
  ```

- [ ] **Step 2: Commit**
  Run: `git add math6-app/public/lessons.json`
  Run: `git commit -m "feat: add textbook curriculum JSON database"`


### Task 3: Implement Storage Utility & Zalo Share Formatter

**Files:**
- Create: `math6-app/src/utils/storage.js`
- Create: `math6-app/tests/storage.test.js`

- [ ] **Step 1: Write failing test for storage utils**
  Create `math6-app/tests/storage.test.js`:
  ```javascript
  import { describe, it, expect, beforeEach } from 'vitest';
  import { saveAttempt, getHistory, formatZaloMessage } from '../src/utils/storage';

  describe('Storage Utilities', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should save and retrieve attempts', () => {
      const attempt = {
        lessonId: 'bai-1',
        lessonTitle: 'Bài 1: Tập hợp',
        level: 'easy',
        score: '9/10',
        timeTaken: 120
      };

      saveAttempt(attempt);
      const history = getHistory();
      expect(history.length).toBe(1);
      expect(history[0].lessonId).toBe('bai-1');
      expect(history[0].score).toBe('9/10');
    });

    it('should format Zalo message correctly', () => {
      const msg = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '10/10', 85);
      expect(msg).toContain('KẾT QUẢ HỌC TOÁN 6 - CÚN');
      expect(msg).toContain('Bài 1: Tập hợp');
      expect(msg).toContain('10/10');
      expect(msg).toContain('1 phút 25 giây');
    });
  });
  ```

- [ ] **Step 2: Run test and verify failure**
  Run: `npm run test -- --run`
  Expected: FAIL (Cannot find module '../src/utils/storage')

- [ ] **Step 3: Implement storage utilities**
  Create `math6-app/src/utils/storage.js`:
  ```javascript
  const KEY = 'math6_companion_history';

  export function getHistory() {
    try {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  export function saveAttempt(attempt) {
    const history = getHistory();
    const newRecord = {
      ...attempt,
      timestamp: Date.now()
    };
    history.unshift(newRecord);
    try {
      localStorage.setItem(KEY, JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }

  export function formatZaloMessage(lessonTitle, levelLabel, scoreText, timeSeconds) {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    const timeStr = `${minutes > 0 ? minutes + ' phút ' : ''}${seconds} giây`;

    return `📐 KẾT QUẢ HỌC TOÁN 6 - CÚN 📐\n\nCon vừa hoàn thành bài học:\n👉 ${lessonTitle}\n\n• Cấp độ: ${levelLabel}\n• Điểm số: ${scoreText} ${scoreText === '10/10' ? '(Đạt điểm tuyệt đối! 🎉)' : ''}\n• Thời gian: ${timeStr}\n\nBố Mẹ xem lại quá trình học của con nhé! ❤️`;
  }
  ```

- [ ] **Step 4: Run tests to verify pass**
  Run: `npm run test -- --run`
  Expected: PASS

- [ ] **Step 5: Commit**
  Run: `git add math6-app/src/utils/storage.js math6-app/tests/storage.test.js`
  Run: `git commit -m "feat: implement local storage progress log and Zalo message formatting"`


### Task 4: Implement Core State Manager & App Shell

**Files:**
- Create: `math6-app/src/components/HistoryModal.jsx`
- Modify: `math6-app/src/App.jsx`
- Create: `math6-app/tests/App.test.jsx`

- [ ] **Step 1: Write failing integration tests for App state flow**
  Create `math6-app/tests/App.test.jsx`:
  ```jsx
  import { describe, it, expect, vi } from 'vitest';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import React from 'react';
  import App from '../src/App';

  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        chapters: [
          {
            id: 'chapter-1',
            title: 'Chương I: Tập hợp các số tự nhiên',
            lessons: [
              {
                id: 'bai-1',
                title: 'Bài 1: Tập hợp',
                description: 'Tập hợp và phần tử',
                theory: { explanation: 'Lý thuyết 1', visualizerType: 'VennDiagram' },
                exercises: { easy: [], medium: [], hard: [] }
              }
            ]
          }
        ]
      })
    })
  ));

  describe('App Shell & Router Integration', () => {
    it('should render header with stats and Quest Map', async () => {
      render(<App />);
      expect(screen.getByText(/Tải dữ liệu/i)).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText(/Bài 1: Tập hợp/i)).toBeInTheDocument();
      });
      expect(screen.getByText(/🦉 Toán 6 Phiêu Lưu Ký/i)).toBeInTheDocument();
      expect(screen.getByText(/❤️/i)).toBeInTheDocument();
      expect(screen.getByText(/⭐/i)).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Run tests and verify failure**
  Run: `npm run test -- --run`
  Expected: FAIL

- [ ] **Step 3: Create HistoryModal component**
  Create `math6-app/src/components/HistoryModal.jsx`:
  ```jsx
  import React, { useEffect, useState } from 'react';
  import { getHistory } from '../utils/storage';

  export default function HistoryModal({ isOpen, onClose }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
      if (isOpen) {
        setHistory(getHistory());
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>📊 Nhật Ký Học Tập Của Cún</h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {history.length === 0 ? (
              <p className="no-data">Cún chưa làm bài tập nào. Hãy bắt đầu bản đồ bài học nhé!</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Bài học</th>
                    <th>Cấp độ</th>
                    <th>Điểm số</th>
                    <th>Thời gian</th>
                    <th>Ngày học</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td><strong>{h.lessonTitle}</strong></td>
                      <td><span className={`badge ${h.level}`}>{h.level.toUpperCase()}</span></td>
                      <td><strong className="score-text">{h.score}</strong></td>
                      <td>{Math.floor(h.timeTaken / 60)}m {h.timeTaken % 60}s</td>
                      <td className="date-cell">{new Date(h.timestamp).toLocaleString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 4: Implement App.jsx layout and core states**
  Replace `math6-app/src/App.jsx`:
  ```jsx
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
  ```

- [ ] **Step 5: Create dummy placeholder components to allow Vitest compilation**
  Create empty stub component files for QuestMap, LessonDrawer, TheorySection, and QuizSection so App compiles:
  *   Create `math6-app/src/components/QuestMap.jsx` containing: `export default function QuestMap() { return <div data-testid="quest-map">QuestMap</div>; }`
  *   Create `math6-app/src/components/LessonDrawer.jsx` containing: `export default function LessonDrawer() { return null; }`
  *   Create `math6-app/src/components/TheorySection.jsx` containing: `export default function TheorySection() { return null; }`
  *   Create `math6-app/src/components/QuizSection.jsx` containing: `export default function QuizSection() { return null; }`

- [ ] **Step 6: Run tests to verify pass**
  Run: `npm run test -- --run`
  Expected: PASS

- [ ] **Step 7: Commit**
  Run: `git add math6-app/src/App.jsx math6-app/src/components/HistoryModal.jsx math6-app/src/components/QuestMap.jsx math6-app/src/components/LessonDrawer.jsx math6-app/src/components/TheorySection.jsx math6-app/src/components/QuizSection.jsx math6-app/tests/App.test.jsx`
  Run: `git commit -m "feat: implement App shell integration and history tracking modal"`


### Task 5: Implement Quest Map Navigation and Drawer

**Files:**
- Create: `math6-app/src/components/QuestMap.jsx`
- Create: `math6-app/src/components/LessonDrawer.jsx`

- [ ] **Step 1: Implement QuestMap component**
  Replace `math6-app/src/components/QuestMap.jsx`:
  ```jsx
  import React from 'react';

  export default function QuestMap({ curriculum, progress, onSelectLesson }) {
    let unlocked = true; // First lesson is unlocked

    return (
      <div className="quest-map">
        <h2 className="section-title">📍 Bản Đồ Bài Học</h2>
        <div className="map-path">
          {curriculum.chapters.map((chapter) => (
            <div key={chapter.id} className="chapter-group">
              <h3 className="chapter-title">{chapter.title}</h3>
              <div className="lessons-list">
                {chapter.lessons.map((lesson) => {
                  const isCompleted = progress[`${lesson.id}_easy`] && progress[`${lesson.id}_medium`] && progress[`${lesson.id}_hard`];
                  const isActive = unlocked;
                  const isCurrent = isActive && !isCompleted;
                  
                  // Next lesson is locked unless this one is fully completed
                  if (!isCompleted) unlocked = false;

                  return (
                    <div 
                      key={lesson.id} 
                      className={`lesson-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${!isActive ? 'locked' : ''}`}
                      onClick={() => isActive && onSelectLesson(lesson)}
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
  ```

- [ ] **Step 2: Implement LessonDrawer component**
  Replace `math6-app/src/components/LessonDrawer.jsx`:
  ```jsx
  import React from 'react';

  export default function LessonDrawer({ lesson, progress, onClose, onStartTheory, onStartQuiz }) {
    if (!lesson) return null;

    const isEasyCompleted = progress[`${lesson.id}_easy`];
    const isMediumCompleted = progress[`${lesson.id}_medium`];

    return (
      <div className="drawer-overlay" onClick={onClose}>
        <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>{lesson.title}</h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
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
                <button className="btn-level easy" onClick={() => onStartQuiz('easy')}>
                  <span>⭐ Cấp độ Dễ</span>
                  <span>{isEasyCompleted ? '✅ Đã xong' : 'Chơi ➔'}</span>
                </button>

                {/* Medium Level */}
                <button 
                  className={`btn-level medium ${!isEasyCompleted ? 'btn-locked' : ''}`} 
                  onClick={() => isEasyCompleted && onStartQuiz('medium')}
                  disabled={!isEasyCompleted}
                >
                  <span>⭐ ⭐ Cấp độ Vừa</span>
                  <span>{!isEasyCompleted ? '🔒 Khóa' : isMediumCompleted ? '✅ Đã xong' : 'Chơi ➔'}</span>
                </button>

                {/* Hard Level */}
                <button 
                  className={`btn-level hard ${!isMediumCompleted ? 'btn-locked' : ''}`} 
                  onClick={() => isMediumCompleted && onStartQuiz('hard')}
                  disabled={!isMediumCompleted}
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
  ```

- [ ] **Step 3: Commit**
  Run: `git add math6-app/src/components/QuestMap.jsx math6-app/src/components/LessonDrawer.jsx`
  Run: `git commit -m "feat: build QuestMap layout and selection drawer components"`


### Task 6: Implement Theory Section and Venn Diagram Visualizer

**Files:**
- Create: `math6-app/src/components/TheorySection.jsx`
- Create: `math6-app/src/components/visualizers/VennDiagram.jsx`

- [ ] **Step 1: Build VennDiagram component with drag-and-drop elements**
  Create `math6-app/src/components/visualizers/VennDiagram.jsx`:
  ```jsx
  import React, { useState } from 'react';

  export default function VennDiagram({ config }) {
    const { setA, setB } = config;
    const allElements = Array.from(new Set([...setA.elements, ...setB.elements])).sort();
    
    // Positions: 'pool', 'A', 'B', 'AB' (Intersection)
    const [positions, setPositions] = useState(
      allElements.reduce((acc, el) => ({ ...acc, [el]: 'pool' }), {})
    );
    const [feedback, setFeedback] = useState('');

    const checkAnswers = () => {
      let correct = true;
      allElements.forEach(el => {
        const inA = setA.elements.includes(el);
        const inB = setB.elements.includes(el);
        const pos = positions[el];

        if (inA && inB && pos !== 'AB') correct = false;
        else if (inA && !inB && pos !== 'A') correct = false;
        else if (!inA && inB && pos !== 'B') correct = false;
      });

      setFeedback(correct ? '🎉 Tuyệt vời! Cún đã xếp đúng các số vào các tập hợp!' : '❌ Có số bị xếp nhầm vị trí rồi. Cún xem lại nhé!');
    };

    const moveElement = (element, target) => {
      setPositions(prev => ({ ...prev, [element]: target }));
    };

    return (
      <div className="venn-visualizer">
        <div className="venn-diagram-container">
          {/* Set A Circle */}
          <div className="venn-circle set-a" onClick={() => {}}>
            <h4>{setA.name}</h4>
            <div className="circle-elements">
              {allElements.filter(el => positions[el] === 'A').map(el => (
                <div key={el} className="number-badge" onClick={() => moveElement(el, 'pool')}>{el}</div>
              ))}
            </div>
          </div>

          {/* Overlap / Intersection Zone */}
          <div className="venn-overlap" onClick={() => {}}>
            <div className="circle-elements overlap">
              {allElements.filter(el => positions[el] === 'AB').map(el => (
                <div key={el} className="number-badge purple" onClick={() => moveElement(el, 'pool')}>{el}</div>
              ))}
            </div>
          </div>

          {/* Set B Circle */}
          <div className="venn-circle set-b" onClick={() => {}}>
            <h4>{setB.name}</h4>
            <div className="circle-elements">
              {allElements.filter(el => positions[el] === 'B').map(el => (
                <div key={el} className="number-badge orange" onClick={() => moveElement(el, 'pool')}>{el}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Drag pool */}
        <div className="elements-pool">
          <p>Bấm vào số để phân loại vào tập hợp:</p>
          <div className="pool-list">
            {allElements.filter(el => positions[el] === 'pool').map(el => (
              <div key={el} className="number-badge draggable">
                <span className="value">{el}</span>
                <div className="actions">
                  <button onClick={() => moveElement(el, 'A')}>A</button>
                  <button onClick={() => moveElement(el, 'AB')}>Giao</button>
                  <button onClick={() => moveElement(el, 'B')}>B</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="actions-bar">
          <button className="btn-verify" onClick={checkAnswers}>Kiểm tra xếp số</button>
          <button className="btn-reset" onClick={() => setPositions(allElements.reduce((acc, el) => ({ ...acc, [el]: 'pool' }), {}))}>Làm lại</button>
        </div>
        {feedback && <div className={`feedback-msg ${feedback.startsWith('🎉') ? 'success' : 'error'}`}>{feedback}</div>}
      </div>
    );
  }
  ```

- [ ] **Step 2: Build TheorySection layout wrapper**
  Replace `math6-app/src/components/TheorySection.jsx`:
  ```jsx
  import React from 'react';
  import VennDiagram from './visualizers/VennDiagram';

  export default function TheorySection({ lesson, onBack, onRecoverHearts }) {
    if (!lesson) return null;

    const renderVisualizer = () => {
      const type = lesson.theory.visualizerType;
      const config = lesson.theory.visualizerConfig;
      if (type === 'VennDiagram') {
        return <VennDiagram config={config} />;
      }
      return <div className="placeholder">Mô phỏng đồ họa sẽ sớm xuất hiện!</div>;
    };

    return (
      <div className="theory-section">
        <div className="section-header">
          <button className="btn-back" onClick={onBack}>← Quay lại Bản đồ</button>
          <h2>📖 {lesson.title}: Lý thuyết lý thú</h2>
        </div>

        <div className="theory-grid">
          <div className="theory-text-card">
            <h3>Định nghĩa mới</h3>
            <p className="explanation-text">{lesson.theory.explanation}</p>
            <div className="recover-card">
              <p>💡 Đọc hiểu lý thuyết giúp khôi phục sinh mệnh của con!</p>
              <button className="btn-recover" onClick={() => { onRecoverHearts(); alert('Khôi phục 2 ❤️ thành công!'); }}>
                ❤️ Nạp 2 sinh mệnh
              </button>
            </div>
          </div>
          <div className="theory-visualizer-card">
            <h3>🔬 Thực hành trực quan</h3>
            {renderVisualizer()}
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 3: Commit**
  Run: `git add math6-app/src/components/TheorySection.jsx math6-app/src/components/visualizers/VennDiagram.jsx`
  Run: `git commit -m "feat: build TheorySection wrapper and VennDiagram visualizer component"`


### Task 7: Implement Secondary Math Visualizers

**Files:**
- Create: `math6-app/src/components/visualizers/NumberLine.jsx`
- Create: `math6-app/src/components/visualizers/DivisibilitySieve.jsx`
- Create: `math6-app/src/components/visualizers/SymmetryLab.jsx`
- Modify: `math6-app/src/components/TheorySection.jsx`

- [ ] **Step 1: Build NumberLine component**
  Create `math6-app/src/components/visualizers/NumberLine.jsx`:
  ```jsx
  import React, { useState } from 'react';

  export default function NumberLine() {
    const [value, setValue] = useState(0);
    const [start, setStart] = useState(0);
    const [operator, setOperator] = useState('+');
    const [diff, setDiff] = useState(3);

    const calculate = () => {
      const offset = operator === '+' ? diff : -diff;
      setValue(start + offset);
    };

    return (
      <div className="numberline-visualizer">
        <p className="viz-info">Khám phá số nguyên bằng cách cộng hoặc trừ trên trục số:</p>
        
        {/* Math expression display */}
        <div className="math-expr">
          <span>{start}</span>
          <select value={operator} onChange={(e) => setOperator(e.target.value)}>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <input type="number" min="1" max="10" value={diff} onChange={(e) => setDiff(Number(e.target.value))} />
          <button className="btn-calc" onClick={calculate}>=</button>
          <strong className="result-val">{value}</strong>
        </div>

        {/* Trục số */}
        <div className="line-axis-container">
          <div className="line-arrow"></div>
          <div className="line-ticks">
            {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map(tick => {
              const posPercent = ((tick + 10) / 20) * 100;
              return (
                <div key={tick} className="tick-mark" style={{ left: `${posPercent}%` }}>
                  <div className="tick-line"></div>
                  <span className="tick-label">{tick}</span>
                </div>
              );
            })}
            
            {/* The active marker */}
            <div className="active-marker" style={{ left: `${((value + 10) / 20) * 100}%` }}>
              <span>🐰</span>
            </div>

            {/* The start marker */}
            <div className="start-marker" style={{ left: `${((start + 10) / 20) * 100}%` }}>
              <span>🚩</span>
            </div>
          </div>
        </div>

        <div className="viz-controls">
          <button onClick={() => { setStart(value); }}>Đặt vị trí bắt đầu tại đây 🚩</button>
          <button className="btn-reset" onClick={() => { setStart(0); setValue(0); }}>Đặt lại từ 0</button>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Build DivisibilitySieve component**
  Create `math6-app/src/components/visualizers/DivisibilitySieve.jsx`:
  ```jsx
  import React, { useState } from 'react';

  export default function DivisibilitySieve() {
    const [selectedDivisor, setSelectedDivisor] = useState(null);
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1); // 1 to 50 for mobile responsiveness

    return (
      <div className="sieve-visualizer">
        <p className="viz-info">Bấm chọn một số để tìm các bội số (số chia hết cho số đó):</p>
        
        <div className="divisor-selector">
          {[2, 3, 5, 9].map(div => (
            <button 
              key={div} 
              className={`btn-divisor ${selectedDivisor === div ? 'active' : ''}`}
              onClick={() => setSelectedDivisor(selectedDivisor === div ? null : div)}
            >
              Bội số của {div}
            </button>
          ))}
        </div>

        <div className="numbers-grid">
          {numbers.map(num => {
            const isMultiple = selectedDivisor && num % selectedDivisor === 0;
            return (
              <div key={num} className={`grid-num-cell ${isMultiple ? 'highlighted' : ''}`}>
                {num}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 3: Build SymmetryLab component**
  Create `math6-app/src/components/visualizers/SymmetryLab.jsx`:
  ```jsx
  import React, { useState } from 'react';

  export default function SymmetryLab() {
    const [angle, setAngle] = useState(0);
    const [showAxis, setShowAxis] = useState(false);

    return (
      <div className="symmetry-visualizer">
        <p className="viz-info">Trực quan hóa đối xứng của hình phẳng. Thử xoay hình hoặc bật trục đối xứng:</p>

        <div className="canvas-frame">
          <div className="symmetry-shape-container" style={{ transform: `rotate(${angle}deg)` }}>
            {/* Equilateral Triangle */}
            <svg width="150" height="150" viewBox="0 0 100 100" className="geom-svg">
              <polygon points="50,15 90,85 10,85" fill="#3498db" stroke="#2980b9" strokeWidth="3" />
            </svg>
          </div>

          {showAxis && (
            <div className="axis-line vertical"></div>
          )}
        </div>

        <div className="viz-controls flex">
          <button onClick={() => setAngle(prev => (prev + 120) % 360)}>Xoay hình 120° 🔄</button>
          <button onClick={() => setShowAxis(!showAxis)}>
            {showAxis ? 'Tắt trục đối xứng ✕' : 'Bật trục đối xứng 📏'}
          </button>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 4: Update TheorySection to resolve all visualizers**
  Modify `math6-app/src/components/TheorySection.jsx` to load all visualizers:
  ```jsx
  import React from 'react';
  import VennDiagram from './visualizers/VennDiagram';
  import NumberLine from './visualizers/NumberLine';
  import DivisibilitySieve from './visualizers/DivisibilitySieve';
  import SymmetryLab from './visualizers/SymmetryLab';

  export default function TheorySection({ lesson, onBack, onRecoverHearts }) {
    if (!lesson) return null;

    const renderVisualizer = () => {
      const type = lesson.theory.visualizerType;
      const config = lesson.theory.visualizerConfig;
      switch (type) {
        case 'VennDiagram':
          return <VennDiagram config={config} />;
        case 'NumberLine':
          return <NumberLine />;
        case 'DivisibilitySieve':
          return <DivisibilitySieve />;
        case 'SymmetryLab':
          return <SymmetryLab />;
        default:
          return <div className="placeholder">Mô phỏng đồ họa đang được thiết kế!</div>;
      }
    };

    return (
      <div className="theory-section">
        <div className="section-header">
          <button className="btn-back" onClick={onBack}>← Quay lại Bản đồ</button>
          <h2>📖 {lesson.title}: Lý thuyết lý thú</h2>
        </div>

        <div className="theory-grid">
          <div className="theory-text-card">
            <h3>Định nghĩa mới</h3>
            <p className="explanation-text">{lesson.theory.explanation}</p>
            <div className="recover-card">
              <p>💡 Đọc hiểu lý thuyết giúp khôi phục sinh mệnh của con!</p>
              <button className="btn-recover" onClick={() => { onRecoverHearts(); alert('Khôi phục 2 ❤️ thành công!'); }}>
                ❤️ Nạp 2 sinh mệnh
              </button>
            </div>
          </div>
          <div className="theory-visualizer-card">
            <h3>🔬 Thực hành trực quan</h3>
            {renderVisualizer()}
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 5: Commit**
  Run: `git add math6-app/src/components/TheorySection.jsx math6-app/src/components/visualizers`
  Run: `git commit -m "feat: build auxiliary NumberLine, DivisibilitySieve, and SymmetryLab visualizers"`


### Task 8: Implement Quiz Section with Zalo Share Dialog

**Files:**
- Create: `math6-app/src/components/QuizSection.jsx`

- [ ] **Step 1: Write QuizSection component**
  Replace `math6-app/src/components/QuizSection.jsx` with full logic:
  ```jsx
  import React, { useState, useEffect } from 'react';
  import { saveAttempt, formatZaloMessage } from '../utils/storage';

  export default function QuizSection({ lesson, level, hearts, setHearts, onCompleted, onBack }) {
    const questions = lesson.exercises[level] || [];
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [startTime] = useState(Date.now());
    const [showResultCard, setShowResultCard] = useState(false);
    const [isCompletedState, setIsCompletedState] = useState(false);

    if (questions.length === 0) {
      return (
        <div className="quiz-empty-card">
          <h3>Thử thách chưa sẵn sàng</h3>
          <p>Hiện tại cấp độ này chưa có câu hỏi nào. Bố Mẹ sẽ sớm cập nhật file lessons.json trên GitHub nhé!</p>
          <button className="btn-back" onClick={onBack}>Quay lại Bản đồ</button>
        </div>
      );
    }

    const currentQ = questions[currentIdx];

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
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
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
      }
      setShowResultCard(true);
    };

    const handleZaloShare = () => {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const levelLabels = { easy: 'Dễ (Easy)', medium: 'Vừa (Medium)', hard: 'Khó (Hard)' };
      const scoreStr = `${correctCount}/${questions.length}`;

      const message = formatZaloMessage(lesson.title, levelLabels[level], scoreStr, timeTaken);
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
        <div className="quiz-fail-card">
          <span className="fail-emoji">💔</span>
          <h2>Hết sinh mệnh mất rồi!</h2>
          <p>Con đừng buồn nhé! Hãy quay lại phần lý thuyết và chơi các mô phỏng trực quan để nạp lại thêm sinh mệnh ❤️ nhé.</p>
          <button className="btn-primary" onClick={onBack}>Quay lại Bản đồ</button>
        </div>
      );
    }

    if (showResultCard) {
      return (
        <div className="quiz-result-overlay">
          <div className="result-card">
            <span className="celebrate-emoji">{isCompletedState ? '🎉' : '💪'}</span>
            <h2>{isCompletedState ? 'Tuyệt Vời, Cún Ơi!' : 'Hãy Thử Lại Nhé!'}</h2>
            <p className="subtitle">{isCompletedState ? 'Con đã chinh phục thành công thử thách này!' : 'Cố gắng lên một chút nữa là đạt rồi!'}</p>
            
            <div className="score-summary">
              <div className="summary-item">
                <span className="label">ĐIỂM SỐ</span>
                <span className="value green">{correctCount} / {questions.length}</span>
              </div>
              <div className="summary-item">
                <span className="label">THỜI GIAN</span>
                <span className="value dark">
                  {Math.floor(Math.floor((Date.now() - startTime) / 1000) / 60)}m {Math.floor((Date.now() - startTime) / 1000) % 60}s
                </span>
              </div>
            </div>

            <div className="actions-buttons">
              <button className="btn-zalo" onClick={handleZaloShare}>
                💬 Gửi kết quả qua Zalo
              </button>
              <button className="btn-secondary" onClick={onBack}>
                Quay lại Bản đồ chính
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="quiz-section-container">
        <div className="quiz-header-bar">
          <button className="btn-back-flat" onClick={onBack}>← Hủy bỏ</button>
          <span className="quiz-level-indicator">Thử thách: {level.toUpperCase()}</span>
          <span className="quiz-counter">Câu {currentIdx + 1}/{questions.length}</span>
        </div>

        <div className="quiz-main-card">
          <h3 className="quiz-question">{currentQ.question}</h3>
          
          <div className="options-grid">
            {currentQ.options.map((opt) => {
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
                <div 
                  key={opt} 
                  className={`option-card ${optClass}`} 
                  onClick={() => handleAnswerSelect(opt)}
                >
                  <span className="option-letter">{opt.charAt(0)}</span>
                  <span className="option-text">{opt}</span>
                </div>
              );
            })}
          </div>

          <div className="quiz-footer-actions">
            {!isAnswered ? (
              <button className="btn-verify-quiz" disabled={!selectedOpt} onClick={handleVerifyAnswer}>
                Kiểm tra kết quả
              </button>
            ) : (
              <div className="explanation-drawer">
                <p className="exp-text">💡 <strong>Giải thích:</strong> {currentQ.explanation}</p>
                <button className="btn-next-quiz" onClick={handleNextQuestion}>
                  Tiếp tục ➔
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Run all tests to make sure they compile and pass**
  Run: `npm run test -- --run`
  Expected: PASS

- [ ] **Step 3: Commit**
  Run: `git add math6-app/src/components/QuizSection.jsx`
  Run: `git commit -m "feat: implement QuizSection with heart system, explanations, and Zalo share"`


### Task 9: Design Styling and Visual Polish (Vanilla CSS)

**Files:**
- Modify: `math6-app/src/index.css`

- [ ] **Step 1: Write responsive CSS file**
  Replace `math6-app/src/index.css` with a responsive design layout:
  ```css
  :root {
    --primary: #3498db;
    --primary-dark: #2980b9;
    --success: #2ecc71;
    --danger: #e74c3c;
    --warning: #f1c40f;
    --text: #2c3e50;
    --text-muted: #7f8c8d;
    --bg: #f5f7fa;
    --card-bg: rgba(255, 255, 255, 0.85);
    --border: #e2e8f0;
    --radius: 16px;
    --font: system-ui, -apple-system, sans-serif;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    line-height: 1.5;
  }

  .app-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    margin-bottom: 1.5rem;
    border: 1px solid var(--border);
  }

  .logo-emoji {
    font-size: 2.2rem;
    cursor: pointer;
  }

  .app-header h1 {
    margin: 0;
    font-size: 1.25rem;
  }

  .student-name {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-badge {
    background: #fff;
    border: 1px solid var(--border);
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .btn-history {
    background: var(--success);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
  }

  /* Quest Map */
  .quest-map {
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid var(--border);
    text-align: center;
  }

  .map-path {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .lesson-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .lesson-node:hover {
    transform: scale(1.05);
  }

  .node-button {
    width: 70px;
    height: 70px;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.8rem;
    border: 4px solid #fff;
    box-shadow: 0 6px 12px rgba(52, 152, 219, 0.2);
  }

  .lesson-node.completed .node-button {
    background: var(--success);
    box-shadow: 0 6px 12px rgba(46, 204, 113, 0.2);
  }

  .lesson-node.locked {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lesson-node.locked .node-button {
    background: var(--text-muted);
  }

  .node-label {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 0.95rem;
  }

  /* Drawer Overlay */
  .drawer-overlay, .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .modal-overlay {
    align-items: center;
  }

  .drawer-content {
    background: #fff;
    width: 100%;
    max-width: 500px;
    border-radius: 24px 24px 0 0;
    padding: 2rem;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
  }

  .modal-content {
    background: #fff;
    width: 90%;
    max-width: 600px;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .close-btn {
    background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--text-muted);
  }

  .btn-level {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--border);
    background: #fff;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 0.8rem;
  }

  .btn-level:hover {
    border-color: var(--primary);
  }

  .btn-locked {
    background: var(--bg);
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Venn Diagram */
  .venn-diagram-container {
    display: flex;
    position: relative;
    width: 380px;
    height: 200px;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .venn-circle {
    width: 160px;
    height: 160px;
    border: 3px solid var(--primary);
    border-radius: 50%;
    background: rgba(52, 152, 219, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
  }

  .venn-circle.set-b {
    border-color: var(--danger);
    background: rgba(231, 76, 60, 0.05);
  }

  .venn-overlap {
    position: absolute;
    width: 100px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .number-badge {
    background: #fff;
    border: 1px solid var(--primary);
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.85rem;
  }

  .number-badge.purple { border-color: #9b59b6; color: #9b59b6; }
  .number-badge.orange { border-color: var(--danger); color: var(--danger); }

  /* Grid Layouts for Theory */
  .theory-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .theory-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Quiz Style */
  .option-card {
    border: 2px solid var(--border);
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s;
    background: #fff;
  }

  .option-card.selected {
    border-color: var(--primary);
    background: rgba(52, 152, 219, 0.05);
  }

  .option-card.correct {
    border-color: var(--success);
    background: rgba(46, 204, 113, 0.05);
  }

  .option-card.incorrect {
    border-color: var(--danger);
    background: rgba(231, 76, 60, 0.05);
  }
  ```

- [ ] **Step 2: Commit**
  Run: `git add math6-app/src/index.css`
  Run: `git commit -m "style: add responsive layout, buttons, Venn diagram and quiz card custom styling"`


### Task 10: Setup GitHub Actions Deployment Flow

**Files:**
- Create: `math6-app/.github/workflows/deploy.yml`
- Modify: `math6-app/vite.config.js`

- [ ] **Step 1: Update base URL in vite.config.js**
  Modify base path so it serves correctly under subfolders in GitHub Pages:
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    base: './', // Serve static assets relatively
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.js',
    },
  });
  ```

- [ ] **Step 2: Create deploy.yml**
  Create `math6-app/.github/workflows/deploy.yml` for automated releases:
  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches: [ "main" ]

  permissions:
    contents: read
    pages: write
    id-token: write

  concurrency:
    group: "pages"
    cancel-in-progress: true

  jobs:
    deploy:
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      runs-on: ubuntu-latest
      defaults:
        run:
          working-directory: math6-app
      steps:
        - name: Checkout
          uses: actions/checkout@v4
        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-cache: npm
            node-version: 20
            cache-dependency-path: math6-app/package-lock.json
        - name: Install dependencies
          run: npm ci
        - name: Build
          run: npm run build
        - name: Setup Pages
          uses: actions/configure-pages@v4
        - name: Upload artifact
          uses: actions/upload-pages-artifact@v3
          with:
            path: 'math6-app/dist'
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v4
      ```

- [ ] **Step 3: Commit**
  Run: `git add math6-app/.github/workflows/deploy.yml math6-app/vite.config.js`
  Run: `git commit -m "ci: configure automated build and deployment action for GitHub Pages"`
