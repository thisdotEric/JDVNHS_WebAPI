import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks';

interface ProtectedRoutesProps {
  hasAccess: 'student' | 'teacher';
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  hasAccess,
}: ProtectedRoutesProps) => {
  const user = useCurrentUser();
  const navigate = useNavigate();

  return <>{user?.role === hasAccess ? <Outlet /> : navigate(-1)}</>;
};

export default ProtectedRoutes;
