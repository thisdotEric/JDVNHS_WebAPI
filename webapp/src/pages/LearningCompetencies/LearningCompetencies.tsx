import React, { FC, useEffect, useMemo, useState } from 'react';
import { TableComponent } from '../../components/Table';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { axios } from '../../utils';
import type { Column } from 'react-table';
import './LearningCompetencies.scss';
import { Link } from 'react-router-dom';

interface LearningCompetenciesProps {}

interface LearningCompetency {
  code: string;
  learning_competency: string;
  subject_id: string;
  grading_period: number;
}

const LearningCompetencies: FC<
  LearningCompetenciesProps
> = ({}: LearningCompetenciesProps) => {
  useSetPageTitle('Learning Competencies');
  useSetHeader({
    headerStringValue: 'Math 7, 1st Grading List of Learning Competencies',
    showSubjectDropdown: false,
  });

  const [competencies, setLearningCompetencies] = useState<
    LearningCompetency[]
  >([]);

  const fetchLearningCompetencies = async () => {
    const { data: competencies } = await axios.get(
      'subject/Math7/1/competencies',
    );

    setLearningCompetencies(competencies.data);
  };

  const data = useMemo(
    () => competencies,
    [competencies, setLearningCompetencies],
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: 'CODE',
          accessor: 'code',
        },
        {
          Header: 'LEARNING COMPETENCY',
          accessor: 'learning_competency',
        },
        {
          Header: 'ACTIONS',
          accessor: 'subject_id',
          Cell: row => {
            return (
              <div>
                <Link to={`/t/competencies/questions/${row.row.original.code}`}>
                  Evaluation Questions
                </Link>
                &nbsp;&nbsp;
                <Link
                  to={`/t/competencies/learning-materials/${row.row.original.code}`}
                >
                  Learning Materials
                </Link>
              </div>
            );
          },
        },
      ] as Column<LearningCompetency>[],
    [],
  );

  useEffect(() => {
    fetchLearningCompetencies();
  }, []);

  return (
    <div>
      <TableComponent data={data} columns={columns} />
    </div>
  );
};

export default LearningCompetencies;
