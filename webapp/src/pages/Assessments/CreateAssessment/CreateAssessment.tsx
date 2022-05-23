import React, { FC, useMemo, useState } from 'react';
import './CreateAssessment.scss';
import { NumberInput, Button, RadioGroup, Radio, Select } from '@mantine/core';
import { DeviceFloppy } from 'tabler-icons-react';
import { axios } from '../../../utils';
import { DatePicker } from '@mantine/dates';

interface CreateAssessmentProps {
  lecture_id: number | null;
  grading_period: number;
  subject_id: string;
  date: Date | string;
  close?: () => void;
  isQuarterlyAssessment?: boolean;
}

interface Assessment {
  assessment_type: string;
  component: string;
  items: number;
}

type AssessmentInfo = Assessment & CreateAssessmentProps;

const CreateAssessment: FC<CreateAssessmentProps> = ({
  lecture_id,
  grading_period,
  subject_id,
  isQuarterlyAssessment,
  close = () => {},
}: CreateAssessmentProps) => {
  const [assessment, setAssessment] = useState<AssessmentInfo>({
    assessment_type: 'summative',
    component: 'WW',
    items: 0,
    lecture_id,
    grading_period,
    subject_id,
    date: new Date(),
    isQuarterlyAssessment,
  });

  const [qaDate, setQADate] = useState(new Date());

  const components = useMemo(
    () => [
      {
        value: 'WW',
        label: 'Written Work',
      },
      {
        value: 'PT',
        label: 'Performance Task',
      },
    ],
    [],
  );

  const QaComponentOnly = useMemo(
    () => [
      {
        value: 'QA',
        label: 'Quarterly Assessment',
      },
    ],
    [],
  );

  return (
    <div id="create-assessment-modal">
      {isQuarterlyAssessment ? (
        <DatePicker
          placeholder="Pick date"
          label="Quarterly Assessment Date"
          value={qaDate}
          onChange={date => setQADate(date!)}
          defaultValue={new Date()}
          required
        />
      ) : (
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
      )}

      <Select
        label="Component Type"
        size="md"
        disabled
        classNames={{
          wrapper: 'select-wrapper',
        }}
        placeholder="Select Component Type"
        onChange={value => setAssessment({ ...assessment, component: value! })}
        defaultValue={isQuarterlyAssessment ? 'QA' : 'WW'}
        data={isQuarterlyAssessment ? QaComponentOnly : components}
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

          const isQA = assessment.isQuarterlyAssessment;

          const assessmentInfo: AssessmentInfo = {
            assessment_type: assessment.assessment_type,
            component: isQA ? 'QA' : assessment.component,
            date: isQA ? qaDate : assessment.date,
            grading_period: assessment.grading_period,
            items: assessment.items,
            lecture_id: isQA ? null : assessment.lecture_id,
            subject_id: assessment.subject_id,
          };

          await axios.post(`subject/${subject_id}/assessment`, {
            assessment: assessmentInfo,
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
