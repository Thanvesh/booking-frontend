// src/components/property/PropertyList.js
import React from 'react';
import PropertyCard from './PropertyCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const PropertyList = ({ properties }) => {
  return (
    <Container className="my-4">
      {properties.length === 0 ? (
        <div className="d-flex justify-content-center my-4 align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {properties.map((property) => (
            <Col md={4} lg={3} key={property._id} className="mb-4">
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PropertyList;
