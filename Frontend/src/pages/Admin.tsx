import { useEffect, useState } from 'react';
import { getAdminContent } from '../api/content';

export default function Admin() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.status === 403 
          ? "Forbidden: You don't have ADMIN role." 
          : err.message || 'Error fetching admin content'
        );
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fee' }}>
      <h1>Admin Control Panel</h1>
      
      <div style={{ border: '3px solid darkred', padding: '15px' }}>
        <h3 style={{ color: 'darkred' }}>Admin Content Card</h3>
        <p>Only users with the ROLE_ADMIN can view this data.</p>
        <hr />
        
        {loading ? (
          <p>Loading admin content...</p>
        ) : error ? (
          <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
            <h2>Access Denied</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div style={{ border: '2px dashed red', padding: '10px' }}>
            <h2 style={{ color: 'red' }}>{content}</h2>
            <p>Authorized request successfully processed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
