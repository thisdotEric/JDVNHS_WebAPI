import React, { FC } from 'react';
import './SubjectDropDown.scss';
import type { Subject } from '../Dashboard';

interface SubjectDropDownProps {
  setSelectedSubject: (value: React.SetStateAction<string>) => void;
  userSubjects: Subject[] | undefined;
}

const SubjectDropDown: FC<SubjectDropDownProps> = ({
  setSelectedSubject,
  userSubjects,
}: SubjectDropDownProps) => {
  return (
    <div>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedSubject(e.target.value);
          localStorage.setItem('selectedSubject', e.target.value);
        }}
      >
        {userSubjects &&
          userSubjects.map(({ subject_id, subject_name }) => (
            <option value={subject_id}>{subject_name}</option>
          ))}
      </select>
    </div>
  );
};

export default SubjectDropDown;
