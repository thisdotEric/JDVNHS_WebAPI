import React, { FC, useState, useContext, useEffect } from 'react';
import './Assessments.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { axios, shortenDate } from '../../utils';
import { SubjectContext } from '../../context';
import { useSetPageTitle } from '../../hooks';
import type { Assessment, LearningComponent } from './types';
import { AddAssessment } from './AddAssessment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

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
    (Assessment & { assessment_id: number })[]
  >([
    {
      assessment_id: 1,
      component: 'QA',
      date: '2022-02-02',
      items: 100,
      subject_id: 'PreCal',
      grading_period: 1,
    },
  ]);

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
      field: 'items',
      headerName: 'Total Items',
    },
    {
      field: 'grading_period',
      headerName: 'Grading Period',
    },
    {
      field: 'component',
      headerName: 'Component Type',
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
        setAssessmentWithScores(data.data.map((a: any) => a.assessment_id));
      });

    if (createNewAssessment) setCreateNewAssessment(!createNewAssessment);
  }, [selectedSubject, refetchAssessments]);

  return (
    <div className="assessments">
      <button
        onClick={() => {
          setCreateNewAssessment(!createNewAssessment);
          console.log(assessmentWithScores);
        }}
      >
        {!createNewAssessment ? 'Create New Assessment' : 'Cancel'}
      </button>

      {createNewAssessment && (
        <AddAssessment refetchAssessment={setRefectchAssessments} />
      )}

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

      {/* <div className="assessment-list">
        {assessments &&
          assessments.map(({ assessment_id, component, items, date }) => {
            return (
              <div key={assessment_id}>
                <table>
                  <tbody>
                    <tr>
                      <td>Date: {date}</td>
                      <td>Total Items: {items}</td>
                      <td>{toLongLearningComponentName(component)}</td>
                      <td>
                        {assessmentWithScores?.includes(assessment_id) ? (
                          <button
                            onClick={() => {
                              navigate(
                                `/t/assessments/scores/${assessment_id}`,
                              );
                            }}
                          >
                            View/Update Scores
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              navigate(
                                `/t/assessments/scores/new/${assessment_id}`,
                              );
                            }}
                          >
                            Add Scores
                          </button>
                        )}{' '}
                        <button
                          onClick={async () => {
                            await axios.delete(
                              `subject/${selectedSubject}/assessment/${assessment_id}`,
                            );

                            setRefectchAssessments(Math.random());
                          }}
                        >
                          Delete Assessment
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </div> */}
    </div>
  );
};

export default Assessments;
