import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      chapters: [
        {
          id: 'chapter-1',
          title: 'Chương I: Tập hợp các số tự nhiên',
          lessons: [
            {
              id: 'bai-1',
              title: 'Bài 1: Tập hợp',
              description: 'Tập hợp và phần tử',
              theory: { explanation: 'Lý thuyết 1', visualizerType: 'VennDiagram' },
              exercises: { easy: [], medium: [], hard: [] }
            }
          ]
        }
      ]
    })
  })
));

describe('App Shell & Router Integration', () => {
  it('should render header with stats and Quest Map', async () => {
    render(<App />);
    expect(screen.getByText(/Tải dữ liệu/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Bài 1: Tập hợp/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/🦉/i)).toBeInTheDocument();
    expect(screen.getByText(/Toán 6 Phiêu Lưu Ký/i)).toBeInTheDocument();
    expect(screen.getByText(/❤️/i)).toBeInTheDocument();
    expect(screen.getByText(/⭐/i)).toBeInTheDocument();
  });
});
