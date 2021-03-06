import React, { FC, useEffect, useState } from 'react';
import './Table.scss';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import GlobalFilter from './GlobalFilter';
import { Table, Button, Skeleton } from '@mantine/core';
import {
  ArrowNarrowDown,
  ArrowNarrowUp,
  DeviceFloppy,
  Icon,
} from 'tabler-icons-react';

export interface ButtonProps {
  name: string;
  action: () => Promise<void>;
  icon?: () => Icon;
  disabled?: boolean;
}

interface TableProps {
  columns: any;
  data: any;
  globalFilterPlaceholder?: string;
  pageSize?: number;
  actions?: ButtonProps[];
}

const TableComponent: FC<TableProps> = ({
  columns,
  data,
  globalFilterPlaceholder,
  pageSize = 12,
  actions: saveButton,
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
    {
      columns,
      data,
      initialState: { pageSize },
      autoResetPage: false,
      autoResetSortBy: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter, pageIndex } = state;
  const [btnColor] = useState('orange');

  return (
    <div id="table-component">
      <div className="table-header-actions">
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          placeholder={globalFilterPlaceholder}
        />
        <div className="action-btns">
          {saveButton &&
            saveButton.map(({ action, name, icon, disabled }) => (
              <Button
                id="action-btn"
                leftIcon={icon}
                color={'teal'}
                onClick={() => action()}
                disabled={disabled}
                size="xs"
              >
                {name}
              </Button>
            ))}
        </div>
      </div>

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
