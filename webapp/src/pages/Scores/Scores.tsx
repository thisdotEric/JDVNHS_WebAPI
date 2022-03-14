import React, { FC, useContext, useEffect, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';
import { SubjectContext } from '../../../src/context';

interface ScoresProps {}

interface ClassScores {
  subject_id: string;
  assessment_id: number;
  grading_period: 1 | 2 | 3 | 4;
  total_items: number;
  scores: Scores[];
}

interface Scores {
  score_id: number;
  LRN: string;
  score: number;
}

// assessment_id |    date    | subject_id | items | component

interface Assessments {
  assessment_id: number;
  date: Date;
  subject_id: string;
  items: number;
  component: 'WW' | 'PT' | 'QA';
}

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  const [classScores, setScores] = useState<ClassScores>();
  const [assessments, setAssessments] = useState<Assessments[]>();

  const selectedSubject = useContext(SubjectContext);

  const fetchAssessmentScores = async (assessment_id: number) => {
    const res = await axios.get(
      `subject/${selectedSubject}/scores/${assessment_id}`,
    );

    console.log(res.data);
  };

  useEffect(() => {
    console.log(selectedSubject);

    axios.get(`subject/${selectedSubject}/assessments/all`).then(({ data }) => {
      setAssessments(data.data);
    });
  }, [selectedSubject]);

  return (
    <div className="scores">
      {assessments &&
        assessments.map(assessments => {
          return (
            <div
              key={assessments.assessment_id}
              onClick={async () => {
                await fetchAssessmentScores(assessments.assessment_id);
              }}
            >
              <p>{assessments.date}</p>
              <p>{assessments.items}</p>
              <p>{assessments.component}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Scores;
