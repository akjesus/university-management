import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="cards">
        <DashboardCard title="Students" count={1200} />
        <DashboardCard title="Faculty" count={80} />
        <DashboardCard title="Courses" count={150} />
        <DashboardCard title="Attendance" count={"93% Avg"} />
      </div>
    </div>
  );
}
