import React, { FC } from 'react';
import './LearningMaterials.scss';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { useParams } from 'react-router-dom';

interface LearningMaterialsProps {}

const LearningMaterials: FC<
  LearningMaterialsProps
> = ({}: LearningMaterialsProps) => {
  useSetPageTitle('Learning Materials');

  const { code } = useParams();

  useSetHeader({
    headerStringValue: `Learning Materials for ${code}`,
    showSubjectDropdown: false,
  });

  return (
    <div>
      <p>Learning Materials Page</p>{' '}
    </div>
  );
};

export default LearningMaterials;
