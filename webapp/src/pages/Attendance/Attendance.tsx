import React, { FC, useEffect, useState, useContext } from 'react';
import './Attendance.scss';
import { axios } from '../../utils';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { SubjectContext } from '../../context';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface AttendanceProps {}

interface Attendance {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  status: 'present' | 'absent' | 'excused';
}

const Attendance: FC<AttendanceProps> = ({}: AttendanceProps) => {
  const [attendanceList, setAttendanceList] = useState<Attendance[]>();
  const selectedSubject = useContext(SubjectContext);
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());

  useEffect(() => {
    // Format date in accordance to servers expected date (yyyy-MM-dd)
    let date = attendanceDate
      .toLocaleDateString('zh-Hans-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '-');

    axios
      .get(`subject/${selectedSubject}/attendance/${date}`)
      .then(({ data }) => {
        setAttendanceList(data.data.attendance);
      });
  }, [selectedSubject, attendanceDate]);

  return (
    <>
      <Calendar
        onChange={setAttendanceDate}
        value={attendanceDate}
        calendarType="Hebrew"
        tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 0}
      />
      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          rowData={attendanceList}
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
        >
          <AgGridColumn field="LRN" headerName="LRN" />
          <AgGridColumn field="first_name" headerName="First Name" />
          <AgGridColumn field="middle_name" headerName="Middle Name" />
          <AgGridColumn field="last_name" headerName="Last Name" />
          <AgGridColumn field="status" headerName="Attendance" />
        </AgGridReact>
      </div>
    </>
  );
};

export default Attendance;
