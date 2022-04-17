import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
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
      gender: 'female',
      grading_period: parseInt(d.grading_period),
      passedPreTest: d.passedPreTest === 'true' ? true : false,
      pt_wScore: parseInt(d.pt_wScore),
      qa_wScore: parseInt(d.qa_wScore),
      ww_wScore: parseInt(d.ww_wScore),
      conduct_intervention: d.conduct_intervention === 'true' ? true : false,
    };
  });
};

@controller('/intervention')
export class InterventionController {
  @httpGet('/')
  async index(req: Request, res: Response) {
    const testdata_path = __dirname + '/testdata.csv';
    let data = await csv().fromFile(testdata_path);
    data = mapData(data);

    const node = buildTree(data);
    console.log(node);

    const studentData: StudentAttributes = {
      gender: 'male',
      grading_period: 1,
      passedPreTest: true,
      pt_wScore: 75,
      qa_wScore: 90,
      ww_wScore: 80,
    };

    const prediction = classify(studentData, node);
    console.log(prediction);

    res.status(200).send(node);
  }
}
