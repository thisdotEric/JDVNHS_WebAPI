import React, { FC, useEffect, useMemo, useState } from 'react';
import { axios } from '../../utils';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import type { QuestionType } from '../Reports/Student/StudentReport';
import './EvaluationQuestions.scss';
import { Link, useParams } from 'react-router-dom';
import type { Column } from 'react-table';
import { TableComponent } from '../../components/Table';
import { Button, Code, Modal, Textarea } from '@mantine/core';
import { DeviceFloppy } from 'tabler-icons-react';
import ReactQuill from 'react-quill';
import { AddNewQuestion } from './AddNewQuestion';

interface EvaluationQuestionsProps {}

export interface Question {
  question_id?: number;
  code: string;
  question: string;
  question_type: QuestionType;
}

const EvaluationQuestions: FC<
  EvaluationQuestionsProps
> = ({}: EvaluationQuestionsProps) => {
  useSetPageTitle('Evaluation Questions');
  useSetHeader({
    headerStringValue: 'List of all Evaluation Questions',
    showSubjectDropdown: false,
  });

  const code = useParams().code;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [updateQuestion, setUpdateQuestion] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [currentId, setCurrentId] = useState<number>();

  const currId = useMemo(() => currentId, [currentId]);

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    code: '',
    question: '',
    question_id: 0,
    question_type: 'introductory',
  });

  const [refetch, setRefetch] = useState(0);

  const fetchQuestions = async () => {
    console.log(`reports/Math7/competencies/${code}/questions`);

    const { data } = await axios.get(
      `reports/Math7/competencies/${code}/questions`,
    );

    setQuestions(data.data);
    console.log(data.data);
  };

  const data = useMemo(() => questions, [questions]);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'QUESTION TYPE',
          accessor: 'question_type',
          Cell: row => <p id="q_type">{row.value}</p>,
        },
        {
          Header: 'QUESTION',
          accessor: 'question',
          Cell: row => {
            return (
              <Code id="question" block>
                {row.value}
              </Code>
            );
          },
        },
        {
          Header: 'ACTIONS',
          accessor: 'question_id',
          Cell: row => {
            return (
              <div>
                <Button
                  styles={{
                    root: {
                      marginRight: 10,
                    },
                  }}
                  onClick={() => {
                    setCurrentId(row.value!);

                    console.log(
                      questions.filter(q => q.question_id == row.value)[0],
                    );

                    setCurrentQuestion(
                      questions.filter(q => q.question_id == row.value)[0],
                    );
                    setUpdateQuestion(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  onClick={async () => {
                    await axios.delete(`subject/Math7/questions/${row.value}`);

                    setQuestions(old =>
                      old.filter(q => q.question_id != row.value),
                    );
                  }}
                >
                  Delete
                </Button>
              </div>
            );
          },
        },
      ] as Column<Question>[],
    [],
  );

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [refetch]);

  return (
    <div id="evaluation-questions">
      <TableComponent
        data={data}
        columns={columns}
        actions={[
          {
            action: async () => setAddQuestion(true),
            name: 'Add new Question',
          },
        ]}
      />

      <Modal
        opened={addQuestion}
        styles={{
          title: { fontWeight: 'bold', fontSize: 16 },
          modal: { width: 700 },
        }}
        closeOnEscape={false}
        onClose={() => setAddQuestion(false)}
        title="Add new Question"
      >
        <AddNewQuestion code={code!} />
      </Modal>

      <Modal
        opened={updateQuestion}
        styles={{
          title: { fontWeight: 'bold', fontSize: 16 },
          modal: { width: 700 },
        }}
        closeOnEscape={false}
        onClose={() => setUpdateQuestion(false)}
        title="Update question"
      >
        <form
          onSubmit={async e => {
            e.preventDefault();

            console.log(currentQuestion);

            setQuestions(old => {
              console.log(currentQuestion.question_id);

              return old.map(o => {
                if (o.question_id === currentQuestion.question_id) {
                  o.question = currentQuestion.question;
                  o.question_type = currentQuestion.question_type;
                }

                return o;
              });
            });

            await axios.patch('subject/Math7/questions', {
              question: currentQuestion?.question,
              question_id: currId,
              question_type: currentQuestion?.question_type,
            });

            setUpdateQuestion(false);
            setRefetch(Math.random());
          }}
        >
          <Textarea
            size="md"
            id="textarea"
            maxRows={15}
            autosize
            onChange={e => {
              setCurrentQuestion({
                ...currentQuestion,
                question: e.target.value,
              });
            }}
          >
            {questions.filter(q => q.question_id == currId)[0]?.question}
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
            Update Question
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default EvaluationQuestions;
