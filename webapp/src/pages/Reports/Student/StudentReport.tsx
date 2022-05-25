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
import { LearningMaterialsComponent } from './LearningMaterials';

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
  >([]);

  const [questionTypes] = useState<QuestionType[]>([
    'introductory',
    'enabling',
    'demonstrative',
  ]);

  const fetchRemediation = async () => {
    const { data } = await axios.get(`reports/subject/Math7/1/${LRN}`);
    setLearningCompetencies(data.data);

    const { data: questions } = await axios.get(
      'reports/Math7/competencies/M7NS-Ia-1/questions',
    );
    setEvalutionQuestions(questions.data);
    console.table(questions.data);
  };

  useEffect(() => {
    fetchRemediation();
  }, []);

  return (
    <div id="student-report">
      <p id="name">John Eric Siguenza</p>

      {learningCompetencies.map(({ learning_competency, analysis }) => {
        return (
          analysis === 'notProficient' && (
            <Accordion multiple iconPosition="right">
              <Accordion.Item
                label={
                  <MainReportAccordiionLabel
                    learning_competency={capitlizeString(learning_competency)}
                    proficient={false}
                  />
                }
              >
                <LearningMaterialsComponent
                  learning_materials={learningMaterials}
                />

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
          )
        );
      })}
    </div>
  );
};

export default StudentReport;
