import React, { useState } from 'react';

export default function NumberLine() {
  const [value, setValue] = useState(0);
  const [start, setStart] = useState(0);
  const [operator, setOperator] = useState('+');
  const [diff, setDiff] = useState(3);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const offset = operator === '+' ? diff : -diff;
    const result = start + offset;
    if (result < -10 || result > 10) {
      setError('Kết quả vượt quá phạm vi trục số (-10 đến 10)!');
      return;
    }
    setValue(result);
  };

  const handleStartChange = (val) => {
    setError('');
    const num = Number(val);
    if (isNaN(num)) {
      setStart(0);
      setValue(0);
      return;
    }
    const startVal = Math.max(-10, Math.min(10, num));
    setStart(startVal);
    // Also move rabbit to new start if user updates it
    setValue(startVal);
  };

  const handleDiffChange = (val) => {
    setError('');
    const num = Number(val);
    if (isNaN(num)) {
      setDiff(1);
      return;
    }
    setDiff(Math.max(0, num));
  };

  const handleSetStartAtCurrent = () => {
    setError('');
    setStart(value);
  };

  const handleReset = () => {
    setError('');
    setStart(0);
    setValue(0);
    setOperator('+');
    setDiff(3);
  };

  const ticks = Array.from({ length: 21 }, (_, i) => i - 10);

  return (
    <div className="numberline-visualizer" data-testid="numberline-visualizer">
      <p className="viz-info">
        Học sinh hãy chọn điểm bắt đầu, phép tính cộng/trừ và khoảng cách bước nhảy của chú thỏ 🐰:
      </p>

      {/* Math expression display */}
      <div className="math-expr">
        <div className="input-group">
          <label htmlFor="start-input">Bắt đầu:</label>
          <input
            id="start-input"
            type="number"
            min="-10"
            max="10"
            value={start}
            onChange={(e) => handleStartChange(e.target.value)}
            data-testid="start-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="operator-select">Phép tính:</label>
          <select
            id="operator-select"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            data-testid="operator-select"
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="diff-input">Bước nhảy:</label>
          <input
            id="diff-input"
            type="number"
            min="0"
            max="20"
            value={diff}
            onChange={(e) => handleDiffChange(e.target.value)}
            data-testid="diff-input"
          />
        </div>

        <button className="btn-calc" onClick={calculate} data-testid="btn-calc">
          Nhảy! 🐰
        </button>
      </div>

      {error && <div className="error-msg" data-testid="numberline-error">{error}</div>}

      {/* Trục số */}
      <div className="line-axis-container">
        <div className="line-arrow-left"></div>
        <div className="line-axis"></div>
        <div className="line-arrow-right"></div>
        <div className="line-ticks">
          {ticks.map((tick) => {
            const posPercent = ((tick + 10) / 20) * 100;
            return (
              <div
                key={tick}
                className={`tick-mark ${tick === 0 ? 'zero-tick' : ''}`}
                style={{ left: `${posPercent}%` }}
                data-testid={`tick-${tick}`}
              >
                <div className="tick-line"></div>
                <span className="tick-label">{tick}</span>
              </div>
            );
          })}

          {/* The start marker */}
          <div
            className="start-marker"
            style={{ left: `${((start + 10) / 20) * 100}%` }}
            data-testid="start-marker"
            title={`Điểm bắt đầu: ${start}`}
          >
            <span className="marker-emoji">🚩</span>
          </div>

          {/* The active marker */}
          <div
            className="active-marker"
            style={{ left: `${((value + 10) / 20) * 100}%` }}
            data-testid="active-marker"
            title={`Vị trí hiện tại: ${value}`}
          >
            <span className="marker-emoji">🐰</span>
          </div>
        </div>
      </div>

      <div className="viz-result-box">
        Vị trí hiện tại của thỏ: <strong className="result-val" data-testid="result-val">{value}</strong>
      </div>

      <div className="viz-controls">
        <button
          className="btn-set-start"
          onClick={handleSetStartAtCurrent}
          data-testid="btn-set-start"
        >
          Đặt điểm bắt đầu tại đây 🚩
        </button>
        <button
          className="btn-reset"
          onClick={handleReset}
          data-testid="btn-reset"
        >
          Đặt lại từ 0 🔄
        </button>
      </div>
    </div>
  );
}
