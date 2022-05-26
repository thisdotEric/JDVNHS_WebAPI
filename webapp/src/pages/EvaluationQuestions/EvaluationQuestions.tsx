import React, { FC } from 'react';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import type { QuestionType } from '../Reports/Student/StudentReport';
import './EvaluationQuestions.scss';

interface EvaluationQuestionsProps {}

interface Questions {
  question: string;
  question_type: QuestionType;
}

const EvaluationQuestions: FC<
  EvaluationQuestionsProps
> = ({}: EvaluationQuestionsProps) => {
  useSetPageTitle('Evaluation Questions');
  useSetHeader({
    headerStringValue: '',
    showSubjectDropdown: false,
  });

  return <div></div>;
};

export default EvaluationQuestions;
