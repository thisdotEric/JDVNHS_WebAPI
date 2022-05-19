import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetHeader, useSetPageTitle } from '../../../hooks';
import './StudentReport.scss';
import { Accordion, Code } from '@mantine/core';
import { axios } from '../../../utils';
import { data } from './data';
import { MathComponent } from 'mathjax-react';

interface StudentReportProps {}

type QuestionType = 'introductory' | 'enabling' | 'demonstrative';

export interface QuestionItem {
  questions: string[];
  choices?: string[];
  description?: string;
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

const StudentReport: FC<StudentReportProps> = ({}: StudentReportProps) => {
  useSetPageTitle('Student Report');
  useSetHeader({
    headerStringValue: `Individual performance report`,
    showSubjectDropdown: true,
  });

  const { LRN } = useParams();

  const [personalizedRemediation, setPersonalizedRemediation] =
    useState<PersonalizedRemediation[]>(data);

  return (
    <div id="student-report">
      <p id="name">John Eric Siguenza</p>

      <MathComponent
        tex={String.raw`Is A a subset of B, where A = {1, 3, 4} and B = {1, 4, 3, 2}? }`}
      />

      {personalizedRemediation.map(
        ({ learning_competency, learning_materials, evaluationQuestions }) => {
          return (
            <Accordion multiple iconPosition="right">
              <Accordion.Item label={learning_competency}>
                <p id="section-title">Learning Materials</p>

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
                  {evaluationQuestions.map(({ question, question_type }) => (
                    <Accordion multiple iconPosition="right">
                      <Accordion.Item label={question_type}>
                        <ol id="learning-materials">
                          {question.questions.map(q => (
                            <li>{q}</li>
                          ))}
                        </ol>
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
