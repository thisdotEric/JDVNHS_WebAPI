import React, { FC, useState } from 'react';
// import './AttendanceAction.scss';
import type { AttendanceAction, AttendanceStatus } from './AddAttendance';

interface AttendanceActionProps {
  index: number;
  dispatch: (status: AttendanceStatus, LRN: string) => void;
  LRN: string;
}

interface Actions {
  inputName: string;
  inputId: AttendanceStatus;
}

const AttendanceActionColumn: FC<AttendanceActionProps> = ({
  index,
  dispatch,
  LRN,
}: AttendanceActionProps) => {
  const [actions] = useState<Actions[]>([
    {
      inputName: 'Present',
      inputId: 'present',
    },
    {
      inputName: 'Absent',
      inputId: 'absent',
    },
    {
      inputName: 'Excused',
      inputId: 'excused',
    },
  ]);

  return (
    <div>
      {actions.map(action => (
        <label>
          <input
            onClick={() => {
              dispatch(action.inputId, LRN);
            }}
            type="radio"
            name={`attendance${index}`}
          />
          <i>{action.inputName}</i>
        </label>
      ))}
    </div>
  );
};

export default AttendanceActionColumn;
