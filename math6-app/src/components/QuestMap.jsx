import React from 'react';

export default function QuestMap({ curriculum }) {
  return (
    <div data-testid="quest-map">
      {curriculum && curriculum.chapters.map(c => 
        c.lessons.map(l => (
          <div key={l.id}>{l.title}</div>
        ))
      )}
    </div>
  );
}
