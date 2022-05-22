import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddAttendance.scss';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import { useSetHeader } from '../../../hooks';
import type {
  AttendanceStatusList,
  Status,
  StudentAttendance,
} from '../Attendance';
import { Radio, RadioGroup } from '@mantine/core';
import type { Column } from 'react-table';
import { TableComponent } from '../../../components/Table';

interface AddAttendanceProps {}

export type AttendanceStatus = 'present' | 'absent' | 'excused';

const AddAttendance: FC<AddAttendanceProps> = ({}: AddAttendanceProps) => {
  useSetPageTitle('Add Attendance');
  useSetHeader({
    headerStringValue: 'Create new attendance',
    showSubjectDropdown: false,
  });

  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);

  let { lecture_id } = useParams();
  useSetPageTitle('Create New Attendance');

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

  const data = useMemo(() => students, [students]);

  const columns = useMemo(
    () =>
      [
        { Header: 'LRN', accessor: 'LRN' },
        {
          Header: 'STUDENT',
          accessor: 'fullname',
        },
        {
          Header: 'ATTENDANCE STATUS',
          accessor: 'status',
          Cell: row => {
            return (
              <RadioGroup
                required
                defaultValue={row.row.original.status}
                color={'teal'}
                onChange={(value: Status) => {
                  setStudents(old => {
                    return old?.map(st => {
                      if (st.LRN === row.row.original.LRN) st.status = value;

                      return st;
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

  const saveAttendance = async () => {
    await axios.post('subject/PreCal/attendance', {
      attendance: students?.map(s => {
        return {
          LRN: s.LRN,
          status: s.status,
        };
      }),
      lecture_id: lecture_id,
    });

    navigate('/t/lectures');
  };

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/students`).then(({ data }) => {
      // Set table data
      setStudents(
        data.data.map((st: any) => {
          return {
            ...st,
            LRN: st.user_id,
            fullname: `${st.last_name}, ${st.middle_name} ${st.first_name[0]}.`,
            attendance: 'absent',
          };
        }),
      );
      console.log(data.data);
    });
  }, []);

  return (
    <div>
      <TableComponent
        columns={columns}
        data={data}
        saveButton={{
          name: 'Save Attendance',
          action: async () => {
            await saveAttendance();
          },
        }}
      />
    </div>
  );
};

export default AddAttendance;
