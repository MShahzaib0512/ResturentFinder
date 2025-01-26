'use client';

import Image from 'next/image';
import '../styles/about.css';

export default function AboutUsPage() {
  return (
    <div className='about-us-container'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <h1>About Us</h1>
          <p>
            Welcome to our culinary hub, where passion for food meets
            exceptional dining experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='mission-section'>
        <h2>🍽️ Our Mission</h2>
        <p>
          Our mission is to connect people with amazing dining spots, support
          local restaurants, and make every meal a memorable experience. We
          believe food brings people together, and we’re here to make that
          easier, tastier, and more exciting.
        </p>
      </section>

      {/* Our Story Section */}
      <section className='story-section'>
        <h2>📖 Our Story</h2>
        <p>
          Founded in 2020, we started with a simple idea: to make dining out
          easier and more delightful. What began as a small initiative has grown
          into a community of food lovers, restaurant owners, and culinary
          experts. Today, we proudly serve thousands of customers and continue
          to grow with the same passion.
        </p>
        <Image
          src='https://images.unsplash.com/photo-1544005313-94ddf0286df2'
          alt='Our Story'
          width={800}
          height={400}
          className='story-image'
        />
      </section>

      {/* Team Section */}
      <section className='team-section'>
        <h2>🤝 Meet Our Team</h2>
        <div className='team-cards'>
          {[
            {
              name: 'John Doe',
              role: 'CEO & Founder',
              img: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            {
              name: 'Jane Smith',
              role: 'Head of Operations',
              img: 'https://randomuser.me/api/portraits/women/2.jpg',
            },
            {
              name: 'Emily Johnson',
              role: 'Lead Developer',
              img: 'https://randomuser.me/api/portraits/women/3.jpg',
            },
            {
              name: 'David Brown',
              role: 'Marketing Lead',
              img: 'https://randomuser.me/api/portraits/men/4.jpg',
            },
          ].map((member, index) => (
            <div key={index} className='team-card'>
              <Image
                src={member.img}
                alt={member.name}
                width={200}
                height={200}
                className='team-image'
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='testimonials-section'>
        <h2>💬 What Our Customers Say</h2>
        <div className='testimonials'>
          <div className='testimonial'>
            <p>
              This platform has completely changed the way I discover new
              restaurants. It is fantastic!
            </p>
            <h4>- Alex Turner</h4>
          </div>
          <div className='testimonial'>
            <p>
              Great service, user-friendly interface, and excellent restaurant
              recommendations!
            </p>
            <h4>- Maria Lopez</h4>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='contact-section'>
        <h2>📞 Get in Touch</h2>
        <p>
          We would love to hear from you! Reach out to us with any questions,
          suggestions, or feedback.
        </p>
        <button>Contact Us</button>
      </section>
    </div>
  );
}
