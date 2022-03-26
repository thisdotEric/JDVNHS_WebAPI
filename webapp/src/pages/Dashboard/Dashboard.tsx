import React, { FC, useEffect, useState, useRef, useMemo } from 'react';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { SubjectContext, HeaderContext, HeaderFlags } from '../../context';
import { axios } from '../../utils';
import { useCurrentUser } from '../../hooks';
import { teacherNavigations, studentNavigations } from '../../constants';
import { SubjectDropDown } from './SubjectDropDown';

interface DashboardProps {}

export interface Subject {
  subject_id: string;
  subject_name: string;
}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();
  const [userSubjects, setUserSubjects] = useState<Subject[]>();
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [headerFlags, setHeaderContextValue] = useState<HeaderFlags>({
    showSubjectDropdown: true,
  });

  const headerContextMemo = useMemo(
    () => ({ headerFlags, setHeaderContextValue }),
    [headerFlags, setHeaderContextValue],
  );

  const currentUser = useCurrentUser();

  useEffect(() => {
    setLoading(true);

    if (currentUser) {
      /**
       * Get all the subjects of the user
       */
      axios
        .get(`${currentUser.role}/${currentUser.user_id}/subjects`)
        .then(subjectList => {
          const subjects = subjectList.data.data;
          setLoading(false);
          setUserSubjects(subjects);
          setSelectedSubject(subjects[0].subject_id);
        });
    }
  }, [currentUser]);

  return (
    <div className="dashboard">
      <div className="side">
        <div>
          <img src={SchoolLogo} alt="School Logo" height={170} width={170} />
          <SideNav
            links={
              currentUser?.role === 'student'
                ? studentNavigations
                : teacherNavigations
            }
          />
        </div>
        <div className="user">
          <p>
            {currentUser?.first_name} {currentUser?.middle_name}{' '}
            {currentUser?.last_name}
          </p>
          <form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();

              await axios.post('auth/logout');
              navigate('/');
            }}
          >
            <input type="submit" value="Sign out" />
          </form>
        </div>
      </div>
      {loading ? (
        <p>Loading.. </p>
      ) : (
        <main>
          <div className="top">
            {headerFlags?.showSubjectDropdown ? (
              <SubjectDropDown
                setSelectedSubject={setSelectedSubject}
                userSubjects={userSubjects}
              />
            ) : (
              <p>Hidden</p>
            )}
          </div>
          <div className="content">
            <HeaderContext.Provider value={headerContextMemo}>
              <SubjectContext.Provider value={selectedSubject}>
                <Outlet />
              </SubjectContext.Provider>
            </HeaderContext.Provider>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
