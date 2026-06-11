import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import LessonDrawer from '../src/components/LessonDrawer';

const mockLesson = {
  id: 'lesson-1',
  title: 'Bài 1: Tập hợp',
  description: 'Khái niệm về tập hợp và phần tử.'
};

describe('LessonDrawer Component', () => {
  it('renders null when no lesson is provided', () => {
    const { container } = render(
      <LessonDrawer 
        lesson={null} 
        progress={{}} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={() => {}} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders lesson details and Theory block when lesson is provided', () => {
    render(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{}} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={() => {}} 
      />
    );

    expect(screen.getByText('Bài 1: Tập hợp')).toBeInTheDocument();
    expect(screen.getByText('Khái niệm về tập hợp và phần tử.')).toBeInTheDocument();
    expect(screen.getByText('📖 Phần 1: Học Lý Thuyết')).toBeInTheDocument();
    expect(screen.getByText(/Xem bài giảng & Mô phỏng đồ họa/i)).toBeInTheDocument();
  });

  it('calls onClose when close button or overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{}} 
        onClose={onClose} 
        onStartTheory={() => {}} 
        onStartQuiz={() => {}} 
      />
    );

    // Click close button
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Click overlay
    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(2);

    // Click content (should stop propagation and not call onClose)
    const content = screen.getByTestId('drawer-content');
    fireEvent.click(content);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{}} 
        onClose={onClose} 
        onStartTheory={() => {}} 
        onStartQuiz={() => {}} 
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onStartTheory when start theory button is clicked', () => {
    const onStartTheory = vi.fn();
    render(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{}} 
        onClose={() => {}} 
        onStartTheory={onStartTheory} 
        onStartQuiz={() => {}} 
      />
    );

    const theoryBtn = screen.getByText(/Xem bài giảng & Mô phỏng đồ họa/i);
    fireEvent.click(theoryBtn);
    expect(onStartTheory).toHaveBeenCalledTimes(1);
  });

  it('renders all quiz levels as unlocked by default', () => {
    const onStartQuiz = vi.fn();
    render(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{}} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={onStartQuiz} 
      />
    );

    // All levels should be unlocked and clickable
    const easyBtn = screen.getByTestId('btn-level-easy');
    expect(easyBtn).not.toHaveClass('btn-locked');
    expect(easyBtn).not.toBeDisabled();

    const mediumBtn = screen.getByTestId('btn-level-medium');
    expect(mediumBtn).not.toHaveClass('btn-locked');
    expect(mediumBtn).not.toBeDisabled();

    const hardBtn = screen.getByTestId('btn-level-hard');
    expect(hardBtn).not.toHaveClass('btn-locked');
    expect(hardBtn).not.toBeDisabled();

    // Clicking any level should trigger callback
    fireEvent.click(easyBtn);
    expect(onStartQuiz).toHaveBeenCalledWith('easy');

    onStartQuiz.mockClear();
    fireEvent.click(mediumBtn);
    expect(onStartQuiz).toHaveBeenCalledWith('medium');

    onStartQuiz.mockClear();
    fireEvent.click(hardBtn);
    expect(onStartQuiz).toHaveBeenCalledWith('hard');
  });

  it('does not render placeholder notice and shows theory/exercise blocks for all lessons', () => {
    const placeholderLesson = {
      id: 'lesson-placeholder',
      title: 'Bài 3: Placeholder Lesson',
      description: 'Bài học đang được biên soạn.',
      isPlaceholder: true
    };

    render(
      <LessonDrawer 
        lesson={placeholderLesson} 
        progress={{}} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={() => {}} 
      />
    );

    expect(screen.getByText('Bài 3: Placeholder Lesson')).toBeInTheDocument();
    expect(screen.getByText('Bài học đang được biên soạn.')).toBeInTheDocument();

    expect(screen.queryByTestId('placeholder-notice')).not.toBeInTheDocument();

    expect(screen.getByText('📖 Phần 1: Học Lý Thuyết')).toBeInTheDocument();
    expect(screen.getByText('🎯 Phần 2: Thử Thách Trắc Nghiệm')).toBeInTheDocument();
    expect(screen.getByText(/Xem bài giảng & Mô phỏng đồ họa/i)).toBeInTheDocument();
  });
});
