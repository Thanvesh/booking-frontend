// src/components/Header.js
import React ,{useContext}from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import AuthContext from '../contexts/AuthContext';


const Header = () => {
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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Favourites</Nav.Link>
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

export default Header;
