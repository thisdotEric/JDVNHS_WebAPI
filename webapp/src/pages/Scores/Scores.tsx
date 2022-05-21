import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';
import { SubjectContext } from '../../../src/context';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useLocation, useParams } from 'react-router-dom';
import { useSetPageTitle, useSetHeader } from '../../hooks';
// import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import type { Column } from 'react-table';
import { TableComponent } from '../../components/Table';
import { NumberInput, Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../../components/Notifications';
import { DeviceFloppy } from 'tabler-icons-react';

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

interface CurrentStudentScore {
  name: string;
  score: number;
  score_id: number;
}

interface InputError {
  error: string;
  disableButton: boolean;
}

const noError: InputError = {
  error: '',
  disableButton: false,
};

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  useSetPageTitle('Scores');
  useSetHeader({
    showSubjectDropdown: false,
    headerStringValue: 'View/Update scores',
  });

  const [scores, setStudentScores] = useState<Scores[]>([]);
  const [opened, setOpened] = useState(false);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [error, setError] = useState<InputError>(noError);

  const [currentScore, setCurrentScore] = useState<CurrentStudentScore>({
    name: '',
    score: 0,
    score_id: 0,
  });

  const scoreColumns2 = useMemo(
    () =>
      [
        { Header: 'LRN', accessor: 'LRN' },
        {
          Header: 'STUDENT',
          accessor: 'fullname',
        },
        {
          Header: 'SCORE',
          accessor: 'score',
          Cell: row => <p style={{ fontWeight: 'bold' }}>{row.value}</p>,
        },
        {
          Header: 'ACTION',
          accessor: 'score_id',
          Cell: row => (
            <button
              id="update-button"
              onClick={() => {
                setCurrentScore({
                  name: row.row.original.fullname.split(' ')[1],
                  score: row.row.original.score,
                  score_id: row.value,
                });
                setOpened(true);
              }}
            >
              Update
            </button>
          ),
        },
      ] as Column<AssessmentScore>[],
    [],
  );

  const data = useMemo(() => scores, [scores]);

  const selectedSubject = useContext(SubjectContext);
  const navigate = useNavigate();
  const location = useLocation();

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
          fullname: `${s.last_name}, ${s.first_name} ${s.middle_name[0]}. `,
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

    setMaxScore((location.state as any).items);
  }, []);

  return (
    <div className="scores">
      <TableComponent columns={scoreColumns2} data={data} />

      <Modal
        opened={opened}
        classNames={{
          body: 'update-modal',
        }}
        closeOnEscape={false}
        onClose={() => setOpened(false)}
        title={`Update ${currentScore.name}'s score`}
      >
        <NumberInput
          id="score-input"
          value={currentScore?.score}
          size="md"
          min={0}
          error={error.error}
          max={maxScore}
          onChange={e => {
            if (e! > maxScore)
              setError({
                error: `Max score of ${maxScore} exceeded.`,
                disableButton: true,
              });
            else {
              setError(noError);

              setCurrentScore({ ...currentScore, score: e ? e : 0 });
            }
          }}
          hideControls
        />

        <Button
          id="submit-btn"
          type="submit"
          leftIcon={<DeviceFloppy size={20} />}
          color={'teal'}
          disabled={error.disableButton}
          onClick={async () => {
            await axios.patch(`subject/${selectedSubject}/assessments/score`, {
              score: {
                score: currentScore.score,
                score_id: currentScore.score_id,
              },
            });

            // Update the table with new scores
            if (id != undefined) fetchAssessmentScores(id);

            setOpened(false);
            showNotification(getNotificationProps('Score updated', 'success'));
          }}
        >
          Update
        </Button>
      </Modal>
    </div>
  );
};

export default Scores;
