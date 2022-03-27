import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import React, { FC } from 'react';
import './AgGrid.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

interface AgGridProps extends AgGridReactProps {}

const AgGrid: FC<AgGridProps> = (props: AgGridProps) => {
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: '500px',
      }}
    >
      <AgGridReact {...props}></AgGridReact>
    </div>
  );
};

export default AgGrid;
