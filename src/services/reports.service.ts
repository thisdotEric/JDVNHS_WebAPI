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
    private readonly gradesService: GradesService
  ) {}

  private async buildTree() {
    const testdata_path = __dirname + '/data.csv';
    let data = await csv().fromFile(testdata_path);
    data = mapData(data);

    console.log('Full Dataset: ', data);

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
    console.log(treeJson);

    printTree(tree);

    const prediction = classify(studentData, tree);
    // console.log({ user_id, weights });
    console.log(prediction);

    let conductRemediation =
      prediction.trueCount > prediction.falseCount ? true : false;

    console.log('Conduct: ', conductRemediation);

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
}

export default ReportsService;
