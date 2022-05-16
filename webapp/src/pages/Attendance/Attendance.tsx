import React, {
  FC,
  useEffect,
  useState,
  useContext,
  useRef,
  memo,
  useCallback,
  useMemo,
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
import type { ICellRendererParams } from 'ag-grid-community';
import type { Column } from 'react-table';
import { TableComponent } from '../../components/Table';
import { RadioGroup, Radio } from '@mantine/core';

interface AttendanceProps {}

export type AttendanceStatus = 'present' | 'absent' | 'excused';

interface Attendance {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  fullname: string;
  status: AttendanceStatus;
}

interface StudentAttendance {
  LRN: string;
  user_id: string;
  fullname: string;
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

const Attendance: FC<AttendanceProps> = ({}: AttendanceProps) => {
  const selectedSubject = useContext(SubjectContext);

  useSetPageTitle('Attendance');
  useSetHeader({
    showSubjectDropdown: false,
    headerStringValue: `Updating attendance of ${selectedSubject} subject dated 2022-03-12.`,
  });

  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [attendanceUpdate, setAttendanceUpdate] = useState<number>(0);
  const [attendanceDetails, setAttendanceDetails] =
    useState<AttendanceDetails>();
  const params = useParams();
  const navigate = useNavigate();

  const [attendanceStatus] = useState<AttendanceStatus[]>([
    'present',
    'absent',
    'excused',
  ]);

  const data = useMemo<StudentAttendance[]>(
    () => [
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
      {
        LRN: '123456789123',
        fullname: 'John Eric Siguenza',
        user_id: '123456789123',
        status: 'present',
      },
    ],
    [],
  );

  const columns = useMemo(
    () =>
      [
        { Header: 'LRN', accessor: 'LRN' },
        { Header: 'STUDENT', accessor: 'fullname' },
        {
          Header: 'ATTENDANCE STATUS',
          accessor: 'user_id',
          Cell: row => {
            return (
              <RadioGroup required onChange={value => console.log(value)}>
                <Radio value="present" label="Present" />
                <Radio value="absent" label="Absent" />
                <Radio value="excused" label="Excused" />
              </RadioGroup>
            );
          },
        },
      ] as Column<StudentAttendance>[],
    [],
  );

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

      <TableComponent columns={columns} data={data} />

      {/* <div>
        <div
          className="ag-theme-balham-dark"
          id="student-table"
          style={{
            height: '550px',
          }}
        >
          <AgGridReact
            ref={ref}
            rowData={attendanceList}
            columnDefs={columns}
            getRowNodeId={data => data.row}
            pagination={true}
            rowSelection={'single'}
            enableCellChangeFlash={true}
            immutableData={true}
            frameworkComponents={{
              actionRender: Sample,
            }}
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

        <Button
          buttontype="save"
          value="Save updated attendance"
          onClick={() => {
            navigate('/t/lectures');
          }}
        />
      </div> */}
    </div>
  );
};

export default Attendance;
