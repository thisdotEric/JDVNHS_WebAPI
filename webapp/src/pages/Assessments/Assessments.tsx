import React, { FC, useState, useContext, useEffect, useMemo } from 'react';
import './Assessments.scss';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../utils';
import { SubjectContext } from '../../context';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import type { Assessment, LearningComponent } from './types';
import { AddAssessment } from './AddAssessment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import AssessmentActions from './AssessmentsActions/AssessmentActions';
import { TableComponent } from '../../components/Table';
import type { Column } from 'react-table';
import { Button } from '@mantine/core';
import dateformat from 'dateformat';

interface AssessmentsProps {}

interface AssessmentTable {
  LRN: string;
  date: string;
  component: string;
  items: number;
  grading_period: number;
}

function toLongLearningComponentName(
  learningComponent: LearningComponent,
): string {
  switch (learningComponent) {
    case 'PT':
      return 'Performance Task (PT)';
    case 'QA':
      return 'Quarterly Assessment (QA)';
    case 'WW':
      return 'Written Work (WW)';
    default:
      return '';
  }
}

const Assessments: FC<AssessmentsProps> = ({}: AssessmentsProps) => {
  useSetPageTitle('Assessments');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: `List of all assessments`,
  });

  const [createNewAssessment, setCreateNewAssessment] =
    useState<boolean>(false);
  const [refetchAssessments, setRefectchAssessments] = useState<number>();
  const [assessmentWithScores, setAssessmentWithScores] = useState<number[]>();

  const [assessments, setAssessments] = useState<
    (Assessment & { assessment_id: number; withScores: boolean })[]
  >([]);

  const data = useMemo(() => assessments, [assessments, setAssessments]);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'DATE',
          accessor: 'date',
        },
        {
          Header: 'COMPONENT TYPE',
          accessor: 'component',
        },
        {
          Header: 'ITEMS',
          accessor: 'items',
        },
        {
          Header: 'GRADING PERIOD',
          accessor: 'grading_period',
        },
        {
          Header: 'ACTIONS',
          accessor: 'assessment_id',
          Cell: (row: any) => {
            return (
              <p
                id="scores-action-btn"
                onClick={() => {
                  navigate(`/t/assessments/scores/${row.value}`);
                }}
              >
                View Scores
              </p>
            );
          },
        },
      ] as Column<AssessmentTable>[],
    [],
  );

  const navigate = useNavigate();

  const selectedSubject = useContext(SubjectContext);

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(
        data.data.map((a: any) => {
          return { ...a, date: dateformat('Jun 9 2007', 'fullDate') };
        }),
      );
      console.table(data.data);
    });

    axios
      .get(`subject/${selectedSubject}/assessments/scores/valid`)
      .then(({ data }) => {
        const valid = data.data.map((a: any) => a.assessment_id);

        setAssessments(old => {
          return old.map(o => {
            o.withScores = valid.includes(o.assessment_id);
            return o;
          });
        });
      });

    if (createNewAssessment) setCreateNewAssessment(!createNewAssessment);
  }, []);

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(
        data.data.map((a: any) => {
          return { ...a, date: dateformat(a.date, ' yyyy mmmm d, dddd') };
        }),
      );
      console.table(data.data);
    });

    axios
      .get(`subject/${selectedSubject}/assessments/scores/valid`)
      .then(({ data }) => {
        const valid = data.data.map((a: any) => a.assessment_id);

        setAssessments(old => {
          return old.map(o => {
            o.withScores = valid.includes(o.assessment_id);
            return o;
          });
        });
      });

    if (createNewAssessment) setCreateNewAssessment(!createNewAssessment);
  }, [selectedSubject, refetchAssessments]);

  return (
    <div className="assessments">
      <div className="create-assessments">
        {/* <Button
          onClick={() => {
            setCreateNewAssessment(!createNewAssessment);
            console.log(assessmentWithScores);
          }}
          buttontype={!createNewAssessment ? 'select' : 'cancel'}
          value={!createNewAssessment ? 'Create New Assessment' : 'Cancel'}
        /> */}

        {createNewAssessment && (
          <AddAssessment refetchAssessment={setRefectchAssessments} />
        )}
      </div>

      <TableComponent
        columns={columns}
        data={data}
        globalFilterPlaceholder="Search Assessment"
      />
    </div>
  );
};

export default Assessments;
