import { AgGridReact } from 'ag-grid-react';
import React, { FC, useEffect, useState, useRef, useReducer } from 'react';
import './AddAttendance.scss';
import { attendanceColumns } from '../columns';
import { axios } from '../../../utils';

interface AddAttendanceProps {}

const updatedAttendanceColumns = attendanceColumns.map(header => {
  if (header.headerName === 'LRN') header.field = 'user_id';

  return header;
});

type AttendanceStatus = 'present' | 'absent' | 'excused';

interface AttendanceAction {
  type: AttendanceStatus;
}

interface Attendance {
  lecture_id: number;
  LRN: string;
  status: AttendanceStatus;
}

function addAttendanceReducer(state: number[], action: AttendanceAction) {
  switch (action.type) {
    case 'absent':
      return [2];
    default:
      return state;
  }
}

// function loginReducer(state: UserCredentials, action: LoginAction) {
//   switch (action.type) {
//     case 'user_id':
//       return { ...state, user_id: action.payload };

//     case 'password':
//       return { ...state, password: action.payload };

//     default:
//       return state;
//   }
// }

const AddAttendance: FC<AddAttendanceProps> = ({}: AddAttendanceProps) => {
  const [columns] = useState([
    ...updatedAttendanceColumns,
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <>
          <div className="attendance-action-column">
            <input
              type="radio"
              name={`attendance${params.rowIndex}`}
              id="present"
            />
            <label htmlFor="present">Present</label>

            <input
              type="radio"
              name={`attendance${params.rowIndex}`}
              id="absent"
            />
            <label htmlFor="absent">Absent</label>

            <input
              type="radio"
              name={`attendance${params.rowIndex}`}
              id="excused"
            />
            <label htmlFor="excused">Excused</label>
          </div>
        </>
      ),
    },
  ]);

  const [students, setStudents] = useState();
  const gridRef = useRef(null);
  const [attendance, dispatch] = useReducer(addAttendanceReducer, [10]);

  // Add record every click using useReducer
  const [newAttendanceList, setNewAttendanceList] = useState<Attendance[]>();

  useEffect(() => {
    axios.get(`subject/PreCal/students`).then(({ data }) => {
      setStudents(data.data);
    });
  }, []);

  return (
    <div className="add-attendance">
      <button
        onClick={async () => {
          axios.post('subject/PreCal/attendance', {
            attendance: 'hello',
            attendance_date: '2021-12-16',
          });
        }}
      >
        Save
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
          ref={gridRef}
          columnDefs={columns}
          pagination={true}
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
  );
};

export default AddAttendance;
