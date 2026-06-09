import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DivisibilitySieve from '../src/components/visualizers/DivisibilitySieve';

describe('DivisibilitySieve Component', () => {
  it('renders divisor selectors and the grid from 1 to 50', () => {
    render(<DivisibilitySieve />);

    expect(screen.getByTestId('sieve-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('numbers-grid')).toBeInTheDocument();

    // Check selectors
    expect(screen.getByTestId('btn-divisor-2')).toBeInTheDocument();
    expect(screen.getByTestId('btn-divisor-3')).toBeInTheDocument();
    expect(screen.getByTestId('btn-divisor-5')).toBeInTheDocument();
    expect(screen.getByTestId('btn-divisor-9')).toBeInTheDocument();

    // Check grid bounds
    expect(screen.getByTestId('cell-1')).toBeInTheDocument();
    expect(screen.getByTestId('cell-50')).toBeInTheDocument();
    expect(screen.queryByTestId('cell-51')).not.toBeInTheDocument();

    // Rule card is not present initially
    expect(screen.queryByTestId('rule-card')).not.toBeInTheDocument();
  });

  it('toggles a divisor and highlights its multiples in the grid', () => {
    render(<DivisibilitySieve />);
    const btn2 = screen.getByTestId('btn-divisor-2');

    // Toggle 2 on
    fireEvent.click(btn2);
    expect(btn2).toHaveClass('active');
    expect(screen.getByTestId('rule-card')).toBeInTheDocument();
    expect(screen.getByTestId('rule-card')).toHaveTextContent('chia hết cho 2');

    // Check highlighting: multiples of 2 should be highlighted, others not
    expect(screen.getByTestId('cell-2')).toHaveClass('highlighted');
    expect(screen.getByTestId('cell-4')).toHaveClass('highlighted');
    expect(screen.getByTestId('cell-6')).toHaveClass('highlighted');
    expect(screen.getByTestId('cell-1')).not.toHaveClass('highlighted');
    expect(screen.getByTestId('cell-3')).not.toHaveClass('highlighted');
    expect(screen.getByTestId('cell-5')).not.toHaveClass('highlighted');

    // Toggle 2 off
    fireEvent.click(btn2);
    expect(btn2).not.toHaveClass('active');
    expect(screen.queryByTestId('rule-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('cell-2')).not.toHaveClass('highlighted');
    expect(screen.getByTestId('cell-4')).not.toHaveClass('highlighted');
  });

  it('correctly handles switching between different divisors', () => {
    render(<DivisibilitySieve />);
    const btn3 = screen.getByTestId('btn-divisor-3');
    const btn5 = screen.getByTestId('btn-divisor-5');

    // Toggle 3 on
    fireEvent.click(btn3);
    expect(btn3).toHaveClass('active');
    expect(screen.getByTestId('cell-3')).toHaveClass('highlighted');
    expect(screen.getByTestId('cell-5')).not.toHaveClass('highlighted');

    // Toggle 5 on (should de-select 3 and select 5 in our single-divisor design)
    fireEvent.click(btn5);
    expect(btn3).not.toHaveClass('active');
    expect(btn5).toHaveClass('active');
    expect(screen.getByTestId('cell-3')).not.toHaveClass('highlighted');
    expect(screen.getByTestId('cell-5')).toHaveClass('highlighted');
  });
});
