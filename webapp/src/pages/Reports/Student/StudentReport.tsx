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
import { EvaluationQuestions } from './Questions';

interface StudentReportProps {}

export type QuestionType = 'introductory' | 'enabling' | 'demonstrative';

interface LearningCompetencyAnalysis {
  code: string;
  learning_competency: string;
  analysis: 'proficient' | 'notProficient';
}

export interface LearningMaterials {
  learning_material: string;
  url: string;
}

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

function capitlizeString(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const StudentReport: FC<StudentReportProps> = ({}: StudentReportProps) => {
  useSetPageTitle('Student Report');
  useSetHeader({
    headerStringValue: `Individual performance report`,
    showSubjectDropdown: true,
  });

  const { LRN } = useParams();

  const [personalizedRemediation, setPersonalizedRemediation] =
    useState<PersonalizedRemediation[]>(data);
  const [learningCompetencies, setLearningCompetencies] = useState<
    LearningCompetencyAnalysis[]
  >([]);

  const [learningMaterials, setLearningMaterials] = useState<
    LearningMaterials[]
  >([
    {
      learning_material: 'Go Concurrency',
      url: 'https://github.com/thisdotEric',
    },
  ]);

  const [evaluationQuestions, setEvalutionQuestions] = useState<
    EvaluationQuestion[]
  >([
    {
      code: 'Code',
      question: 'JOhn',
      question_type: 'enabling',
    },
  ]);
  const [questionTypes] = useState<QuestionType[]>([
    'introductory',
    'enabling',
    'demonstrative',
  ]);

  useEffect(() => {
    axios.get('reports/subject/Math7/1/123456789123').then(({ data }) => {
      console.table(data.data);
      // setEvalutionQuestions(data.data);
      setLearningCompetencies(data.data);
    });
  }, []);

  return (
    <div id="student-report">
      <p id="name">John Eric Siguenza</p>

      {learningCompetencies.map(({ learning_competency }) => {
        return (
          <Accordion multiple iconPosition="right">
            <Accordion.Item
              label={
                <MainReportAccordiionLabel
                  learning_competency={capitlizeString(learning_competency)}
                  proficient={false}
                />
              }
            >
              {/* <p id="section-title">Additional Learning Materials</p>

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
                </ol> */}

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
                      <EvaluationQuestions
                        questionType={q_type}
                        questions={evaluationQuestions}
                      />
                    </Accordion.Item>
                  </Accordion>
                ))}
              </Code>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
};

export default StudentReport;
