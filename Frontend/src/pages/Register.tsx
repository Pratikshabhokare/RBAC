import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER' // default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data || err.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Create a new account</h2>
      
      <form onSubmit={handleSubmit} style={{ border: '2px dotted blue', padding: '20px', width: '300px' }}>
        {error && (
          <div style={{ color: 'red', border: '1px solid red', padding: '5px', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: 'green', border: '1px solid green', padding: '5px', marginBottom: '10px' }}>
            {success}
          </div>
        )}
        
        <p>Full Name:</p>
        <input
          name="name"
          type="text"
          required
          style={{ width: '90%', marginBottom: '10px' }}
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

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
          minLength={6}
          style={{ width: '90%', marginBottom: '10px' }}
          placeholder="Enter password here"
          value={formData.password}
          onChange={handleChange}
        />

        <p>Role:</p>
        <select
          name="role"
          required
          style={{ width: '95%', marginBottom: '20px' }}
          value={formData.role}
          onChange={handleChange}
        >
          <option value="USER">User Role</option>
          <option value="ADMIN">Admin Role</option>
        </select>
        
        <br />
        <button
          type="submit"
          disabled={loading || !!success}
          style={{ 
            backgroundColor: 'green', 
            color: 'white', 
            width: '100%', 
            padding: '10px', 
            fontSize: '16px' 
          }}
        >
          {loading ? 'Registering...' : 'Click to Register'}
        </button>
        
        <div style={{ marginTop: '15px' }}>
          <Link to="/login" style={{ color: 'blue' }}>
            Already have an account? Sign in.
          </Link>
        </div>
      </form>
    </div>
  );
}
