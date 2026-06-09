import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { getHistory } from '../src/utils/storage';

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

vi.mock('../src/utils/storage', () => ({
  getHistory: vi.fn(() => []),
  saveAttempt: vi.fn(),
}));

vi.mock('../src/components/QuestMap', () => ({
  default: ({ curriculum, onSelectLesson }) => (
    <div data-testid="quest-map">
      {curriculum && curriculum.chapters.map(c => 
        c.lessons.map(l => (
          <div key={l.id} data-testid={`lesson-${l.id}`} onClick={() => onSelectLesson(l)}>
            {l.title}
          </div>
        ))
      )}
    </div>
  )
}));

vi.mock('../src/components/LessonDrawer', () => ({
  default: ({ lesson, onStartTheory, onStartQuiz, onClose }) => {
    if (!lesson) return null;
    return (
      <div data-testid="lesson-drawer">
        <div data-testid="drawer-title">{lesson.title}</div>
        <button data-testid="start-theory-btn" onClick={onStartTheory}>Start Theory</button>
        <button data-testid="start-quiz-btn" onClick={() => onStartQuiz('easy')}>Start Quiz</button>
        <button data-testid="close-drawer-btn" onClick={onClose}>Close</button>
      </div>
    );
  }
}));

vi.mock('../src/components/QuizSection', () => ({
  default: ({ hearts, setHearts, onBack }) => (
    <div data-testid="quiz-section">
      <span data-testid="quiz-hearts">{hearts}</span>
      <button data-testid="set-hearts-2-btn" onClick={() => setHearts(2)}>Set Hearts to 2</button>
      <button data-testid="back-to-map-btn" onClick={onBack}>Back</button>
    </div>
  )
}));

vi.mock('../src/components/TheorySection', () => ({
  default: ({ onRecoverHearts, onBack }) => (
    <div data-testid="theory-section">
      <button data-testid="recover-hearts-btn" onClick={onRecoverHearts}>Recover</button>
      <button data-testid="back-to-map-btn" onClick={onBack}>Back</button>
    </div>
  )
}));

describe('App Shell & Router Integration', () => {
  it('should render header with stats and Quest Map', async () => {
    vi.mocked(getHistory).mockReturnValue([]);
    render(<App />);
    expect(screen.getByText(/Tải dữ liệu/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Bài 1: Tập hợp/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/🦉/i)).toBeInTheDocument();
    expect(screen.getByText(/Toán 6 Phiêu Lưu Ký/i)).toBeInTheDocument();
    expect(screen.getByText(/❤️/i)).toBeInTheDocument();
    expect(screen.getByText(/⭐/i)).toBeInTheDocument();
  });

  it('should calculate initial stars correctly based on history', async () => {
    vi.mocked(getHistory).mockReturnValue([
      { lessonId: 'bai-1', level: 'easy', score: '10/10' },
      { lessonId: 'bai-1', level: 'medium', score: '7/10' }
    ]);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Bài 1: Tập hợp/i)).toBeInTheDocument();
    });

    const starBadge = screen.getByText(/⭐/i).closest('.stat-badge');
    expect(starBadge).toHaveTextContent('4');
  });

  it('should recover hearts and cap them at 5', async () => {
    vi.mocked(getHistory).mockReturnValue([]);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Bài 1: Tập hợp/i)).toBeInTheDocument();
    });

    // Verify initial hearts is 5
    let heartsBadge = screen.getByText(/❤️/i).closest('.stat-badge');
    expect(heartsBadge).toHaveTextContent('5/5');

    // Click on lesson to open drawer, start quiz, and reduce hearts to 2
    fireEvent.click(screen.getByTestId('lesson-bai-1'));
    fireEvent.click(screen.getByTestId('start-quiz-btn'));
    
    // Simulate setting hearts to 2
    fireEvent.click(screen.getByTestId('set-hearts-2-btn'));
    heartsBadge = screen.getByText(/❤️/i).closest('.stat-badge');
    expect(heartsBadge).toHaveTextContent('2/5');

    // Go back to map, open drawer, go to theory
    fireEvent.click(screen.getByTestId('back-to-map-btn'));
    fireEvent.click(screen.getByTestId('lesson-bai-1'));
    fireEvent.click(screen.getByTestId('start-theory-btn'));

    // Trigger recover callback (adds 2 hearts)
    fireEvent.click(screen.getByTestId('recover-hearts-btn'));
    heartsBadge = screen.getByText(/❤️/i).closest('.stat-badge');
    expect(heartsBadge).toHaveTextContent('4/5');

    // Trigger recover callback again (adds 2 hearts but capped at 5)
    fireEvent.click(screen.getByTestId('recover-hearts-btn'));
    heartsBadge = screen.getByText(/❤️/i).closest('.stat-badge');
    expect(heartsBadge).toHaveTextContent('5/5');
  });

  it('should toggle history modal and render attempts', async () => {
    vi.mocked(getHistory).mockReturnValue([
      { 
        lessonId: 'bai-1', 
        level: 'easy', 
        score: '10/10', 
        lessonTitle: 'Bài 1: Tập hợp', 
        timeTaken: 120, 
        timestamp: Date.now() 
      }
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Bài 1: Tập hợp/i)).toBeInTheDocument();
    });

    // Initially modal should not be in the document
    expect(screen.queryByText(/Nhật Ký Học Tập Của Cún/i)).not.toBeInTheDocument();

    // Click "📊 Lịch sử học" button
    fireEvent.click(screen.getByRole('button', { name: /Lịch sử học/i }));

    // Verify modal is open and shows attempts
    expect(screen.getByText(/Nhật Ký Học Tập Của Cún/i)).toBeInTheDocument();
    expect(screen.getByText('10/10')).toBeInTheDocument();
    expect(screen.getByText('2m 0s')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByRole('button', { name: '×' })); // The close button text is '&times;' which renders as '×'
    
    // Verify modal is closed
    expect(screen.queryByText(/Nhật Ký Học Tập Của Cún/i)).not.toBeInTheDocument();
  });
});
