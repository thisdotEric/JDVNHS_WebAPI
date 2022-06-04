import React, { FC } from 'react';
import { List } from '@mantine/core';
import type { EvaluationQuestion, QuestionType } from '../StudentReport';
import { Notes } from 'tabler-icons-react';

interface EvaluationQuestionsProps {
  questions: EvaluationQuestion[];
  questionType: QuestionType;
  code: string;
}

const EvaluationQuestions: FC<EvaluationQuestionsProps> = ({
  questions,
  questionType,
  code,
}: EvaluationQuestionsProps) => {
  return (
    <List>
      {questions.map(e => {
        if (e.question_type === questionType && code === e.code)
          return (
            <List.Item icon={<Notes size={20} />} id="question-item">
              {e.question}
            </List.Item>
          );
      })}
    </List>
  );
};

export default EvaluationQuestions;
