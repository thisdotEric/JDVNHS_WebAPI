export interface StudentAttributes {
  gender: 'male' | 'female';
  grading_period: 1 | 2 | 3 | 4;
  passedPreTest: boolean;
  pt_wScore: number;
  ww_wScore: number;
  qa_wScore: number;
  conduct_intervention: boolean;
}
