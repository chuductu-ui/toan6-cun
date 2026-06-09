const KEY = 'math6_companion_history';

export function getHistory() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveAttempt(attempt) {
  const history = getHistory();
  const newRecord = {
    ...attempt,
    timestamp: Date.now()
  };
  history.unshift(newRecord);
  try {
    localStorage.setItem(KEY, JSON.stringify(history));
  } catch (e) {
    console.error(e);
  }
}

export function formatZaloMessage(lessonTitle, levelLabel, scoreText, timeSeconds) {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;
  const timeStr = `${minutes > 0 ? minutes + ' phút ' : ''}${seconds} giây`;

  return `📐 KẾT QUẢ HỌC TOÁN 6 - CÚN 📐\n\nCon vừa hoàn thành bài học:\n👉 ${lessonTitle}\n\n• Cấp độ: ${levelLabel}\n• Điểm số: ${scoreText} ${scoreText === '10/10' ? '(Đạt điểm tuyệt đối! 🎉)' : ''}\n• Thời gian: ${timeStr}\n\nBố Mẹ xem lại quá trình học của con nhé! ❤️`;
}
