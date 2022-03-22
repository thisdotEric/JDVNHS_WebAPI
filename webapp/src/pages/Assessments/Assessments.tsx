import React, { FC, useState, useContext, useEffect } from 'react';
import './Assessments.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { axios, shortenDate } from '../../utils';
import { SubjectContext } from '../../context';
import { useSetPageTitle } from '../../hooks';
import type { Assessment, LearningComponent } from './types';
import { AddAssessment } from './AddAssessment';

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
  const [assessments, setAssessments] =
    useState<(Assessment & { assessment_id: number })[]>();
  const [createNewAssessment, setCreateNewAssessment] =
    useState<boolean>(false);
  const [refetchAssessments, setRefectchAssessments] = useState<number>();

  const navigate = useNavigate();

  const selectedSubject = useContext(SubjectContext);

  useSetPageTitle('Assessments');

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(data.data);
      console.table(data.data);
    });

    setCreateNewAssessment(!createNewAssessment);
  }, [selectedSubject, refetchAssessments]);

  return (
    <div className="assessments">
      <button
        onClick={() => {
          setCreateNewAssessment(!createNewAssessment);
        }}
      >
        {!createNewAssessment ? 'Create New Assessment' : 'Cancel'}
      </button>

      {createNewAssessment && (
        <AddAssessment refetchAssessment={setRefectchAssessments} />
      )}

      <div className="assessment-list">
        {assessments &&
          assessments.map(({ assessment_id, component, items, date }) => {
            return (
              <div key={assessment_id}>
                <table>
                  <tbody>
                    <tr>
                      <td>Date: {date}</td>
                      <td>Total Items: {items}</td>
                      <td>
                        Component Type: {toLongLearningComponentName(component)}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            navigate(`/t/assessments/scores/${assessment_id}`);
                          }}
                        >
                          View/Update Scores
                        </button>{' '}
                        <button
                          onClick={() => {
                            console.log('Deleted');
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
      </div>
    </div>
  );
};

export default Assessments;
