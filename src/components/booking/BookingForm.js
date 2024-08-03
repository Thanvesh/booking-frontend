// src/components/booking/BookingForm.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';

const BookingForm = ({ onPlaceOrder ,orderDetails}) => {
  const [details, setDetails] = useState({ name: '', email: ''});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder({ ...details, paymentMethod: selectedPaymentMethod,orderDetails});
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100 w-100">
        <Row>
          <Col md={12} lg={12}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h2 className="text-center mb-4">Booking Details</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={details.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPaymentMethod" className="mt-3">
                    <Button
                      variant="primary"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Choose Payment Method
                    </Button>
                    {selectedPaymentMethod && (
                      <p className="mt-2"><strong>Selected:</strong> {selectedPaymentMethod}</p>
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 mt-4">
                    Place Order
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="outline-primary" className="w-100 mb-2" onClick={() => handlePaymentSelect('GPay')}>
            GPay
          </Button>
          <Button variant="outline-primary" className="w-100 mb-2" onClick={() => handlePaymentSelect('PhonePe')}>
            PhonePe
          </Button>
          <Button variant="outline-primary" className="w-100" onClick={() => handlePaymentSelect('Credit/Debit Card')}>
            Credit/Debit Card
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingForm;
