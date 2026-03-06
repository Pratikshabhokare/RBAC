import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authenticateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await login(formData);
      authenticateUser(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Sign in to your account</h2>
      
      <form onSubmit={handleSubmit} style={{ border: '2px dotted blue', padding: '20px', width: '300px' }}>
        {error && (
          <div style={{ color: 'red', border: '1px solid red', padding: '5px', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        
        <p>Email:</p>
        <input
          name="email"
          type="email"
          required
          style={{ width: '90%', marginBottom: '10px' }}
          placeholder="Enter email here"
          value={formData.email}
          onChange={handleChange}
        />
        
        <p>Password:</p>
        <input
          name="password"
          type="password"
          required
          style={{ width: '90%', marginBottom: '20px' }}
          placeholder="Enter password here"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{ 
            backgroundColor: 'green', 
            color: 'white', 
            width: '100%', 
            padding: '10px', 
            fontSize: '16px' 
          }}
        >
          {loading ? 'Logging in...' : 'Click to Login'}
        </button>
        
        <div style={{ marginTop: '15px' }}>
          <Link to="/register" style={{ color: 'blue' }}>
            Click here if you don't have an account yet!
          </Link>
        </div>
      </form>
    </div>
  );
}
