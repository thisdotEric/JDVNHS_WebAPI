import React, { FC, useContext } from 'react';
import './AssessmentActions.scss';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import { TableButton } from '../../../components/Button';

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
    <div id="assessment-actions">
      {viewScores ? (
        <TableButton
          value="View/Update Scores"
          onClick={() => {
            navigate(`/t/assessments/scores/${assessment_id}`);
          }}
        />
      ) : (
        <TableButton
          value="Add New Scores"
          onClick={() => {
            navigate(`/t/assessments/scores/new/${assessment_id}`);
          }}
        />
      )}

      <TableButton
        value="Delete Assessment"
        onClick={async () => {
          await axios.delete(
            `subject/${selectedSubject}/assessment/${assessment_id}`,
          );

          refetchAssessments(Math.random());
        }}
      />
    </div>
  );
};

export default AssessmentActions;
