import React, { FC, useState, useReducer, useContext } from 'react';
import './AddAssessment.scss';
import type { Assessment } from '../types';
import { SubjectContext } from '../../../context';
import { axios } from '../../../utils';

interface AddAssessmentProps {
  refetchAssessment: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface AssessmentAction {
  type: 'date' | 'items' | 'component' | 'grading_period';
  payload: any;
}

function assessmentReducer(state: Assessment, action: AssessmentAction) {
  switch (action.type) {
    case 'date':
      return { ...state, date: action.payload };
    case 'items':
      return { ...state, items: parseInt(action.payload, 10) };
    case 'component':
      return { ...state, component: action.payload };
    case 'grading_period':
      return { ...state, grading_period: action.payload };
    default:
      return state;
  }
}

interface ComponentType {
  name: string;
  abbr: 'QA' | 'WW' | 'PT';
}

const AddAssessment: FC<AddAssessmentProps> = ({
  refetchAssessment,
}: AddAssessmentProps) => {
  const selectedSubject = useContext(SubjectContext);

  const [assessment, dispatch] = useReducer(assessmentReducer, {
    items: 0,
    component: 'QA',
    date: '',
    grading_period: 1,
    subject_id: selectedSubject,
  });

  const [componentTypes] = useState<ComponentType[]>([
    {
      name: 'Quarterly Assessment',
      abbr: 'QA',
    },
    {
      name: 'Written Work',
      abbr: 'WW',
    },
    {
      name: 'Performance Task',
      abbr: 'PT',
    },
  ]);

  const [grading_periods] = useState<number[]>([1, 2, 3, 4]);

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();

          const response = await axios.post(
            `subject/${selectedSubject}/assessment`,
            {
              assessment,
            },
          );

          if (response.status == 200) {
            refetchAssessment(Math.random());
          }
        }}
      >
        <input type="submit" value="Add Assessment" name="date" />
        <input
          type="number"
          name="Total Items"
          id="items"
          min={0}
          onChange={e => {
            dispatch({
              type: 'items',
              payload: e.currentTarget.value,
            });
          }}
        />

        <select
          name="component"
          onChange={e => {
            dispatch({
              type: 'component',
              payload: e.target.value,
            });
          }}
        >
          {componentTypes.map(({ abbr, name }) => (
            <option value={abbr}>{name}</option>
          ))}
        </select>

        <select
          name="grading_period"
          onChange={e => {
            dispatch({
              type: 'grading_period',
              payload: e.target.value,
            });
          }}
        >
          {grading_periods.map(gp => (
            <option value={gp}>{gp}</option>
          ))}
        </select>
      </form>

      <input
        type="date"
        name="date"
        onChange={e => {
          dispatch({
            type: 'date',
            payload: e.currentTarget.value,
          });
        }}
      />
    </div>
  );
};

export default AddAssessment;
