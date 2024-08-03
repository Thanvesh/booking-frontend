import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const CartItem = ({ item, onRemove, onEdit,onSelect, isSelected ,originalProperties}) => {

  const originalProperty= originalProperties.find(item=>item.PropertyId===originalProperties._id)

  // Determine the base price based on the stayType
  const basePrice = originalProperty
    ? item.stayType === 'night'
      ? originalProperty.pricePerNight
      : item.stayType === 'day'
      ? originalProperty.pricePerDay
      : item.stayType === 'hours'
      ? originalProperty.pricePer6Hours
      : 0
    : 0;

  // Calculate the number of days between startDate and endDate or default to 1 day
  const startDate = new Date(item.startDate);
  const endDate = item.endDate ? new Date(item.endDate) : new Date(startDate); // Use startDate if endDate is null
  const days = item.endDate
    ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))  // Convert milliseconds to days
    : 1; // Default to 1 day if endDate is null

  // For hours calculation, default to 1 if numHours is not specified
  const hours = item.numHours || 1;

  // Calculate the total base price based on the duration and stay type
  const totalBasePrice = item.stayType === 'hours'
    ? basePrice * hours
    : basePrice * days;

  // Calculate the total price considering bedroom types and counts
  const totalPrice = (
    (item.numSingle || 0) * 0.5 * totalBasePrice +
    (item.numDouble || 0) * totalBasePrice +
    (item.numTriple || 0) * 2 * totalBasePrice
  );

  const handleCheckboxChange = (e) => {
    onSelect(item._id, e.target.checked,totalPrice);
  };

  return (
    <Card className="mb-3">
      <Row noGutters className="flex-column flex-md-row">
        <Col md={4} className="p-0">
          <Card.Img src={item.propertyImages[0]} style={{ height: '100%', objectFit: 'cover' }} />
        </Col>
        <Col md={8}>
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-start p-3 flex-wrap">
            <div className="d-flex flex-column flex-md-row justify-content-around  flex-wrap align-items-center w-100">
              <div className=" d-flex flex-column flex-md-coumn justify-content-around  align-items-center  flex-wrap" style={{ minWidth: '150px', maxWidth: '200px', overflow: 'auto' }}>
                <h6 className="card-title" style={{ minHeight: '1em', maxHeight: '1em', overflow: 'auto', fontSize:"15px" }}>{item.propertyName}</h6>
                <p className="card-text" style={{fontSize:"12px"}}>{item.propertyLocation}</p>
                <p className="card-text" style={{fontSize:"12px"}}>Plan: {item.stayType}</p>
                <p className="card-text" style={{fontSize:"12px"}}>Price: {basePrice}</p>
                <p className="card-text" style={{fontSize:"12px"}}>From date: {item.startDate}</p>
                <p className="card-text" style={{fontSize:"12px"}}>To date: {item.endDate}</p>
              </div>
              <div className='d-flex flex-column flex-md-row justify-content-around  align-items-center  flex-wrap' style={{ minWidth: '150px', maxWidth: '200px', overflow: 'auto' }}>
                <p className="card-text" style={{fontSize:"12px"}}>Adults: {item.numAdults}</p>
                <p className="card-text" style={{fontSize:"12px"}}>Children: {item.numChildren}</p>
                <p className="card-text" style={{fontSize:"12px"}}>Single Bedrooms: {item.numSingle}</p>
                <p className="card-text" style={{fontSize:"12px"}}>Double Bedrooms: {item.numDouble}</p>
                <p className="card-text" style={{fontSize:"12px"}}>Triple Bedrooms: {item.numTriple}</p>
                
                <p className="card-text" style={{fontSize:"12px"}}>6 HoursCount: {item.numhours}</p>


              </div>
            </div>
            <div className="mt-3 mt-md-0 d-flex flex-column justify-content-around align-items-center align-self-center gap-2">
              <Button
                variant="info"
                className="mb-2"
                onClick={() => onEdit(item)}
                style={{ width: '50px', fontSize:"10px" }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => onRemove(item._id)}
                style={{ width: '70px', fontSize:"10px"}}

              >
                Remove
              </Button>
              <p>TotalCost : {totalPrice}</p>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleCheckboxChange}
              />
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
