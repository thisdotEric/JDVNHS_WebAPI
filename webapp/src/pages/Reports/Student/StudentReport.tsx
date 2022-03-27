import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch, useSetHeader, useSetPageTitle } from '../../../hooks';
import './StudentReport.scss';

interface StudentReportProps {}

const StudentReport: FC<StudentReportProps> = ({}: StudentReportProps) => {
  useSetPageTitle('Student Report');

  const { LRN } = useParams();

  const [{ data }, { runFetch: getStudent }] = useFetch(`student/${LRN}`);
  useSetHeader({
    headerStringValue: `Individual performance report`,
    showSubjectDropdown: true,
  });

  useEffect(() => {
    getStudent();

    console.log('Current data');
  }, []);

  return (
    <div id="student-report">
      {data ? (
        <>
          <p id="name">
            {data.data.last_name}, {data.data.first_name}{' '}
            {data.data.middle_name}
          </p>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default StudentReport;
