// src/components/property/FilterOptions.js
import React, { useState } from 'react';
import { Form, Button, Col, Row, FormControl } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const FilterBar = ({ onApply, onClear }) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState({
    single: 0,
    double: 0,
    triple: 0
  });

  const handleApply = () => {
    onApply({ priceRange, location, bedrooms });
  };

  const handleClear = () => {
    setPriceRange([0, 100000]); // Reset slider to default range
    setLocation('');
    setBedrooms({ single: 0, double: 0, triple: 0 });
    onClear(); // Call clear function from context
  };

  return (
    <Form className="mb-4">
      <Row className='d-flex flex-column justify-content-start  m-2'>
        <Col md={2} className='mb-2'>
          <Form.Group controlId="priceRange ">
            <Form.Label>Price Range</Form.Label>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
            />
            <div>
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </Form.Group>
        </Col>
        <Col md={2}  className='mb-2'>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Select Location</MenuItem>
              {/* Add locations here */}
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Coimbatore">Caoimbatore</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Vizag">VijayaNagaram</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Banglore">Banglore</MenuItem>
            </Select>
          </Form.Group>
        </Col>
        <Col md={2}  className='mb-2'>
        <Form.Group controlId="bedrooms">
  <Form.Label>Bedrooms</Form.Label>
  <FormControl
    type="number"
    placeholder="Single"
    value={bedrooms.single}
    onChange={(e) =>
      setBedrooms((prev) => ({ ...prev, single: Number(e.target.value) }))
    }
  />
  <Form.Text className="text-muted">Number of single-bed bedrooms</Form.Text>

  <FormControl
    type="number"
    placeholder="Double"
    value={bedrooms.double}
    onChange={(e) =>
      setBedrooms((prev) => ({ ...prev, double: Number(e.target.value) }))
    }
  />
  <Form.Text className="text-muted">Number of double-bed bedrooms</Form.Text>

  <FormControl
    type="number"
    placeholder="Triple"
    value={bedrooms.triple}
    onChange={(e) =>
      setBedrooms((prev) => ({ ...prev, triple: Number(e.target.value) }))
    }
  />
  <Form.Text className="text-muted">Number of triple-bed bedrooms</Form.Text>
</Form.Group>

        </Col>
      </Row>
      <Button variant="primary" onClick={handleApply}>
        Apply Filters
      </Button>
      <Button variant="secondary" onClick={handleClear} className="ml-2">
        Clear Filters
      </Button>
    </Form>
  );
};

export default FilterBar;
