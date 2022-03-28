import React, { FC } from 'react';
import './Spinner.scss';

interface SpinnerProps {
  loadingText?: string;
}

const Spinner: FC<SpinnerProps> = ({
  loadingText = 'Loading...',
}: SpinnerProps) => {
  return (
    <div id="loader">
      <div className="lds-dual-ring"></div>
      <p>{loadingText}</p>
    </div>
  );
};

export default Spinner;
