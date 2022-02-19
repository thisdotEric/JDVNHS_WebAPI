import React, { FC } from 'react';
import './SideNav.scss';
import { NavLink } from 'react-router-dom';

interface SideNavProps {}

interface ILink {
  to: string;
  name: string;
}

const links: ILink[] = [
  {
    to: '/t/students',
    name: 'Students',
  },
  // {
  //   to: '/attendance',
  //   name: 'Attendance',
  // },
];

const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  return (
    <nav>
      {links.map((link, index) => (
        <NavLink key={index} className="link" to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default SideNav;
