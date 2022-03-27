export type LearningComponent = 'WW' | 'PT' | 'QA';

export interface Assessment {
  date: string;
  subject_id: string;
  items: number;
  component: LearningComponent;
  grading_period: 1 | 2 | 3 | 4;
}
