import React from 'react';
import { Card, Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { FaPen, FaTrash, FaMoon, FaSun, FaClock, FaBed } from 'react-icons/fa';

const AdminPropertyList = ({ properties, onEdit, onDelete }) => {
  return (
    <Container>
      {properties.map((property) => (
        <Row key={property._id} className="mb-4 align-items-center">
          <Col xs={12} md={3} lg={3} className="d-flex flex-column">
            <Carousel style={{ height: '100%' }}>
              {property.imageUrls.map((imageUrl, index) => (
                <Carousel.Item key={index} style={{ height: '100%' }}>
                  <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', height: '100%' }}>
                    <img
                      src={imageUrl}
                      alt={`${property.name} ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={12} md={4} lg={4} className="d-flex flex-column align-items-center">
            <Card.Body className="d-flex flex-column h-100">
              <Card.Title className="text-center">{property.name}</Card.Title>
              <Card.Text className="text-center">{property.location}</Card.Text>

              <Card.Text className="flex-grow-1 overflow-auto" style={{ maxHeight: '100px' }}>
                {property.description}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Available:</strong> {property.available ? 'Yes' : 'No'}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col xs={12} md={4} lg={4} className="d-flex flex-column align-items-center">
            <Card.Body className="d-flex flex-column h-100">
              <div className="d-flex flex-column align-items-center mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaMoon className="me-2" />
                  <span>Per Night: ₹{property.pricePerNight}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaSun className="me-2" />
                  <span>Per Day: ₹{property.pricePerDay}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaClock className="me-2" />
                  <span>Per 6 Hours: ₹{property.pricePer6Hours}</span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaBed className="me-2" />
                  <span>Single Rooms: {property.rooms.single}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaBed className="me-2" />
                  <span>Double Rooms: {property.rooms.double}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaBed className="me-2" />
                  <span>Triple Rooms: {property.rooms.triple}</span>
                </div>
              </div>
            </Card.Body>
          </Col>
          <Col xs={12} md={1} lg={1} className="d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column">
              <Button variant="primary" className="mb-2" onClick={() => onEdit(property)}>
                <FaPen className="me-1" /> Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(property._id)}>
                <FaTrash className="me-1" /> Delete
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default AdminPropertyList;
