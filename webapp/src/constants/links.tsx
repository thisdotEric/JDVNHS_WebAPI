import React from 'react';
import {
  Activity,
  BarChart2,
  BookOpen,
  CheckSquare,
  FileText,
  UserCheck,
} from 'react-feather';

import { Bulb } from 'tabler-icons-react';

export interface ILink {
  to: string;
  name: string;
  icon: JSX.Element | null;
}

const studentNavigations: ILink[] = [
  {
    to: '/s/profile',
    name: 'Profile',
    icon: <UserCheck id="sidenav-icon" />,
  },
];

const teacherNavigations: ILink[] = [
  {
    to: '/t/students',
    name: 'Students',
    icon: <UserCheck id="sidenav-icon" />,
  },
  {
    to: '/t/lectures',
    name: 'Lectures',
    icon: <BookOpen id="sidenav-icon" />,
  },
  // {
  //   to: '/t/attendance',
  //   name: 'Attendance',
  //   icon: <CheckSquare id="sidenav-icon" />,
  // },
  {
    to: '/t/assessments',
    name: 'Assessments',
    icon: <FileText id="sidenav-icon" />,
  },
  {
    to: '/t/grades',
    name: 'Grades',
    icon: <Activity id="sidenav-icon" />,
  },
  {
    to: '/t/reports',
    name: 'Reports',
    icon: <BarChart2 id="sidenav-icon" />,
  },
  {
    to: '/t/competencies',
    name: 'Learning Competencies',
    icon: <Bulb id="sidenav-icon" size={30} />,
  },
];

export { studentNavigations, teacherNavigations };
