import axios from '../../utils/axios';
import React, { FC, useEffect, useState } from 'react';
import './Reports.scss';
import { Table } from '@mantine/core';

interface ReportsProps {}

const Reports: FC<ReportsProps> = ({}: ReportsProps) => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    axios.get('subject/Math7/students').then(({ data }) => {
      console.table(data.data);

      setStudents(data.data);
    });
  }, []);

  const rows = students.map((element, index) => (
    <tr key={element.user_id}>
      <td>{element.user_id}</td>
      <td>{element.first_name}</td>
      <td>{element.middle_name}</td>
      <td>{element.last_name}</td>
      <td>{index % 3 == 0 ? 'Does not' : ' '} Undergo Remediation</td>
    </tr>
  ));

  return (
    <div>
      <Table striped highlightOnHover fontSize={'xs'}>
        <thead>
          <tr>
            <th>LRN</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Academic Performance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default Reports;
