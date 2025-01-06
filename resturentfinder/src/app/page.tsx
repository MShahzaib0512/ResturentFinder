'use client'; // Ensure this line is at the very top of the file

import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './styles/Home.css';

interface Restaurant {
  id: number;
  name: string;
  city: string;
  address: string;
  contact: string;
  cuisine: string[];
  details: string;
  image?: string;
  iframe: string;
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter(); // Initialize useRouter

  const apiUrl = 'http://localhost:5000/restaurants';

  // Fetch all restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data: Restaurant[] = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Redirect to restaurant details page
  const handleReadMore = (id: number) => {
    router.push(`/details/${id}`); // Navigate to the details page
  };

  return (
    <div className='all-restaurants'>
      {/* Search Section */}
      <header className='search-header'>
        <h1>Find Your Favorite Restaurant</h1>
        <input
          type='text'
          placeholder='Search restaurants...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label='Search restaurants by name'
          className='search-input'
        />
      </header>

      {/* Restaurant List */}
      <main className='main-content'>
        <div id='restaurant-list' className='restaurant-list'>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className='restaurant-card'>
                <Image
                  src={
                    restaurant.image
                      ? `/images/${restaurant.image}`
                      : '/images/default-image.jpg'
                  }
                  alt='Restaurant Image'
                  width={240}
                  height={200}
                  className='restaurant-image'
                />
                <h3>{restaurant.name}</h3>
                <p>
                  <strong>City:</strong> {restaurant.city}
                </p>
                <p>
                  <strong>Address:</strong> {restaurant.address}
                </p>
                <p>
                  <strong>Contact:</strong> {restaurant.contact}
                </p>
                <button
                  className='custom-button'
                  onClick={() => handleReadMore(restaurant.id)}
                  aria-label={`View more details about ${restaurant.name}`}
                >
                  <span>Read More</span>
                </button>
              </div>
            ))
          ) : (
            <p className='no-results'>
              No restaurants found for your search term.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
