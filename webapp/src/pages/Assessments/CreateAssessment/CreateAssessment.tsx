import React, { FC, useState } from 'react';
import './CreateAssessment.scss';
import { NumberInput, Button, RadioGroup, Radio, Select } from '@mantine/core';
import { DeviceFloppy } from 'tabler-icons-react';
import { axios } from '../../../utils';

interface CreateAssessmentProps {
  lecture_id: number;
  grading_period: number;
  subject_id: string;
  date: Date | string;
  close?: () => void;
}

interface Assessment {
  assessment_type: string;
  component: string;
  items: number;
}

const CreateAssessment: FC<CreateAssessmentProps> = ({
  lecture_id,
  grading_period,
  subject_id,
  close = () => {},
}: CreateAssessmentProps) => {
  const [assessment, setAssessment] = useState<
    Assessment & CreateAssessmentProps
  >({
    assessment_type: 'summative',
    component: 'WW',
    items: 0,
    lecture_id,
    grading_period,
    subject_id,
    date: new Date(),
  });

  const [components] = useState([
    {
      value: 'WW',
      label: 'Written Work',
    },
    // {
    //   value: 'QA',
    //   label: 'Quarterly Assessment',
    // },
    {
      value: 'PT',
      label: 'Performance Task',
    },
  ]);

  return (
    <div id="create-assessment-modal">
      <RadioGroup
        classNames={{
          radioWrapper: 'radio-wrapper',
          label: 'radio-label',
        }}
        label="Select type of Assessment"
        required
        defaultValue={'summative'}
        onChange={value =>
          setAssessment({ ...assessment, assessment_type: value })
        }
      >
        <Radio value="summative" label="Summative" />
        <Radio value="formative" label="Formative" />
      </RadioGroup>

      <Select
        label="Component Type"
        size="md"
        classNames={{
          wrapper: 'select-wrapper',
        }}
        placeholder="Select Component Type"
        onChange={value => setAssessment({ ...assessment, component: value! })}
        defaultValue={'WW'}
        data={components}
      />

      <NumberInput
        label={'Total Items'}
        size="md"
        classNames={{
          wrapper: 'select-wrapper',
        }}
        hideControls
        min={0}
        defaultValue={0}
        onChange={value => setAssessment({ ...assessment, items: value! })}
      />

      <Button
        leftIcon={<DeviceFloppy size={20} />}
        color="teal"
        id="submit-btn"
        styles={{
          root: { display: 'block', margin: '0 auto' },
        }}
        onClick={async () => {
          console.log(assessment);

          await axios.post(`subject/${subject_id}/assessment`, {
            assessment,
          });

          close();
        }}
      >
        Save Assessment
      </Button>
    </div>
  );
};

export default CreateAssessment;
