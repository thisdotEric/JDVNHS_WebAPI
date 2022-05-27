import { Button, Select, Textarea } from '@mantine/core';
import React, { FC, useState } from 'react';
import { DeviceFloppy } from 'tabler-icons-react';
import './AddNewQuestion.scss';
import type { Question } from '../EvaluationQuestions';
import { axios } from '../../../utils';

interface AddNewQuestionProps {
  code: string;
}

const AddNewQuestion: FC<AddNewQuestionProps> = ({
  code,
}: AddNewQuestionProps) => {
  const [newQuestion, setQuestion] = useState<Question>({
    code,
    question: '',
    question_type: 'introductory',
  });

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        console.log(newQuestion);

        await axios.post('subject/Math7/questions', {
          question: {
            question: newQuestion.question,
            question_type: newQuestion.question_type,
            code: newQuestion.code,
          },
        });
      }}
    >
      <Select
        label="Select question category"
        placeholder="Select"
        styles={{
          root: {
            marginBottom: 10,
          },
        }}
        defaultValue={'introductory'}
        data={[
          { value: 'introductory', label: 'Introductory' },
          { value: 'enabling', label: 'Enabling' },
          { value: 'demonstrative', label: 'Demonstrative' },
        ]}
      />
      <Textarea
        size="md"
        id="textarea"
        maxRows={15}
        autosize
        label="Question"
        onChange={e => {
          setQuestion({ ...newQuestion, question: e.target.value });
        }}
      >
        {newQuestion.question}
      </Textarea>

      <Button
        color={'teal'}
        type="submit"
        leftIcon={<DeviceFloppy size={20} />}
        styles={{
          root: {
            width: '100%',
            marginTop: 10,
          },
        }}
      >
        Add new question
      </Button>
    </form>
  );
};

export default AddNewQuestion;
