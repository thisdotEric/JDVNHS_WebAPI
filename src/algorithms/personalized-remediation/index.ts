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
      // Check for NaN because some learning competencies
      // doesn't have corresponding assessments yet.
      if (!isNaN(competencyPercantageScore)) {
        if (competencyPercantageScore <= 74)
          studentPerformance.notProficient.push(learningCompetency);
        else studentPerformance.proficient.push(learningCompetency);
      }
    }
  );

  return studentPerformance;
};
