import React, { FC } from 'react';

interface GlobalFilterProps {
  filter: string;
  setFilter: (filterValue: any) => void;
}

const GlobalFilter: FC<GlobalFilterProps> = ({
  filter,
  setFilter,
}: GlobalFilterProps) => {
  return (
    <span>
      Search{' '}
      <input
        type="text"
        value={filter || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  );
};

export default GlobalFilter;
