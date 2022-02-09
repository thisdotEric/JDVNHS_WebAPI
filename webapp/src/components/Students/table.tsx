import React from 'react';
import { Trash2 } from 'react-feather';

let columnDefs = [
  {
    headerName: 'LRN',
    field: 'user_id',
    sortable: true,
    filter: true,
    checkboxSelection: true,
  },
  {
    headerName: 'First Name',
    field: 'first_name',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Middle Name',
    field: 'middle_name',
    sortable: true,
    filter: true,
  },
  { headerName: 'Last Name', field: 'last_name', sortable: true, filter: true },
  { headerName: 'Gender', field: 'gender', sortable: true, filter: true },
  {
    headerName: 'Contact Number',
    field: 'contact_number',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Actions',
    cellRendererFramework: (params: any) => (
      <div className="icon-div">
        <Trash2
          id="del-icon"
          onClick={() => {
            alert(params.data.user_id);
          }}
        />
      </div>
    ),
  },
];

export { columnDefs };
