import axios from '../../utils/axios';
import React, { FC, useEffect, useMemo, useState } from 'react';
import './Reports.scss';
import { Table } from '@mantine/core';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { TableComponent } from '../../components/Table';
import type { Column } from 'react-table';
import { Button } from '@mantine/core';
import { Notes } from 'tabler-icons-react';

interface ReportsProps {}

interface ReportsTable {
  user_id: string;
  LRN: string;
  fullname: string;
  conductRemediation: boolean;
}

const Reports: FC<ReportsProps> = ({}: ReportsProps) => {
  useSetPageTitle('Reports');
  useSetHeader({
    showSubjectDropdown: true,
    headerStringValue: 'Student Individual Reports',
  });

  const [students, setStudents] = useState<ReportsTable[]>([]);
  const navigate = useNavigate();

  const columns = useMemo(
    () =>
      [
        {
          Header: 'LRN',
          accessor: 'user_id',
        },
        {
          Header: 'STUDENT',
          accessor: 'fullname',
        },
        {
          Header: 'CONDUCT REMEDIATION',
          accessor: 'conductRemediation',
          Cell: row => {
            return (
              <p>
                {row.value
                  ? 'Conduct Remediation'
                  : 'Does not undergo remediation'}
              </p>
            );
          },
        },
        {
          Header: 'ACTION',
          accessor: 'LRN',
          Cell: row => {
            let conduct = false;

            row.data.forEach((r: any) => {
              if (r.LRN === row.value) conduct = r.conductRemediation;
            });

            return (
              <div>
                <Button
                  onClick={() => {
                    navigate(`/t/reports/student/${row.value}`);
                  }}
                  leftIcon={<Notes size={20} />}
                  size="xs"
                  color={!conduct && 'teal'}
                >
                  {conduct
                    ? ' View Personalized Remediation'
                    : 'View Additional Learning Materials'}
                </Button>
              </div>
            );
          },
        },
      ] as Column<ReportsTable>[],
    [],
  );

  const data = useMemo(() => students, [students]);

  useEffect(() => {
    axios.get('reports/subject/Math7').then(({ data }) => {
      setStudents(
        data.data.map((s: any) => ({
          user_id: s.user_id,
          fullname: `${s.last_name}, ${s.first_name} ${s.middle_name[0]}.`,
          conductRemediation: s.conductRemediation,
          LRN: s.user_id,
        })),
      );
    });
  }, []);

  return (
    <div id="reports">
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Reports;
