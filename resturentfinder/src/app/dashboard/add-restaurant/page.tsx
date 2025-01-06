'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../sidebar';
import '../dashboard.css';

export default function AddRestaurantPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    contact: '',
    cuisine: '',
    image: '',
    details: '',
    google_maps_link: '',
    iframe: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:5000/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cuisine: formData.cuisine.split(',').map((c) => c.trim()),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add restaurant');
      }

      setSuccess('Restaurant added successfully!');
      setFormData({
        name: '',
        address: '',
        city: '',
        contact: '',
        cuisine: '',
        image: '',
        details: '',
        google_maps_link: '',
        iframe: '',
      });

      // Redirect back to dashboard
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to add restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='dashboard-container'>
      <Sidebar onLogout={() => router.push('/login')} />
      <main className='dashboard-main'>
        <h1 className='dashboard-title'>➕ Add New Restaurant</h1>
        {error && <p className='error-message'>{error}</p>}
        {success && <p className='success-message'>{success}</p>}
        <form className='restaurant-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Restaurant Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Restaurant Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Address'
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              name='city'
              placeholder='City'
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='contact'>Contact Number</label>
            <input
              type='number'
              id='contact'
              name='contact'
              placeholder='Contact Number'
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='cuisine'>Cuisine (comma-separated)</label>
            <input
              type='text'
              id='cuisine'
              name='cuisine'
              placeholder='Cuisine (comma-separated)'
              value={formData.cuisine}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='image'>Image URL</label>
            <input
              type='text'
              id='image'
              name='image'
              placeholder='Image URL'
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='details'>Details</label>
            <textarea
              id='details'
              name='details'
              placeholder='Details'
              value={formData.details}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='google_maps_link'>Google Maps Link</label>
            <input
              type='text'
              id='google_maps_link'
              name='google_maps_link'
              placeholder='Google Maps Link'
              value={formData.google_maps_link}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='iframe'>Google Maps Iframe Link</label>
            <input
              type='text'
              id='iframe'
              name='iframe'
              placeholder='Google Maps Iframe Link'
              value={formData.iframe}
              onChange={handleChange}
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </main>
    </div>
  );
}
