import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import './Lectures.scss';
import { axios } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { SubjectContext } from '../../context';
import { shortenDate } from '../../utils';
// import { Button } from '../../components/Button';
import { TableComponent } from '../../components/Table';
import type { Column } from 'react-table';
import moment from 'moment';
import { Modal, Button, Group } from '@mantine/core';
import { CreateAssessment } from '../Assessments/CreateAssessment';

interface LecturesProps {}

interface Lectures {
  lecture_id: number;
  lecture_date: Date;
  subject_id: string;
  grading_period: number;
}

interface LectureSession {
  lecture_id: number;
  learning_competency: string;
  lecture_date: Date;
  grading_period: number;
  subject: string;
  code: string;
}

export interface Assessment {
  date: string;
  subject_id: string;
  items: number;
  component: 'WW' | 'PT' | 'QA';
  grading_period: 1 | 2 | 3 | 4;
  assessment_type: 'summative' | 'formative';
  code: string;
}

const Lectures: FC<LecturesProps> = ({}: LecturesProps) => {
  useSetPageTitle('Lectures');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: 'List of all lecture dates',
  });

  const [lectures, setLectures] = useState<LectureSession[]>([]);
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);
  const [validAttendance, setValidAttendance] = useState<number[]>();
  const [opened, setOpened] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<LectureSession>({
    code: '',
    grading_period: 1,
    learning_competency: '',
    lecture_date: new Date(),
    lecture_id: 1,
    subject: '',
  });

  const data = useMemo<LectureSession[]>(() => lectures, [lectures]);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'SESSION DATE',
          accessor: 'lecture_date',
          Cell: row => <p>{moment(row.value).format('L')}</p>,
        },
        {
          Header: 'CODE',
          accessor: 'code',
        },
        {
          Header: 'LEARNING COMPETENCY',
          accessor: 'learning_competency',
        },
        {
          Header: 'ACTIONS',
          accessor: 'lecture_id',
          Cell: row => (
            <div id="lecture-actions-group">
              <div className="left">
                <p>
                  <Link
                    className="lectures-link"
                    to={`/t/assessments/${row.value}`}
                  >
                    View
                  </Link>
                  <span> / </span>
                  <button
                    id="open-modal-btn"
                    className="lectures-link"
                    onClick={() => {
                      setCurrentLecture(row.row.original);
                      setOpened(true);
                    }}
                  >
                    Create
                  </button>{' '}
                  Assessment
                </p>
                <p id="lectures-action-btn "></p>
                {validAttendance?.includes(row.value) ? (
                  <Link
                    to={`/t/lectures/attendance/${row.value}`}
                    className="lectures-link"
                  >
                    View Attendance
                  </Link>
                ) : (
                  <Link
                    to={`/t/lectures/attendance/${row.value}`}
                    className="lectures-link"
                  >
                    Create Attendance
                  </Link>
                )}
              </div>
              <div className="right">
                <a
                  href="https://drive.google.com/drive/folders/1HD79Ypi9AMOpOKxYp8g83vEpkCs1DIb4?usp=sharing"
                  target={'_blank'}
                  className="lectures-link"
                >
                  View Learning Materials
                </a>
              </div>
            </div>
          ),
        },
      ] as Column<LectureSession>[],
    [],
  );

  useEffect(() => {
    axios
      .get(`subject/${selectedSubject}/lectures`)
      .then(({ data: lectures }) => {
        axios
          .get(`subject/${selectedSubject}/attendance/valid`)
          .then(({ data }) => {
            setValidAttendance(data.data.map((n: any) => n.lecture_id));
            setLectures(lectures.data);
            console.log(data.data);
          });
      });
  }, [selectedSubject]);

  useEffect(() => {
    axios
      .get(`subject/${selectedSubject}/lectures`)
      .then(({ data: lectures }) => {
        setLectures(lectures.data);
        console.log(lectures.data);
      });
  }, []);

  return (
    <div id="lectures">
      <Button>Create new Session</Button>
      <TableComponent
        columns={columns}
        data={data}
        globalFilterPlaceholder="Search lecture session"
        pageSize={9}
      />

      <Modal
        opened={opened}
        styles={{
          title: { fontWeight: 'bold', fontSize: 16 },
        }}
        closeOnEscape={false}
        onClose={() => setOpened(false)}
        title="Create New Assessment"
      >
        <CreateAssessment
          lecture_id={currentLecture!.lecture_id}
          date={currentLecture!.lecture_date}
          grading_period={currentLecture!.grading_period}
          subject_id={selectedSubject}
          close={() => setOpened(false)}
        />
      </Modal>
    </div>
  );
};

export default Lectures;
