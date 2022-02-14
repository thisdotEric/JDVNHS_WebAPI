import React, { FC, useEffect, useState, useRef } from 'react';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { SubjectContext } from '../../context';
import { axios } from '../../utils';

interface DashboardProps {}

interface Subject {
  subject_id: string;
  subject_name: string;
}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [subjects, setSubjects] = useState<Subject[]>();
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    axios.get('teacher/1111111/subjects').then(subjectList => {
      const teachersSubject = subjectList.data.data;
      setLoading(false);
      setSubjects(teachersSubject);
      setSelectedSubject(teachersSubject[0].subject_id);
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="side">
        <div>
          <img src={SchoolLogo} alt="School Logo" height={170} width={170} />
          <SideNav />
        </div>
        <div className="user">
          <p>John Eric Siguenza</p>
          <form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();

              await axios.post('auth/logout');
              navigate('/signin');
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
              {subjects &&
                subjects.map(({ subject_id, subject_name }, index) => (
                  <option value={subject_id}>{subject_name}</option>
                ))}
            </select>

            <p>Students</p>
          </div>
          <div className="content">
            <SubjectContext.Provider value={selectedSubject}>
              <Outlet />
            </SubjectContext.Provider>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
