import React, {
  FC,
  useEffect,
  useState,
  useContext,
  useRef,
  memo,
} from 'react';
import './Attendance.scss';
import { axios } from '../../utils';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { SubjectContext } from '../../context';
import 'react-calendar/dist/Calendar.css';
import { attendanceColumns } from './columns';
import { useNavigate, useParams } from 'react-router-dom';
import { AttendanceDetails } from './AttendanceDetails';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { Button, TableButton } from '../../components/Button';
import AttendanceAction from './AttendanceAction';

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
  const selectedSubject = useContext(SubjectContext);

  useSetPageTitle('Attendance');
  useSetHeader({
    showSubjectDropdown: false,
    headerStringValue: `Updating attendance of ${selectedSubject} subject dated 2022-03-12.`,
  });

  const [attendanceList, setAttendanceList] = useState<
    Attendance & { lecture_id: number }[]
  >();
  const [attendanceUpdate, setAttendanceUpdate] = useState<number>(0);
  const [attendanceDetails, setAttendanceDetails] =
    useState<AttendanceDetails>();
  const params = useParams();
  const navigate = useNavigate();

  const [columns] = useState([
    ...attendanceColumns,
    {
      field: 'status',
      headerName: 'Attendance',
      cellRendererFramework: memo((params: any) => (
        <span id={params.node.data.status}>{params.node.data.status}</span>
      )),
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <AttendanceAction
          LRN={params.data.LRN}
          newAttendanceStatus="present"
          updateStudentAttendance={updateStudentAttendance}
        />
      ),
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <AttendanceAction
          LRN={params.data.LRN}
          newAttendanceStatus="absent"
          updateStudentAttendance={updateStudentAttendance}
        />
      ),
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <AttendanceAction
          LRN={params.data.LRN}
          newAttendanceStatus="excused"
          updateStudentAttendance={updateStudentAttendance}
        />
      ),
    },
  ]);

  const updateStudentAttendance = async (
    LRN: string,
    updatedAttendance: AttendanceStatus,
  ) => {
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

    return () => {
      console.log('After');
    };
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

      <div>
        <div
          className="ag-theme-balham-dark"
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
            animateRows={true}
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

      <div id="attendance-actions">
        <Button
          buttontype="select"
          value="Select another attendance"
          onClick={() => {
            navigate('/t/lectures');
          }}
        />
      </div>
    </div>
  );
};

export default Attendance;

/**
 * 
 * 
 * 
 *  onClick={() => {
              console.log(params.rowIndex);

              setGrades(old => {
                return old.map((o, index) => {
                  if (index == params.rowIndex) {
                    console.log('Clicked');
                    o.fourth_g = Math.random() * 100;
                  }
                  return o;
                });
              });

              setTimeout(() => {
                ref.current.api.refreshCells({
                  force: false,
                  suppressFlash: false,
                });
              }, 0);
            }}
 */
