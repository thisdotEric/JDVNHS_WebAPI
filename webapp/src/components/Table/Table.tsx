import React, { FC, useState } from 'react';
import './Table.scss';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import GlobalFilter from './GlobalFilter';
import { Table, Button } from '@mantine/core';
import { ArrowNarrowDown, ArrowNarrowUp } from 'tabler-icons-react';

interface TableProps {
  columns: any;
  data: any;
  globalFilterPlaceholder?: string;
}

const TableComponent: FC<TableProps> = ({
  columns,
  data,
  globalFilterPlaceholder,
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data, initialState: { pageSize: 12 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter, pageIndex } = state;
  const [btnColor] = useState('orange');

  return (
    <div id="table-component">
      <GlobalFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        placeholder={globalFilterPlaceholder}
      />

      <Table {...getTableProps()} fontSize={'md'} striped highlightOnHover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowNarrowDown size={15} />
                      ) : (
                        <ArrowNarrowUp size={15} />
                      )
                    ) : (
                      ' '
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="pagination">
        <p id="page-pagination-info">
          Page{' '}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </p>

        <div id="pagination-actions">
          <Button onClick={() => gotoPage(0)} size="xs" color={btnColor}>
            {'<<'}
          </Button>
          <Button
            onClick={() => previousPage()}
            size="xs"
            color={btnColor}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            onClick={() => nextPage()}
            size="xs"
            disabled={!canNextPage}
            color={btnColor}
          >
            Next
          </Button>
          <Button
            size="xs"
            onClick={() => gotoPage(pageOptions.length - 1)}
            color={btnColor}
          >
            {'>>'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
