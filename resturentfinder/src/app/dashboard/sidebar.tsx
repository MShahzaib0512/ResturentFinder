'use client';
import './dashboard.css';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className='sidebar'>
      <h2 className='sidebar-title'>Admin Panel</h2>
      <ul className='sidebar-menu'>
        <li>🏠 Dashboard</li>
        <li>📊 Analytics</li>
        <li>🍽️ Restaurants</li>
        <li>👥 Users</li>
      </ul>
      <button className='logout-btn' onClick={onLogout}>
        🚪 Logout
      </button>
    </aside>
  );
}
