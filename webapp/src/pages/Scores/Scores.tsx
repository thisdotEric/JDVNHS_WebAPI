import React, { FC, useContext, useEffect, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';
import { SubjectContext } from '../../../src/context';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useParams } from 'react-router-dom';

interface ScoresProps {}

interface ClassScores {
  subject_id: string;
  assessment_id: number;
  grading_period: 1 | 2 | 3 | 4;
  total_items: number;
  scores: Scores[];
}

interface Scores {
  LRN: string;
  score: number;
  grading_period: 1 | 2 | 3 | 4;
}

interface UpdatedScore {
  score_id: number;
  score: number;
}

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  const [classScores, setScores] = useState<Scores[]>();
  const [updatedScores, setUpdatedScores] = useState<UpdatedScore[]>([]);

  const [scoreColumns] = useState([
    {
      field: 'LRN',
      headerName: 'LRN',
    },
    {
      field: 'score',
      headerName: 'Score',
      editable: true,
      onCellValueChanged: (grid: any) => {
        console.log(grid.node.data);

        const row = grid.node.data;

        setUpdatedScores(old => {
          let needsUpdate = false;
          let currentIndex: number = 0;

          old.forEach((s, index) => {
            if (s.score_id === row.score_id) {
              needsUpdate = true;
              currentIndex = index;
              return;
            }
          });

          if (needsUpdate) {
            old.splice(currentIndex, 1);
          }

          return [
            ...old,
            {
              score_id: row.score_id,
              score: row.score,
            },
          ];
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
        onClick={async () => {
          console.table(updatedScores);

          await axios.patch(`subject/${selectedSubject}/assessments/scores`, {
            scores: updatedScores,
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
