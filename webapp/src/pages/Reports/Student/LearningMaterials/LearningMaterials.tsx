import React, { FC } from 'react';
import type { LearningMaterials } from '../StudentReport';

interface LearningMaterialsProps {
  learning_materials: LearningMaterials[];
  code: string;
}

const gdrive_link =
  'https://drive.google.com/drive/folders/1HD79Ypi9AMOpOKxYp8g83vEpkCs1DIb4?usp=sharing';

const LearningMaterialsComponent: FC<LearningMaterialsProps> = ({
  learning_materials,
  code: lcCode,
}: LearningMaterialsProps) => {
  return (
    <ol id="learning-materials">
      {learning_materials.map(({ link, learning_material, code }) => {
        if (code === lcCode) {
          return (
            <li>
              <a href={link} target={'_blank'}>
                {learning_material}
              </a>
            </li>
          );
        }
      })}
    </ol>
  );
};

export default LearningMaterialsComponent;
