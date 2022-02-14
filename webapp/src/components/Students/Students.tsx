import React, { FC, useEffect, useState, useContext } from 'react';
import './Students.scss';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { SubjectContext } from '../../context';
import { axios } from '../../utils';

interface StudentsProps {}

export interface IStudent {
  user_id: string;
  first_name: string;
  middle_name: string;
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
  const [students, setStudents] = useState<IStudent[]>();
  const [selectedStudent, setSelectedStudent] = useState<IStudent['user_id']>();

  const selectedSubject = useContext(SubjectContext);
  const [subjectStats, setSubjectStats] = useState<SubjectStats>();

  const [gridApi, setGridApi] = useState<any>();

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/students`).then(response => {
      const students = response.data.data;

      setStudents(students);

      setSubjectStats({
        femaleCount: students.reduce((prev: number, curr: IStudent) => {
          return curr.gender === 'female' ? prev + 1 : prev + 0;
        }, 0),
        maleCount: students.reduce((prev: number, curr: IStudent) => {
          return curr.gender === 'male' ? prev + 1 : prev + 0;
        }, 0),
        totalStudents: students.length,
        gradeLevel: 10,
      });
    });
  }, [selectedSubject]);

  return (
    <div className="class-students">
      <div className="class-info">
        <p>Object Oriented Programming</p>
        <p>Total Number of Students: {subjectStats?.totalStudents}</p>
        <p>Number of Female: {subjectStats?.femaleCount}</p>
        <p>Number of Male: {subjectStats?.maleCount}</p>
        <p>Grade Level: {subjectStats?.gradeLevel}</p>
      </div>

      <button
        disabled={selectedStudent === undefined}
        onClick={async () => {
          console.log('Selected Student ID: ', selectedStudent);
          gridApi.refreshCells({ force: true, suppressFlash: false });
        }}
      >
        Delete Student
      </button>

      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          rowData={students}
          onGridReady={onGridReady}
          pagination={true}
          rowSelection={'single'}
          enableCellChangeFlash={true}
          pinnedTopRowData={[]}
          pinnedBottomRowData={[]}
          onSelectionChanged={() => {
            setSelectedStudent(gridApi.getSelectedRows()[0].user_id);
          }}
          defaultColDef={{
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
        >
          <AgGridColumn field="user_id" headerName="LRN" />
          <AgGridColumn field="first_name" headerName="First Name" />
          <AgGridColumn field="middle_name" headerName="Middle Name" />
          <AgGridColumn field="last_name" headerName="Last Name" />
          <AgGridColumn field="gender" headerName="Gender" />
          <AgGridColumn field="contact_number" headerName="Contact Number" />
        </AgGridReact>
      </div>
    </div>
  );
};

export default Students;
