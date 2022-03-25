import React, { FC, useContext } from 'react';
// import './AssessmentActions.scss';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../utils';
import { SubjectContext } from '../../context';

interface AssessmentActionsProps {
  assessment_id: number;
  viewScores: boolean;
  refetchAssessments: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const AssessmentActions: FC<AssessmentActionsProps> = ({
  viewScores,
  assessment_id,
  refetchAssessments,
}: AssessmentActionsProps) => {
  const navigate = useNavigate();

  const selectedSubject = useContext(SubjectContext);

  return (
    <div>
      {viewScores ? (
        <button
          onClick={() => {
            navigate(`/t/assessments/scores/${assessment_id}`);
          }}
        >
          View/Update Scores
        </button>
      ) : (
        <button
          onClick={() => {
            navigate(`/t/assessments/scores/new/${assessment_id}`);
          }}
        >
          Add New Scores
        </button>
      )}

      <button
        onClick={async () => {
          await axios.delete(
            `subject/${selectedSubject}/assessment/${assessment_id}`,
          );

          refetchAssessments(Math.random());
        }}
      >
        Delete Assessment
      </button>
    </div>
  );
};

export default AssessmentActions;
