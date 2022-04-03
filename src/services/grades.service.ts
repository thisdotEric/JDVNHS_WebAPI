import { injectable, inject } from 'inversify';
import SubjectRepository, {
  SubjectComponentWeights,
} from '../repository/subject.repository';
import {
  computeFinalGrade,
  computePercentageScore,
  computeWeightedScore,
} from '../algorithms/grades';
import TYPES from '../ioc/binding-types';
import AssessmentScoresRepository from '../repository/scores.repository';
import { roundOff } from '../algorithms/grades/utils';

interface StudentGrade {
  LRN: string;
  grades: number[];
  finalGrade: number;
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

  private async computeForComponentWeightedScore(
    subject_id: string,
    component: ComponentType,
    grading_period: number,
    LRN: string,
    componentWeight: SubjectComponentWeights
  ) {
    const totalStudentRawScore = await this.scoresRepo.getTotalStudentRawScore(
      subject_id,
      grading_period,
      component,
      LRN
    );

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
     * Compute for the percentage score
     */
    const percentage_score = computePercentageScore(
      totalStudentRawScore,
      subjectComponentHighestPossibleScore
    );

    /**
     * Compute for the weighted score
     */
    const weighted_score = computeWeightedScore(
      percentage_score,
      this.setComponentWeight(componentWeight, component)
    );

    return weighted_score;
  }

  private async computeForInitialGrade(
    subject_id: string,
    componentWeights: SubjectComponentWeights,
    grading_period: number,
    LRN: string
  ) {
    // Do not re-arrange
    const components: ComponentType[] = ['WW', 'PT', 'QA'];

    /**
     * Compute for the weighted scores per subject component
     */
    const studentsGrade_Promise = components.map(component => {
      return this.computeForComponentWeightedScore(
        subject_id,
        component,
        grading_period,
        LRN,
        componentWeights
      );
    });

    /**
     * Resolve all promise objects
     */
    const studentGrades = await Promise.all(studentsGrade_Promise);

    /**
     * Add all weighted score to derive the initial grade for a given grading period
     */
    const initialGrade = studentGrades.reduce((prev, curr) => {
      return prev + curr;
    });

    return initialGrade;
  }

  async computeGradesPerGradingPeriod(subject_id: string, LRN: string) {
    // Do not re-arrange
    const grading_periods = [1, 2, 3, 4];

    const componentWeights: SubjectComponentWeights | null =
      await this.subjectRepo.getSubjectComponentWeights(subject_id);

    const pg = grading_periods.map(gp => {
      return this.computeForInitialGrade(
        subject_id,
        componentWeights!,
        gp,
        LRN
      );
    });

    const gradesPerGradingPeriod = await Promise.all(pg);

    return gradesPerGradingPeriod.map(grade => roundOff(grade));
  }

  async getAllGrades(subject_id: string) {
    /**
     * Load all students enrolled on the give subject_id
     */
    const students = await this.subjectRepo.getEnrolledStudents(subject_id);

    /**
     * Iterate on the students list and compute for the grades per grading period
     */
    let studentGrades_Promises: any[] = students.map(async student => {
      return {
        LRN: student.user_id,
        fullName: `${student.last_name}, ${student.first_name} ${student.middle_name}`,
        grades: await this.computeGradesPerGradingPeriod(
          subject_id,
          student.user_id
        ),
      };
    });

    /**
     * Resolve promises
     */
    let studentGrades: StudentGrade[] = await Promise.all(
      studentGrades_Promises
    );

    /**
     * Compute for the final grade
     */
    studentGrades = studentGrades.map(sg => {
      return {
        ...sg,
        finalGrade: computeFinalGrade(sg.grades),
      };
    });

    return studentGrades;
  }
}

export default GradesService;
