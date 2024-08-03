import React, { useState, useEffect } from 'react';
import PropertyForm from './PropertyForm';
import AdminPropertyList from '../property/AdminPropertyList';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import api from '../../api';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get(`/properties`);
        setProperties(data);
      } catch (error) {
        console.error('Failed to fetch properties', error);
      }
    };

    fetchProperties();
  }, []);

  const handleCreate = async (property) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.post(`/properties`, property, config);
      setProperties([...properties, data]);
      setIsEditing(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Failed to create property', error);
    }
  };

  const handleUpdate = async (property) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.put(`/properties/${property._id}`, property, config);
      setProperties(properties.map((p) => (p._id === data._id ? data : p)));
      setIsEditing(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Failed to update property', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.delete(`/properties/${id}`, config);
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error('Failed to delete property', error);
    }
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setIsEditing(true);
  };

  const toggleEditForm = () => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedProperty(null);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Admin Dashboard</h1>
          <Button 
            variant="primary" 
            onClick={toggleEditForm}
          >
            {isEditing ? 'Cancel' : 'Add New Property'}
          </Button>
        </Col>
      </Row>
      <Row>
        {isEditing && (
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <PropertyForm
                  property={selectedProperty} // Pass selectedProperty here
                  onSubmit={selectedProperty ? handleUpdate : handleCreate}
                />
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col md={isEditing ? 8 : 12}>
          <Card>
            <Card.Header className="text-center">
              <h3>Property List</h3>
            </Card.Header>
            <Card.Body>
              <AdminPropertyList
                properties={properties}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
