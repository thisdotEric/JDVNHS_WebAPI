import React, { FC } from 'react';
import type { AttendanceStatus } from './Attendance';

interface AttendanceActionProps {
  setAttendanceActions: React.Dispatch<React.SetStateAction<AttendanceStatus>>;
}

const AttendanceAction: FC<AttendanceActionProps> = ({
  setAttendanceActions,
}: AttendanceActionProps) => {
  return (
    <div>
      <button onClick={() => setAttendanceActions('present')}>Present</button>
      <button onClick={() => setAttendanceActions('excused')}>Excused</button>
      <button onClick={() => setAttendanceActions('absent')}>Absent</button>
    </div>
  );
};

export default AttendanceAction;
