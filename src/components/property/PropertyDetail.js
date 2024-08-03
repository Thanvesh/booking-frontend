import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Container, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import PropertyReview from './PropertyReview';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import AuthContext from '../../contexts/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';

const PropertyDetail = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: propertyId } = useParams();
  const { userId } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/properties/${propertyId}`);
        setProperty(data);
        setIsFavorite(data.favorites.includes(userId));
      } catch (error) {
        console.error('Failed to fetch property', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, userId]);

  const handleFavoriteClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.put(`/properties/${propertyId}/favorite`, {}, config);
      setIsFavorite(response.data.favorites.includes(userId));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleBookNow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const defaultCartItem = {
        propertyId: property._id,
        propertyName: property.name,
        propertyImages: property.imageUrls,
        propertyLocation: property.location,
        numAdults: 1,
        numChildren: 0,
        numSingle: 1,
        numDouble: 0,
        numTriple: 0,
        stayType: 'night',
        startDate: new Date(),
        endDate: null,
        numHours: 0,
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.post('/cart/', defaultCartItem, config);
      alert('Item added to cart successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><ClipLoader size={50} color="#000" /></div>;

  if (!property) return <p>Failed to load property details.</p>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Card>
            <Carousel>
              {property.imageUrls.map((image, index) => (
                <Carousel.Item key={index}>
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={`${property.title} image ${index + 1}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <Card.Title>{property.title}</Card.Title>
                <Button variant="link" onClick={handleFavoriteClick}>
                  {isFavorite ? <BsHeartFill color="red" /> : <BsHeart />}
                </Button>
              </div>
              <Card.Text>
                <p>{property.description}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>&#8377;{property.pricePerNight}</strong> per Night</p>
                <p><strong>&#8377;{property.pricePerDay}</strong> per Day</p>
                <p><strong>&#8377;{property.pricePer6Hours}</strong> for 6 Hours</p>
                <p><strong>Availability:</strong> {property.available ? 'Available' : 'Not Available'}</p>
              </Card.Text>
              <Card.Text>
                <strong>Rooms:</strong>
                <ul>
                  <li>Single: {property.rooms.single}</li>
                  <li>Double: {property.rooms.double}</li>
                  <li>Triple: {property.rooms.triple}</li>
                </ul>
              </Card.Text>
              <Button variant="primary" onClick={handleBookNow}>Book Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <PropertyReview propertyId={propertyId} />
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetail;
