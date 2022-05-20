import React, { FC } from 'react';
import './AccordionLabel.scss';
import { Check } from 'tabler-icons-react';

interface QuestionAccordionLabelProps {
  label: string;
  questionsCount: number;
  passed: boolean;
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const QuestionAccordionLabel: FC<QuestionAccordionLabelProps> = ({
  label,
  questionsCount,
  passed,
}: QuestionAccordionLabelProps) => {
  return (
    <div id="accordion-label">
      <p id="label">{`${capitalizeFirstLetter(label)} Questions`}</p>
      <div id="actions">
        <p>
          <span id="count">{questionsCount}</span> items
        </p>
        &nbsp;&nbsp;
        {passed && (
          <>
            <Check size={20} stroke="green" />
            <p>Passed</p>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionAccordionLabel;
