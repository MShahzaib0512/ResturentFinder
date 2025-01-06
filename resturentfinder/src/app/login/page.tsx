'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import '../styles/auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin@gmail.com') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  return (
    <div className='auth-container'>
      <h1 className='auth-title'>Login</h1>
      <form onSubmit={handleLogin} className='auth-form'>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='form-group password-group'>
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />
          <button
            type='button'
            className='eye-button'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        <button type='submit' className='auth-button'>
          Login
        </button>
      </form>
      <p className='auth-link'>
        Not have an account?{' '}
        <Link href='/signup'>
          <span className='auth-link-text'>Sign up here</span>
        </Link>
      </p>
    </div>
  );
}
