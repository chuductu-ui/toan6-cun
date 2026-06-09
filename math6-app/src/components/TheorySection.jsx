import React, { useState, useEffect } from 'react';
import VennDiagram from './visualizers/VennDiagram';

export default function TheorySection({ lesson, onBack, onRecoverHearts }) {
  if (!lesson) return null;

  const [recovered, setRecovered] = useState(false);

  useEffect(() => {
    setRecovered(false);
  }, [lesson.id]);

  const renderVisualizer = () => {
    const type = lesson.theory?.visualizerType;
    const config = lesson.theory?.visualizerConfig;

    if (type === 'VennDiagram') {
      return <VennDiagram config={config} />;
    }

    return (
      <div className="placeholder-visualizer" data-testid="placeholder-visualizer">
        Mô phỏng đồ họa {type ? `(${type})` : ''} sẽ sớm xuất hiện!
      </div>
    );
  };

  const handleRecover = () => {
    if (onRecoverHearts) {
      onRecoverHearts();
    }
    setRecovered(true);
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Khôi phục 2 ❤️ thành công!');
    }
  };

  return (
    <div className="theory-section" data-testid="theory-section">
      <div className="section-header">
        <button className="btn-back" onClick={onBack} data-testid="btn-back">
          ← Quay lại Bản đồ
        </button>
        <h2 className="theory-title" data-testid="theory-title">
          📖 {lesson.title}: Lý thuyết lý thú
        </h2>
      </div>

      <div className="theory-content">
        <p className="lesson-description" data-testid="lesson-description">
          {lesson.description}
        </p>

        <div className="theory-grid">
          <div className="theory-text-card">
            <h3>Định nghĩa mới</h3>
            <p className="explanation-text" data-testid="explanation-text">
              {lesson.theory?.explanation}
            </p>
            <div className="recover-card">
              <p>💡 Đọc hiểu lý thuyết giúp khôi phục sinh mệnh của con!</p>
              <button 
                className="btn-recover" 
                onClick={handleRecover}
                disabled={recovered}
                data-testid="btn-recover"
              >
                ❤️ Nạp 2 sinh mệnh
              </button>
              {recovered && (
                <span className="recover-success" data-testid="recover-success">
                  ✅ Đã nạp sinh mệnh!
                </span>
              )}
            </div>
          </div>
          
          <div className="theory-visualizer-card">
            <h3>🔬 Thực hành trực quan</h3>
            {renderVisualizer()}
          </div>
        </div>
      </div>
    </div>
  );
}
