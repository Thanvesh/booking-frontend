import React, { useState, useEffect } from 'react';
import { Form, Button, FormControl, Col, Row, Card, Image } from 'react-bootstrap';

const PropertyForm = ({ property = {}, onSubmit }) => {
  const [name, setName] = useState(property?.name || '');
  const [location, setLocation] = useState(property?.location || '');
  const [description, setDescription] = useState(property?.description || '');
  const [pricePerNight, setPricePerNight] = useState(property?.pricePerNight || '');
  const [pricePerDay, setPricePerDay] = useState(property?.pricePerDay || '');
  const [pricePer6Hours, setPricePer6Hours] = useState(property?.pricePer6Hours || '');
  const [rooms, setRooms] = useState({
    single: property?.rooms?.single || 0,
    double: property?.rooms?.double || 0,
    triple: property?.rooms?.triple || 0,
  });
  const [available, setAvailable] = useState(property?.available || true);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState(property?.imageUrls || []);

  useEffect(() => {
    if (property?._id) {
      // Pre-fill form fields when editing
      setName(property?.name || '');
      setLocation(property?.location || '');
      setDescription(property?.description || '');
      setPricePerNight(property?.pricePerNight || '');
      setPricePerDay(property?.pricePerDay || '');
      setPricePer6Hours(property?.pricePer6Hours || '');
      setRooms({
        single: property?.rooms?.single || 0,
        double: property?.rooms?.double || 0,
        triple: property?.rooms?.triple || 0,
      });
      setAvailable(property?.available || true);
      setExistingImageUrls(property?.imageUrls || []);
    }
  }, [property]);

  const handleRoomChange = (type, value) => {
    setRooms(prevRooms => ({ ...prevRooms, [type]: parseInt(value, 10) }));
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert image files to base64 URLs
      const imageFileUrls = await Promise.all(imageFiles.map(file => convertFileToUrl(file)));

      onSubmit({
        _id: property?._id, // Include _id if editing
        name,
        location,
        description,
        pricePerNight,
        pricePerDay,
        pricePer6Hours,
        rooms,
        available,
        imageUrls: [...existingImageUrls, ...imageFileUrls], // Include both existing URLs and new file uploads
      });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const convertFileToUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('File reading has failed'));
      reader.readAsDataURL(file);
    });
  };

  return (
    <Card className="p-3">
      <Card.Body>
        <h2 className="text-center mb-4">{property?._id ? 'Edit Property' : 'Add New Property'}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="formPricePerNight">
                <Form.Label>Price per Night</Form.Label>
                <FormControl
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                  placeholder="Price per Night"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formPricePerDay">
                <Form.Label>Price per Day</Form.Label>
                <FormControl
                  type="number"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  placeholder="Price per Day"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formPricePer6Hours">
                <Form.Label>Price per 6 Hours</Form.Label>
                <FormControl
                  type="number"
                  value={pricePer6Hours}
                  onChange={(e) => setPricePer6Hours(e.target.value)}
                  placeholder="Price per 6 Hours"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formRooms">
            <Form.Label>Rooms</Form.Label>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formSingleRooms">
                  <Form.Label>Single</Form.Label>
                  <FormControl
                    type="number"
                    value={rooms.single}
                    onChange={(e) => handleRoomChange('single', e.target.value)}
                    placeholder="Single Rooms"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDoubleRooms">
                  <Form.Label>Double</Form.Label>
                  <FormControl
                    type="number"
                    value={rooms.double}
                    onChange={(e) => handleRoomChange('double', e.target.value)}
                    placeholder="Double Rooms"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formTripleRooms">
                  <Form.Label>Triple</Form.Label>
                  <FormControl
                    type="number"
                    value={rooms.triple}
                    onChange={(e) => handleRoomChange('triple', e.target.value)}
                    placeholder="Triple Rooms"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formAvailable">
            <Form.Check
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              label="Available"
            />
          </Form.Group>

          <Form.Group controlId="formImages">
            <Form.Label>Current Images</Form.Label>
            <Row>
              {existingImageUrls.map((url, index) => (
                <Col md={4} key={index}>
                  <Image src={url} thumbnail className="mb-2" />
                </Col>
              ))}
            </Row>
            <Form.Label>Upload New Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {property?._id ? 'Update Property' : 'Add Property'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PropertyForm;
