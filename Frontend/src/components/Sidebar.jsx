import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>University</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/faculty">Faculty</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
        </ul>
      </nav>
    </div>
  );
}
