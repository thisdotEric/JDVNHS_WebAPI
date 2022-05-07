import React from 'react';
import type { IStudent } from './Students';
import type { Column } from 'react-table';

export const studentTableColumns = [
  {
    Header: 'LRN',
    accessor: 'LRN',
  },
  {
    Header: 'FULL NAME',
    accessor: 'fullname',
  },
  {
    Header: 'GENDER',
    accessor: 'gender',
  },
  {
    Header: 'CONTACT NUMBER',
    accessor: 'contact_number',
  },
  {
    Header: 'ACTION',
    accessor: 'user_id',
    Cell: row => {
      return (
        <>
          <button
            onClick={() => {
              alert(row.value);
            }}
          >
            Are you gonna stay
          </button>
        </>
      );
    },
  },
] as Column<IStudent>[];
