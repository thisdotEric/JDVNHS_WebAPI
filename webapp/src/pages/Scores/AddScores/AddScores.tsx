import { AgGridReact } from 'ag-grid-react';
import React, { FC, useEffect, useContext, useState, useMemo } from 'react';
import './AddScores.scss';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { TableComponent } from '../../../components/Table';
import type { Column } from 'react-table';
import { NumberInput } from '@mantine/core';
import { useSetHeader, useSetPageTitle } from '../../../hooks';

interface AddScoresProps {}

interface Student {
  LRN: string;
  fullname: string;
  score: number;
}

interface LocationState {
  items: number;
  grading_period: number;
}

const AddScores: FC<AddScoresProps> = ({}: AddScoresProps) => {
  useSetPageTitle('Add new Scores');
  useSetHeader({
    showSubjectDropdown: false,
    headerStringValue: 'Add new scores',
  });

  const selectedSubject = useContext(SubjectContext);
  const [students, setStudents] = useState<Student[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [disabledSave, setDisableSave] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/students`).then(({ data }) => {
      setStudents(
        data.data.map((s: any) => ({
          LRN: s.user_id,
          fullname: `${s.last_name}, ${s.first_name} ${s.middle_name[0]}. `,
          score: 0,
        })),
      );
    });
  }, []);

  const data = useMemo(() => students, [students, setStudents]);
  const { items, grading_period } = useMemo<LocationState>(
    () => ({
      items: (location.state as any).items,
      grading_period: parseInt((location.state as any).grading_period),
    }),
    [],
  );

  const columns = useMemo(
    () =>
      [
        { Header: 'LRN', accessor: 'LRN' },
        {
          Header: 'STUDENT',
          accessor: 'fullname',
        },
        {
          Header: 'SCORE',
          accessor: 'score',
          Cell: row => {
            const [error, setError] = useState(false);

            return (
              <NumberInput
                value={row.value}
                hideControls
                classNames={{
                  root: 'score-input',
                  error: 'error-label',
                  wrapper: 'wrapper',
                }}
                error={
                  error &&
                  `Max score of ${items} exceeded. Will default to ${items}`
                }
                defaultValue={0}
                min={0}
                max={items}
                onChange={value => {
                  if (value! > items) {
                    setError(true);
                    setDisableSave(true);
                  } else {
                    setError(false);
                    setDisableSave(false);

                    setStudents(old => {
                      return old.map(st => {
                        if (st.LRN == row.row.original.LRN) st.score = value!;
                        return st;
                      });
                    });
                  }
                }}
              />
            );
          },
        },
      ] as Column<Student>[],
    [],
  );

  return (
    <div>
      <TableComponent
        columns={columns}
        data={data}
        pageSize={11}
        actions={[
          {
            name: 'Save Scores',
            disabled: disabledSave,
            action: async () => {
              await axios.post(
                `subject/${selectedSubject}/assessments/scores`,
                {
                  assessment_id: id,
                  grading_period,
                  scores: students.map(s => ({
                    LRN: s.LRN,
                    score: s.score,
                  })),
                },
              );

              navigate(-1);
            },
          },
        ]}
      />
    </div>
  );
};

export default AddScores;
