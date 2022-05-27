import React, { FC, useEffect, useMemo, useState } from 'react';
import './LearningMaterials.scss';
import { useSetHeader, useSetPageTitle } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { axios } from '../../utils';
import type { Column } from 'react-table';
import { TableComponent } from '../../components/Table';
import { Button, Modal, TextInput } from '@mantine/core';

interface LearningMaterialsProps {}

export interface LearningMaterial {
  id?: number;
  code: string;
  learning_material: string;
  link?: string;
}

const LearningMaterials: FC<
  LearningMaterialsProps
> = ({}: LearningMaterialsProps) => {
  const code = useParams().code || '';
  useSetPageTitle('Learning Materials');
  useSetHeader({
    headerStringValue: `Learning Materials for ${code}`,
    showSubjectDropdown: false,
  });

  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [opened, setOpened] = useState(false);
  const [learningMaterial, setLearningMaterial] = useState<LearningMaterial>({
    code,
    learning_material: '',
    link: '',
  });
  const [refetch, setRefetch] = useState(0);

  const fetchLearningMaterials = async () => {
    const { data } = await axios.get(`reports/Math7/materials/${code}`);
    setMaterials(data.data);
  };

  const columns = useMemo(
    () =>
      [
        {
          Header: 'LEARNING MATERIAL',
          accessor: 'learning_material',
        },
        {
          Header: 'ACTIONS',
          accessor: 'code',
          Cell: row => {
            return (
              <div>
                <a href={row.row.original.link} target={'_blank'}>
                  View
                </a>
                &nbsp;&nbsp; &nbsp;&nbsp;
                <Button
                  id="delete-button"
                  onClick={async () => {
                    setMaterials(old =>
                      old.filter(l => l.id != row.row.original.id),
                    );

                    await axios.delete(
                      `subject/Math7/learning-materials/${row.row.original.id}`,
                    );
                  }}
                >
                  Delete
                </Button>
              </div>
            );
          },
        },
      ] as Column<LearningMaterial>[],
    [],
  );

  const data = useMemo(() => materials, [materials]);

  useEffect(() => {
    fetchLearningMaterials();
  }, []);

  useEffect(() => {
    fetchLearningMaterials();
  }, [refetch]);

  return (
    <div>
      <TableComponent
        columns={columns}
        data={data}
        actions={[
          {
            action: async () => setOpened(true),
            name: 'Add new Learning Material',
          },
        ]}
      />

      <Modal
        opened={opened}
        styles={{
          title: { fontWeight: 'bold', fontSize: 16 },
        }}
        closeOnEscape={false}
        onClose={() => setOpened(false)}
        title="Add new Learning Material"
      >
        <form
          onSubmit={async e => {
            e.preventDefault();

            await axios.post('subject/Math7/learning-materials', {
              learningMaterial,
            });

            setOpened(false);
            setRefetch(Math.random());
          }}
        >
          <TextInput
            label="Name"
            onChange={e => {
              setLearningMaterial({
                ...learningMaterial,
                learning_material: e.target.value!,
              });
            }}
          />
          <TextInput
            label="Link"
            onChange={e => {
              setLearningMaterial({
                ...learningMaterial,
                link: e.target.value!,
              });
            }}
          />

          <Button
            type="submit"
            color={'teal'}
            styles={{
              root: {
                marginTop: 10,
                width: '100%',
              },
            }}
          >
            Add new Learning Material
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default LearningMaterials;
