import React, { FC } from 'react';

interface LearningMaterialsProps {}

const LearningMaterials: FC<
  LearningMaterialsProps
> = ({}: LearningMaterialsProps) => {
  return <div></div>;
};

/**
 * 
 *   <ol id="learning-materials">
                  {learning_materials.map(lm => (
                    <li>
                      <a
                        href="https://github.com/thisdotEric"
                        target={'_blank'}
                      >
                        {lm}
                      </a>
                    </li>
                  ))}
                </ol> 
 */

export default LearningMaterials;
