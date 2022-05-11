import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';
import { SubjectContext } from '../../../src/context';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useParams } from 'react-router-dom';
import { useSetPageTitle, useSetHeader } from '../../hooks';
// import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import type { Column } from 'react-table';
import { TableComponent } from '../../components/Table';
import { NumberInput, Button } from '@mantine/core';
import { Refresh } from 'tabler-icons-react';

interface ScoresProps {}

interface Scores {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  score_id: number;
  score: number;
  grading_period: 1 | 2 | 3 | 4;
}

interface AssessmentScore {
  score_id: number;
  LRN: string;
  fullname: string;
  score: number;
  grading_period: 1 | 2 | 3 | 4;
}

interface UpdatedScore {
  score_id: number;
  score: number;
}

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  useSetPageTitle('Scores');
  useSetHeader({
    showSubjectDropdown: false,
    headerStringValue: 'View/Update scores',
  });

  const [scores, setStudentScores] = useState<Scores[]>([]);

  const scoreColumns2 = useMemo(
    () =>
      [
        { Header: 'LRN', accessor: 'LRN' },
        { Header: 'STUDENT', accessor: 'fullname' },
        {
          Header: 'SCORE',
          accessor: 'score_id',
          Cell: row => {
            const [studentScore, setStudentScore] = useState<number>(0);

            useEffect(() => {
              row.data.forEach((r: any) => {
                if (r.score_id === row.value) setStudentScore(r.score);
              });
              console.log(id);
            }, []);

            return (
              <div className="scores-actions">
                <NumberInput
                  id="score-input"
                  value={studentScore}
                  size="md"
                  min={0}
                  onChange={e => {
                    setStudentScore(parseInt(`${e}`));
                  }}
                  hideControls
                />
                <Button
                  leftIcon={<Refresh size={20} />}
                  onClick={async () => {
                    await axios.patch(
                      `subject/${selectedSubject}/assessments/score`,
                      {
                        score: {
                          score: studentScore,
                          score_id: row.value,
                        },
                      },
                    );
                  }}
                  size="xs"
                >
                  Update Score
                </Button>
              </div>
            );
          },
        },
      ] as Column<AssessmentScore>[],
    [],
  );

  const data = useMemo(() => scores, [scores]);

  const selectedSubject = useContext(SubjectContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchAssessmentScores = async (assessment_id: string) => {
    const res = await axios.get(
      `subject/${selectedSubject}/scores/${assessment_id}`,
    );

    setStudentScores(
      res.data.data.map((s: any) => {
        return {
          score_id: s.score_id,
          LRN: s.LRN,
          fullname: `${s.last_name}, ${s.first_name} ${s.middle_name[0]} `,
          score: s.score,
        };
      }),
    );
  };

  useEffect(() => {
    if (id != undefined) fetchAssessmentScores(id);
  }, [selectedSubject]);

  useEffect(() => {
    if (id != undefined) fetchAssessmentScores(id);
  }, []);

  return (
    <div className="scores">
      <TableComponent columns={scoreColumns2} data={data} />
    </div>
  );
};

export default Scores;
