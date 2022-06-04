import React, { FC, useEffect, useState, useRef, useMemo } from 'react';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';
import {
  SubjectContext,
  HeaderContext,
  HeaderFlags,
  NotificationContext,
  Notification,
} from '../../context';
import { axios } from '../../utils';
import { useCurrentUser } from '../../hooks';
import { teacherNavigations, studentNavigations } from '../../constants';
import { SubjectDropDown } from './SubjectDropDown';
import { XCircle } from 'react-feather';
import { Select, Button } from '@mantine/core';
import { Logout } from 'tabler-icons-react';

interface DashboardProps {}

export interface Subject {
  subject_id: string;
  subject_name: string;
}

const initialNotificationState: Notification = {
  text: '',
  type: 'success',
};

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();
  const [userSubjects, setUserSubjects] = useState<Subject[]>();
  const [selectedSubject, setSelectedSubject] = useState<string>('Math7');
  const [loading, setLoading] = useState<boolean>(true);
  const [headerFlags, setHeaderContextValue] = useState<HeaderFlags>({
    showSubjectDropdown: true,
    headerStringValue: '',
  });
  const [notification, setNotification] = useState<Notification>(
    initialNotificationState,
  );

  const headerContextMemo = useMemo(
    () => ({ headerFlags, setHeaderContextValue }),
    [headerFlags, setHeaderContextValue],
  );

  const notificationContextMemo = useMemo(
    () => ({ notification, setNotification }),
    [notification, setNotification],
  );

  const currentUser = useCurrentUser();

  useEffect(() => {
    setNotification(initialNotificationState);
  }, []);

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

          /**
           * Check first localstorage if there is a currently selected subject and use that
           */
          const localSubject = localStorage.getItem(
            'selectedSubject',
          ) as string;

          if (localSubject) setSelectedSubject(localSubject);
          else setSelectedSubject(subjects[0].subject_id);
        });
    }
  }, [currentUser]);

  return (
    <div className="dashboard">
      <div className="side">
        <div>
          <div id="school">
            <img src={SchoolLogo} alt="School Logo" height={150} width={150} />
          </div>

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
            <Button
              leftIcon={<Logout size={20} />}
              id="signout-btn"
              size="xs"
              color={'red'}
              type="submit"
            >
              Sign out{' '}
            </Button>
          </form>
        </div>
      </div>
      {loading ? (
        <p>Loading.. </p>
      ) : (
        <main>
          <div className="top">
            <div id="header-left">
              {/* {headerFlags?.showSubjectDropdown && (
                <Select
                  id="subject-dropdown"
                  placeholder="Select Subject"
                  data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                  ]}
                />
              )} */}
              <p>{headerFlags.headerStringValue}</p>
            </div>
          </div>
          <div className="content">
            <HeaderContext.Provider value={headerContextMemo}>
              <SubjectContext.Provider value={selectedSubject}>
                <NotificationContext.Provider value={notificationContextMemo}>
                  <Outlet />
                </NotificationContext.Provider>
              </SubjectContext.Provider>
            </HeaderContext.Provider>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
