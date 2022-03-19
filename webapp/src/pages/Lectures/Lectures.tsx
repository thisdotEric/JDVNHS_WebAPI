import React, { FC, useState, useEffect } from 'react';
import './Lectures.scss';
import { axios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import useSetPageTitle from '../../hooks/useSetPageTitle';

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

  useSetPageTitle('Lectures');

  useEffect(() => {
    axios.get('subject/PreCal/lectures').then(({ data }) => {
      setLectures(data.data);
    });
  }, []);

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
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Lectures;
