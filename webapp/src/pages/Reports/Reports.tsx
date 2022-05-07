import axios from '../../utils/axios';
import React, { FC, useEffect, useState } from 'react';
import './Reports.scss';
import { Table } from '@mantine/core';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { useNavigate } from 'react-router-dom';

interface ReportsProps {}

const Reports: FC<ReportsProps> = ({}: ReportsProps) => {
  useSetPageTitle('Reports');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: 'Student Individual Reports',
  });

  const [students, setStudents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('reports/subject/Math7').then(({ data }) => {
      console.log(data.data);

      setStudents(data.data);
    });
  }, []);

  const rows = students.map((element, index) => (
    <tr key={element.user_id}>
      <td>{element.user_id}</td>
      <td>{element.first_name}</td>
      <td>{element.middle_name}</td>
      <td>{element.last_name}</td>
      <td>
        {element.conductRemediation == true
          ? 'Undergo Remediation'
          : 'Does not undergo remediation'}
      </td>
      <td>
        <button
          onClick={() => {
            navigate(`/t/reports/student/${element.user_id}`);
          }}
        >
          View Personalized Learning Plan
        </button>
      </td>
    </tr>
  ));

  return (
    <div id="reports">
      <div id="grading_period">
        <p>Grading Period</p> &nbsp;
        <select name="" id="">
          <option value="1">1st Grading</option>
          <option value="2">2nd Grading</option>
          <option value="3">3rd Grading</option>
          <option value="4">4th Grading</option>
        </select>
      </div>

      <Table striped highlightOnHover fontSize={'xs'}>
        <thead>
          <tr>
            <th>LRN</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Academic Performance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default Reports;
