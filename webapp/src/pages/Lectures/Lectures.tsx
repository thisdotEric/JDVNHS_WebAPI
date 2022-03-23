import React, { FC, useState, useEffect, useContext } from 'react';
import './Lectures.scss';
import { axios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useSetPageTitle } from '../../hooks';
import { SubjectContext } from '../../context';
import AttendanceAction from '../Attendance/AttendanceAction';
import { shortenDate } from '../../utils';

interface LecturesProps {}

interface Lectures {
  lecture_id: number;
  lecture_date: Date;
  subject_id: string;
  grading_period: number;
}

interface AttendanceButtonProps {
  onClick: () => void;
  value: string;
}

const AttendanceButton: FC<AttendanceButtonProps> = ({
  onClick,
  value,
}: AttendanceButtonProps) => {
  return <button onClick={onClick}>{value}</button>;
};

const Lectures: FC<LecturesProps> = ({}: LecturesProps) => {
  const [lectures, setLectures] = useState<Lectures[]>();
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);
  const [validAttendance, setValidAttendance] = useState<number[]>();

  useSetPageTitle('Lectures');

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/lectures`).then(({ data }) => {
      setLectures(data.data);

      // console.table(data.data);

      axios.get(`subject/PreCal/attendance/valid`).then(({ data }) => {
        setValidAttendance(data.data.map((n: any) => n.lecture_id));
      });
    });
  }, [selectedSubject]);

  return (
    <div id="lectures">
      {lectures &&
        lectures.map(({ lecture_date, lecture_id }) => {
          return (
            <div className="lecture-list">
              <p>{shortenDate(lecture_date)}</p>

              <div className="actions">
                {validAttendance?.includes(lecture_id) ? (
                  <button
                    onClick={() => {
                      navigate(`/t/attendance/${lecture_id}`);
                    }}
                  >
                    View/Update Attendance
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/t/attendance/new/${lecture_id}`);
                    }}
                  >
                    Create New Attendance
                  </button>
                )}

                <button
                  onClick={() => {
                    navigate(`/t/assessments`);
                  }}
                >
                  View Assessments
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Lectures;
