import React, { FC } from 'react';
import './Reports.scss';
import { AgGrid } from '../../components/Table';

interface ReportsProps {}

const Reports: FC<ReportsProps> = ({}: ReportsProps) => {
  return (
    <div>
      <p>This is the reports page</p>

      <AgGrid
        columnDefs={[
          {
            field: 'status',
            headerName: 'Attendance',
            cellRendererFramework: (params: any) => (
              <span id={params.node.data.status}>
                {params.node.data.status}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Reports;
