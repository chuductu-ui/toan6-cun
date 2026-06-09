import React, { useState } from 'react';

const shapes = {
  triangle: {
    name: 'Tam giác đều',
    rotateStep: 120,
    description: 'Có 3 trục đối xứng và đối xứng quay góc 120°.',
    svg: (
      <svg width="150" height="150" viewBox="0 0 100 100" className="geom-svg" data-testid="svg-triangle" role="img">
        <title>Tam giác đều</title>
        <polygon points="50,15 90,85 10,85" fill="#3498db" stroke="#2980b9" strokeWidth="3" />
      </svg>
    )
  },
  square: {
    name: 'Hình vuông',
    rotateStep: 90,
    description: 'Có 4 trục đối xứng và đối xứng quay góc 90°.',
    svg: (
      <svg width="150" height="150" viewBox="0 0 100 100" className="geom-svg" data-testid="svg-square" role="img">
        <title>Hình vuông</title>
        <rect x="15" y="15" width="70" height="70" fill="#2ecc71" stroke="#27ae60" strokeWidth="3" />
      </svg>
    )
  },
  rectangle: {
    name: 'Hình chữ nhật',
    rotateStep: 180,
    description: 'Có 2 trục đối xứng (không đi qua đường chéo) và đối xứng quay góc 180°.',
    svg: (
      <svg width="150" height="150" viewBox="0 0 100 100" className="geom-svg" data-testid="svg-rectangle" role="img">
        <title>Hình chữ nhật</title>
        <rect x="10" y="25" width="80" height="50" fill="#e74c3c" stroke="#c0392b" strokeWidth="3" />
      </svg>
    )
  }
};

export default function SymmetryLab() {
  const [selectedShape, setSelectedShape] = useState('triangle');
  const [angle, setAngle] = useState(0);
  const [showAxis, setShowAxis] = useState(false);

  const handleRotate = () => {
    const step = shapes[selectedShape].rotateStep;
    setAngle(prev => (prev + step) % 360);
  };

  const handleShapeChange = (shapeKey) => {
    setSelectedShape(shapeKey);
    setAngle(0);
    setShowAxis(false);
  };

  const handleReset = () => {
    setAngle(0);
    setShowAxis(false);
  };

  return (
    <div className="symmetry-visualizer" data-testid="symmetry-visualizer">
      <p className="viz-info">
        Chọn hình phẳng để thí nghiệm đối xứng: xoay hình và bật trục đối xứng màu đỏ 📏:
      </p>

      <div className="shape-selector">
        {Object.keys(shapes).map(key => (
          <button
            key={key}
            className={`btn-shape ${selectedShape === key ? 'active' : ''}`}
            onClick={() => handleShapeChange(key)}
            data-testid={`btn-shape-${key}`}
          >
            {shapes[key].name}
          </button>
        ))}
      </div>

      <div className="shape-desc-card" data-testid="shape-desc-card">
        💡 <strong>{shapes[selectedShape].name}:</strong> {shapes[selectedShape].description}
      </div>

      <div className="canvas-frame" data-testid="canvas-frame">
        <div
          className="symmetry-shape-container"
          style={{ transform: `rotate(${angle}deg)` }}
          data-testid="shape-container"
        >
          {shapes[selectedShape].svg}
        </div>

        {showAxis && (
          <div className="axes-container" data-testid="axes-container">
            {/* Main vertical axis */}
            <div className="axis-line vertical" data-testid="axis-line-vertical"></div>
            {/* If square, show horizontal & diagonals */}
            {selectedShape === 'square' && (
              <>
                <div className="axis-line horizontal" data-testid="axis-line-horizontal"></div>
                <div className="axis-line diagonal-1" data-testid="axis-line-diag1"></div>
                <div className="axis-line diagonal-2" data-testid="axis-line-diag2"></div>
              </>
            )}
            {/* If rectangle, show horizontal */}
            {selectedShape === 'rectangle' && (
              <div className="axis-line horizontal" data-testid="axis-line-horizontal"></div>
            )}
          </div>
        )}
      </div>

      <div className="viz-status-box">
        Góc quay hiện tại: <strong className="angle-val" data-testid="angle-val">{angle}°</strong>
      </div>

      <div className="viz-controls flex">
        <button className="btn-rotate" onClick={handleRotate} data-testid="btn-rotate">
          Xoay {shapes[selectedShape].rotateStep}° 🔄
        </button>
        <button className="btn-axis" onClick={() => setShowAxis(!showAxis)} data-testid="btn-axis" aria-pressed={showAxis}>
          {showAxis ? 'Tắt trục đối xứng ✕' : 'Bật trục đối xứng 📏'}
        </button>
        <button className="btn-reset" onClick={handleReset} data-testid="btn-reset">
          Đặt lại 🔄
        </button>
      </div>
    </div>
  );
}
