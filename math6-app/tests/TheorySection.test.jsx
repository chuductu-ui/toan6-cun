import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import TheorySection from '../src/components/TheorySection';

const mockLessonWithVenn = {
  id: 'lesson-1',
  title: 'Bài 1: Tập hợp',
  description: 'Khái niệm tập hợp và phần tử.',
  theory: {
    explanation: 'Giải thích lý thuyết tập hợp.',
    visualizerType: 'VennDiagram',
    visualizerConfig: {
      setA: { name: 'Tập A', elements: [1, 2] },
      setB: { name: 'Tập B', elements: [2, 3] }
    }
  }
};

const mockLessonWithOther = {
  id: 'lesson-2',
  title: 'Bài 2: Trục số',
  description: 'Trục số nguyên.',
  theory: {
    explanation: 'Lý thuyết trục số.',
    visualizerType: 'NumberLine',
    visualizerConfig: {}
  }
};

describe('TheorySection Component', () => {
  it('renders title, description, and explanation correctly', () => {
    render(
      <TheorySection 
        lesson={mockLessonWithVenn} 
        onBack={() => {}} 
        onRecoverHearts={() => {}} 
      />
    );

    expect(screen.getByTestId('theory-title')).toHaveTextContent('Bài 1: Tập hợp');
    expect(screen.getByTestId('lesson-description')).toHaveTextContent('Khái niệm tập hợp và phần tử.');
    expect(screen.getByTestId('explanation-text')).toHaveTextContent('Giải thích lý thuyết tập hợp.');
  });

  it('renders VennDiagram visualizer when type is VennDiagram', () => {
    render(
      <TheorySection 
        lesson={mockLessonWithVenn} 
        onBack={() => {}} 
        onRecoverHearts={() => {}} 
      />
    );

    expect(screen.getByTestId('venn-visualizer')).toBeInTheDocument();
    expect(screen.queryByTestId('placeholder-visualizer')).not.toBeInTheDocument();
  });

  it('renders placeholder visualizer when type is not VennDiagram', () => {
    render(
      <TheorySection 
        lesson={mockLessonWithOther} 
        onBack={() => {}} 
        onRecoverHearts={() => {}} 
      />
    );

    expect(screen.getByTestId('placeholder-visualizer')).toBeInTheDocument();
    expect(screen.queryByTestId('venn-visualizer')).not.toBeInTheDocument();
  });

  it('calls onBack handler when back button is clicked', () => {
    const onBackSpy = vi.fn();
    render(
      <TheorySection 
        lesson={mockLessonWithVenn} 
        onBack={onBackSpy} 
        onRecoverHearts={() => {}} 
      />
    );

    fireEvent.click(screen.getByTestId('btn-back'));
    expect(onBackSpy).toHaveBeenCalledTimes(1);
  });

  it('handles heart recovery click correctly', () => {
    const onRecoverSpy = vi.fn();
    
    // Mock window.alert to prevent blocking UI/testing environment
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <TheorySection 
        lesson={mockLessonWithVenn} 
        onBack={() => {}} 
        onRecoverHearts={onRecoverSpy} 
      />
    );

    const recoverBtn = screen.getByTestId('btn-recover');
    expect(screen.queryByTestId('recover-success')).not.toBeInTheDocument();
    expect(recoverBtn).not.toBeDisabled();

    fireEvent.click(recoverBtn);

    expect(onRecoverSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('Khôi phục 2 ❤️ thành công!');
    expect(screen.getByTestId('recover-success')).toBeInTheDocument();
    expect(recoverBtn).toBeDisabled();

    alertSpy.mockRestore();
  });
});
