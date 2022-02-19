import React, { FC, useEffect, useState } from 'react';
import './SideNav.scss';
import { NavLink } from 'react-router-dom';
import type { UserType } from '../../types';
import type { ILink } from '../../constants';

interface SideNavProps {
  links: ILink[];
}

const SideNav: FC<SideNavProps> = ({ links }: SideNavProps) => {
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
