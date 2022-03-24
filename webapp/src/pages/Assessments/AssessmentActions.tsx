import React, { FC } from 'react';
// import './AssessmentActions.scss';
import { useNavigate } from 'react-router-dom';

interface AssessmentActionsProps {
  assessment_id: number;
  viewScores: boolean;
}

const AssessmentActions: FC<AssessmentActionsProps> = ({
  viewScores,
  assessment_id,
}: AssessmentActionsProps) => {
  const navigate = useNavigate();

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
          // await axios.delete(
          //   `subject/${selectedSubject}/assessment/${assessment_id}`,
          // );
        }}
      >
        Delete Assessment
      </button>
    </div>
  );
};

export default AssessmentActions;
