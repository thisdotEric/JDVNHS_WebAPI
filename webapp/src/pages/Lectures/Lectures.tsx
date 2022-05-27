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
import { CreateLectureModal } from './CreateLectureModal';

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
  withAttendance: boolean;
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
  const selectedSubject = useContext(SubjectContext);
  const [opened, setOpened] = useState(false);
  const [openLectureModal, setOpenLectureModal] = useState(false);
  const [createQA, setCreateQA] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<LectureSession>({
    code: '',
    grading_period: 1,
    learning_competency: '',
    lecture_date: new Date(),
    lecture_id: 1,
    subject: '',
    withAttendance: false,
  });
  const [refetchLectures, setRefetchLectures] = useState(false);

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
                      setCreateQA(false);
                      setOpened(true);
                    }}
                  >
                    Create
                  </button>{' '}
                  Assessment
                </p>
                <p id="lectures-action-btn "></p>
                {row.row.original.withAttendance ? (
                  <Link
                    to={`/t/lectures/attendance/${row.value}`}
                    className="lectures-link"
                  >
                    View/Update Attendance
                  </Link>
                ) : (
                  <Link
                    to={`/t/lectures/attendance/new/${row.value}`}
                    className="lectures-link"
                  >
                    Add Attendance
                  </Link>
                )}
              </div>
              <div className="right">
                <Link
                  to={`/t/competencies/learning-materials/${row.row.original.code}`}
                >
                  View Learning Materials
                </Link>
              </div>
            </div>
          ),
        },
      ] as Column<LectureSession>[],
    [],
  );

  const fetchLectures = async () => {
    const { data: lectures } = await axios.get(
      `subject/${selectedSubject}/lectures`,
    );
    setLectures(
      lectures.data.map((l: any) => ({ ...l, withAttendance: false })),
    );

    const { data: withAttendance } = await axios.get(
      `subject/${selectedSubject}/attendance/valid`,
    );

    const lecturesWithAttendance = withAttendance.data.map(
      (n: any) => n.lecture_id,
    );

    setLectures(old => {
      return old.map(l => {
        if (lecturesWithAttendance.includes(l.lecture_id))
          l.withAttendance = true;
        return l;
      });
    });
  };

  useEffect(() => {
    fetchLectures();
  }, [selectedSubject]);

  useEffect(() => {
    setTimeout(() => {
      fetchLectures();
    }, 1000);
  }, [refetchLectures]);

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div id="lectures">
      <TableComponent
        columns={columns}
        data={data}
        globalFilterPlaceholder="Search lecture session"
        pageSize={9}
        actions={[
          {
            name: 'Add new lecture session',
            action: async () => {
              setOpenLectureModal(true);
              console.log('dsf');
            },
          },
          {
            name: 'Add quarterly assessment (QA)',
            action: async () => {
              setCreateQA(true);
              setOpened(true);
              console.log('dsf');
            },
          },
        ]}
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
          isQuarterlyAssessment={createQA}
          lecture_id={currentLecture!.lecture_id}
          date={currentLecture!.lecture_date}
          grading_period={currentLecture!.grading_period}
          subject_id={selectedSubject}
          close={() => setOpened(false)}
        />
      </Modal>

      <Modal
        opened={openLectureModal}
        styles={{
          title: { fontWeight: 'bold', fontSize: 16 },
          modal: { width: 700 },
        }}
        closeOnEscape={false}
        onClose={() => setOpenLectureModal(false)}
        title="Create New Assessment"
      >
        <CreateLectureModal
          subject_id="Math7"
          grading_period={1}
          refetchLectures={setRefetchLectures}
          close={() => setOpenLectureModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Lectures;
