// src/components/booking/OrderSummary.js
import React from 'react';
import { Card, Row, Col, Carousel } from 'react-bootstrap';

const OrderSummary = ({ orderDetails }) => {
  const totalPrice = orderDetails.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white text-center">
        <Card.Title className="mb-0 h4">Order Summary</Card.Title>
      </Card.Header>
      <Card.Body>
        {orderDetails.map((item) => (
          <div className="mb-3 pb-2 border-bottom p-2 " key={item._id}>
            <Row className='mt-2'>
              <Col md={4}>
                <Carousel>
                  {item.propertyImages.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Card.Img
                        variant="top"
                        src={image}
                        alt={`${item.name} image ${index + 1}`}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col md={8} className='d-flex flex-row justify-content-around  align-items-center'>
                <div className='d-flex flex-column justify-content-center  '>
                  <h5 className="mb-1 ">{item.propertyName}</h5>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Location :</strong> {item.propertyLocation}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Pack Type :</strong> {item.stayType}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>From Date :</strong> {item.startDate}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>To Date :</strong> {item.endDate}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Price :</strong> {item.totalPrice}</p>
                </div>
                <div className='d-flex flex-column justify-content-center '>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Adults :</strong> {item.numAdults}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Children :</strong> {item.numChildren}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Single Bedrooms :</strong> {item.numSingle}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Double Bedrooms :</strong> {item.numDouble}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>Triple Bedrooms :</strong> {item.numTriple}</p>
                  <p className="mb-1" style={{ fontSize: "14px" }}><strong>6 HoursCount :</strong> {item.numhours}</p>
                </div>
              </Col>
            </Row>
          </div>
        ))}
        <Row className="mt-3">
          <Col md={6}>
            <h5 className="text-muted">Total Cost</h5>
          </Col>
          <Col md={6} className="text-md-right">
            <h5>{totalPrice}</h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;
