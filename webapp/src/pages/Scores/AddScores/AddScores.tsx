import { AgGridReact } from 'ag-grid-react';
import React, { FC, useEffect, useContext, useState } from 'react';
import './AddScores.scss';
import { axios } from '../../../utils';
import { SubjectContext } from '../../../context';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

interface AddScoresProps {}

interface Student {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  score: number;
}

const AddScores: FC<AddScoresProps> = ({}: AddScoresProps) => {
  const selectedSubject = useContext(SubjectContext);
  const [students, setStudents] = useState<Student[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [scoreColumns] = useState([
    {
      field: 'user_id',
      headerName: 'LRN',
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
    },
    {
      field: 'first_name',
      headerName: 'First Name',
    },
    {
      field: 'middle_name',
      headerName: 'Middle Name',
    },
    {
      field: 'score',
      headerName: 'Score',
      editable: true,
      onCellValueChanged: (grid: any) => {
        let score: number;

        score = parseInt(grid.node.data.score, 10);

        // if (Number.isNaN(score)) console.log('Invalid NUmber');
        // else console.log(score);
        console.log(grid.node.id);

        const currIndex = parseInt(grid.node.id, 10);

        setStudents(old => {
          return old.map((s, index) => {
            if (index == currIndex) s.score = score;

            return s;
          });
        });
      },
    },
  ]);

  useEffect(() => {
    axios.get(`subject/${selectedSubject}/students`).then(({ data }) => {
      setStudents(
        data.data.map((s: any) => ({
          user_id: s.user_id,
          first_name: s.first_name,
          middle_name: s.middle_name,
          last_name: s.last_name,
          score: 0,
        })),
      );
    });
  }, []);

  return (
    <div>
      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          rowData={students}
          pagination={true}
          columnDefs={scoreColumns}
          rowSelection={'single'}
          enableCellChangeFlash={true}
          defaultColDef={{
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
        ></AgGridReact>
      </div>

      <div className="scores-act">
        <Button
          buttontype="cancel"
          value="Cancel"
          onClick={async () => {
            navigate('/t/assessments');
          }}
        />

        <Button
          buttontype="save"
          value="Save new scores"
          onClick={async () => {
            console.table(students);

            await axios.post(`subject/${selectedSubject}/assessments/scores`, {
              assessment_id: id,
              grading_period: 1,
              scores: students.map(s => ({ LRN: s.user_id, score: s.score })),
            });

            navigate('/t/assessments');
          }}
        />
      </div>
    </div>
  );
};

export default AddScores;
