import React, { FC } from 'react';
import './AttendanceDetails.scss';

interface AttendanceDetailsProps {
  presents: number;
  absents: number;
  excused: number;
}

const AttendanceDetails: FC<AttendanceDetailsProps> = ({
  presents,
  absents,
  excused,
}: AttendanceDetailsProps) => {
  return (
    <div className="details">
      <p>
        {' '}
        Presents: <span>{presents}</span> &nbsp;
      </p>
      <p>
        {' '}
        Absents: <span>{absents}</span> &nbsp;
      </p>
      <p>
        {' '}
        Excused: <span>{excused}</span> &nbsp;
      </p>
    </div>
  );
};

export default AttendanceDetails;
