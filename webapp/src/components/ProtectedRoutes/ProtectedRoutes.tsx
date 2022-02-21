import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axios } from '../../utils';

interface ProtectedRoutesProps {
  hasAccess: 'student' | 'teacher';
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  hasAccess,
}: ProtectedRoutesProps) => {
  const [userRole, setUserRole] = useState<string>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('/api/auth/me').then(({ data }) => {
      setUserRole(data.role);

      setLoading(!loading);
    });
  }, []);

  return (
    <>
      {loading ? <p></p> : userRole === hasAccess ? <Outlet /> : navigate(-1)}
    </>
  );
};

export default ProtectedRoutes;
