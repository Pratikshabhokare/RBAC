import { useEffect, useState } from 'react';
import { getPublicContent } from '../api/content';

export default function Home() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching public content');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ backgroundColor: 'lightgrey', padding: '20px', minHeight: '100vh' }}>
      <center>
        <h1>Welcome to the Full Stack RBAC System</h1>
      </center>
      
      <div style={{ background: 'white', border: '2px solid black', padding: '15px' }}>
        <h3>Public Content Area</h3>
        <p>This content is accessible to anyone without logging in.</p>
        <hr />
        
        <b>Status: </b> 
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span style={{ color: 'red' }}>{error}</span>
        ) : (
          <span style={{ color: 'green', fontSize: '20px' }}>{content}</span>
        )}
      </div>
    </div>
  );
}
