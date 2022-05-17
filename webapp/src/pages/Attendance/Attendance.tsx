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
import type { AttendanceStatus } from './AddAttendance/AddAttendance';

interface AttendanceProps {}

export type Status = 'present' | 'absent' | 'excused';

interface AttendanceStatusList {
  status: Status;
  name: string;
}

interface Attendance {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  fullname: string;
  status: Status;
}

interface StudentAttendance {
  LRN: string;
  fullname: string;
  status: Status;
}

interface UpdateAttendanceProp {
  table: any;
  updatedAttendance: Status;
  updateStudentAttendance: (
    table: any,
    updatedAttendance: Status,
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
    headerStringValue: `View/Update Attendance`,
  });

  const [attendanceList, setAttendanceList] = useState<StudentAttendance[]>([]);
  const [attendanceUpdate, setAttendanceUpdate] = useState<number>(0);
  const [attendanceDetails, setAttendanceDetails] =
    useState<AttendanceDetails>();
  const params = useParams();
  const navigate = useNavigate();

  const [attendanceStatus] = useState<AttendanceStatusList[]>([
    {
      status: 'present',
      name: 'Present',
    },
    {
      status: 'absent',
      name: 'Absent',
    },
    {
      status: 'excused',
      name: 'Excused',
    },
  ]);

  const data = useMemo<StudentAttendance[]>(
    () => attendanceList,
    [attendanceList],
  );

  const columns = useMemo(
    () =>
      [
        { Header: 'LRN', accessor: 'LRN' },
        { Header: 'STUDENT', accessor: 'fullname' },
        {
          Header: 'ATTENDANCE STATUS',
          accessor: 'status',
          Cell: row => {
            return (
              <RadioGroup
                required
                defaultValue={row.row.original.status}
                onChange={(value: Status) => {
                  setAttendanceList(old => {
                    return old.map(o => {
                      if (o.LRN === row.row.original.LRN) o.status = value;

                      return o;
                    });
                  });
                }}
              >
                {attendanceStatus.map(({ name, status }) => (
                  <Radio value={status} label={name} />
                ))}
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
        setAttendanceList(
          data.data.attendance.map((at: any) => ({
            LRN: at.LRN,
            fullname: `${at.last_name}, ${at.middle_name} ${at.first_name}`,
            status: at.status,
          })),
        );

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
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Attendance;
