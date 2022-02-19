import React, { FC, useEffect } from 'react';
import './Attendance.scss';
import { axios } from '../../utils';
import { Outlet } from 'react-router-dom';

interface AttendanceProps {}

const Attendance: FC<AttendanceProps> = ({}: AttendanceProps) => {
  useEffect(() => {
    axios.get('/api/auth/me').then(res => console.log(res));
  }, []);

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
        numquam ab dolorem voluptatibus eligendi asperiores corporis tempora
        iste rerum vel quisquam quo rem, corrupti molestias sit ratione
        laboriosam quaerat blanditiis.
      </p>
    </div>
  );
};

export default Attendance;
