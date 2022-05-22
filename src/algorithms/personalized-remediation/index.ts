export interface LearningCompetencyScore {
  competencyPercantageScore: number;
  learningCompetency: string;
}

export interface StudentLearningPerformance {
  LRN: string;
  proficient: string[];
  notProficient: string[];
}

export const computeCompetencyPercentage = (
  totalScore: number,
  totalItems: number
): number => {
  return (totalScore / totalItems) * 100;
};

export const groupLearningCompetency = (
  LRN: string,
  learningCompetencyScore: LearningCompetencyScore[]
): StudentLearningPerformance => {
  let studentPerformance: StudentLearningPerformance = {
    LRN,
    proficient: [],
    notProficient: [],
  };

  learningCompetencyScore.forEach(
    ({ learningCompetency, competencyPercantageScore }) => {
      if (competencyPercantageScore <= 74)
        studentPerformance.notProficient.push(learningCompetency);
      else studentPerformance.proficient.push(learningCompetency);
    }
  );

  return studentPerformance;
};
