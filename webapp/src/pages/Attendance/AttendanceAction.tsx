import React, { FC } from 'react';

interface AttendanceActionProps {}

const AttendanceAction: FC<
  AttendanceActionProps
> = ({}: AttendanceActionProps) => {
  return (
    <div>
      <button onClick={() => alert('Hey')}>Present</button>
    </div>
  );
};

export default AttendanceAction;
