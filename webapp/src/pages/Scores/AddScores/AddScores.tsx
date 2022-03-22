import { AgGridReact } from 'ag-grid-react';
import React, { FC } from 'react';
import './AddScores.scss';

interface AddScoresProps {}

const AddScores: FC<AddScoresProps> = ({}: AddScoresProps) => {
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
          // rowData={classScores}
          pagination={true}
          // columnDefs={scoreColumns}
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
    </div>
  );
};

export default AddScores;
