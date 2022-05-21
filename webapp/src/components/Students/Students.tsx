import React, { FC, useEffect, useState, useContext, useMemo } from 'react';
import './Students.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { SubjectContext } from '../../context';
import { axios } from '../../utils';
import { useSetPageTitle, useSetHeader } from '../../hooks';
import { Button } from '@mantine/core';
import { TableComponent } from '../Table';
import { Link, useNavigate } from 'react-router-dom';
import type { Column } from 'react-table';
import { Report } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../Notifications';

interface StudentsProps {}

export interface IStudent {
  LRN: string;
  user_id: string;
  fullname: string;
  gender: string;
  contact_number: string;
}

interface SubjectStats {
  totalStudents: number;
  maleCount: number;
  femaleCount: number;
  gradeLevel: number;
}

const Students: FC<StudentsProps> = ({}: StudentsProps) => {
  useSetPageTitle('Students');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: 'List of all students',
  });

  const [students, setStudents] = useState<IStudent[]>([]);

  const selectedSubject = useContext(SubjectContext);
  const navigate = useNavigate();

  const columns = useMemo(
    () =>
      [
        {
          Header: 'LRN',
          accessor: 'LRN',
        },
        {
          Header: 'FULL NAME',
          accessor: 'fullname',
          Cell: row => <p id="name">{row.value}</p>,
        },
        {
          Header: 'GENDER',
          accessor: 'gender',
        },
        {
          Header: 'CONTACT NUMBER',
          accessor: 'contact_number',
        },
        {
          Header: 'ACTION',
          accessor: 'user_id',
          Cell: row => {
            return (
              <Link to={`/t/reports/student/${row.value}`} id="report-btn">
                View individual report
              </Link>
            );
          },
        },
      ] as Column<IStudent>[],
    [],
  );
  const data = useMemo<readonly IStudent[]>(
    () => (!students ? [] : students.map(s => s)),
    [students, setStudents],
  );

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/students`).then(response => {
      const students_data = response.data.data;

      setStudents(
        students_data.map((s: any) => ({
          user_id: s.user_id,
          LRN: s.user_id,
          fullname: `${s.last_name}, ${s.first_name} ${s.middle_name[0]}.`,
          gender: s.gender,
          contact_number: s.contact_number,
        })),
      );
    });
  }, []);

  return (
    <div className="class-students">
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Students;
