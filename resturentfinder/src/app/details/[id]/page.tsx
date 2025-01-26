'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this for accessing dynamic route parameters
import '../[id]/blog.css';

interface Blog {
  title: string;
  content: {
    story: string;
    cuisine: {
      intro: string;
      highlights: string[];
    };
    ambiance: string;
    chef: {
      name: string;
      experience: string;
      philosophy: string;
    };
    events: string[];
    sustainability: string[];
    reviews: string[];
    address: string;
    contact: {
      social_media: {
        facebook: string;
        instagram: string;
      };
      newsletter: string;
    };
  };
}

interface Restaurant {
  id: number;
  name: string;
  city: string;
  address: string;
  contact: string;
  cuisine: string[];
  details: string;
  image: string;
  google_maps_link: string;
  iframe: string;
}

export default function BlogPage() {
  const params = useParams(); // Use useParams hook
  const [id, setId] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);

  // Unwrap params
  useEffect(() => {
    const unwrapParams = async () => {
      if (params) {
        const unwrappedParams = await params;
        if (typeof unwrappedParams.id === 'string') {
          setId(unwrappedParams.id);
        } else {
          setId(null);
        }
      }
    };

    unwrapParams();
  }, [params]);

  // Fetch restaurant and blog data
  useEffect(() => {
    if (!id) return;

    const fetchRestaurantData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/restaurants/${id}`);
        if (!res.ok) throw new Error('Failed to fetch restaurant data');
        const data = await res.json();
        setRestaurant(data);
        fetchBlogData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRestaurantData();
  }, [id]);

  // Fetch blog data (inside the main function to avoid unused variable warning)
  const fetchBlogData = (restaurantData: Restaurant) => {
    const blogData: Blog = {
      title: `Welcome to ${restaurantData.name}: A Culinary Journey Awaits`,
      content: {
        story: 'Every great restaurant has an inspiring story...',
        cuisine: {
          intro: `At ${restaurantData.name}, food is an art form...`,
          highlights: [
            'Fresh, Locally-Sourced Ingredients',
            'Signature Dishes',
            'Something for Everyone',
          ],
        },
        ambiance: 'The moment you step into our restaurant...',
        chef: {
          name: 'Chef’s Name',
          experience: 'X years of experience in world-class kitchens',
          philosophy: 'Creating dishes that bring people together',
        },
        events: ['Weekly Specials', 'Happy Hour', 'Seasonal Tastings'],
        sustainability: [
          'Using biodegradable packaging',
          'Partnering with local charities',
        ],
        reviews: ['Amazing food!', 'Perfect for a birthday celebration'],
        address: restaurantData.address,
        contact: {
          social_media: {
            facebook: 'https://facebook.com/restaurant',
            instagram: 'https://instagram.com/restaurant',
          },
          newsletter: 'Subscribe to our newsletter for exclusive updates.',
        },
      },
    };
    setBlog(blogData);
  };

  if (!restaurant || !blog) return <div>Loading...</div>;

  return (
    <div className='restaurant-detail'>
      <div className='restaurant-header'>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.details}</p>
        <Image
          src={
            restaurant.image
              ? restaurant.image // Use the image URL directly from the API
              : '/images/default-image.jpg' // Fallback to a local default image
          }
          alt={restaurant.name}
          width={600}
          height={400}
          unoptimized
          className='restaurant-image'
        />
        <p>
          <strong>City:</strong> {restaurant.city}
        </p>
        <p>
          <strong>Address:</strong> {restaurant.address}
        </p>
        <a
          href={restaurant.google_maps_link}
          target='_blank'
          rel='noopener noreferrer'
        >
          View on Google Maps
        </a>
      </div>

      <div className='blog-section'>
        <h2>{blog.title}</h2>
        <p>{blog.content.story}</p>

        <div className='cuisine-section'>
          <h3>Cuisine Highlights</h3>
          <p>{blog.content.cuisine.intro}</p>
          <ul>
            {blog.content.cuisine.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className='chef-section'>
          <h3>Our Chef</h3>
          <p>
            {blog.content.chef.name} – {blog.content.chef.experience}
          </p>
          <p>{blog.content.chef.philosophy}</p>
        </div>

        <div className='events-section'>
          <h3>Events</h3>
          <ul>
            {blog.content.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>

        <div className='sustainability-section'>
          <h3>Sustainability</h3>
          <ul>
            {blog.content.sustainability.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className='reviews-section'>
          <h3>Customer Reviews</h3>
          <ul>
            {blog.content.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
