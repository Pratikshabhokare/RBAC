import { useEffect, useState } from 'react';
import { getUserContent } from '../api/content';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching user content');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <hr />
      
      <div style={{ border: '2px solid navy', padding: '15px', marginBottom: '20px' }}>
        <h3 style={{ color: 'navy' }}>User Profile Card</h3>
        <p>Personal details and current session information.</p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid gray', padding: '8px' }}><b>Full name</b></td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{user?.name}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid gray', padding: '8px' }}><b>Email address</b></td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>{user?.email}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid gray', padding: '8px' }}><b>Assigned Roles</b></td>
              <td style={{ border: '1px solid gray', padding: '8px' }}>
                <ul>
                  {user?.roles.map(role => (
                    <li key={role}>{role.replace('ROLE_', '')}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ border: '2px solid green', padding: '15px' }}>
        <h3 style={{ color: 'green' }}>User Content Card</h3>
        <p>Data fetched from the protected /api/user endpoint.</p>
        
        <div style={{ background: '#e0ffe0', padding: '10px', marginTop: '10px' }}>
          {loading ? (
            <p>Loading protected content...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <h2>{content}</h2>
          )}
        </div>
      </div>
    </div>
  );
}
