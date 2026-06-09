import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import QuestMap from '../src/components/QuestMap';

const mockCurriculum = {
  chapters: [
    {
      id: 'chapter-1',
      title: 'Chương I: Số tự nhiên',
      lessons: [
        { id: 'lesson-1', title: 'Bài 1: Tập hợp' },
        { id: 'lesson-2', title: 'Bài 2: Phép toán' },
        { id: 'lesson-3', title: 'Bài 3: Lũy thừa' }
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

  it('unlocks only the first lesson when progress is empty', () => {
    const onSelectLesson = vi.fn();
    render(
      <QuestMap 
        curriculum={mockCurriculum} 
        progress={{}} 
        onSelectLesson={onSelectLesson} 
      />
    );

    // First lesson should be active/unlocked
    const lesson1Node = screen.getByTestId('lesson-node-lesson-1');
    expect(lesson1Node).toHaveClass('active');
    expect(lesson1Node).not.toHaveClass('locked');
    expect(lesson1Node).not.toHaveClass('completed');
    expect(lesson1Node.querySelector('.node-button')).toHaveTextContent('📝');

    // Second and third lessons should be locked
    const lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('locked');
    expect(lesson2Node.querySelector('.node-button')).toHaveTextContent('🔒');

    const lesson3Node = screen.getByTestId('lesson-node-lesson-3');
    expect(lesson3Node).toHaveClass('locked');
    expect(lesson3Node.querySelector('.node-button')).toHaveTextContent('🔒');

    // Click on active lesson-1 should call onSelectLesson
    fireEvent.click(lesson1Node);
    expect(onSelectLesson).toHaveBeenCalledWith(mockCurriculum.chapters[0].lessons[0]);

    // Click on locked lesson-2 should not call onSelectLesson
    onSelectLesson.mockClear();
    fireEvent.click(lesson2Node);
    expect(onSelectLesson).not.toHaveBeenCalled();
  });

  it('unlocks subsequent lesson only if all three levels of previous lesson are completed', () => {
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

    // Lesson 1 is not fully completed, so lesson 2 should still be locked
    let lesson1Node = screen.getByTestId('lesson-node-lesson-1');
    expect(lesson1Node).not.toHaveClass('completed');
    expect(lesson1Node).toHaveClass('active');

    let lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('locked');

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

    // Now lesson 1 should be completed (👑) and lesson 2 should be active/unlocked (📝)
    lesson1Node = screen.getByTestId('lesson-node-lesson-1');
    expect(lesson1Node).toHaveClass('completed');
    expect(lesson1Node.querySelector('.node-button')).toHaveTextContent('👑');

    lesson2Node = screen.getByTestId('lesson-node-lesson-2');
    expect(lesson2Node).toHaveClass('active');
    expect(lesson2Node).not.toHaveClass('locked');
    expect(lesson2Node.querySelector('.node-button')).toHaveTextContent('📝');

    // Lesson 3 should still be locked
    const lesson3Node = screen.getByTestId('lesson-node-lesson-3');
    expect(lesson3Node).toHaveClass('locked');
    expect(lesson3Node.querySelector('.node-button')).toHaveTextContent('🔒');

    // Click on active lesson-2 should call onSelectLesson
    fireEvent.click(lesson2Node);
    expect(onSelectLesson).toHaveBeenCalledWith(mockCurriculum.chapters[0].lessons[1]);
  });
});
