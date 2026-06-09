import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import NumberLine from '../src/components/visualizers/NumberLine';

describe('NumberLine Component', () => {
  it('renders the component and options correctly', () => {
    render(<NumberLine />);

    expect(screen.getByTestId('numberline-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('start-input')).toBeInTheDocument();
    expect(screen.getByTestId('operator-select')).toBeInTheDocument();
    expect(screen.getByTestId('diff-input')).toBeInTheDocument();
    expect(screen.getByTestId('btn-calc')).toBeInTheDocument();

    // Check defaults
    expect(screen.getByTestId('start-input')).toHaveValue(0);
    expect(screen.getByTestId('operator-select')).toHaveValue('+');
    expect(screen.getByTestId('diff-input')).toHaveValue(3);
    expect(screen.getByTestId('result-val')).toHaveTextContent('0');

    // Check ticks
    expect(screen.getByTestId('tick-0')).toBeInTheDocument();
    expect(screen.getByTestId('tick--10')).toBeInTheDocument();
    expect(screen.getByTestId('tick-10')).toBeInTheDocument();
  });

  it('updates start value and changes rabbit position dynamically', () => {
    render(<NumberLine />);
    const startInput = screen.getByTestId('start-input');

    fireEvent.change(startInput, { target: { value: '5' } });
    expect(startInput).toHaveValue(5);
    expect(screen.getByTestId('result-val')).toHaveTextContent('5');

    // Markers position style check
    const startMarker = screen.getByTestId('start-marker');
    const activeMarker = screen.getByTestId('active-marker');
    // For tick 5, posPercent = ((5 + 10) / 20) * 100 = 75%
    expect(startMarker.style.left).toBe('75%');
    expect(activeMarker.style.left).toBe('75%');
  });

  it('performs addition successfully', () => {
    render(<NumberLine />);
    const startInput = screen.getByTestId('start-input');
    const opSelect = screen.getByTestId('operator-select');
    const diffInput = screen.getByTestId('diff-input');
    const btnCalc = screen.getByTestId('btn-calc');

    fireEvent.change(startInput, { target: { value: '-2' } });
    fireEvent.change(opSelect, { target: { value: '+' } });
    fireEvent.change(diffInput, { target: { value: '6' } });

    fireEvent.click(btnCalc);

    // -2 + 6 = 4
    expect(screen.getByTestId('result-val')).toHaveTextContent('4');
    const activeMarker = screen.getByTestId('active-marker');
    // For tick 4, posPercent = ((4 + 10) / 20) * 100 = 70%
    expect(activeMarker.style.left).toBe('70%');
  });

  it('performs subtraction successfully', () => {
    render(<NumberLine />);
    const startInput = screen.getByTestId('start-input');
    const opSelect = screen.getByTestId('operator-select');
    const diffInput = screen.getByTestId('diff-input');
    const btnCalc = screen.getByTestId('btn-calc');

    fireEvent.change(startInput, { target: { value: '2' } });
    fireEvent.change(opSelect, { target: { value: '-' } });
    fireEvent.change(diffInput, { target: { value: '5' } });

    fireEvent.click(btnCalc);

    // 2 - 5 = -3
    expect(screen.getByTestId('result-val')).toHaveTextContent('-3');
    const activeMarker = screen.getByTestId('active-marker');
    // For tick -3, posPercent = ((-3 + 10) / 20) * 100 = 35%
    expect(activeMarker.style.left).toBe('35%');
  });

  it('sets error for out of bounds results', () => {
    render(<NumberLine />);
    const startInput = screen.getByTestId('start-input');
    const opSelect = screen.getByTestId('operator-select');
    const diffInput = screen.getByTestId('diff-input');
    const btnCalc = screen.getByTestId('btn-calc');

    fireEvent.change(startInput, { target: { value: '8' } });
    fireEvent.change(opSelect, { target: { value: '+' } });
    fireEvent.change(diffInput, { target: { value: '4' } }); // 8 + 4 = 12 (> 10)

    fireEvent.click(btnCalc);

    expect(screen.getByTestId('numberline-error')).toBeInTheDocument();
    expect(screen.getByTestId('numberline-error')).toHaveTextContent('vượt quá phạm vi');
    // Current value should remain at the start value (8)
    expect(screen.getByTestId('result-val')).toHaveTextContent('8');
  });

  it('sets start position to current value', () => {
    render(<NumberLine />);
    const startInput = screen.getByTestId('start-input');
    const opSelect = screen.getByTestId('operator-select');
    const diffInput = screen.getByTestId('diff-input');
    const btnCalc = screen.getByTestId('btn-calc');
    const btnSetStart = screen.getByTestId('btn-set-start');

    // Calculate first: 0 + 4 = 4
    fireEvent.change(diffInput, { target: { value: '4' } });
    fireEvent.click(btnCalc);
    expect(screen.getByTestId('result-val')).toHaveTextContent('4');

    // Set start at current (4)
    fireEvent.click(btnSetStart);
    expect(startInput).toHaveValue(4);

    // Now calculate 4 + 4 = 8
    fireEvent.click(btnCalc);
    expect(screen.getByTestId('result-val')).toHaveTextContent('8');
  });

  it('resets the component on reset click', () => {
    render(<NumberLine />);
    const startInput = screen.getByTestId('start-input');
    const opSelect = screen.getByTestId('operator-select');
    const diffInput = screen.getByTestId('diff-input');
    const btnCalc = screen.getByTestId('btn-calc');
    const btnReset = screen.getByTestId('btn-reset');

    fireEvent.change(startInput, { target: { value: '5' } });
    fireEvent.change(opSelect, { target: { value: '-' } });
    fireEvent.change(diffInput, { target: { value: '2' } });
    fireEvent.click(btnCalc);

    expect(screen.getByTestId('result-val')).toHaveTextContent('3');

    // Reset
    fireEvent.click(btnReset);
    expect(startInput).toHaveValue(0);
    expect(opSelect).toHaveValue('+');
    expect(diffInput).toHaveValue(3);
    expect(screen.getByTestId('result-val')).toHaveTextContent('0');
  });
});
