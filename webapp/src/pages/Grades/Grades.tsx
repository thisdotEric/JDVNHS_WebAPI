import React, {
  FC,
  useRef,
  useEffect,
  useContext,
  useState,
  useMemo,
} from 'react';
import './Grades.scss';
import { useFetch, useSetPageTitle, useSetHeader } from '../../hooks';
import { SubjectContext } from '../../context';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { Button } from '../../components/Button';
import type { ICellRendererParams } from 'ag-grid-community';
import { axios } from '../../utils';
import { TableComponent } from '../../components/Table';
import type { Column } from 'react-table';

interface StudentGrade {
  LRN: string;
  fullName: string;
  first_grading: number;
  second_grading: number;
  third_grading: number;
  fourth_grading: number;
  finalGrade: number;
}

interface GradesProps {}

const Grades: FC<GradesProps> = ({}: GradesProps) => {
  useSetPageTitle('Grades');
  useSetHeader({
    headerStringValue: 'List of computed grades',
    showSubjectDropdown: true,
  });

  const selectedSubject = useContext(SubjectContext);

  const [grades, setGrades] = useState<StudentGrade[]>([]);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'LRN',
          accessor: 'LRN',
        },
        {
          Header: 'STUDENT',
          accessor: 'fullName',
        },
        {
          Header: 'FIRST GRADING',
          accessor: 'first_grading',
        },
        {
          Header: 'SECOND GRADING',
          accessor: 'second_grading',
        },
        {
          Header: 'THIRD GRADING',
          accessor: 'third_grading',
        },
        {
          Header: 'FOURTH GRADING',
          accessor: 'fourth_grading',
        },
        {
          Header: 'FINAL GRADE',
          accessor: 'finalGrade',
          Cell: row => <span style={{ fontWeight: 'bold' }}>{row.value}</span>,
        },
      ] as Column<StudentGrade>[],
    [],
  );

  useEffect(() => {
    axios.get('grades/Math7').then(({ data }) => {
      setGrades(() => {
        return data.data.map((grade: any) => {
          return {
            ...grade,
            first_grading: grade.grades[0],
            second_grading: grade.grades[1],
            third_grading: grade.grades[2],
            fourth_grading: grade.grades[3],
          };
        });
      });
    });
  }, []);

  return (
    <div>
      <TableComponent columns={columns} data={grades} />{' '}
    </div>
  );
};

export default Grades;
