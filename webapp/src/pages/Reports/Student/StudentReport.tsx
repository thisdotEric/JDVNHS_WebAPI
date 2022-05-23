import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetHeader, useSetPageTitle } from '../../../hooks';
import './StudentReport.scss';
import { Accordion, Code, List } from '@mantine/core';
import { axios } from '../../../utils';
import { data } from './data';
import { QuestionMark, Notes } from 'tabler-icons-react';
import {
  MainReportAccordiionLabel,
  QuestionAccordionLabel,
} from './Accordion/';

interface StudentReportProps {}

type QuestionType = 'introductory' | 'enabling' | 'demonstrative';

export interface QuestionItem {
  questions: string[];
  choices?: string[];
  description?: string;
}

export interface EvaluationQuestion {
  code: string;
  question_type: QuestionType;
  question: string;
}

interface Question {
  question_type: QuestionType;
  question: QuestionItem;
}

export interface PersonalizedRemediation {
  learning_competency: string;
  learning_materials: string[];
  evaluationQuestions: Question[];
}

const link =
  'https://drive.google.com/drive/folders/1HD79Ypi9AMOpOKxYp8g83vEpkCs1DIb4?usp=sharing';

const StudentReport: FC<StudentReportProps> = ({}: StudentReportProps) => {
  useSetPageTitle('Student Report');
  useSetHeader({
    headerStringValue: `Individual performance report`,
    showSubjectDropdown: true,
  });

  const { LRN } = useParams();

  const [personalizedRemediation, setPersonalizedRemediation] =
    useState<PersonalizedRemediation[]>(data);

  const [ee, setEvalutionQuestions] = useState<EvaluationQuestion[]>([]);
  const [questionTypes] = useState<QuestionType[]>([
    'introductory',
    'enabling',
    'demonstrative',
  ]);

  useEffect(() => {
    axios.get('reports/subject/Math7/1/123456789123').then(({ data }) => {
      console.log(data.data);
      setEvalutionQuestions(data.data);
    });
  }, []);

  return (
    <div id="student-report">
      <p id="name">John Eric Siguenza</p>

      {personalizedRemediation.map(
        ({ learning_competency, learning_materials }) => {
          return (
            <Accordion multiple iconPosition="right">
              <Accordion.Item
                label={
                  <MainReportAccordiionLabel
                    learning_competency={learning_competency}
                    proficient={false}
                  />
                }
              >
                <p id="section-title">Additional Learning Materials</p>

                <ol id="learning-materials">
                  {learning_materials.map(lm => (
                    <li>
                      <a
                        href="https://github.com/thisdotEric"
                        target={'_blank'}
                      >
                        {lm}
                      </a>
                    </li>
                  ))}
                </ol>

                <p id="section-title">Questions for Evaluation</p>

                <Code block id="question-description">
                  {questionTypes.map(q_type => (
                    <Accordion multiple iconPosition="right">
                      <Accordion.Item
                        label={
                          <QuestionAccordionLabel
                            passed
                            label={q_type}
                            questionsCount={10}
                          />
                        }
                      >
                        <List>
                          {ee.map(e => {
                            if (e.question_type === q_type)
                              return (
                                <List.Item
                                  icon={<Notes size={20} />}
                                  id="question-item"
                                >
                                  {e.question}
                                </List.Item>
                              );
                          })}
                        </List>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </Code>
              </Accordion.Item>
            </Accordion>
          );
        },
      )}
    </div>
  );
};

export default StudentReport;
