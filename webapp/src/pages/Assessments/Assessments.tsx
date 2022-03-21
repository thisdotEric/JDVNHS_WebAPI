import React, { FC, useState, useContext, useEffect } from 'react';
import './Assessments.scss';
import { useNavigate } from 'react-router-dom';
import { axios, shortenDate } from '../../utils';
import { SubjectContext } from '../../context';
import { useSetPageTitle } from '../../hooks';

interface AssessmentsProps {}

type LearningComponent = 'WW' | 'PT' | 'QA';

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

interface Assessments {
  assessment_id: number;
  date: Date;
  subject_id: string;
  items: number;
  component: LearningComponent;
}

const Assessments: FC<AssessmentsProps> = ({}: AssessmentsProps) => {
  const [assessments, setAssessments] = useState<Assessments[]>();
  const navigate = useNavigate();

  const selectedSubject = useContext(SubjectContext);

  useSetPageTitle('Assessments');

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(data.data);
    });
  }, [selectedSubject]);

  return (
    <div className="assessments">
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
