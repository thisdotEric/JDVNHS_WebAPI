import React, { FC, useState, useContext, useEffect } from 'react';
import './Assessments.scss';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../utils';
import { SubjectContext } from '../../context';
import { useSetPageTitle } from '../../hooks';
import type { Assessment, LearningComponent } from './types';
import { AddAssessment } from './AddAssessment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AssessmentActions from './AssessmentsActions/AssessmentActions';
import { Button } from '../../components/Button';

interface AssessmentsProps {}

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
  const [createNewAssessment, setCreateNewAssessment] =
    useState<boolean>(false);
  const [refetchAssessments, setRefectchAssessments] = useState<number>();
  const [assessmentWithScores, setAssessmentWithScores] = useState<number[]>();

  const [assessments, setAssessments] = useState<
    (Assessment & { assessment_id: number; withScores: boolean })[]
  >([]);

  const [assessmentCols] = useState([
    {
      field: 'assessment_id',
      headerName: 'Assessment ID',
      hide: true,
    },
    {
      field: 'subject_id',
      headerName: 'Subject ID',
      hide: true,
    },
    {
      field: 'date',
      headerName: 'Date',
    },
    {
      field: 'component',
      headerName: 'Component Type',
      cellRendererFramework: (props: any) => (
        <span>{toLongLearningComponentName(props.node.data.component)}</span>
      ),
    },
    {
      field: 'items',
      headerName: 'Total Items',
    },
    {
      field: 'grading_period',
      headerName: 'Grading Period',
    },
    {
      field: 'withScores',
      headerName: 'With Scores',
      hide: true,
    },
    {
      headerName: 'Action',
      cellRendererFramework: (params: any) => (
        <>
          <AssessmentActions
            viewScores={params.node.data.withScores}
            assessment_id={params.node.data.assessment_id}
            refetchAssessments={setRefectchAssessments}
          />
        </>
      ),
    },
  ]);

  const navigate = useNavigate();

  const selectedSubject = useContext(SubjectContext);

  useSetPageTitle('Assessments');

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(data.data);
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
        <Button
          onClick={() => {
            setCreateNewAssessment(!createNewAssessment);
            console.log(assessmentWithScores);
          }}
          buttontype={!createNewAssessment ? 'select' : 'cancel'}
          value={!createNewAssessment ? 'Create New Assessment' : 'Cancel'}
        />

        {createNewAssessment && (
          <AddAssessment refetchAssessment={setRefectchAssessments} />
        )}
      </div>

      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          rowData={assessments}
          pagination={true}
          columnDefs={assessmentCols}
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

export default Assessments;
