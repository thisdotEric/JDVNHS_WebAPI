import React, { FC } from 'react';
import type { Status } from './Attendance';
import { TableButton } from '../../components/Button';

interface AttendanceActionProps {
  LRN: string;
  newAttendanceStatus: Status;
  updateStudentAttendance: () => void;
}

const AttendanceAction: FC<AttendanceActionProps> = ({
  updateStudentAttendance,
  LRN,
  newAttendanceStatus,
}: AttendanceActionProps) => {
  return (
    <TableButton
      value={newAttendanceStatus}
      onClick={updateStudentAttendance}
    />
  );
};

export default AttendanceAction;
