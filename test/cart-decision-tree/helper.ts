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
