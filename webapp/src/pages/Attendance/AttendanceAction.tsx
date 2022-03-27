import React, { FC } from 'react';
import type { AttendanceStatus } from './Attendance';
import { TableButton } from '../../components/Button';

interface AttendanceActionProps {
  LRN: string;
  newAttendanceStatus: AttendanceStatus;
  updateStudentAttendance: (
    LRN: string,
    newAttendanceStatus: AttendanceStatus,
  ) => Promise<void>;
}

const AttendanceAction: FC<AttendanceActionProps> = ({
  updateStudentAttendance,
  LRN,
  newAttendanceStatus,
}: AttendanceActionProps) => {
  return (
    <TableButton
      value={newAttendanceStatus}
      onClick={async () => {
        await updateStudentAttendance(LRN, newAttendanceStatus);
        console.log(LRN, newAttendanceStatus);
      }}
    />
  );
};

export default AttendanceAction;
