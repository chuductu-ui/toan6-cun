import { describe, it, expect, beforeEach, vi } from 'vitest';
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

  it('should return empty array and not crash on corrupted JSON in localStorage', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('math6_companion_history', 'invalid-json');
    const history = getHistory();
    expect(history).toEqual([]);
    consoleSpy.mockRestore();
  });

  it('should format Zalo message correctly for diverse durations', () => {
    // Under a minute
    const msgUnderMin = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '9/10', 45);
    expect(msgUnderMin).toContain('45 giây');
    expect(msgUnderMin).not.toContain('phút');

    // Exactly a minute
    const msgExactlyMin = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '9/10', 60);
    expect(msgExactlyMin).toContain('1 phút');
    expect(msgExactlyMin).not.toContain('giây');

    // Zero seconds
    const msgZero = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '9/10', 0);
    expect(msgZero).toContain('0 giây');
    expect(msgZero).not.toContain('phút');

    // Negative seconds (should guard and treat as 0 seconds)
    const msgNegative = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '9/10', -15);
    expect(msgNegative).toContain('0 giây');
    expect(msgNegative).not.toContain('phút');

    // Mixture
    const msgMixture = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '9/10', 125);
    expect(msgMixture).toContain('2 phút 5 giây');
  });

  it('should format Zalo message correctly for 10/10 vs non-10/10 scores', () => {
    // 10/10 score
    const msgPerfect = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '10/10', 60);
    expect(msgPerfect).toContain('(Đạt điểm tuyệt đối! 🎉)');

    // Non-10/10 score
    const msgNotPerfect = formatZaloMessage('Bài 1: Tập hợp', 'Dễ', '9/10', 60);
    expect(msgNotPerfect).not.toContain('(Đạt điểm tuyệt đối! 🎉)');
  });
});
