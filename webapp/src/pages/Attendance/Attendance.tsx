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

export type AttendanceStatus = 'present' | 'absent' | 'excused';

interface Attendance {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  status: AttendanceStatus;
}

const Attendance: FC<AttendanceProps> = ({}: AttendanceProps) => {
  const [attendanceList, setAttendanceList] = useState<
    Attendance & { lecture_id: number }[]
  >();
  const selectedSubject = useContext(SubjectContext);
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  // const [validLectureDates, setValidLectureDates] =
  //   useState<{ lecture_date: Date }[]>();

  const [columns] = useState([
    {
      field: 'LRN',
      headerName: 'LRN',
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
      field: 'last_name',
      headerName: 'Last Name',
    },
    {
      field: 'status',
      headerName: 'Attendance',
    },
    {
      field: 'lecture_id',
      headerName: 'Lecture_id',
      hide: true,
      default: 13,
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => {
        const [status] = useState<AttendanceStatus[]>([
          'present',
          'excused',
          'absent',
        ]);

        return (
          <div>
            {status.map(stat => (
              <button
                key={stat}
                onClick={async () => {
                  const LRN = params.data.LRN;
                  const lecture_id = params.data.lecture_id;

                  await axios.patch(
                    `subject/${selectedSubject}/${lecture_id}/attendance`,
                    {
                      LRN,
                      newStatus: stat,
                    },
                  );
                }}
              >
                {stat}
              </button>
            ))}
          </div>
        );
      },
    },
  ]);

  const fetchStudentsAttendance = () => {
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
        setAttendanceList(() => {
          return data.data.attendance.map((at: any) => ({
            ...at,
            lecture_id: data.data.lecture_id,
          }));
        });
      });
  };

  useEffect(() => {
    fetchStudentsAttendance();

    // axios
    //   .get(`subject/${selectedSubject}/lecture-dates?teacher=${user?.user_id}`)
    //   .then(({ data }) => {
    //     setValidLectureDates(data.data);
    //   });
  }, [selectedSubject, attendanceDate]);

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
    </>
  );
};

export default Attendance;
