import React, { FC, useEffect, useState, useContext } from 'react';
import './Students.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { SubjectContext } from '../../context';
import { axios } from '../../utils';
import { useSetPageTitle, useSetHeader } from '../../hooks';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { Hash } from 'react-feather';

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
  useSetPageTitle('Students');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: 'List of all students',
  });

  const [students, setStudents] = useState<IStudent[]>();
  const [selectedStudent, setSelectedStudent] = useState<IStudent['user_id']>();

  const selectedSubject = useContext(SubjectContext);
  const [subjectStats, setSubjectStats] = useState<SubjectStats>();

  const [gridApi, setGridApi] = useState<any>();
  const [studentName, setStudentName] = useState<string>('');
  const navigate = useNavigate();

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
        <p>
          Student count: <span>{subjectStats?.totalStudents}</span>
        </p>
        <p>
          Grade Level: <span>{subjectStats?.gradeLevel}</span>
        </p>
        <p> | </p>
        <p>
          Females: <span>{subjectStats?.femaleCount}</span>
        </p>
        <p>
          Males: <span>{subjectStats?.maleCount}</span>
        </p>
      </div>

      <div
        className="ag-theme-balham-dark"
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
          animateRows={true}
          pinnedTopRowData={[]}
          pinnedBottomRowData={[]}
          onSelectionChanged={() => {
            setSelectedStudent(gridApi.getSelectedRows()[0].user_id);
            setStudentName(gridApi.getSelectedRows()[0].first_name);
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
