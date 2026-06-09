import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SymmetryLab from '../src/components/visualizers/SymmetryLab';

describe('SymmetryLab Component', () => {
  it('renders shapes selector, default shape, and controls', () => {
    render(<SymmetryLab />);

    expect(screen.getByTestId('symmetry-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('canvas-frame')).toBeInTheDocument();
    expect(screen.getByTestId('shape-container')).toBeInTheDocument();

    // Check shape selectors
    expect(screen.getByTestId('btn-shape-triangle')).toBeInTheDocument();
    expect(screen.getByTestId('btn-shape-square')).toBeInTheDocument();
    expect(screen.getByTestId('btn-shape-rectangle')).toBeInTheDocument();

    // Defaults: Triangle selected
    expect(screen.getByTestId('btn-shape-triangle')).toHaveClass('active');
    expect(screen.getByTestId('svg-triangle')).toBeInTheDocument();
    expect(screen.queryByTestId('svg-square')).not.toBeInTheDocument();
    expect(screen.getByTestId('angle-val')).toHaveTextContent('0°');

    // Axes are hidden by default
    expect(screen.queryByTestId('axes-container')).not.toBeInTheDocument();
  });

  it('rotates shape by the corresponding step angle', () => {
    render(<SymmetryLab />);
    const btnRotate = screen.getByTestId('btn-rotate');
    const shapeContainer = screen.getByTestId('shape-container');

    // Default step is 120° for triangle
    expect(btnRotate).toHaveTextContent('Xoay 120°');

    fireEvent.click(btnRotate);
    expect(screen.getByTestId('angle-val')).toHaveTextContent('120°');
    expect(shapeContainer.style.transform).toBe('rotate(120deg)');

    fireEvent.click(btnRotate);
    expect(screen.getByTestId('angle-val')).toHaveTextContent('240°');
    expect(shapeContainer.style.transform).toBe('rotate(240deg)');

    fireEvent.click(btnRotate);
    expect(screen.getByTestId('angle-val')).toHaveTextContent('0°');
    expect(shapeContainer.style.transform).toBe('rotate(0deg)');
  });

  it('toggles axis of symmetry overlay', () => {
    render(<SymmetryLab />);
    const btnAxis = screen.getByTestId('btn-axis');

    expect(screen.queryByTestId('axes-container')).not.toBeInTheDocument();

    // Toggle on
    fireEvent.click(btnAxis);
    expect(screen.getByTestId('axes-container')).toBeInTheDocument();
    expect(screen.getByTestId('axis-line-vertical')).toBeInTheDocument();
    // Triangle only has vertical axis drawn
    expect(screen.queryByTestId('axis-line-horizontal')).not.toBeInTheDocument();

    // Toggle off
    fireEvent.click(btnAxis);
    expect(screen.queryByTestId('axes-container')).not.toBeInTheDocument();
  });

  it('switches shapes correctly and resets transformation', () => {
    render(<SymmetryLab />);
    const btnSquare = screen.getByTestId('btn-shape-square');
    const btnTriangle = screen.getByTestId('btn-shape-triangle');
    const btnRotate = screen.getByTestId('btn-rotate');

    // Select Square
    fireEvent.click(btnSquare);
    expect(btnTriangle).not.toHaveClass('active');
    expect(btnSquare).toHaveClass('active');
    expect(screen.getByTestId('svg-square')).toBeInTheDocument();
    expect(screen.queryByTestId('svg-triangle')).not.toBeInTheDocument();

    // Rotate step for square is 90°
    expect(btnRotate).toHaveTextContent('Xoay 90°');
    fireEvent.click(btnRotate);
    expect(screen.getByTestId('angle-val')).toHaveTextContent('90°');
    expect(screen.getByTestId('shape-container').style.transform).toBe('rotate(90deg)');

    // Toggle axes for square
    fireEvent.click(screen.getByTestId('btn-axis'));
    expect(screen.getByTestId('axis-line-vertical')).toBeInTheDocument();
    expect(screen.getByTestId('axis-line-horizontal')).toBeInTheDocument();
    expect(screen.getByTestId('axis-line-diag1')).toBeInTheDocument();
    expect(screen.getByTestId('axis-line-diag2')).toBeInTheDocument();
  });

  it('resets shape angle and axis visibility on reset click', () => {
    render(<SymmetryLab />);
    const btnRotate = screen.getByTestId('btn-rotate');
    const btnAxis = screen.getByTestId('btn-axis');
    const btnReset = screen.getByTestId('btn-reset');

    fireEvent.click(btnRotate);
    fireEvent.click(btnAxis);
    expect(screen.getByTestId('angle-val')).toHaveTextContent('120°');
    expect(screen.getByTestId('axes-container')).toBeInTheDocument();

    // Reset
    fireEvent.click(btnReset);
    expect(screen.getByTestId('angle-val')).toHaveTextContent('0°');
    expect(screen.queryByTestId('axes-container')).not.toBeInTheDocument();
  });
});
