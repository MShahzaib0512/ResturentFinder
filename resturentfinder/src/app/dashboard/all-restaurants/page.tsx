'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../sidebar';
import '../all-restaurants/restaurants.css';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  contact: string;
  cuisine: string[];
  image: string;
  details: string;
  google_maps_link: string;
  iframe: string;
}

export default function AllRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch all restaurants on load
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch('http://localhost:5000/restaurants');
        if (!res.ok) throw new Error('Failed to fetch restaurants');
        const data = await res.json();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle search query change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
        restaurant.city.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Open the edit modal
  const handleEdit = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/restaurants/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete restaurant');

      setRestaurants(restaurants.filter((r) => r.id !== id));
      setFilteredRestaurants(filteredRestaurants.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Failed to delete restaurant:', error);
    }
  };

  // Handle modal form submission (update restaurant)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurant) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/restaurants/${selectedRestaurant.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedRestaurant),
        }
      );

      if (!res.ok) throw new Error('Failed to update restaurant');

      const updatedRestaurant = await res.json();
      setRestaurants(
        restaurants.map((r) =>
          r.id === updatedRestaurant.id ? updatedRestaurant : r
        )
      );
      setFilteredRestaurants(
        filteredRestaurants.map((r) =>
          r.id === updatedRestaurant.id ? updatedRestaurant : r
        )
      );

      setShowModal(false);
      setSelectedRestaurant(null);
    } catch (error) {
      console.error('Failed to update restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='dashboard-container'>
      <Sidebar onLogout={() => router.push('/login')} />
      <main className='dashboard-main'>
        <h1 className='dashboard-title'>🍽️ All Restaurants</h1>

        {/* Search Bar */}
        <input
          type='text'
          className='search-bar'
          placeholder='Search by city...'
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* Restaurant List */}
        <div className='restaurant-list'>
          {filteredRestaurants.length === 0 ? (
            <p>No restaurants found matching your search.</p>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className='restaurant-card'>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.city}</p>
                <p>{restaurant.details}</p>
                <div>
                  <button onClick={() => handleEdit(restaurant)}>Edit</button>
                  <button onClick={() => handleDelete(restaurant.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for Editing Restaurant */}
        {showModal && selectedRestaurant && (
          <div className='modal active'>
            <div className='modal-content'>
              <h2>Edit Restaurant</h2>
              <form onSubmit={handleUpdate}>
                <label htmlFor='name'>Restaurant Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={selectedRestaurant.name}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      name: e.target.value,
                    })
                  }
                  placeholder='Restaurant Name'
                  required
                />

                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={selectedRestaurant.address}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      address: e.target.value,
                    })
                  }
                  placeholder='Address'
                  required
                />

                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  value={selectedRestaurant.city}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      city: e.target.value,
                    })
                  }
                  placeholder='City'
                  required
                />

                <label htmlFor='contact'>Contact</label>
                <input
                  type='text'
                  id='contact'
                  name='contact'
                  value={selectedRestaurant.contact}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      contact: e.target.value,
                    })
                  }
                  placeholder='Contact'
                  required
                />

                <label htmlFor='cuisine'>Cuisine (comma separated)</label>
                <input
                  type='text'
                  id='cuisine'
                  name='cuisine'
                  value={selectedRestaurant.cuisine.join(', ')}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      cuisine: e.target.value.split(',').map((c) => c.trim()),
                    })
                  }
                  placeholder='Cuisine (comma separated)'
                  required
                />

                <label htmlFor='image'>Image URL</label>
                <input
                  type='text'
                  id='image'
                  name='image'
                  value={selectedRestaurant.image}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      image: e.target.value,
                    })
                  }
                  placeholder='Image URL'
                />

                <label htmlFor='details'>Details</label>
                <textarea
                  id='details'
                  name='details'
                  value={selectedRestaurant.details}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      details: e.target.value,
                    })
                  }
                  placeholder='Details'
                ></textarea>

                <label htmlFor='google_maps_link'>Google Maps Link</label>
                <input
                  type='text'
                  id='google_maps_link'
                  name='google_maps_link'
                  value={selectedRestaurant.google_maps_link}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      google_maps_link: e.target.value,
                    })
                  }
                  placeholder='Google Maps Link'
                />

                <label htmlFor='iframe'>Google Maps Iframe</label>
                <input
                  type='text'
                  id='iframe'
                  name='iframe'
                  value={selectedRestaurant.iframe}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      iframe: e.target.value,
                    })
                  }
                  placeholder='Google Maps Iframe'
                />

                <button type='submit' disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button type='button' onClick={() => setShowModal(false)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
