'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/contact.css';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='contact-us-container container'>
      <h1 className='text-center mb-4 animate__animated animate__fadeInDown'>
        📞 Contact Us
      </h1>
      <p className='text-center mb-5'>
        We would love to hear from you! Fill out the form below, and we will get
        back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className='contact-form animate__animated animate__fadeInUp'
      >
        <div className='form-group mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='form-control'
            placeholder='Enter your name'
            required
          />
        </div>

        <div className='form-group mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='form-control'
            placeholder='Enter your email'
            required
          />
        </div>

        <div className='form-group mb-4'>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            className='form-control'
            placeholder='Write your message here...'
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='btn btn-primary btn-block submit-btn animate__animated animate__pulse'
        >
          Send Message
        </button>

        {submitted && (
          <div className='alert alert-success mt-4 animate__animated animate__fadeIn'>
            Thank you for your message! We would get back to you soon.
          </div>
        )}
      </form>
    </div>
  );
}
