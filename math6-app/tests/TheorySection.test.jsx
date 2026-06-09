import { describe, it, expect, vi, afterEach } from 'vitest';
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
    visualizerType: 'UnknownVisualizer',
    visualizerConfig: {}
  }
};

const mockLessonWithNumberLine = {
  id: 'lesson-numberline',
  title: 'Bài 2: Số nguyên',
  description: 'Mô phỏng trục số.',
  theory: {
    explanation: 'Lý thuyết trục số.',
    visualizerType: 'NumberLine',
    visualizerConfig: {}
  }
};

const mockLessonWithSieve = {
  id: 'lesson-sieve',
  title: 'Bài 3: Ước và Bội',
  description: 'Sàng chia hết.',
  theory: {
    explanation: 'Lý thuyết chia hết.',
    visualizerType: 'DivisibilitySieve',
    visualizerConfig: {}
  }
};

const mockLessonWithSymmetry = {
  id: 'lesson-symmetry',
  title: 'Bài 4: Đối xứng',
  description: 'Phòng thí nghiệm đối xứng.',
  theory: {
    explanation: 'Lý thuyết đối xứng.',
    visualizerType: 'SymmetryLab',
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

  it('renders NumberLine visualizer when type is NumberLine', () => {
    render(
      <TheorySection 
        lesson={mockLessonWithNumberLine} 
        onBack={() => {}} 
        onRecoverHearts={() => {}} 
      />
    );

    expect(screen.getByTestId('numberline-visualizer')).toBeInTheDocument();
    expect(screen.queryByTestId('placeholder-visualizer')).not.toBeInTheDocument();
  });

  it('renders DivisibilitySieve visualizer when type is DivisibilitySieve', () => {
    render(
      <TheorySection 
        lesson={mockLessonWithSieve} 
        onBack={() => {}} 
        onRecoverHearts={() => {}} 
      />
    );

    expect(screen.getByTestId('sieve-visualizer')).toBeInTheDocument();
    expect(screen.queryByTestId('placeholder-visualizer')).not.toBeInTheDocument();
  });

  it('renders SymmetryLab visualizer when type is SymmetryLab', () => {
    render(
      <TheorySection 
        lesson={mockLessonWithSymmetry} 
        onBack={() => {}} 
        onRecoverHearts={() => {}} 
      />
    );

    expect(screen.getByTestId('symmetry-visualizer')).toBeInTheDocument();
    expect(screen.queryByTestId('placeholder-visualizer')).not.toBeInTheDocument();
  });

  it('renders placeholder visualizer when type is not recognized', () => {
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

  afterEach(() => {
    vi.restoreAllMocks();
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
  });

  it('resets recovered state when lesson.id changes', () => {
    const onRecoverSpy = vi.fn();
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { rerender } = render(
      <TheorySection 
        lesson={mockLessonWithVenn} 
        onBack={() => {}} 
        onRecoverHearts={onRecoverSpy} 
      />
    );

    const recoverBtn = screen.getByTestId('btn-recover');
    fireEvent.click(recoverBtn);
    expect(screen.getByTestId('recover-success')).toBeInTheDocument();
    expect(recoverBtn).toBeDisabled();

    // Rerender with another lesson (different id)
    rerender(
      <TheorySection 
        lesson={mockLessonWithOther} 
        onBack={() => {}} 
        onRecoverHearts={onRecoverSpy} 
      />
    );

    expect(screen.queryByTestId('recover-success')).not.toBeInTheDocument();
    expect(screen.getByTestId('btn-recover')).not.toBeDisabled();
  });
});
