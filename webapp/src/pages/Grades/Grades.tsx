import React, { FC, useEffect } from 'react';
import './Grades.scss';
import { useFetch } from '../../hooks';
import type { AxiosRequestConfig } from 'axios';
import { Spinner } from '../../components/Spinner';

interface GradesProps {}

const Grades: FC<GradesProps> = ({}: GradesProps) => {
  const [{ data, loading, error }, { runFetch: getUser }] = useFetch(
    `subject/PreCal/students`,
  );

  useEffect(() => {
    const opts: AxiosRequestConfig = { method: 'GET' };
    getUser(opts);
  }, []);

  return (
    <div>
      {console.log(data)}

      <Spinner />
    </div>
  );
};

export default Grades;
