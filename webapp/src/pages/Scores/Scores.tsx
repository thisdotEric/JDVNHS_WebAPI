import React, { FC, useContext, useEffect, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';
import { SubjectContext } from '../../../src/context';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useParams } from 'react-router-dom';

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

interface UpdatedScore {
  score_id: number;
  score: number;
}

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  const [classScores, setScores] = useState<Scores[]>([]);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(true);

  const [scoreColumns] = useState([
    {
      field: 'LRN',
      headerName: 'LRN',
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
    },
    {
      field: 'first_name',
      headerName: 'First Name',
    },
    {
      field: 'middle_name',
      headerName: 'Middle Name',
    },
    {
      field: 'score_id',
      headerName: 'Score ID',
      hide: true,
    },
    {
      field: 'score',
      headerName: 'Score',
      editable: true,
      onCellValueChanged: (grid: any) => {
        setDisableSaveButton(false);

        const row = grid.node.data;

        setScores(oldScores => {
          return oldScores.map(studentScore => {
            if (studentScore.LRN === row.LRN)
              studentScore.score = parseInt(row.score, 10);

            return studentScore;
          });
        });
      },
    },
    {
      field: 'score_id',
      headerName: 'Score_id',
      hide: true,
    },
  ]);

  const selectedSubject = useContext(SubjectContext);

  const { id } = useParams();

  const fetchAssessmentScores = async (assessment_id: string) => {
    const res = await axios.get(
      `subject/${selectedSubject}/scores/${assessment_id}`,
    );

    setScores(res.data.data);
  };

  useEffect(() => {
    if (id != undefined) fetchAssessmentScores(id);
  }, [selectedSubject]);

  return (
    <div className="scores">
      <button
        disabled={disableSaveButton}
        onClick={async () => {
          await axios.patch(`subject/${selectedSubject}/assessments/scores`, {
            scores: classScores.map(({ score, score_id }) => {
              return { score, score_id };
            }),
          });
        }}
      >
        Save Updated Scores
      </button>

      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          rowData={classScores}
          pagination={true}
          columnDefs={scoreColumns}
          rowSelection={'single'}
          enableCellChangeFlash={true}
          defaultColDef={{
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Scores;
