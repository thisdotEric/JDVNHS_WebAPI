import React, {
  FC,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import './Assessments.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axios } from '../../utils';
import { SubjectContext } from '../../context';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import type { LearningComponent } from './types';
import { AddAssessment } from './AddAssessment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import AssessmentActions from './AssessmentsActions/AssessmentActions';
import { TableComponent } from '../../components/Table';
import type { Column } from 'react-table';
import { Button } from '@mantine/core';
import dateformat from 'dateformat';
import moment from 'moment';

interface AssessmentsProps {}

interface AssessmentTable {
  date: string;
  component: LearningComponent;
  assessment_type: 'summative' | 'formative';
  items: number;
  grading_period: number;
  lecture_id: number;
}

export interface Assessment {
  date: string;
  subject_id: string;
  items: number;
  component: LearningComponent;
  grading_period: 1 | 2 | 3 | 4;
}

const Assessments: FC<AssessmentsProps> = ({}: AssessmentsProps) => {
  useSetPageTitle('Assessments');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: `Math 7, 1st grading list of all assessments`,
  });

  const [assessments, setAssessments] = useState<
    (AssessmentTable & { assessment_id: number; withScores: boolean })[]
  >([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const selectedSubject = useContext(SubjectContext);

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
          Header: 'ASSESSMENT TYPE',
          accessor: 'assessment_type',
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
            const withScores = row.row.original.withScores;

            return (
              <p
                id="scores-action-btn"
                onClick={() => {
                  navigate(
                    `/t/assessments/scores/${withScores ? '' : 'new/'}${
                      row.value
                    }`,
                    {
                      // Pass the total assessment items
                      // to lectures component
                      state: {
                        items: row.row.original.items,
                        grading_period: row.row.original.grading_period,
                      },
                    },
                  );
                }}
              >
                {withScores ? 'Update ' : 'Add '} Scores
              </p>
            );
          },
        },
      ] as Column<AssessmentTable>[],
    [],
  );

  const fetchAllAssessments = async () => {
    // Fetch all assessments
    const { data } = await axios.get(
      `subject/${selectedSubject}/assessments/all`,
    );

    console.log('ID: ', id);

    if (id)
      setAssessments(
        data.data.filter((e: any) => e.lecture_id == parseInt(id)),
      );
    else
      setAssessments(
        data.data.map((a: any) => {
          return { ...a, date: moment(a.date).format('L') };
        }),
      );

    const { data: validWithAssessments } = await axios.get(
      `subject/${selectedSubject}/assessments/scores/valid`,
    );
    const valid = validWithAssessments.data.map((a: any) => a.assessment_id);

    setAssessments(old => {
      return old.map(o => {
        o.withScores = valid.includes(o.assessment_id);
        return o;
      });
    });
  };

  useEffect(() => {
    fetchAllAssessments();
  }, []);

  useEffect(() => {
    fetchAllAssessments();
  }, [id]);

  return (
    <div className="assessments">
      <TableComponent
        columns={columns}
        data={data}
        globalFilterPlaceholder="Search Assessment"
      />
    </div>
  );
};

export default Assessments;
