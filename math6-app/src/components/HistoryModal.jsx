import React, { useEffect, useState } from 'react';
import { getHistory } from '../utils/storage';

export default function HistoryModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📊 Nhật Ký Học Tập Của Cún</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {history.length === 0 ? (
            <p className="no-data">Cún chưa làm bài tập nào. Hãy bắt đầu bản đồ bài học nhé!</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Bài học</th>
                  <th>Cấp độ</th>
                  <th>Điểm số</th>
                  <th>Thời gian</th>
                  <th>Ngày học</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td><strong>{h.lessonTitle}</strong></td>
                    <td><span className={`badge ${h.level}`}>{h.level.toUpperCase()}</span></td>
                    <td><strong className="score-text">{h.score}</strong></td>
                    <td>{Math.floor(h.timeTaken / 60)}m {h.timeTaken % 60}s</td>
                    <td className="date-cell">{new Date(h.timestamp).toLocaleString('vi-VN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
