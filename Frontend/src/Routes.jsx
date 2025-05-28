import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Faculty from './pages/Faculty';
import Courses from './pages/Courses';
import Attendance from './pages/Attendance';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
}
