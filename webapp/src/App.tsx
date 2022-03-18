import React from 'react';
import { Students } from './components/Students';
import { Dashboard } from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Attendance } from './pages/Attendance';
import { NotFound } from './pages/404';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Scores } from './pages/Scores';
import { AddAttendance } from './pages/Attendance/AddAttendance';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes hasAccess="teacher" />}>
          <Route path="/t" element={<Dashboard />}>
            <Route path="students" element={<Students />} />
            <Route path="attendance">
              <Route path="" element={<Attendance />} />
              <Route path="new/:date" element={<AddAttendance />} />
            </Route>
            <Route path="assessments" element={<Scores />} />
            <Route
              path="lectures"
              element={
                <>
                  <p>Lectures</p>
                </>
              }
            />
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
