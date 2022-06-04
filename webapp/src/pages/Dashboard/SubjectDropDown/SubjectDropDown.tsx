import React, { FC, useEffect, useState } from 'react';
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
  const [subject, setSubject] = useState<string>();

  useEffect(() => {
    const sub = localStorage.getItem('selectedSubject') as string;
    setSubject(sub);
  }, []);

  return (
    <div>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedSubject(e.target.value);
          setSubject(e.target.value);
          localStorage.setItem('selectedSubject', e.target.value);
        }}
        value={subject}
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
