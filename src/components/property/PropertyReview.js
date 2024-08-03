// src/components/property/PropertyReview.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../api'
const PropertyReview = ({ propertyId }) => {
  const [review, setReview] = useState('');



  const handleChange = (e) => setReview(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/properties/${propertyId}/reviews`, { review });
      setReview(''); // Clear the review input
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reviewText">
          <Form.Label>Leave a Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={review}
            onChange={handleChange}
            placeholder="Write your review here..."
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
    </Container>
  );
};

export default PropertyReview;
