import React, { FC, useState, useEffect, useContext } from 'react';
import './Lectures.scss';
import { axios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import { SubjectContext } from '../../context';

interface LecturesProps {}

interface Lectures {
  lecture_id: number;
  lecture_date: Date;
  subject_id: string;
  grading_period: number;
}

const Lectures: FC<LecturesProps> = ({}: LecturesProps) => {
  const [lectures, setLectures] = useState<Lectures[]>();
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);

  useSetPageTitle('Lectures');

  useEffect(() => {
    console.log(`subject/${selectedSubject}/lectures`);

    axios.get(`subject/${selectedSubject}/lectures`).then(({ data }) => {
      setLectures(data.data);

      console.table(data.data);
    });
  }, [selectedSubject]);

  return (
    <div id="lectures">
      {lectures &&
        lectures.map(({ lecture_date, lecture_id }) => {
          return (
            <div className="lecture-list">
              <p>{lecture_date}</p>

              <div className="actions">
                <button
                  onClick={() => {
                    navigate(`/t/attendance/new/${lecture_id}`);
                  }}
                >
                  Create New Attendance
                </button>{' '}
                <button
                  onClick={() => {
                    navigate(`/t/attendance/${lecture_id}`);
                  }}
                >
                  View/Update Attendance
                </button>
                <button
                  onClick={() => {
                    navigate(`/t/attendance/new/${lecture_id}`);
                  }}
                >
                  View Assessment Scores
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Lectures;
