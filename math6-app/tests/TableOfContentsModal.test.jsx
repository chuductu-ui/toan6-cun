import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import TableOfContentsModal from '../src/components/TableOfContentsModal';

const mockCurriculum = {
  chapters: [
    {
      id: 'chapter-1',
      title: 'Chương I: Tập hợp các số tự nhiên',
      lessons: [
        {
          id: 'bai-1',
          title: 'Bài 1: Tập hợp',
          exercises: { easy: {}, medium: {}, hard: {} }
        },
        {
          id: 'bai-2',
          title: 'Bài 2: Cách ghi số tự nhiên',
          exercises: { easy: {}, medium: {}, hard: {} }
        }
      ]
    },
    {
      id: 'chapter-2',
      title: 'Chương II: Tính chia hết',
      lessons: []
    },
    {
      id: 'chapter-3',
      title: 'Chương III: Số nguyên',
      lessons: [
        {
          id: 'bai-3',
          title: 'Bài 3: Làm quen số nguyên âm',
          exercises: { easy: {}, medium: {}, hard: {} }
        }
      ]
    }
  ]
};

describe('TableOfContentsModal Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders null when isOpen is false', () => {
    const { container } = render(
      <TableOfContentsModal 
        isOpen={false} 
        onClose={() => {}} 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders title, chapters, and empty chapter placeholders when isOpen is true', () => {
    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={() => {}} 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    expect(screen.getByText('📖 Mục Lục Sách Giáo Khoa')).toBeInTheDocument();
    expect(screen.getByText('Chương I: Tập hợp các số tự nhiên')).toBeInTheDocument();
    expect(screen.getByText('Chương II: Tính chia hết')).toBeInTheDocument();
    expect(screen.getByText('Sắp ra mắt! 🚀')).toBeInTheDocument();
    expect(screen.getByText('Chương III: Số nguyên')).toBeInTheDocument();
  });

  it('unlocks all lessons by default when progress is empty', () => {
    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={() => {}} 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    const lesson1 = screen.getByTestId('toc-item-bai-1');
    const lesson2 = screen.getByTestId('toc-item-bai-2');
    const lesson3 = screen.getByTestId('toc-item-bai-3');

    expect(lesson1).not.toBeDisabled();
    expect(lesson2).not.toBeDisabled();
    expect(lesson3).not.toBeDisabled();
  });

  it('correctly styles completed lessons based on progress while keeping all lessons unlocked', () => {
    // Complete lesson 1 (all easy, medium, hard levels cleared)
    const progress = {
      'bai-1_easy': 3,
      'bai-1_medium': 1,
      'bai-1_hard': 3
    };

    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={() => {}} 
        curriculum={mockCurriculum} 
        progress={progress} 
        onSelectLesson={() => {}} 
      />
    );

    const lesson1 = screen.getByTestId('toc-item-bai-1');
    const lesson2 = screen.getByTestId('toc-item-bai-2');
    const lesson3 = screen.getByTestId('toc-item-bai-3');

    expect(lesson1).not.toBeDisabled();
    expect(lesson1).toHaveClass('completed');
    expect(lesson1.querySelector('.toc-lesson-icon')).toHaveTextContent('👑');

    expect(lesson2).not.toBeDisabled();
    expect(lesson2).not.toHaveClass('completed');
    expect(lesson2.querySelector('.toc-lesson-icon')).toHaveTextContent('📝');

    expect(lesson3).not.toBeDisabled();
    expect(lesson3).not.toHaveClass('completed');
    expect(lesson3.querySelector('.toc-lesson-icon')).toHaveTextContent('📝');
  });

  it('renders all lessons as active/enabled across chapters', () => {
    // Complete lesson 1 and lesson 2
    const progress = {
      'bai-1_easy': 3,
      'bai-1_medium': 3,
      'bai-1_hard': 3,
      'bai-2_easy': 1,
      'bai-2_medium': 1,
      'bai-2_hard': 3
    };

    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={() => {}} 
        curriculum={mockCurriculum} 
        progress={progress} 
        onSelectLesson={() => {}} 
      />
    );

    const lesson1 = screen.getByTestId('toc-item-bai-1');
    const lesson2 = screen.getByTestId('toc-item-bai-2');
    const lesson3 = screen.getByTestId('toc-item-bai-3');

    expect(lesson1).not.toBeDisabled();
    expect(lesson2).not.toBeDisabled();
    expect(lesson3).not.toBeDisabled();
  });

  it('renders lessons with isPlaceholder as standard active lessons without placeholder styling or badge', () => {
    const placeholderCurriculum = {
      chapters: [
        {
          id: 'chapter-1',
          title: 'Chương I: Tập hợp các số tự nhiên',
          lessons: [
            {
              id: 'bai-1',
              title: 'Bài 1: Tập hợp',
              isPlaceholder: true
            }
          ]
        }
      ]
    };

    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={() => {}} 
        curriculum={placeholderCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    const lesson1 = screen.getByTestId('toc-item-bai-1');
    expect(lesson1).not.toBeDisabled();
    expect(lesson1).not.toHaveClass('placeholder');
    expect(lesson1.querySelector('.toc-lesson-icon')).toHaveTextContent('📝');
    expect(screen.queryByText('Sắp ra mắt')).not.toBeInTheDocument();
    expect(screen.getByText('Dễ')).toBeInTheDocument();
    expect(screen.getByText('TB')).toBeInTheDocument();
    expect(screen.getByText('Khó')).toBeInTheDocument();
  });

  it('triggers onSelectLesson and onClose when active lesson is clicked', () => {
    const onSelectLesson = vi.fn();
    const onClose = vi.fn();

    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={onClose} 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={onSelectLesson} 
      />
    );

    const lesson1 = screen.getByTestId('toc-item-bai-1');
    fireEvent.click(lesson1);

    expect(onSelectLesson).toHaveBeenCalledWith(mockCurriculum.chapters[0].lessons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button or overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={onClose} 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    // Click close button
    const closeBtn = screen.getByRole('button', { name: 'Đóng' });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Click overlay (modal wrapper has role="presentation")
    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <TableOfContentsModal 
        isOpen={true} 
        onClose={onClose} 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
