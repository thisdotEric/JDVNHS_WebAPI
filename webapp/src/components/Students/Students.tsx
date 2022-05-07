import React, { FC, useEffect, useState, useContext, useMemo } from 'react';
import './Students.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { SubjectContext } from '../../context';
import { axios } from '../../utils';
import { useSetPageTitle, useSetHeader } from '../../hooks';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { Table } from '@mantine/core';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { studentTableColumns } from './student.table';
import { ArrowNarrowDown, ArrowNarrowUp } from 'tabler-icons-react';
import GlobalFilter from './GlobalFilter';

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
  const [selectedStudent, setSelectedStudent] = useState<IStudent['user_id']>();

  const selectedSubject = useContext(SubjectContext);
  const [subjectStats, setSubjectStats] = useState<SubjectStats>();

  const [studentName, setStudentName] = useState<string>('');
  const navigate = useNavigate();

  const columns = useMemo(() => studentTableColumns, []);
  const data = useMemo<readonly IStudent[]>(
    () => (!students ? [] : students.map(s => s)),
    [students, setStudents],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

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
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div>
        <Table {...getTableProps()} fontSize={'xs'}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowNarrowDown size={15} />
                        ) : (
                          <ArrowNarrowUp size={15} />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div id="student-action-buttons">
        <Button
          value={`View ${studentName}${
            studentName !== '' ? "'s" : ''
          }  student report`}
          buttontype={studentName === '' ? 'disabled' : 'select'}
          disabled={studentName === ''}
          onClick={() => {
            navigate(`/t/reports/student/${selectedStudent}`);
          }}
        />
      </div>
    </div>
  );
};

export default Students;
