import React, { FC, useEffect, useMemo, useState } from 'react';
import './LearningMaterials.scss';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { axios } from '../../utils';
import type { Column } from 'react-table';
import { TableComponent } from '../../components/Table';

interface LearningMaterialsProps {}

interface LearningMaterial {
  code: string;
  learning_material: string;
}

const LearningMaterials: FC<
  LearningMaterialsProps
> = ({}: LearningMaterialsProps) => {
  const { code } = useParams();
  useSetPageTitle('Learning Materials');
  useSetHeader({
    headerStringValue: `Learning Materials for ${code}`,
    showSubjectDropdown: false,
  });

  const [materials, setMaterials] = useState<LearningMaterial[]>([]);

  const fetchLearningMaterials = async () => {
    const { data } = await axios.get(`reports/Math7/materials/${code}`);
    setMaterials(data.data);
  };

  const columns = useMemo(
    () =>
      [
        {
          Header: 'LEARNING MATERIAL',
          accessor: 'learning_material',
        },
        {
          Header: 'ACTIONS',
          accessor: 'code',
          Cell: row => {
            return (
              <div>
                <Link to={'https://github.com/'}>View</Link>
                &nbsp;&nbsp;
                <Link to={''}>Update</Link>
                &nbsp;&nbsp;
                <Link to={''}>Delete</Link>
              </div>
            );
          },
        },
      ] as Column<LearningMaterial>[],
    [],
  );

  const data = useMemo(() => materials, [materials]);

  useEffect(() => {
    fetchLearningMaterials();
  }, []);

  return (
    <div>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default LearningMaterials;
