import React from 'react';
import ShareThis from 'sharethis';

const ResultComponent = () => {
  return (
    <div>
      {/* Result display */}
      <ShareThis
        title="I scored X on Quiz Y!"
        url="https://example.com/quiz-result"
      />
    </div>
  );
};