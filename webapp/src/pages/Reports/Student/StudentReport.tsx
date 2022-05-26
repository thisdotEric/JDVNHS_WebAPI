import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetHeader, useSetPageTitle } from '../../../hooks';
import './StudentReport.scss';
import { Accordion, Code, List } from '@mantine/core';
import { axios } from '../../../utils';
import {
  MainReportAccordiionLabel,
  QuestionAccordionLabel,
} from './Accordion/';
import { EvaluationQuestionsList } from './Questions';
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
  code: string;
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
  const [student, setStudent] = useState<string>();

  const [learningCompetencies, setLearningCompetencies] = useState<
    LearningCompetencyAnalysis[]
  >([]);
  const [learningMaterials, setLearningMaterials] = useState<
    LearningMaterials[]
  >([]);
  const [evaluationQuestions, setEvalutionQuestions] = useState<
    EvaluationQuestion[]
  >([]);

  const [questionTypes] = useState<QuestionType[]>([
    'introductory',
    'enabling',
    'demonstrative',
  ]);

  const fetchLearningMaterials = async (codes: string[]) => {
    const learningMaterialsSet = new Set();

    for await (const code of codes) {
      const { data } = await axios.get(`reports/Math7/materials/${code}`);
      data.data.forEach((lc: any) => {
        learningMaterialsSet.add(lc);
      });
    }

    let allLearningMaterials: LearningMaterials[] = [];
    for (let q of learningMaterialsSet.values()) {
      allLearningMaterials.push(q as LearningMaterials);
    }

    console.log(allLearningMaterials);
    setLearningMaterials(allLearningMaterials);
  };

  const fetchRemediation = async () => {
    const { data } = await axios.get(`reports/subject/Math7/1/${LRN}`);
    setLearningCompetencies(data.data);

    const codes: string[] = data.data.map(
      (d: any) => d.analysis === 'notProficient' && d.code,
    );
    console.log('Codes: ', codes);

    const questionSet = new Set();

    for await (const lc of data.data) {
      if (lc.analysis === 'proficient') continue;

      const { data: questions } = await axios.get(
        `reports/Math7/competencies/${lc.code}/questions`,
      );

      /**
       * Add the questions to the set
       * Using set will not permit duplicate values
       */
      questions.data.forEach((d: any) => questionSet.add(d));
    }

    let allQuestions: EvaluationQuestion[] = [];
    for (let q of questionSet.values()) {
      allQuestions.push(q as EvaluationQuestion);
    }

    fetchLearningMaterials(codes);

    setEvalutionQuestions(allQuestions);
  };

  const countQuestion = (code: string, q_type: QuestionType): number => {
    let count = 0;

    evaluationQuestions.forEach(q => {
      if (q.code === code && q.question_type === q_type) count++;
    });

    return count;
  };

  useEffect(() => {
    axios.get(`student/${LRN}`).then(({ data }) => {
      console.log(data.data);

      setStudent(`${data.data.first_name} ${data.data.last_name} `);
    });

    fetchRemediation();
  }, []);

  return (
    <div id="student-report">
      <p id="name">{student}</p>

      {learningCompetencies.map(({ learning_competency, analysis, code }) => {
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
                  code={code}
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
                            questionsCount={countQuestion(code, q_type)}
                          />
                        }
                      >
                        <EvaluationQuestionsList
                          code={code}
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
