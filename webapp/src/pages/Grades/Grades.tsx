import React, { FC, useEffect, useContext, useState } from 'react';
import './Grades.scss';
import { useFetch } from '../../hooks';
import type { AxiosRequestConfig } from 'axios';
import { SubjectContext } from '../../context';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { Button } from '../../components/Button';

interface GradesProps {}

const Grades: FC<GradesProps> = ({}: GradesProps) => {
  const selectedSubject = useContext(SubjectContext);

  const [{ data, loading, error }, { runFetch: getUser }] = useFetch(
    `subject/${selectedSubject}/students`,
  );

  const [grades] = useState([
    {
      user_id: '12',
      first_g: 1,
      second_g: 1,
      third_g: 1,
      fourth_g: 1,
    },
    {
      user_id: '13',
      first_g: 1,
      second_g: 1,
      third_g: 1,
      fourth_g: 1,
    },
  ]);

  const [gradesColumns] = useState([
    {
      field: 'user_id',
      headerName: 'LRN',
    },
    {
      field: 'user_id',
      headerName: 'First Grading',
    },
    {
      field: 'second_g',
      headerName: 'Second Grading',
    },
    {
      field: 'third_g',
      headerName: 'Third Grading',
    },
    {
      field: 'fourth_g',
      headerName: 'Fourth Grading',
    },
    {
      field: 'final_grade',
      headerName: 'Final Grade',
      cellRendererFramework: (params: any) => (
        <span style={{ fontWeight: 'bold' }}>89</span>
      ),
    },
  ]);

  useEffect(() => {
    const opts: AxiosRequestConfig = { method: 'GET' };
    getUser(opts);

    setTimeout(() => {
      console.log('Students', data);
    }, 1000);
  }, []);

  return (
    <div>
      {console.log(data)}

      <div>
        <div
          className="ag-theme-balham"
          id="student-table"
          style={{
            height: '550px',
          }}
        >
          <AgGridReact
            rowData={grades}
            columnDefs={gradesColumns}
            pagination={true}
            // paginationPageSize={15}
            rowSelection={'single'}
            enableCellChangeFlash={true}
            pinnedTopRowData={[]}
            pinnedBottomRowData={[]}
            defaultColDef={{
              sortable: true,
              flex: 1,
              minWidth: 100,
              filter: true,
              resizable: true,
            }}
          ></AgGridReact>
        </div>
      </div>

      <Button buttontype="select" value="View grade breakdown" />
    </div>
  );
};

export default Grades;
