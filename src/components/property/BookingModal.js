import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api';

const BookingModal = ({ show, handleClose, item, onSave, originalProperties }) => {
  const [formData, setFormData] = useState({ ...item });
  const [availableBedrooms, setAvailableBedrooms] = useState({
    single: 0,
    double: 0,
    triple: 0,
  });
  const [stayType, setStayType] = useState(formData.stayType || 'night');

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
      setStayType(item.stayType || 'night');
    }
  }, [item]);

  useEffect(() => {
    if (originalProperties && item) {
      const property = originalProperties.find(p => p._id === item.propertyId);
      if (property) {
        setAvailableBedrooms({
          single: property.rooms.single,
          double: property.rooms.double,
          triple: property.rooms.triple,
        });
      }
    }
  }, [originalProperties, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleStayTypeChange = (e) => {
    const value = e.target.value;
    setStayType(value);
    setFormData((prevData) => ({
      ...prevData,
      stayType: value,
      startDate: value === 'hours' ? prevData.startDate : undefined,
      endDate: value === 'hours' ? prevData.endDate : undefined,
      hours: value === 'hours' ? prevData.hours : undefined,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    if (
      (name === 'numSingle' && numericValue <= availableBedrooms.single) ||
      (name === 'numDouble' && numericValue <= availableBedrooms.double) ||
      (name === 'numTriple' && numericValue <= availableBedrooms.triple)
    ) {
      handleChange(e);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.put(`/cart/item/${item._id}`, formData, config);
      onSave();
      handleClose();
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNumAdults">
            <Form.Label>Adults</Form.Label>
            <Form.Control
              type="number"
              name="numAdults"
              value={formData.numAdults}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formNumChildren">
            <Form.Label>Children</Form.Label>
            <Form.Control
              type="number"
              name="numChildren"
              value={formData.numChildren}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formNumSingle">
            <Form.Label>Single Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="numSingle"
              value={formData.numSingle}
              onChange={handleNumberChange}
            />
            <Form.Text className="text-muted">
              Available: {availableBedrooms.single}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formNumDouble">
            <Form.Label>Double Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="numDouble"
              value={formData.numDouble}
              onChange={handleNumberChange}
            />
            <Form.Text className="text-muted">
              Available: {availableBedrooms.double}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formNumTriple">
            <Form.Label>Triple Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="numTriple"
              value={formData.numTriple}
              onChange={handleNumberChange}
            />
            <Form.Text className="text-muted">
              Available: {availableBedrooms.triple}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formStayType">
            <Form.Label>Stay Type</Form.Label>
            <Form.Control
              as="select"
              name="stayType"
              value={stayType}
              onChange={handleStayTypeChange}
            >
              <option value="night">Night</option>
              <option value="day">Day</option>
              <option value="hours">Hours</option>
            </Form.Control>
          </Form.Group>
          {stayType === 'day' && (
            <>
              <Form.Group controlId="formStartDate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEndDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}
          {stayType === 'night' && (
            <Form.Group controlId="formNightDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
          )}
          {stayType === 'hours' && (
            <>
              <Form.Group controlId="formHoursDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formHoursCount">
                <Form.Label>Hours</Form.Label>
                <Form.Control
                  type="number"
                  name="hours"
                  value={formData.hours || 6}
                  min="6"
                  max="24"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Fixed count of 6 hours
                </Form.Text>
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
