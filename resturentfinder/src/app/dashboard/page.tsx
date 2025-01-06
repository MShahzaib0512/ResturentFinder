'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './dashboard.css';

interface Stats {
  restaurants: number;
  users: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ restaurants: 0, users: 0 });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch Stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to fetch stats, displaying default data.');
        // Fallback data
        setStats({
          restaurants: 45,
          users: 120,
        });
      }
    };

    fetchStats();
  }, []);

  // Handle Add Restaurant Navigation
  const handleAddRestaurant = () => {
    router.push('/dashboard/add-restaurant');
  };

  // Handle View All Restaurants Navigation
  const handleViewAllRestaurants = () => {
    router.push('/dashboard/all-restaurants');
  };

  // Handle Logout
  const handleLogout = () => {
    alert('Logging out...');
    window.location.href = '/login';
  };

  return (
    <div className='dashboard-container'>
      <Sidebar onLogout={handleLogout} />
      <main className='dashboard-main'>
        <h1 className='dashboard-title'>Admin Dashboard</h1>
        {error && <p className='error-message'>{error}</p>}
        <div className='stats-container'>
          <div className='stats-card'>
            <h3>Total Restaurants</h3>
            <p>{stats.restaurants}</p>
          </div>
          <div className='stats-card'>
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
        </div>
        <button className='add-restaurant-btn' onClick={handleAddRestaurant}>
          ➕ Add New Restaurant
        </button>
        <button
          className='view-all-restaurants-btn'
          onClick={handleViewAllRestaurants}
        >
          🍽️ View All Restaurants
        </button>
      </main>
    </div>
  );
}
