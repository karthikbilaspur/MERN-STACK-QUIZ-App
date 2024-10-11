import React from 'react';
import ProgressBar from 'react-progress-bar';

const ProgressBarComponent = ({ progress }) => {
  return (
    <ProgressBar
      now={progress}
      label={`${progress}%`}
      style={{ width: '100%' }}
    />
  );
};