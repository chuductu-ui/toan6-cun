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

  it('unlocks quiz levels sequentially based on progress', () => {
    const onStartQuiz = vi.fn();
    const { rerender } = render(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{}} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={onStartQuiz} 
      />
    );

    // Initial state: Easy unlocked, Medium and Hard locked
    const easyBtn = screen.getByTestId('btn-level-easy');
    expect(easyBtn).not.toHaveClass('btn-locked');
    expect(easyBtn).not.toBeDisabled();

    const mediumBtn = screen.getByTestId('btn-level-medium');
    expect(mediumBtn).toHaveClass('btn-locked');
    expect(mediumBtn).toBeDisabled();

    const hardBtn = screen.getByTestId('btn-level-hard');
    expect(hardBtn).toHaveClass('btn-locked');
    expect(hardBtn).toBeDisabled();

    // Clicking easy should trigger callback
    fireEvent.click(easyBtn);
    expect(onStartQuiz).toHaveBeenCalledWith('easy');

    // Clicking medium or hard should not trigger callback
    onStartQuiz.mockClear();
    fireEvent.click(mediumBtn);
    expect(onStartQuiz).not.toHaveBeenCalled();

    // Rerender with Easy completed
    rerender(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{ 'lesson-1_easy': 3 }} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={onStartQuiz} 
      />
    );

    // Easy completed, Medium unlocked, Hard still locked
    expect(screen.getByTestId('btn-level-easy')).toHaveTextContent('✅ Đã xong');
    
    const mediumBtnUnlocked = screen.getByTestId('btn-level-medium');
    expect(mediumBtnUnlocked).not.toHaveClass('btn-locked');
    expect(mediumBtnUnlocked).not.toBeDisabled();
    
    const hardBtnLocked = screen.getByTestId('btn-level-hard');
    expect(hardBtnLocked).toHaveClass('btn-locked');
    expect(hardBtnLocked).toBeDisabled();

    // Clicking medium should trigger callback
    fireEvent.click(mediumBtnUnlocked);
    expect(onStartQuiz).toHaveBeenCalledWith('medium');

    // Rerender with Easy and Medium completed
    rerender(
      <LessonDrawer 
        lesson={mockLesson} 
        progress={{ 'lesson-1_easy': 3, 'lesson-1_medium': 1 }} 
        onClose={() => {}} 
        onStartTheory={() => {}} 
        onStartQuiz={onStartQuiz} 
      />
    );

    // Easy and Medium completed, Hard unlocked
    expect(screen.getByTestId('btn-level-medium')).toHaveTextContent('✅ Đã xong');
    
    const hardBtnUnlocked = screen.getByTestId('btn-level-hard');
    expect(hardBtnUnlocked).not.toHaveClass('btn-locked');
    expect(hardBtnUnlocked).not.toBeDisabled();

    // Clicking hard should trigger callback
    onStartQuiz.mockClear();
    fireEvent.click(hardBtnUnlocked);
    expect(onStartQuiz).toHaveBeenCalledWith('hard');
  });

  it('renders placeholder notice and hides theory/exercise blocks for placeholder lessons', () => {
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

    const notice = screen.getByTestId('placeholder-notice');
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveTextContent(/Bài học này đang được biên soạn/i);

    expect(screen.queryByText('📖 Phần 1: Học Lý Thuyết')).not.toBeInTheDocument();
    expect(screen.queryByText('🎯 Phần 2: Thử Thách Trắc Nghiệm')).not.toBeInTheDocument();
    expect(screen.queryByText(/Xem bài giảng & Mô phỏng đồ họa/i)).not.toBeInTheDocument();
  });
});
