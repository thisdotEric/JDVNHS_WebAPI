import React, { FC, useState, useEffect, useContext } from 'react';
import './Lectures.scss';
import { axios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { SubjectContext } from '../../context';
import { shortenDate } from '../../utils';
import { Button } from '../../components/Button';

interface LecturesProps {}

interface Lectures {
  lecture_id: number;
  lecture_date: Date;
  subject_id: string;
  grading_period: number;
}

const Lectures: FC<LecturesProps> = ({}: LecturesProps) => {
  useSetPageTitle('Lectures');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: 'List of all lecture dates',
  });

  const [lectures, setLectures] = useState<Lectures[]>();
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);
  const [validAttendance, setValidAttendance] = useState<number[]>();

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/lectures`).then(({ data }) => {
      setLectures(data.data);
      axios
        .get(`subject/${selectedSubject}/attendance/valid`)
        .then(({ data }) => {
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
                  <Button
                    value="View/Update Attendance"
                    buttontype="select"
                    onClick={() => {
                      navigate(`/t/attendance/${lecture_id}`);
                    }}
                  />
                ) : (
                  <Button
                    value="Create New Attendance"
                    buttontype="select"
                    onClick={() => {
                      navigate(`/t/attendance/new/${lecture_id}`);
                    }}
                  />
                )}

                <Button
                  value="View Assessments"
                  buttontype="select"
                  onClick={() => {
                    navigate(`/t/assessments`);
                  }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Lectures;
