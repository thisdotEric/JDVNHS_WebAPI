import React, { FC, useEffect, useState, useContext } from 'react';
import './Attendance.scss';
import { axios } from '../../utils';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { SubjectContext } from '../../context';
import 'react-calendar/dist/Calendar.css';
import { attendanceColumns } from './columns';
import { useNavigate, useParams } from 'react-router-dom';
import { AttendanceDetails } from './AttendanceDetails';
import { useSetPageTitle } from '../../hooks';
import { Button } from '../../components/Button';

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

export interface AttendanceDetails {
  presents: number;
  absents: number;
  excused: number;
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
  const [showMainAttendanceTable, setAttendanceTable] = useState<boolean>(true);
  const [attendanceUpdate, setAttendanceUpdate] = useState<number>(0);
  const [attendanceDetails, setAttendanceDetails] =
    useState<AttendanceDetails>();
  const params = useParams();
  const navigate = useNavigate();

  useSetPageTitle('Attendance');

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
    let lecture_id: string | null = params.id!;

    if (!lecture_id) {
      lecture_id = localStorage.getItem('lecture_id');
    }

    await axios.patch(`subject/${selectedSubject}/attendance/${lecture_id}`, {
      LRN,
      newStatus: updatedAttendance,
    });

    // Set new value to re-fetch updated attendance list
    setAttendanceUpdate(Math.random());
  };

  const fetchStudentsAttendance = (isLatest: boolean = false) => {
    const id = isLatest ? 'latest' : params.id;

    axios
      .get(`subject/${selectedSubject}/attendance?id=${id}`)
      .then(({ data }) => {
        setAttendanceList(data.data.attendance);

        // Save the lecture id
        localStorage.setItem('lecture_id', data.data.lecture_id);

        deriveAttendanceDetails(data.data.attendance);
      })
      .catch(err => {
        console.log('Not Found');
      });
  };

  const deriveAttendanceDetails = (attendance: any[]) => {
    let presents = 0;
    let excused = 0;
    let absents = 0;

    attendance.forEach(at => {
      if (at.status === 'present') presents++;
      if (at.status === 'absent') absents++;
      if (at.status === 'excused') excused++;
    });

    setAttendanceDetails({
      presents,
      absents,
      excused,
    });
  };

  useEffect(() => {
    let isLatest = false;

    if (!params.id) isLatest = true;

    fetchStudentsAttendance(isLatest);
  }, [attendanceUpdate]);

  useEffect(() => {
    let isLatest = false;

    if (!params.id) isLatest = true;

    fetchStudentsAttendance(isLatest);
  }, []);

  return (
    <div className="attendance">
      {attendanceDetails && (
        <AttendanceDetails
          presents={attendanceDetails.presents}
          absents={attendanceDetails.absents}
          excused={attendanceDetails.excused}
        />
      )}

      {showMainAttendanceTable ? (
        <div>
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
      ) : (
        <p>Loading</p>
      )}

      <Button
        buttonType="select"
        value="Select another attendance"
        onClick={() => {
          navigate('/t/lectures');
        }}
      />
    </div>
  );
};

export default Attendance;
