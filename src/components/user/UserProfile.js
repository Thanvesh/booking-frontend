import React from 'react';
import { useAuth } from '../../hooks/useAuth'; // Custom hook for auth
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container className="my-4">
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col md={6} className="text-center">
            <Spinner animation="border" />
            <p className="mt-3">Wait, profile loading...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col md={6}>
          <Card className="text-center">
            <Card.Header as="h4">User Profile</Card.Header>
            <Card.Body>
              <Card.Img
                variant="top"
                src={user.profilePic}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
