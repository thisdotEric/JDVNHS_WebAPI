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
import { Lectures } from './pages/Lectures';
import { Assessments } from './pages/Assessments';
import { AddScores } from './pages/Scores/AddScores';
import { Grades } from './pages/Grades';
import { Reports, StudentReport } from './pages/Reports';
import { LearningMaterials } from './pages/LearningMaterials';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes hasAccess="teacher" />}>
          <Route path="/t" element={<Dashboard />}>
            <Route path="students" element={<Students />} />

            <Route path="assessments">
              <Route path="" element={<Assessments />} />
              <Route path="scores/:id" element={<Scores />} />
              <Route path="scores/new/:id" element={<AddScores />} />
            </Route>
            <Route path="lectures">
              <Route path="" element={<Lectures />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="attendance/:id" element={<Attendance />} />
              <Route
                path="attendance/new/:lecture_id"
                element={<AddAttendance />}
              />
              <Route path="materials/:code" element={<LearningMaterials />} />
            </Route>
            <Route path="reports">
              <Route path="" element={<Reports />} />
              <Route path="student/:LRN" element={<StudentReport />} />
            </Route>
            <Route path="Grades" element={<Grades />} />
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
