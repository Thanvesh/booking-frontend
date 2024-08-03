import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await api.get('/orders/', config);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    setCanceling(orderId);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.delete(`/orders/${orderId}`, config);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Failed to cancel order', error);
    } finally {
      setCanceling(null);
    }
  };

  if (loading) {
    return (
      <Container className="my-4 text-center d-flex flex-column  justify-content-center align-items-center  " style={{height:"100vh"}}>
        <Spinner animation="border" />
        <p className="mt-3">Wait Your orders Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4 text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="mb-4">
            <Card.Body>
              <Row>
                {/* Image Carousel */}
                <Col md={4} xs={12} className="d-flex justify-content-center align-items-center">
                  {order.orderDetails[0].propertyImages.length > 0 ? (
                    <Carousel>
                      {order.orderDetails[0].propertyImages.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <p>No images available</p>
                  )}
                </Col>

                {/* General Information */}
                <Col md={4} xs={12}>
                  <h4>Property Name</h4>
                  <p>{order.orderDetails[0].propertyName}</p>
                  <h5>Location</h5>
                  <p>{order.orderDetails[0].propertyLocation}</p>
                  <h5>Stay Type</h5>
                  <p>{order.orderDetails[0].stayType}</p>
                  <h5>Dates</h5>
                  <p>{new Date(order.orderDetails[0].startDate).toLocaleDateString()} - {new Date(order.orderDetails[0].endDate).toLocaleDateString()}</p>
                  <h5>Total Price</h5>
                  <p>${order.orderDetails[0].totalPrice.toFixed(2)}</p>
                </Col>

                {/* Additional Details */}
                <Col md={4} xs={12}>
                  <h5>Adults</h5>
                  <p>{order.orderDetails[0].numAdults}</p>
                  <h5>Children</h5>
                  <p>{order.orderDetails[0].numChildren}</p>
                  <h5>Single Rooms</h5>
                  <p>{order.orderDetails[0].numSingle}</p>
                  <h5>Double Rooms</h5>
                  <p>{order.orderDetails[0].numDouble}</p>
                  <h5>Triple Rooms</h5>
                  <p>{order.orderDetails[0].numTriple}</p>
                  <h5>Hours</h5>
                  <p>{order.orderDetails[0].numHours ?? 'N/A'}</p>
                </Col>
              </Row>
            </Card.Body>

            {/* Cancel Order Button */}
            <Card.Footer className="text-center">
              <Button 
                onClick={() => handleCancelOrder(order._id)}
                disabled={canceling === order._id}
                variant="danger"
              >
                {canceling === order._id ? 'Canceling...' : 'Cancel Order'}
              </Button>
            </Card.Footer>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrdersPage;
