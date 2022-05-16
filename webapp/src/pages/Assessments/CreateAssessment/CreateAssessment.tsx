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

  return (
    <div id="create-assessment-modal">
      <RadioGroup
        label="Select type of Assessment"
        required
        onChange={value =>
          setAssessment({ ...assessment, assessmentType: value })
        }
      >
        <Radio value="summative" label="Summative" />
        <Radio value="formative" label="Formative" />
      </RadioGroup>

      <Select
        label="Component Type"
        placeholder="Select Component Type"
        onChange={value =>
          setAssessment({ ...assessment, componentType: value! })
        }
        defaultValue={'WW'}
        data={[
          { value: 'WW', label: 'Written Work' },
          { value: 'PT', label: 'Performance Task' },
          { value: 'QA', label: 'Quarterly Assessment' },
        ]}
      />

      <NumberInput
        label={'Total Items'}
        hideControls
        min={0}
        defaultValue={0}
        onChange={value => setAssessment({ ...assessment, totalItems: value! })}
      />

      <Button
        leftIcon={<DeviceFloppy size={20} />}
        color="teal"
        onClick={() => console.log(assessment)}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateAssessment;
