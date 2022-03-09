import React from 'react';
import { Students } from './components/Students';
import { Dashboard } from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Attendance } from './pages/Attendance';
import { NotFound } from './pages/404';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Scores } from './pages/Scores';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes hasAccess="teacher" />}>
          <Route path="/t" element={<Dashboard />}>
            <Route path="students" element={<Students />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="assessments" element={<Scores />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes hasAccess="student" />}>
          <Route path="/s" element={<Dashboard />}>
            <Route
              path="profile"
              element={
                <>
                  <p>John Eric Siguenza</p>
                </>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
