import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import QuizSection from '../src/components/QuizSection';

const mockLesson = {
  id: 'lesson-1',
  title: 'Bài 1: Tập hợp',
  exercises: {
    easy: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Câu 1: Tập hợp M = {a, b}. Phần tử nào thuộc M?',
        options: ['a', 'c', 'd', 'e'],
        correctAnswer: 'a',
        explanation: 'a nằm trong M.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Câu 2: Số nào chia hết cho 2?',
        options: ['3', '5', '4', '7'],
        correctAnswer: '4',
        explanation: '4 chia hết cho 2.'
      }
    ],
    medium: []
  }
};

function QuizTestWrapper({ lesson = mockLesson, level = 'easy', initialHearts = 5, onCompleted = () => {}, onBack = () => {} }) {
  const [hearts, setHearts] = React.useState(initialHearts);
  return (
    <QuizSection 
      lesson={lesson}
      level={level}
      hearts={hearts}
      setHearts={setHearts}
      onCompleted={onCompleted}
      onBack={onBack}
    />
  );
}

describe('QuizSection Component', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(() => Promise.resolve()),
      },
      writable: true,
      configurable: true,
    });
    
    vi.stubGlobal('alert', vi.fn());
    vi.stubGlobal('open', vi.fn());
  });

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders empty card if lesson exercises are empty', () => {
    render(<QuizTestWrapper lesson={{ id: 'empty-lesson', exercises: {} }} />);
    expect(screen.getByTestId('quiz-empty-card')).toBeInTheDocument();
    expect(screen.getByText(/Thử thách chưa sẵn sàng/i)).toBeInTheDocument();
  });

  it('renders the first question, options, progress bar, and hearts indicator', () => {
    render(<QuizTestWrapper initialHearts={4} />);
    expect(screen.getByTestId('quiz-section')).toBeInTheDocument();
    expect(screen.getByTestId('quiz-question')).toHaveTextContent('Câu 1: Tập hợp M = {a, b}. Phần tử nào thuộc M?');
    expect(screen.getByTestId('quiz-hearts-indicator')).toHaveTextContent('❤️ 4');
    expect(screen.getByTestId('quiz-counter')).toHaveTextContent('Câu 1/2');
    
    const optionCards = screen.getAllByTestId(/option-card-/);
    expect(optionCards.length).toBe(4);
  });

  it('allows selecting an option and verifying the answer', () => {
    render(<QuizTestWrapper />);
    const verifyBtn = screen.getByTestId('btn-verify-quiz');
    expect(verifyBtn).toBeDisabled();

    // Select the correct option
    const correctOpt = screen.getByText('a');
    fireEvent.click(correctOpt);
    expect(verifyBtn).toBeEnabled();

    // Verify
    fireEvent.click(verifyBtn);
    expect(screen.getByTestId('explanation-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('explanation-drawer')).toHaveTextContent('a nằm trong M.');
  });

  it('deducts a heart when an incorrect answer is submitted', () => {
    render(<QuizTestWrapper initialHearts={3} />);
    
    // Select an incorrect option
    const incorrectOpt = screen.getByText('c');
    fireEvent.click(incorrectOpt);
    
    const verifyBtn = screen.getByTestId('btn-verify-quiz');
    fireEvent.click(verifyBtn);

    // Heart count should be decremented to 2
    expect(screen.getByTestId('quiz-hearts-indicator')).toHaveTextContent('❤️ 2');
  });

  it('shows the failure overlay when hearts reach 0', () => {
    render(<QuizTestWrapper initialHearts={1} />);
    
    // Click incorrect option
    const incorrectOpt = screen.getByText('c');
    fireEvent.click(incorrectOpt);
    
    const verifyBtn = screen.getByTestId('btn-verify-quiz');
    fireEvent.click(verifyBtn);

    // Fail card should be shown
    expect(screen.getByTestId('quiz-fail-card')).toBeInTheDocument();
    expect(screen.getByText(/Hết sinh mệnh mất rồi/i)).toBeInTheDocument();
  });

  it('navigates to next question on clicking continue', () => {
    render(<QuizTestWrapper />);
    
    // Answer question 1
    const correctOpt = screen.getByText('a');
    fireEvent.click(correctOpt);
    fireEvent.click(screen.getByTestId('btn-verify-quiz'));
    
    // Click Next
    fireEvent.click(screen.getByTestId('btn-next-quiz'));
    
    // Should render question 2
    expect(screen.getByTestId('quiz-question')).toHaveTextContent('Câu 2: Số nào chia hết cho 2?');
    expect(screen.getByTestId('quiz-counter')).toHaveTextContent('Câu 2/2');
  });

  it('completes the quiz, saves attempt and shows the results overlay', async () => {
    const onCompletedMock = vi.fn();
    render(<QuizTestWrapper onCompleted={onCompletedMock} />);
    
    // Question 1 correct
    fireEvent.click(screen.getByText('a'));
    fireEvent.click(screen.getByTestId('btn-verify-quiz'));
    fireEvent.click(screen.getByTestId('btn-next-quiz'));

    // Question 2 correct
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByTestId('btn-verify-quiz'));
    fireEvent.click(screen.getByTestId('btn-next-quiz'));

    // Result card should be visible
    expect(screen.getByTestId('quiz-result-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('quiz-final-score')).toHaveTextContent('2 / 2');
    expect(onCompletedMock).toHaveBeenCalledWith('lesson-1', 'easy', '2/2');
  });

  it('triggers Zalo sharing, copies message to clipboard, and opens Zalo website', async () => {
    render(<QuizTestWrapper />);
    
    // Complete the quiz
    fireEvent.click(screen.getByText('a'));
    fireEvent.click(screen.getByTestId('btn-verify-quiz'));
    fireEvent.click(screen.getByTestId('btn-next-quiz'));

    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByTestId('btn-verify-quiz'));
    fireEvent.click(screen.getByTestId('btn-next-quiz'));

    const zaloBtn = screen.getByTestId('btn-zalo');
    fireEvent.click(zaloBtn);

    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled());
    await waitFor(() => expect(window.open).toHaveBeenCalledWith('https://zalo.me/', '_blank'));
    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
});
