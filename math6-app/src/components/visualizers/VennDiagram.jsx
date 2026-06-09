import React, { useState } from 'react';

export default function VennDiagram({ config }) {
  if (!config || !config.setA || !config.setB) {
    return <div className="error-msg">Thiếu cấu hình biểu đồ Venn!</div>;
  }

  const { setA, setB } = config;
  const allElements = Array.from(new Set([...setA.elements, ...setB.elements])).sort((a, b) => Number(a) - Number(b));

  // Positions: 'pool', 'A', 'B', 'AB' (Intersection)
  const [positions, setPositions] = useState(
    allElements.reduce((acc, el) => ({ ...acc, [el]: 'pool' }), {})
  );
  const [selectedElement, setSelectedElement] = useState(null);
  const [feedback, setFeedback] = useState('');

  const checkAnswers = () => {
    let correct = true;
    allElements.forEach(el => {
      const inA = setA.elements.includes(el);
      const inB = setB.elements.includes(el);
      const pos = positions[el];

      if (inA && inB && pos !== 'AB') correct = false;
      else if (inA && !inB && pos !== 'A') correct = false;
      else if (!inA && inB && pos !== 'B') correct = false;
      else if (!inA && !inB) correct = false; // Fallback
      else if (pos === 'pool') correct = false;
    });

    if (correct) {
      setFeedback('🎉 Tuyệt vời! Cún đã xếp đúng các số vào các tập hợp!');
    } else {
      setFeedback('❌ Có số bị xếp nhầm vị trí rồi. Cún xem lại nhé!');
    }
  };

  const moveElement = (element, target) => {
    setPositions(prev => ({ ...prev, [element]: target }));
    setFeedback(''); // Clear feedback on move
  };

  const handlePoolElementClick = (el) => {
    setSelectedElement(prev => (prev === el ? null : el));
  };

  const handleZoneClick = (targetZone) => {
    if (selectedElement !== null) {
      moveElement(selectedElement, targetZone);
      setSelectedElement(null);
    }
  };

  const handleReset = () => {
    setPositions(allElements.reduce((acc, el) => ({ ...acc, [el]: 'pool' }), {}));
    setSelectedElement(null);
    setFeedback('');
  };

  return (
    <div className="venn-visualizer" data-testid="venn-visualizer">
      <div className="venn-diagram-container">
        {/* Set A Circle */}
        <div 
          className={`venn-circle set-a ${selectedElement !== null ? 'highlight-target' : ''}`}
          onClick={() => handleZoneClick('A')}
          data-testid="zone-a"
        >
          <div className="circle-title">{setA.name}</div>
          <div className="circle-elements">
            {allElements.filter(el => positions[el] === 'A').map(el => (
              <button 
                key={el} 
                className="number-badge badge-a" 
                onClick={(e) => { e.stopPropagation(); moveElement(el, 'pool'); }}
                title="Bấm để đưa về hộp số"
                data-testid={`badge-a-${el}`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>

        {/* Overlap / Intersection Zone */}
        <div 
          className={`venn-overlap ${selectedElement !== null ? 'highlight-target' : ''}`}
          onClick={() => handleZoneClick('AB')}
          data-testid="zone-ab"
        >
          <div className="overlap-title">Giao của A và B</div>
          <div className="circle-elements overlap">
            {allElements.filter(el => positions[el] === 'AB').map(el => (
              <button 
                key={el} 
                className="number-badge badge-ab" 
                onClick={(e) => { e.stopPropagation(); moveElement(el, 'pool'); }}
                title="Bấm để đưa về hộp số"
                data-testid={`badge-ab-${el}`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>

        {/* Set B Circle */}
        <div 
          className={`venn-circle set-b ${selectedElement !== null ? 'highlight-target' : ''}`}
          onClick={() => handleZoneClick('B')}
          data-testid="zone-b"
        >
          <div className="circle-title">{setB.name}</div>
          <div className="circle-elements">
            {allElements.filter(el => positions[el] === 'B').map(el => (
              <button 
                key={el} 
                className="number-badge badge-b" 
                onClick={(e) => { e.stopPropagation(); moveElement(el, 'pool'); }}
                title="Bấm để đưa về hộp số"
                data-testid={`badge-b-${el}`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Elements pool */}
      <div className="elements-pool">
        <p className="instructions-text">Bấm vào số để chọn, rồi bấm vào nhóm trên hình tròn để xếp. Hoặc dùng các nút nhanh:</p>
        <div className="pool-list">
          {allElements.filter(el => positions[el] === 'pool').map(el => {
            const isSelected = selectedElement === el;
            return (
              <div 
                key={el} 
                className={`pool-item-wrapper ${isSelected ? 'selected' : ''}`}
                data-testid={`pool-item-${el}`}
              >
                <button 
                  className={`number-badge draggable-badge ${isSelected ? 'active' : ''}`}
                  onClick={() => handlePoolElementClick(el)}
                  data-testid={`badge-pool-${el}`}
                >
                  {el}
                </button>
                {isSelected && (
                  <div className="quick-actions" data-testid={`quick-actions-${el}`}>
                    <button 
                      className="btn-quick btn-quick-a"
                      onClick={(e) => { e.stopPropagation(); moveElement(el, 'A'); setSelectedElement(null); }}
                    >
                      A
                    </button>
                    <button 
                      className="btn-quick btn-quick-ab"
                      onClick={(e) => { e.stopPropagation(); moveElement(el, 'AB'); setSelectedElement(null); }}
                    >
                      Giao
                    </button>
                    <button 
                      className="btn-quick btn-quick-b"
                      onClick={(e) => { e.stopPropagation(); moveElement(el, 'B'); setSelectedElement(null); }}
                    >
                      B
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="actions-bar">
        <button className="btn-verify" onClick={checkAnswers} data-testid="btn-verify">Kiểm tra kết quả</button>
        <button className="btn-reset" onClick={handleReset} data-testid="btn-reset">Làm lại</button>
      </div>

      {feedback && (
        <div 
          className={`feedback-msg ${feedback.startsWith('🎉') ? 'success' : 'error'}`}
          data-testid="venn-feedback"
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
