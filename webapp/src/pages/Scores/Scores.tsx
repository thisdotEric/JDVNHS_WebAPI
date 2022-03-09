import React, { FC, useEffect, useState } from 'react';
import './Scores.scss';
import { axios } from '../../utils';

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

const Scores: FC<ScoresProps> = ({}: ScoresProps) => {
  const [classScores, setScores] = useState<ClassScores>();

  useEffect(() => {
    axios.get('subject/PreCal/scores/1').then(({ data }) => {
      setScores({
        subject_id: data.data.subject_id,
        assessment_id: 1,
        grading_period: 1,
        total_items: 50,
        scores: data.data.scores,
      });

      console.log(data);
    });
  }, []);

  return (
    <div className="scores">
      {classScores &&
        classScores.scores.map(score => {
          return <div>{score.LRN}</div>;
        })}
    </div>
  );
};

export default Scores;
