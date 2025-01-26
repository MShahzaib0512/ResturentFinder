'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './dashboard.css';

export default function DashboardPage() {
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch Restaurant Count from API
  useEffect(() => {
    const fetchRestaurantCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/restaurants');
        if (!res.ok) throw new Error('Failed to fetch restaurant data');
        const data = await res.json();
        setRestaurantCount(data.length); // Assuming the API returns an array of restaurants
      } catch (error) {
        console.error('Error fetching restaurant count:', error);
        setError('Failed to fetch restaurant count.');
      }
    };

    const fetchUserCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/users');
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUserCount(data.length); // Assuming the API returns an array of users
      } catch (error) {
        console.error('Error fetching user count:', error);
        setError('Failed to fetch user count.');
      }
    };

    fetchRestaurantCount();
    fetchUserCount();
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
            <p>{restaurantCount}</p>
          </div>
          <div className='stats-card'>
            <h3>Total Users</h3>
            <p>{userCount}</p>
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
