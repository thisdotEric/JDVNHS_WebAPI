import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import SubjectRepository, {
  SubjectComponentWeights,
} from '../repository/subject.repository';
import GradesService, { ComponentType } from './grades.service';
import csv from 'csvtojson';
import {
  buildTree,
  classify,
  printTree,
  StudentAttributes,
} from '../algorithms/cart-decision-tree';
import QuestionRepository from '../repository/question.repository';
import LectureRepository from '../repository/lecture.repository';
import AssessmentRepository from '../repository/assessment.repository';
import AssessmentScoresRepository from '../repository/scores.repository';
import {
  computeCompetencyPercentage,
  groupLearningCompetency,
  LearningCompetencyScore,
} from '../algorithms/personalized-remediation';

export const mapData = (data: any[]) => {
  return data.map(d => {
    return {
      passedPreTest: d.passedPreTest === 'true' ? true : false,
      pt_wScore: parseInt(d.pt_wScore),
      ww_wScore: parseInt(d.ww_wScore),
      qa_wScore: parseInt(d.qa_wScore),
      conduct_intervention: d.conduct_intervention === 'true' ? true : false,
    };
  });
};

@injectable()
class ReportsService {
  constructor(
    @inject(TYPES.SubjectRepository)
    private readonly subjectRepo: SubjectRepository,
    @inject(TYPES.GradesService)
    private readonly gradesService: GradesService,
    @inject(TYPES.QuestionsRepository)
    private readonly questionRepo: QuestionRepository,
    @inject(TYPES.LectureRepository)
    private readonly lectureRepo: LectureRepository,
    @inject(TYPES.AssessmentRepository)
    private readonly assessmentRepo: AssessmentRepository,
    @inject(TYPES.AssessmentScoresRepository)
    private readonly scoresRepo: AssessmentScoresRepository
  ) {}

  private async buildTree() {
    const testdata_path = __dirname + '/data.csv';
    let data = await csv().fromFile(testdata_path);
    data = mapData(data);

    // console.log('Full Dataset: ', data);

    const node = buildTree(data);

    return node;
  }

  async getStudentPerformanceReport(
    subject_id: string,
    grading_period: number = 1
  ) {
    // Build the decision tree
    const tree = await this.buildTree();

    const studentData: StudentAttributes = {
      passedPreTest: false,
      pt_wScore: 13,
      ww_wScore: 10,
      qa_wScore: 11,
    };

    const treeJson = JSON.stringify(tree);
    // console.log(treeJson);

    printTree(tree);

    const prediction = classify(studentData, tree);
    // console.log({ user_id, weights });
    // console.log(prediction);

    let conductRemediation =
      prediction.trueCount > prediction.falseCount ? true : false;

    // console.log('Conduct: ', conductRemediation);

    const students = await this.subjectRepo.getEnrolledStudents(subject_id);

    const componentWeights: SubjectComponentWeights | null =
      await this.subjectRepo.getSubjectComponentWeights(subject_id);

    const components: ComponentType[] = ['PT', 'WW', 'QA'];

    const reportsTable = [];

    for (let { user_id, first_name, middle_name, last_name } of students) {
      const weights_Promise = components.map(c => {
        return this.gradesService.computeForComponentWeightedScore(
          subject_id,
          c,
          grading_period,
          user_id,
          componentWeights!
        );
      });

      const weights = await Promise.all(weights_Promise);
      // console.log({ user_id, weights });

      const studentData: StudentAttributes = {
        passedPreTest: true,
        pt_wScore: weights[0],
        ww_wScore: weights[1],
        qa_wScore: weights[2],
      };

      const prediction = classify(studentData, tree);
      // console.log({ user_id, weights });
      // console.log(prediction);

      let conductRemediation =
        prediction.trueCount > prediction.falseCount ? true : false;

      reportsTable.push({
        user_id,
        first_name,
        middle_name,
        last_name,
        weights,
        conductRemediation,
      });
    }

    return reportsTable;
  }

  async getQuestions(learning_competency_code: string) {
    return this.questionRepo.getQuestions(learning_competency_code);
  }

  async getLearningCompetencyDetails(code: string) {
    return this.subjectRepo.getLearningCompetencyDetails(code);
  }

  async getLearningMaterials(code: string) {
    return this.subjectRepo.getLearningMaterials(code);
  }

  async getLearningCompetencyGroupings(
    LRN: string,
    subject_id: string,
    grading_period: number
  ) {
    const learningCompetenciesWithAssessments =
      await this.lectureRepo.getLearningCompetencyWithAssessments(
        subject_id,
        grading_period
      );

    let learning_competency_score: LearningCompetencyScore[] = [];

    for await (const lc of learningCompetenciesWithAssessments) {
      // Get the lecture ids per learning competency
      const lecture_ids = (await this.lectureRepo.getLectureIds(lc.code)).map(
        l => l.lecture_id
      );
      console.log('Code', lc.code);
      console.log('Lectures IDS', lecture_ids);

      const assessment_ids = (
        await Promise.all(
          lecture_ids.map(lecture_id => {
            return this.assessmentRepo.getAssessmentIdByLectureId(lecture_id);
          })
        )
      ).flat();

      console.log('Assessment IDS: ', assessment_ids);

      const assessmentTotalItem =
        await this.assessmentRepo.getAssessmentTotalItemPerLectureIds(
          lecture_ids
        );

      console.log('Total Item: ', assessmentTotalItem);

      const totalScore = await this.scoresRepo.getTotalScoreByAssessmentIds(
        LRN,
        assessment_ids
      );
      console.log('Total Score: ', totalScore);

      learning_competency_score.push({
        learningCompetency: lc.code,
        competencyPercantageScore: computeCompetencyPercentage(
          totalScore,
          assessmentTotalItem
        ),
      });

      console.log('=========');
    }

    console.log('Percentage Scores: ', learning_competency_score);

    const groupings = groupLearningCompetency(LRN, learning_competency_score);

    return groupings;
  }
}

export default ReportsService;
