import React, { FC, useContext, useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import './AddAttendance.scss';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import AttendanceActionColumn from './AttendanceActionColumn';

interface AddAttendanceProps {}

export type AttendanceStatus = 'present' | 'absent' | 'excused';

export interface AttendanceAction {
  type: AttendanceStatus;
  payload: string;
}

interface Attendance {
  LRN: string;
  status: AttendanceStatus;
}

const AddAttendance: FC<AddAttendanceProps> = ({}: AddAttendanceProps) => {
  const [students, setStudents] = useState<any[]>();
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  let { lecture_id } = useParams();
  useSetPageTitle('Create New Attendance');

  useEffect(() => {
    axios.get('subject/PreCal/students').then(({ data }) => {
      // Set table data
      setStudents(data.data);

      // Setup the initial attendance
      const a = data.data.map((s: any) => {
        return {
          LRN: s.user_id,
          status: 'present',
        };
      });

      setAttendance(a);
    });
  }, []);

  const updateAttendance = (status: AttendanceStatus, LRN: string) => {
    setAttendance(
      attendance.map(at => {
        if (at.LRN === LRN) at.status = status;
        return at;
      }),
    );
  };

  return (
    <div>
      <button
        onClick={async () => {
          console.log(attendance);

          await axios.post('subject/PreCal/attendance', {
            attendance,
            lecture_id: lecture_id,
          });
        }}
      >
        Save Attendance
      </button>

      <div className="add-attendance">
        <table>
          <thead>
            <tr>
              <th>LRN</th>
              <th>Student Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => {
                return (
                  <tr>
                    <td>{student.user_id}</td>
                    <td>
                      {student.first_name} {student.middle_name}{' '}
                      {student.last_name}{' '}
                    </td>
                    <td>
                      <AttendanceActionColumn
                        index={index}
                        dispatch={updateAttendance}
                        LRN={student.user_id}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAttendance;
