import React, { FC, useRef, useEffect, useContext, useState } from 'react';
import './Grades.scss';
import { useFetch, useSetPageTitle, useSetHeader } from '../../hooks';
import { SubjectContext } from '../../context';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { Button } from '../../components/Button';
import type { ICellRendererParams } from 'ag-grid-community';
import { axios } from '../../utils';

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

  const [{ data, loading, error }, { runFetch: getUser }] = useFetch(
    `subject/${selectedSubject}/students`,
  );

  const ref = useRef<any>(null);

  const [grades, setGrades] = useState<StudentGrade[]>([]);

  const [gradesColumns] = useState([
    {
      field: 'LRN',
      headerName: 'LRN',
    },
    {
      field: 'fullName',
      headerName: 'Student',
      width: 250,
      suppressSizeToFit: true,
    },
    {
      field: 'first_grading',
      headerName: 'First Grading',
    },
    {
      field: 'second_grading',
      headerName: 'Second Grading',
    },
    {
      field: 'third_grading',
      headerName: 'Third Grading',
    },
    {
      field: 'fourth_grading',
      headerName: 'Fourth Grading',
    },
    {
      field: 'finalGrade',
      headerName: 'Final Grade',
      cellRendererFramework: (params: ICellRendererParams) => {
        console.log('Prams', params);

        return <span style={{ fontWeight: 'bold' }}>{params.value}</span>;
      },
    },
  ]);

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
      <div
        className="ag-theme-balham-dark"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          ref={ref}
          rowData={grades}
          columnDefs={gradesColumns}
          pagination={true}
          animateRows={true}
          rowSelection={'single'}
          enableCellChangeFlash={true}
          pinnedTopRowData={[]}
          pinnedBottomRowData={[]}
          defaultColDef={{
            sortable: true,
            flex: 1,
            filter: true,
            resizable: true,
          }}
        ></AgGridReact>
      </div>

      <Button buttontype="select" value="View grade breakdown" />
    </div>
  );
};

export default Grades;
