// src/components/favorites/FavoritesList.js
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from '../property/PropertyCard';
import AuthContext from '../../contexts/AuthContext';
const FavoritesList = () => {
  const { favorites, setFavorites } = useContext(AuthContext);

  return (
    <Container>
      <h2 className="my-4">Your Favorite Properties</h2>
      <Row>
        {favorites.map((property) => (
          <Col md={4} lg={3} key={property._id} className="mb-4">
            <PropertyCard property={property}  setFavorites={setFavorites} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesList;
