import React, { FC } from 'react';
import './Attendance.scss';

interface AttendanceProps {}

const Attendance: FC<AttendanceProps> = ({}: AttendanceProps) => {
  return (
    <div>
      <p id="john">John</p>
    </div>
  );
};

export default Attendance;
