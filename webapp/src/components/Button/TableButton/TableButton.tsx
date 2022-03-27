import React, { FC } from 'react';
import './TableButton.scss';

interface TableButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: string;
}

const TableButton: FC<TableButtonProps> = (props: TableButtonProps) => {
  return (
    <button {...props} id="table-button">
      {props.value}
    </button>
  );
};

export default TableButton;
