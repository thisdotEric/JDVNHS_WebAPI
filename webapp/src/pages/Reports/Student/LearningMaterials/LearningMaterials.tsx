import React, { FC } from 'react';
import type { LearningMaterials } from '../StudentReport';

interface LearningMaterialsProps {
  learning_materials: LearningMaterials[];
}

const LearningMaterialsComponent: FC<LearningMaterialsProps> = ({
  learning_materials,
}: LearningMaterialsProps) => {
  return (
    <ol id="learning-materials">
      {learning_materials.map(({ url, learning_material }) => (
        <li>
          <a href={url} target={'_blank'}>
            {learning_material}
          </a>
        </li>
      ))}
    </ol>
  );
};

export default LearningMaterialsComponent;
