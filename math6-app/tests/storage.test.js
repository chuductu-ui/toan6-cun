import { describe, it, expect, beforeEach } from 'vitest';
import { saveAttempt, getHistory, formatZaloMessage } from '../src/utils/storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve attempts', () => {
    const attempt = {
      lessonId: 'bai-1',
      lessonTitle: 'Bài 1: Tập hợp',
      level: 'easy',
      score: '9/10',
      timeTaken: 120
    };

    saveAttempt(attempt);
    const history = getHistory();
    expect(history.length).toBe(1);
    expect(history[0].lessonId).toBe('bai-1');
    expect(history[0].score).toBe('9/10');
  });

  it('should format Zalo message correctly', () => {
    const msg = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '10/10', 85);
    expect(msg).toContain('KẾT QUẢ HỌC TOÁN 6 - CÚN');
    expect(msg).toContain('Bài 1: Tập hợp');
    expect(msg).toContain('10/10');
    expect(msg).toContain('1 phút 25 giây');
  });
});
