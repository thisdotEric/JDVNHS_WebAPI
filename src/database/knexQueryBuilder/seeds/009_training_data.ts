import * as Knex from 'knex';
import { mapData } from '../../../controller/intervention.controller';
import { TRAINING_DATA } from '../../../constant/tables';
import csv from 'csvtojson';

export async function seed(knex: Knex): Promise<void> {
  await knex(TRAINING_DATA).del();

  const dataset_path = __dirname + '/initial_dataset.csv';

  let data = await csv().fromFile(dataset_path);
  data = data.map(d => {
    return {
      gender: d.gender === 'male' ? 'male' : 'female',
      grading_period: parseInt(d.grading_period),
      passedPreTest: d.passedPreTest === 'true' ? true : false,
      pt_wScore: parseInt(d.pt_wScore),
      qa_wScore: parseInt(d.qa_wScore),
      ww_wScore: parseInt(d.ww_wScore),
      conduct_intervention: d.conduct_intervention === 'true' ? true : false,
      subject_id: 'Math10',
    };
  });

  // console.log(data);

  await knex(TRAINING_DATA).insert(data);
}
