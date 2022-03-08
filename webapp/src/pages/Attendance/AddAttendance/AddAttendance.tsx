import { AgGridReact } from 'ag-grid-react';
import React, { FC, useEffect, useState, useRef } from 'react';
// import './AddAttendance.scss';
import { attendanceColumns } from '../columns';
import { axios } from '../../../utils';

interface AddAttendanceProps {}

const updatedAttendanceColumns = attendanceColumns.map(header => {
  if (header.headerName === 'LRN') header.field = 'user_id';

  return header;
});

export interface Attendance {
  lecture_id: number;
  LRN: string;
  status: 'present' | 'absent' | 'excused';
}

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
        onClick={() => {
          console.log(students);
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
