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
  const safeSeconds = Math.max(0, timeSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  
  let timeStr;
  if (minutes === 0) {
    timeStr = `${seconds} giây`;
  } else if (seconds === 0) {
    timeStr = `${minutes} phút`;
  } else {
    timeStr = `${minutes} phút ${seconds} giây`;
  }

  return `📐 KẾT QUẢ HỌC TOÁN 6 - CÚN 📐\n\nCon vừa hoàn thành bài học:\n👉 ${lessonTitle}\n\n• Cấp độ: ${levelLabel}\n• Điểm số: ${scoreText} ${scoreText === '10/10' ? '(Đạt điểm tuyệt đối! 🎉)' : ''}\n• Thời gian: ${timeStr}\n\nBố Mẹ xem lại quá trình học của con nhé! ❤️`;
}
