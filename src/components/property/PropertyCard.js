import React, { useContext, useState } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import api from '../../api';
import AuthContext from '../../contexts/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';
import './PropertyCard.css';

const PropertyCard = ({ property, setFavorites }) => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (property.favorites && userId) {
      setIsFavorite(property.favorites.includes(userId));
    }
  }, [property.favorites, userId]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.put(`/properties/${property._id}/favorite`, {}, config);
      setIsFavorite(response.data.favorites.includes(userId));
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav._id !== property._id));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/properties/${property._id}`);
  };

  const handleAddToCartClick = async (e) => {
    e.stopPropagation();
    setLoading(true);
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
      console.log('Item added to cart successfully');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill(<FaStar color="gold" key={`full-${fullStars}`} />)}
        {halfStar && <FaStarHalfAlt color="gold" />}
        {Array(emptyStars).fill(<FaRegStar color="gold" />)}
      </>
    );
  };

  return (
    <Card className="mb-4 property-card" onClick={handleCardClick}>
      <Carousel>
        {property.imageUrls.map((image, index) => (
          <Carousel.Item key={index}>
            <Card.Img
              variant="top"
              src={image}
              alt={`${property.name} image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title className="card-title">{property.name}</Card.Title>
        <Card.Text className="card-location">{property.location}</Card.Text>
        <div className="mb-2">{renderStars(4.5)}</div>
        <Card.Text className="card-description">
          {property.description.length > 100
            ? `${property.description.substring(0, 100)}...`
            : property.description}
        </Card.Text>
        <Button variant="link" onClick={handleCardClick}>See More</Button>
        <Card.Text className="card-rooms">
          <strong>Rooms:</strong>
          <ul>
            <li>Single: {property.rooms.single}</li>
            <li>Double: {property.rooms.double}</li>
            <li>Triple: {property.rooms.triple}</li>
          </ul>
        </Card.Text>
        <Card.Text className="card-prices">
          &#8377;{property.pricePerNight} per Night
        </Card.Text>
        <Card.Text className="card-prices">
          &#8377; {property.pricePerDay} per Day
        </Card.Text>
        <Card.Text className="card-prices">
          &#8377; {property.pricePer6Hours} For 6 Hours
        </Card.Text>
        <Card.Text className="card-status">
          <strong>Status:</strong> {property.available ? 'Available' : 'Not Available'}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" onClick={handleAddToCartClick} disabled={loading}>
            {loading ? <ClipLoader size={24} color="#fff" /> : 'Add to Cart'}
          </Button>
          <Button variant="outline-danger" onClick={handleFavoriteClick} disabled={loading}>
            {loading ? <ClipLoader size={24} color="#fff" /> : (isFavorite ? <BsHeartFill /> : <BsHeart />)}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
