import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import './Dashboard.css';

function Dashboard({ onLogout, user }) {
  return (
    <div className="dashboard">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="dashboard-content">
        <DashboardHeader user={user} />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
