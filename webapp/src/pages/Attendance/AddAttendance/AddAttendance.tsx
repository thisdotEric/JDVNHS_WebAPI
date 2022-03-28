import React, { FC, useContext, useEffect, useState, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddAttendance.scss';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import AttendanceActionColumn from './AttendanceActionColumn';
import { AgGridReact } from 'ag-grid-react';
import { useSetHeader } from '../../../hooks';
import { Button } from '../../../components/Button';

interface AddAttendanceProps {}

export type AttendanceStatus = 'present' | 'absent' | 'excused';

export interface AttendanceAction {
  type: AttendanceStatus;
  payload: string;
}

interface Attendance {
  LRN: string;
  status: AttendanceStatus;
}

const AddAttendance: FC<AddAttendanceProps> = ({}: AddAttendanceProps) => {
  useSetPageTitle('Add Attendance');
  useSetHeader({
    headerStringValue: 'Create new attendance',
    showSubjectDropdown: false,
  });

  const [students, setStudents] = useState<any[]>();
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);

  let { lecture_id } = useParams();
  useSetPageTitle('Create New Attendance');

  const [attendanceCols] = useState([
    {
      field: 'user_id',
      headerName: 'LRN',
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
    },
    {
      field: 'first_name',
      headerName: 'First Name',
    },
    {
      field: 'middle_name',
      headerName: 'Middle Name',
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <>
          <AttendanceActionColumn
            index={params.rowIndex}
            dispatch={updateAttendance}
            LRN={params.data.user_id}
          />
        </>
      ),
    },
  ]);

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/students`).then(({ data }) => {
      // Set table data
      setStudents(
        data.data.map((st: any) => {
          return {
            ...st,
            attendance: 'present',
          };
        }),
      );
    });
  }, []);

  const updateAttendance = (status: AttendanceStatus, LRN: string) => {
    console.log(status);

    setStudents(old => {
      return old?.map(st => {
        if (st.user_id === LRN) st.attendance = status;

        return st;
      });
    });
  };

  return (
    <div>
      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          rowData={students}
          pagination={true}
          columnDefs={attendanceCols}
          rowSelection={'single'}
          enableCellChangeFlash={true}
          defaultColDef={{
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
        ></AgGridReact>
      </div>

      <div className="scores-act">
        <Button
          buttontype="cancel"
          value="Cancel"
          onClick={() => {
            navigate('/t/lectures');
          }}
        />

        <Button
          buttontype="save"
          value="Save new attendance"
          onClick={async () => {
            await axios.post('subject/PreCal/attendance', {
              attendance: students?.map(s => {
                return {
                  LRN: s.user_id,
                  status: s.attendance,
                };
              }),
              lecture_id: lecture_id,
            });

            navigate('/t/lectures');
          }}
        />
      </div>
    </div>
  );
};

export default AddAttendance;
