import { injectable, inject } from 'inversify';
import SubjectRepository, {
  SubjectComponentWeights,
} from '../repository/subject.repository';
import {
  computePercentageScore,
  computeWeightedScore,
} from '../algorithms/grades';
import TYPES from '../ioc/binding-types';
import AssessmentScoresRepository from '../repository/scores.repository';

interface ComputedScores {
  percentage_score: number;
  weighted_score: number;
}

interface StudentGrade {
  LRN: string;
  grading_period: number;
  written_work: ComputedScores;
  performance_task: ComputedScores;
  quarterly_assessment: ComputedScores;
}

type ComponentType = 'PT' | 'QA' | 'WW';

@injectable()
class GradesService {
  constructor(
    @inject(TYPES.AssessmentScoresRepository)
    private readonly scoresRepo: AssessmentScoresRepository,
    @inject(TYPES.SubjectRepository)
    private readonly subjectRepo: SubjectRepository
  ) {}

  /**
   * Helper function to compute for students percentage and weighted score based
   * on the given subject id, grading period and subject component
   * @param subject_id
   * @param component
   * @param grading_period
   * @param componentWeight
   * @returns
   */
  private async helper(
    subject_id: string,
    component: string,
    grading_period: number,
    componentWeight: number
  ) {
    /**
     * Get the highest possible of a given subject component based on the
     * given subject and grading period.
     */
    const subjectComponentHighestPossibleScore: number =
      await this.scoresRepo.getComponentsTotalItem(
        subject_id,
        component,
        grading_period
      );

    /**
     * Get all the total raw scores of the students based on the
     * given subject and grading period.
     */
    const studentsRawScores = await this.scoresRepo.getScores(
      subject_id,
      component,
      grading_period
    );

    /**
     * Iterate through the students raw scores and compute for percentage score
     * and weighted score.
     */
    const studentsComputedAndWeightedScores = studentsRawScores.map(
      (rawScore: any) => {
        let studentRawScore = parseInt(rawScore.total_score, 10);

        let percentageScore = computePercentageScore(
          studentRawScore,
          subjectComponentHighestPossibleScore
        );
        let weightedScore = computeWeightedScore(
          percentageScore,
          componentWeight
        );

        return {
          ...rawScore,
          percentageScore,
          weightedScore,
        };
      }
    );

    return studentsComputedAndWeightedScores;
  }

  private setComponentWeight(
    componentWeights: SubjectComponentWeights,
    currentComponent: ComponentType
  ): number {
    switch (currentComponent) {
      case 'PT':
        return componentWeights.performance_task;
      case 'QA':
        return componentWeights.quarterly_assessment;
      case 'WW':
        return componentWeights.written_work;
      default:
        return 0;
    }
  }

  async getAllGrades(subject_id: string) {
    const components: ComponentType[] = ['PT', 'WW', 'QA'];

    const componentWeights: SubjectComponentWeights | null =
      await this.subjectRepo.getSubjectComponentWeights(subject_id);

    const grading_periods = [1, 2, 3, 4];

    let computedScoresPromises = [];

    for (let gp of grading_periods) {
      for (let component of components) {
        computedScoresPromises.push(
          this.helper(
            subject_id,
            component,
            gp,
            this.setComponentWeight(componentWeights!, component)
          )
        );
      }
    }

    const computedScores = await Promise.all(computedScoresPromises);

    const total = await this.scoresRepo.getTotalStudentRawScore(
      subject_id,
      1,
      'PT',
      '123456789110'
    );

    console.log(total);

    return computedScores;
  }
}

export default GradesService;
