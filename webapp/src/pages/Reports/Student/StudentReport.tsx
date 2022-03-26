import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import './StudentReport.scss';

interface StudentReportProps {}

const StudentReport: FC<StudentReportProps> = ({}: StudentReportProps) => {
  const { LRN } = useParams();

  return (
    <div id="student-report">
      <p>Reports page for {LRN}</p>
    </div>
  );
};

export default StudentReport;
