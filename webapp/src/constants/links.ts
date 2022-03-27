export interface ILink {
  to: string;
  name: string;
}

const studentNavigations: ILink[] = [
  {
    to: '/s/profile',
    name: 'Profile',
  },
];

const teacherNavigations: ILink[] = [
  {
    to: '/t/students',
    name: 'Students',
  },
  {
    to: '/t/lectures',
    name: 'Lectures',
  },
  {
    to: '/t/attendance',
    name: 'Attendance',
  },
  {
    to: '/t/assessments',
    name: 'Assessments',
  },
  {
    to: '/t/grades',
    name: 'Grades',
  },
  {
    to: '/t/reports',
    name: 'Reports',
  },
];

export { studentNavigations, teacherNavigations };
