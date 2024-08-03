// src/components/AdminHeader.js
import React , { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import AuthContext from '../contexts/AuthContext';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use the custom hook to get user data
  const { logout } = useContext(AuthContext);

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to user profile page
  };

  const handleLogout = () => {
    logout(); // Call logout function
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/admin">Admin Home</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <img
            src={user?.profilePic || 'https://via.placeholder.com/40'} // Use user profile picture if available
            alt="Profile"
            className="rounded-circle"
            style={{ cursor: 'pointer',width: '40px', // Set desired width
              height: '40px', }}
            onClick={handleProfileClick}
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
