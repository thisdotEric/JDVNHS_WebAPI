import React, { FC, useContext, useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import './AddAttendance.scss';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import useSetPageTitle from '../../../hooks/useSetPageTitle';

interface AddAttendanceProps {}

type AttendanceStatus = 'present' | 'absent' | 'excused';

interface AttendanceAction {
  type: AttendanceStatus;
  payload: string;
}

interface AttendanceState {
  attendance: Attendance[];
}

interface Attendance {
  lecture_id: number;
  LRN: string;
  status: AttendanceStatus;
}

interface AttendanceActionProps {
  index: number;
  dispatch: React.Dispatch<AttendanceAction>;
  LRN: string;
}

const AttendanceAction: FC<AttendanceActionProps> = ({
  index,
  dispatch,
  LRN,
}: AttendanceActionProps) => {
  return (
    <div>
      <input
        onClick={() => {
          dispatch({
            type: 'present',
            payload: LRN,
          });
        }}
        type="radio"
        name={`attendance${index}`}
        id="present"
      />
      <label htmlFor="absent">Present</label>{' '}
      <input type="radio" name={`attendance${index}`} id="absent" />
      <label htmlFor="absent">Absent</label>{' '}
      <input type="radio" name={`attendance${index}`} id="excused" />
      <label htmlFor="excused">Excused</label>
    </div>
  );
};

function attendanceReducer(state: AttendanceState, action: AttendanceAction) {
  switch (action.type) {
    case 'present':
      console.log(action.payload);
      return { ...state };
  }

  return state;
}

const AddAttendance: FC<AddAttendanceProps> = ({}: AddAttendanceProps) => {
  const [students, setStudents] = useState<any[]>();
  const [newAttendance, dispatch] = useReducer(attendanceReducer, {
    attendance: [],
  });

  const selectedSubject = useContext(SubjectContext);

  let params = useParams();
  useSetPageTitle('John Eric Mendoza Siguenza');

  useEffect(() => {
    axios.get('subject/PreCal/students').then(({ data }) => {
      setStudents(data.data);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          console.log(newAttendance);
        }}
      >
        Save Attendance
      </button>

      <div className="add-attendance">
        <table>
          <thead>
            <th>LRN</th>
            <th>Full Name</th>
            <th>Attendance</th>
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
                      <AttendanceAction
                        index={index}
                        dispatch={dispatch}
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
