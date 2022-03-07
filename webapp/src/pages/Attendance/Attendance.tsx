import React, { FC, useEffect, useState, useContext } from 'react';
import './Attendance.scss';
import { axios } from '../../utils';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { SubjectContext } from '../../context';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { attendanceColumns } from './columns';

interface AttendanceProps {}

export type AttendanceStatus = 'present' | 'absent' | 'excused';

interface Attendance {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  status: AttendanceStatus;
}

interface UpdateAttendanceProp {
  table: any;
  updatedAttendance: AttendanceStatus;
  updateStudentAttendance: (
    table: any,
    updatedAttendance: AttendanceStatus,
  ) => Promise<void>;
}

const UpdateAttendance = ({
  table,
  updatedAttendance,
  updateStudentAttendance,
}: UpdateAttendanceProp) => {
  return (
    <button
      onClick={async () => {
        await updateStudentAttendance(table, updatedAttendance);
      }}
    >
      {updatedAttendance}
    </button>
  );
};

const Attendance: FC<AttendanceProps> = ({}: AttendanceProps) => {
  const [attendanceList, setAttendanceList] = useState<
    Attendance & { lecture_id: number }[]
  >();
  const selectedSubject = useContext(SubjectContext);
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  const [showMainAttendanceTable, setAttendanceTable] = useState<boolean>(true);
  const [attendanceUpdate, setAttendanceUpdate] = useState<number>(0);

  const [columns] = useState([
    ...attendanceColumns,
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <UpdateAttendance
          table={params}
          updateStudentAttendance={updateStudentAttendance}
          updatedAttendance="present"
        />
      ),
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <UpdateAttendance
          table={params}
          updateStudentAttendance={updateStudentAttendance}
          updatedAttendance="absent"
        />
      ),
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <UpdateAttendance
          table={params}
          updateStudentAttendance={updateStudentAttendance}
          updatedAttendance="excused"
        />
      ),
    },
  ]);

  const updateStudentAttendance = async (
    table: any,
    updatedAttendance: AttendanceStatus,
  ) => {
    const LRN = table.data.LRN;
    const lecture_id = table.data.lecture_id;

    await axios.patch(`subject/${selectedSubject}/${lecture_id}/attendance`, {
      LRN,
      newStatus: updatedAttendance,
    });

    // Set new value to re-fetch updated attendance list
    setAttendanceUpdate(Math.random());
  };

  const fetchStudentsAttendance = () => {
    // Format date in accordance to servers expected date (yyyy-MM-dd)
    let date = attendanceDate
      .toLocaleDateString('zh-Hans-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '-');

    if (!selectedSubject) {
      console.log('Subject is still undefined');
    } else
      axios
        .get(`subject/${selectedSubject}/attendance/${date}`)
        .then(({ data }) => {
          setAttendanceList(() => {
            return data.data.attendance.map((at: any) => ({
              ...at,
              lecture_id: data.data.lecture_id,
            }));
          });
        })
        .catch(err => {
          console.log('Not Found');
        });
  };

  useEffect(() => {
    fetchStudentsAttendance();
  }, [selectedSubject, attendanceDate, attendanceUpdate]);

  useEffect(() => {
    fetchStudentsAttendance();
  }, []);

  return (
    <>
      <Calendar
        onChange={setAttendanceDate}
        value={attendanceDate}
        calendarType="Hebrew"
        tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 0}
      />
      <button
        onClick={() => {
          setAttendanceTable(!showMainAttendanceTable);
        }}
      >
        Create new attendance
      </button>
      {showMainAttendanceTable ? (
        <div
          className="ag-theme-balham"
          id="student-table"
          style={{
            height: '550px',
          }}
        >
          <AgGridReact
            rowData={attendanceList}
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
      ) : (
        <p>John</p>
      )}
    </>
  );
};

export default Attendance;
