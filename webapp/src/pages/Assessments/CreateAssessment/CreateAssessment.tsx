import React, { FC, useState } from 'react';
import './CreateAssessment.scss';
import { NumberInput, Button, RadioGroup, Radio, Select } from '@mantine/core';
import { DeviceFloppy } from 'tabler-icons-react';

interface CreateAssessmentProps {
  code: string;
  grading_period: number;
  subject_id: string;
}

interface Assessment {
  assessmentType: string;
  componentType: string;
  totalItems: number;
}

const CreateAssessment: FC<CreateAssessmentProps> = ({
  code,
  grading_period,
  subject_id,
}: CreateAssessmentProps) => {
  const [assessment, setAssessment] = useState<
    Assessment & CreateAssessmentProps
  >({
    assessmentType: '',
    componentType: 'WW',
    totalItems: 0,
    code,
    grading_period,
    subject_id,
  });

  const [components] = useState([
    {
      value: 'WW',
      label: 'Written Work',
    },
    {
      value: 'QA',
      label: 'Quarterly Assessment',
    },
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
          setAssessment({ ...assessment, assessmentType: value })
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
        onChange={value =>
          setAssessment({ ...assessment, componentType: value! })
        }
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
        onChange={value => setAssessment({ ...assessment, totalItems: value! })}
      />

      <Button
        leftIcon={<DeviceFloppy size={20} />}
        color="green"
        styles={{
          root: { display: 'block', margin: '0 auto' },
        }}
        onClick={() => console.log(assessment)}
      >
        Save Assessment
      </Button>
    </div>
  );
};

export default CreateAssessment;
