import React, { FC } from 'react';

interface MainReportAccordiionLabelProps {
  learning_competency: string;
  proficient: boolean;
}

const MainReportAccordiionLabel: FC<MainReportAccordiionLabelProps> = ({
  learning_competency,
}: MainReportAccordiionLabelProps) => {
  return (
    <div>
      <p>{learning_competency}</p>
    </div>
  );
};

export default MainReportAccordiionLabel;
