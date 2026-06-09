import React, { useState } from 'react';

const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

const divisors = [2, 3, 5, 9];

const divisorRules = {
  2: 'Các số có chữ số tận cùng là chữ số chẵn (0, 2, 4, 6, 8) thì chia hết cho 2.',
  3: 'Các số có tổng các chữ số chia hết cho 3 thì chia hết cho 3.',
  5: 'Các số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5.',
  9: 'Các số có tổng các chữ số chia hết cho 9 thì chia hết cho 9.'
};

export default function DivisibilitySieve() {
  const [selectedDivisor, setSelectedDivisor] = useState(null);

  const handleDivisorToggle = (div) => {
    setSelectedDivisor(prev => (prev === div ? null : div));
  };

  return (
    <div className="sieve-visualizer" data-testid="sieve-visualizer">
      <p className="viz-info">
        Bấm chọn một số để xem quy tắc chia hết và các bội số của số đó (được tô màu vàng ✨):
      </p>

      <div className="divisor-selector">
        {divisors.map((div) => (
          <button
            key={div}
            className={`btn-divisor ${selectedDivisor === div ? 'active' : ''}`}
            onClick={() => handleDivisorToggle(div)}
            data-testid={`btn-divisor-${div}`}
            aria-pressed={selectedDivisor === div}
          >
            Bội số của {div}
          </button>
        ))}
      </div>

      {selectedDivisor && (
        <div className="rule-card" data-testid="rule-card">
          💡 <strong>Dấu hiệu chia hết cho {selectedDivisor}:</strong> {divisorRules[selectedDivisor]}
        </div>
      )}

      <div className="numbers-grid" data-testid="numbers-grid">
        {numbers.map((num) => {
          const isHighlighted = selectedDivisor !== null && num % selectedDivisor === 0;
          return (
            <div
              key={num}
              className={`grid-num-cell ${isHighlighted ? 'highlighted' : ''}`}
              data-testid={`cell-${num}`}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
