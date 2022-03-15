import React, { FC, useContext, useEffect, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';
import { SubjectContext } from '../../../src/context';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {} from '../../constants/';

interface ScoresProps {}

interface ClassScores {
  subject_id: string;
  assessment_id: number;
  grading_period: 1 | 2 | 3 | 4;
  total_items: number;
  scores: Scores[];
}

interface Scores {
  score_id: number;
  LRN: string;
  score: number;
}

type LearningComponent = 'WW' | 'PT' | 'QA';

interface Assessments {
  assessment_id: number;
  date: Date;
  subject_id: string;
  items: number;
  component: LearningComponent;
}

const scoresColumns = [
  {
    field: 'LRN',
    headerName: 'LRN',
  },
  {
    field: 'score',
    headerName: 'Score',
  },
  {
    field: 'score_id',
    headerName: 'Score_id',
    hide: true,
  },
];

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

function shortenDate(date: Date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  const [classScores, setScores] = useState<Scores[]>();
  const [assessments, setAssessments] = useState<Assessments[]>();
  const [showTable, setShowTable] = useState<boolean>(false);

  const selectedSubject = useContext(SubjectContext);

  const fetchAssessmentScores = async (assessment_id: number) => {
    const res = await axios.get(
      `subject/${selectedSubject}/scores/${assessment_id}`,
    );

    setScores(res.data.data);
  };

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(data.data);
    });
  }, [selectedSubject]);

  return (
    <div className="scores">
      <div className="scores-accordion">
        {assessments &&
          assessments.map(assessments => {
            return (
              <div key={assessments.assessment_id}>
                <div
                  className="header"
                  onClick={async () => {
                    await fetchAssessmentScores(assessments.assessment_id);
                    setShowTable(!showTable);
                  }}
                >
                  <p>{shortenDate(assessments.date)}</p>
                  <p>Items: {assessments.items}</p>
                  <p>
                    Component Type:{' '}
                    {toLongLearningComponentName(assessments.component)}
                  </p>
                </div>
                {showTable && (
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
                      columnDefs={scoresColumns}
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
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Scores;
