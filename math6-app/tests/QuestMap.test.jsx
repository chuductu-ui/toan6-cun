import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import QuestMap from '../src/components/QuestMap';

const mockCurriculum = {
  chapters: [
    {
      id: 'chapter-1',
      title: 'Chương I: Số tự nhiên',
      lessons: [
        { id: 'lesson-1', title: 'Bài 1: Tập hợp', exercises: { easy: [], medium: [], hard: [] } },
        { id: 'lesson-2', title: 'Bài 2: Phép toán', exercises: { easy: [], medium: [], hard: [] } },
        { id: 'lesson-3', title: 'Bài 3: Lũy thừa', exercises: { easy: [], medium: [], hard: [] } }
      ]
    }
  ]
};

describe('QuestMap Component', () => {
  it('renders chapters and lessons correctly', () => {
    render(
      <QuestMap 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    expect(screen.getByText('Chương I: Số tự nhiên')).toBeInTheDocument();
    expect(screen.getByText('Bài 1: Tập hợp')).toBeInTheDocument();
    expect(screen.getByText('Bài 2: Phép toán')).toBeInTheDocument();
    expect(screen.getByText('Bài 3: Lũy thừa')).toBeInTheDocument();
  });

  it('unlocks all lessons when progress is empty', () => {
    const onSelectLesson = vi.fn();
    render(
      <QuestMap 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={onSelectLesson} 
      />
    );

    // All lessons should be active and unlocked
    const lesson1Node = screen.getByTestId('lesson-node-lesson-1');
    expect(lesson1Node).toHaveClass('active');
    expect(lesson1Node).not.toHaveClass('locked');
    expect(lesson1Node).not.toHaveClass('completed');
    expect(lesson1Node.querySelector('.node-button')).toHaveTextContent('📝');

    const lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('active');
    expect(lesson2Node).not.toHaveClass('locked');
    expect(lesson2Node.querySelector('.node-button')).toHaveTextContent('📝');

    const lesson3Node = screen.getByTestId('lesson-node-lesson-3');
    expect(lesson3Node).toHaveClass('active');
    expect(lesson3Node).not.toHaveClass('locked');
    expect(lesson3Node.querySelector('.node-button')).toHaveTextContent('📝');

    // Click on lesson-1 should call onSelectLesson
    fireEvent.click(lesson1Node);
    expect(onSelectLesson).toHaveBeenCalledWith(mockCurriculum.chapters[0].lessons[0]);

    // Click on lesson-2 should also call onSelectLesson (unlocked!)
    onSelectLesson.mockClear();
    fireEvent.click(lesson2Node);
    expect(onSelectLesson).toHaveBeenCalledWith(mockCurriculum.chapters[0].lessons[1]);
  });

  it('keeps subsequent lessons unlocked and correctly computes isCompleted using progress', () => {
    const onSelectLesson = vi.fn();
    
    // Partial progress: only easy and medium completed for lesson-1
    const partialProgress = {
      'lesson-1_easy': 3,
      'lesson-1_medium': 1
    };

    const { rerender } = render(
      <QuestMap 
        curriculum={mockCurriculum} 
        progress={partialProgress} 
        onSelectLesson={onSelectLesson} 
      />
    );

    // Lesson 1 is not fully completed
    let lesson1Node = screen.getByTestId('lesson-node-lesson-1');
    expect(lesson1Node).not.toHaveClass('completed');
    expect(lesson1Node).toHaveClass('active');

    let lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('active');
    expect(lesson2Node).not.toHaveClass('locked');

    // Full progress: all three levels of lesson-1 completed
    const fullProgress = {
      'lesson-1_easy': 3,
      'lesson-1_medium': 1,
      'lesson-1_hard': 3
    };

    rerender(
      <QuestMap 
        curriculum={mockCurriculum} 
        progress={fullProgress} 
        onSelectLesson={onSelectLesson} 
      />
    );

    // Now lesson 1 should be completed (👑) and lesson 2 is still active/unlocked (📝)
    lesson1Node = screen.getByTestId('lesson-node-lesson-1');
    expect(lesson1Node).toHaveClass('completed');
    expect(lesson1Node.querySelector('.node-button')).toHaveTextContent('👑');

    lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('active');
    expect(lesson2Node.querySelector('.node-button')).toHaveTextContent('📝');

    const lesson3Node = screen.getByTestId('lesson-node-lesson-3');
    expect(lesson3Node).toHaveClass('active');
    expect(lesson3Node.querySelector('.node-button')).toHaveTextContent('📝');
  });

  it('renders placeholder lessons correctly with class and emoji', () => {
    const placeholderCurriculum = {
      chapters: [
        {
          id: 'chapter-1',
          title: 'Chương I: Số tự nhiên',
          lessons: [
            { id: 'lesson-1', title: 'Bài 1: Tập hợp', exercises: { easy: [], medium: [], hard: [] } },
            { id: 'lesson-2', title: 'Bài 2: Placeholder', isPlaceholder: true }
          ]
        }
      ]
    };

    render(
      <QuestMap 
        curriculum={placeholderCurriculum} 
        progress={{}} 
        onSelectLesson={() => {}} 
      />
    );

    const lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('placeholder-node');
    expect(lesson2Node.querySelector('.node-button')).toHaveTextContent('⏳');
    expect(lesson2Node).not.toHaveAttribute('disabled');
  });
});
