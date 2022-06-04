import { Button, TextInput } from '@mantine/core';
import React, { FC, useState } from 'react';
import { axios } from '../../utils';
import type { LearningMaterial } from './LearningMaterials';

interface UpdateLearningMaterialProps {
  code: string;
}

const UpdateLearningMaterial: FC<UpdateLearningMaterialProps> = ({
  code,
}: UpdateLearningMaterialProps) => {
  const [learningMaterial, setLearningMaterial] = useState<LearningMaterial>({
    code,
    learning_material: '',
    link: '',
  });

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        await axios.post('subject/Math7/learning-materials', {
          learningMaterial,
        });
      }}
    >
      <TextInput
        label="Name"
        onChange={e => {
          setLearningMaterial({
            ...learningMaterial,
            learning_material: e.target.value!,
          });
        }}
      />
      <TextInput
        label="Link"
        onChange={e => {
          setLearningMaterial({
            ...learningMaterial,
            link: e.target.value!,
          });
        }}
      />

      <Button
        type="submit"
        color={'teal'}
        styles={{
          root: {
            marginTop: 10,
            width: '100%',
          },
        }}
      >
        Add new Learning Material
      </Button>
    </form>
  );
};

export default UpdateLearningMaterial;
