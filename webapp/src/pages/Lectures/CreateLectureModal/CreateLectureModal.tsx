import { Button, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { axios } from '../../../utils';
import './CreateLectureModal.scss';

interface CreateLectureModalProps {
  subject_id: string;
  grading_period: number;
  refetchLectures: Dispatch<SetStateAction<boolean>>;
  close: () => void;
}

interface LearningCompetency {
  code: string;
  learning_competency: string;
}

export interface Lecture {
  lecture_date: Date;
  subject_id: string;
  grading_period: number;
  code: string;
}

const CreateLectureModal: FC<CreateLectureModalProps> = ({
  subject_id,
  grading_period,
  refetchLectures,
  close,
}: CreateLectureModalProps) => {
  /**
   * Things to implement
   * 1. Query all learning competency based on the given grading period
   * 2. Provide a dropdown containing all the learning competency
   * 3. Provide the session date
   *
   * Some improvements
   * 1. What to do with duplicate learning sessions, leave for now
   *
   */

  const [learningCompetencies, setLearningCompetencies] = useState<
    LearningCompetency[]
  >([]);
  const [lecture, setLecture] = useState<Lecture>({
    code: '',
    grading_period,
    subject_id,
    lecture_date: new Date(),
  });

  const getLearningCompetencies = async () => {
    const { data } = await axios.get('subject/Math7/1/competencies');

    setLearningCompetencies(
      data.data.map((lc: any) => {
        return {
          code: lc.code,
          learning_competency: lc.learning_competency,
        };
      }),
    );
  };

  const data = useMemo(
    () =>
      learningCompetencies.map(({ code, learning_competency }) => ({
        value: code,
        label: `${code} - ${learning_competency}`,
      })),
    [learningCompetencies, setLearningCompetencies],
  );

  useEffect(() => {
    getLearningCompetencies();
  }, []);

  return (
    <form
      id="create-lecture"
      onSubmit={async e => {
        e.preventDefault();

        await axios.post('subject/Math7/lectures', {
          lecture: JSON.stringify(lecture),
        });

        refetchLectures(true);
        close();
      }}
    >
      <DatePicker
        classNames={{
          label: 'radio-label',
        }}
        size="md"
        placeholder="Pick date"
        label="Quarterly Assessment Date"
        value={lecture.lecture_date}
        onChange={date => {
          console.log(date);

          setLecture({ ...lecture, lecture_date: date! });
        }}
        required
      />

      <Select
        label="Learning Competency"
        placeholder="Pick one"
        data={data}
        onChange={code => setLecture({ ...lecture, code: code! })}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default CreateLectureModal;
