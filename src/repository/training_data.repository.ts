import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { LECTURES, TEACHER_SUBJECTS, TRAINING_DATA } from '../constant/tables';

@injectable()
class TrainingDataRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getTrainingData(subject_id: string, grading_period: number) {
    let training_data = await this.db
      .getDbInstance()(TRAINING_DATA)
      .where({
        subject_id,
        grading_period,
      })
      .select(
        'gender',
        'passedPreTest',
        'pt_wScore',
        'qa_wScore',
        'ww_wScore',
        'grading_period',
        'conduct_intervention'
      );

    // Convert grading period from string to number
    training_data = training_data.map(td => ({
      ...td,
      grading_period: parseInt(td.grading_period),
    }));

    return training_data;
  }
}

export default TrainingDataRepository;
