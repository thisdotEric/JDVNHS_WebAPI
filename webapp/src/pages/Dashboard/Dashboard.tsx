import React, { FC, useEffect, useState, useRef, useMemo } from 'react';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { SubjectContext } from '../../context';
import { axios } from '../../utils';
import { User, UserContext } from '../../context';

interface DashboardProps {}

interface Subject {
  subject_id: string;
  subject_name: string;
}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [userSubjects, setUserSubjects] = useState<Subject[]>();
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    /**
     * Get the currently logged in user
     */
    axios.get<User>('/api/auth/me').then(me => {
      setUser(me.data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    if (user) {
      /**
       * Get all the subjects of the user
       */
      axios
        .get(`/api/${user.role}/${user.user_id}/subjects`)
        .then(subjectList => {
          const subjects = subjectList.data.data;
          setLoading(false);
          setUserSubjects(subjects);
          setSelectedSubject(subjects[0].subject_id);
        });
    }
  }, [user]);

  return (
    <div className="dashboard">
      <div className="side">
        <div>
          <img src={SchoolLogo} alt="School Logo" height={170} width={170} />
          <SideNav />
        </div>
        <div className="user">
          <p>
            {user?.first_name} {user?.middle_name} {user?.last_name}
          </p>
          <form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();

              await axios.post('/api/auth/logout');
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
            <select
              ref={ref}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedSubject(e.target.value);
                localStorage.setItem('selectedSubject', e.target.value);
              }}
            >
              {userSubjects &&
                userSubjects.map(({ subject_id, subject_name }, index) => (
                  <option value={subject_id}>{subject_name}</option>
                ))}
            </select>

            <p>Students</p>
          </div>
          <div className="content">
            <UserContext.Provider value={userValue}>
              <SubjectContext.Provider value={selectedSubject}>
                <Outlet />
              </SubjectContext.Provider>
            </UserContext.Provider>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
