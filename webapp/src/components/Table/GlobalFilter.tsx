import React, { FC } from 'react';
import { TextInput } from '@mantine/core';

interface GlobalFilterProps {
  filter: string;
  placeholder?: string;
  setFilter: (filterValue: any) => void;
}

const GlobalFilter: FC<GlobalFilterProps> = ({
  filter,
  setFilter,
  placeholder = 'Search',
}: GlobalFilterProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      id="filter-searchbox"
      value={filter || ''}
      onChange={e => setFilter(e.target.value)}
    />
  );
};

export default GlobalFilter;
