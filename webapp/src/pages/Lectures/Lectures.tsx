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
  date: Date;
  grading_period?: 1;
  subject?: 1;
  code?: string;
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
  const [opened, setOpened] = useState(false);

  const data = useMemo<LectureSession[]>(
    () => [
      {
        date: new Date(),
        learning_competency:
          'describes well-defined sets, subsets, universal sets, and the null set and cardinality of sets.',
        lecture_id: 1,
        code: 'M7NS-Ib-2',
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date(),
        learning_competency:
          'describes well-defined sets, subsets, universal sets, and the null set and cardinality of sets.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date(),
        learning_competency:
          'describes well-defined sets, subsets, universal sets, and the null set and cardinality of sets.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date(),
        learning_competency:
          'describes well-defined sets, subsets, universal sets, and the null set and cardinality of sets.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
      {
        date: new Date('2021-12-12'),
        learning_competency:
          'uses Venn Diagrams to represent sets, subsets, and set operations.',
        lecture_id: 1,
      },
    ],
    [],
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: 'SESSION DATE',
          accessor: 'date',
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
                  <Link to={'/t/assessments'}>View</Link>
                  <span> / </span>
                  <button id="open-modal-btn" onClick={() => setOpened(true)}>
                    Create
                  </button>{' '}
                  Assessment
                </p>
                <p id="lectures-action-btn "></p>
                <Link to={`/t/lectures/attendance/4`}>View Attendance</Link>
              </div>
              <div className="right">
                <Link to={`/t/lectures/materials/M7NS-Ib-2`}>
                  Learning Materials
                </Link>
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
          });
      });
  }, [selectedSubject]);

  return (
    <div id="lectures">
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
        <CreateAssessment code="john" grading_period={1} subject_id="Math7" />
      </Modal>

      {/* {lectures &&
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
                      navigate(`/t/lectures/attendance/${lecture_id}`);
                    }}
                  />
                ) : (
                  <Button
                    value="Create New Attendance"
                    buttontype="select"
                    onClick={() => {
                      navigate(`/t/lectures/attendance/new/${lecture_id}`);
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
        })} */}
    </div>
  );
};

export default Lectures;
