import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import VennDiagram from '../src/components/visualizers/VennDiagram';

const mockConfig = {
  setA: {
    name: 'Tập A: Số lẻ < 10',
    elements: [1, 3, 5]
  },
  setB: {
    name: 'Tập B: Số nguyên tố < 10',
    elements: [2, 3, 5]
  }
};

describe('VennDiagram Component', () => {
  it('renders elements and set names correctly', () => {
    render(<VennDiagram config={mockConfig} />);

    // Check set names are rendered
    expect(screen.getByText('Tập A: Số lẻ < 10')).toBeInTheDocument();
    expect(screen.getByText('Tập B: Số nguyên tố < 10')).toBeInTheDocument();

    // Elements in the pool originally: 1, 2, 3, 5
    expect(screen.getByTestId('badge-pool-1')).toBeInTheDocument();
    expect(screen.getByTestId('badge-pool-2')).toBeInTheDocument();
    expect(screen.getByTestId('badge-pool-3')).toBeInTheDocument();
    expect(screen.getByTestId('badge-pool-5')).toBeInTheDocument();
  });

  it('selects an element in the pool and moves it using quick action buttons', () => {
    render(<VennDiagram config={mockConfig} />);

    // Initially quick actions are not present
    expect(screen.queryByTestId('quick-actions-1')).not.toBeInTheDocument();

    // Click on element 1
    fireEvent.click(screen.getByTestId('badge-pool-1'));

    // Now quick actions should be visible
    expect(screen.getByTestId('quick-actions-1')).toBeInTheDocument();

    // Click on quick action 'A'
    const btnA = screen.getByText('A');
    fireEvent.click(btnA);

    // Element 1 is no longer in the pool, but is in Set A circle
    expect(screen.queryByTestId('badge-pool-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('badge-a-1')).toBeInTheDocument();
  });

  it('selects an element in the pool and moves it by clicking a diagram zone', () => {
    render(<VennDiagram config={mockConfig} />);

    // Click element 2 in pool
    fireEvent.click(screen.getByTestId('badge-pool-2'));

    // Click zone B
    fireEvent.click(screen.getByTestId('zone-b'));

    // Element 2 should be in Set B circle
    expect(screen.queryByTestId('badge-pool-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('badge-b-2')).toBeInTheDocument();
  });

  it('moves an element back to the pool when clicked inside a set circle', () => {
    render(<VennDiagram config={mockConfig} />);

    // Move 1 to Set A
    fireEvent.click(screen.getByTestId('badge-pool-1'));
    fireEvent.click(screen.getByText('A'));
    expect(screen.getByTestId('badge-a-1')).toBeInTheDocument();

    // Click badge in Set A circle to return it to the pool
    fireEvent.click(screen.getByTestId('badge-a-1'));

    // Badge is back in the pool
    expect(screen.getByTestId('badge-pool-1')).toBeInTheDocument();
    expect(screen.queryByTestId('badge-a-1')).not.toBeInTheDocument();
  });

  it('verifies correct answers successfully', () => {
    render(<VennDiagram config={mockConfig} />);

    // Set A elements: 1, 3, 5
    // Set B elements: 2, 3, 5
    // Intersection elements: 3, 5
    // Only A elements: 1
    // Only B elements: 2

    // Move 1 to A
    fireEvent.click(screen.getByTestId('badge-pool-1'));
    fireEvent.click(screen.getByText('A'));

    // Move 2 to B
    fireEvent.click(screen.getByTestId('badge-pool-2'));
    fireEvent.click(screen.getByText('B'));

    // Move 3 to Intersection (Giao)
    fireEvent.click(screen.getByTestId('badge-pool-3'));
    fireEvent.click(screen.getByText('Giao'));

    // Move 5 to Intersection (Giao)
    fireEvent.click(screen.getByTestId('badge-pool-5'));
    fireEvent.click(screen.getByText('Giao'));

    // Click Verify
    fireEvent.click(screen.getByTestId('btn-verify'));

    // Feedback should be success
    const feedback = screen.getByTestId('venn-feedback');
    expect(feedback).toHaveTextContent('Tuyệt vời');
    expect(feedback).toHaveClass('success');
  });

  it('shows error feedback on incorrect configuration', () => {
    render(<VennDiagram config={mockConfig} />);

    // Move 1 to B (incorrect, 1 is in A only)
    fireEvent.click(screen.getByTestId('badge-pool-1'));
    fireEvent.click(screen.getByText('B'));

    // Click Verify
    fireEvent.click(screen.getByTestId('btn-verify'));

    // Feedback should be error
    const feedback = screen.getByTestId('venn-feedback');
    expect(feedback).toHaveTextContent('xem lại nhé');
    expect(feedback).toHaveClass('error');
  });

  it('resets the visualizer to initial state on reset click', () => {
    render(<VennDiagram config={mockConfig} />);

    // Move 1 to A
    fireEvent.click(screen.getByTestId('badge-pool-1'));
    fireEvent.click(screen.getByText('A'));

    // Click Reset
    fireEvent.click(screen.getByTestId('btn-reset'));

    // Element 1 is back in pool, feedback cleared
    expect(screen.getByTestId('badge-pool-1')).toBeInTheDocument();
    expect(screen.queryByTestId('badge-a-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('venn-feedback')).not.toBeInTheDocument();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('has correct accessibility properties for the Venn zones', () => {
    render(<VennDiagram config={mockConfig} />);
    const zoneA = screen.getByTestId('zone-a');
    const zoneB = screen.getByTestId('zone-b');
    const zoneAB = screen.getByTestId('zone-ab');

    expect(zoneA).toHaveAttribute('role', 'button');
    expect(zoneA).toHaveAttribute('tabIndex', '0');
    expect(zoneA).toHaveAttribute('aria-label');

    expect(zoneB).toHaveAttribute('role', 'button');
    expect(zoneB).toHaveAttribute('tabIndex', '0');
    expect(zoneB).toHaveAttribute('aria-label');

    expect(zoneAB).toHaveAttribute('role', 'button');
    expect(zoneAB).toHaveAttribute('tabIndex', '0');
    expect(zoneAB).toHaveAttribute('aria-label');
  });

  it('supports keyboard interaction for the Venn zones', () => {
    render(<VennDiagram config={mockConfig} />);

    // Select element 2 in pool
    fireEvent.click(screen.getByTestId('badge-pool-2'));

    // Move to zone B using Enter key
    fireEvent.keyDown(screen.getByTestId('zone-b'), { key: 'Enter', code: 'Enter' });

    // Element 2 should be in Set B circle
    expect(screen.queryByTestId('badge-pool-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('badge-b-2')).toBeInTheDocument();

    // Move element 1 in pool
    fireEvent.click(screen.getByTestId('badge-pool-1'));

    // Move to zone A using Space key
    fireEvent.keyDown(screen.getByTestId('zone-a'), { key: ' ', code: 'Space' });

    // Element 1 should be in Set A circle
    expect(screen.queryByTestId('badge-pool-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('badge-a-1')).toBeInTheDocument();
  });

  it('sets aria-pressed correctly on pool items when selected', () => {
    render(<VennDiagram config={mockConfig} />);

    const badge1 = screen.getByTestId('badge-pool-1');
    expect(badge1).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(badge1);
    expect(badge1).toHaveAttribute('aria-pressed', 'true');
  });

  it('resets state when config prop changes', () => {
    const { rerender } = render(<VennDiagram config={mockConfig} />);

    // Move 1 to A
    fireEvent.click(screen.getByTestId('badge-pool-1'));
    fireEvent.click(screen.getByText('A'));
    expect(screen.getByTestId('badge-a-1')).toBeInTheDocument();

    // Cause feedback
    fireEvent.click(screen.getByTestId('btn-verify'));
    expect(screen.getByTestId('venn-feedback')).toBeInTheDocument();

    // Change configuration prop
    const newConfig = {
      setA: {
        name: 'Tập X: Số nhỏ < 5',
        elements: [1, 2]
      },
      setB: {
        name: 'Tập Y: Số chẵn < 5',
        elements: [2, 4]
      }
    };

    rerender(<VennDiagram config={newConfig} />);

    // The visualizer positions should reset. Element 1 is no longer in set A badge, but back in the pool
    expect(screen.queryByTestId('badge-a-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('badge-pool-1')).toBeInTheDocument();
    
    // Check elements pool matches new elements: 1, 2, 4
    expect(screen.getByTestId('badge-pool-1')).toBeInTheDocument();
    expect(screen.getByTestId('badge-pool-2')).toBeInTheDocument();
    expect(screen.getByTestId('badge-pool-4')).toBeInTheDocument();

    // Feedback should be cleared
    expect(screen.queryByTestId('venn-feedback')).not.toBeInTheDocument();
  });
});
