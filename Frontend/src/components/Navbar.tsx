import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: 'blue', color: 'white', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              My RBAC Website
            </Link>
          </h2>
          {isAuthenticated && (
            <div style={{ marginTop: '10px' }}>
              <Link to="/dashboard" style={{ marginRight: '15px', color: 'yellow' }}>Dashboard</Link>
              {isAdmin && (
                <Link to="/admin" style={{ color: 'orange' }}>Admin Page</Link>
              )}
            </div>
          )}
        </div>
        
        <div>
          {isAuthenticated ? (
            <div>
              <b>User: {user?.name}</b> <br />
              <button 
                onClick={handleLogout} 
                style={{ background: 'red', color: 'white', padding: '5px', marginTop: '5px' }}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
              <Link to="/register" style={{ color: 'white' }}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
