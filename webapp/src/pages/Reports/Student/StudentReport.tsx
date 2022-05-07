import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch, useSetHeader, useSetPageTitle } from '../../../hooks';
import './StudentReport.scss';

interface StudentReportProps {}

const StudentReport: FC<StudentReportProps> = ({}: StudentReportProps) => {
  useSetPageTitle('Student Report');

  const { LRN } = useParams();

  const [{ data }, { runFetch: getStudent }] = useFetch(
    `reports/${LRN}?subject_id=Math7`,
  );
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
          {/* <p id="name">
            {console.log(data)}
            {data.data.student.last_name}, {data.data.student.first_name}{' '}
            {data.data.student.middle_name}
          </p> */}

          <p>
            Personalized Remediation and Intervention Strategy for Student A
          </p>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default StudentReport;
