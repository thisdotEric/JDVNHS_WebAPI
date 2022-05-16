import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetHeader, useSetPageTitle } from '../../../hooks';
import './StudentReport.scss';
import { Accordion, Code } from '@mantine/core';
import { axios } from '../../../utils';

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

interface PersonalizedRemediation {
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

  const [personalizedRemediation, setPersonalizedRemediation] = useState<
    PersonalizedRemediation[]
  >([
    {
      learning_competency:
        'Describes well-defined sets, subsets, universal sets, and the null set and cardinality of sets.',
      learning_materials: [
        'NFE Accreditation and Equivalency Learning Material. Sets, Sets and Sets. 2001. pp. 5-18',
        'NFE Accreditation and Equivalency Learning Material. Sets, Sets and Sets. 2001. pp. 20-25',
      ],
      evaluationQuestions: [
        {
          question_type: 'introductory',
          question: {
            questions: ['What is your name?'],
          },
        },
        {
          question_type: 'enabling',
          question: {
            questions: ['What is your name in enabling?'],
          },
        },
        {
          question_type: 'demonstrative',
          question: {
            questions: ['What is your name in demonstrative?'],
          },
        },
      ],
    },
  ]);

  return (
    <div id="student-report">
      <p id="name">John Eric Siguenza</p>

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
                        {question.questions.map(q => (
                          <p>{q}</p>
                        ))}
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
