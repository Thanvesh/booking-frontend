// src/components/property/FilterToggle.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const FilterToggle = ({ onToggle }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleToggle = () => {
    setShowFilters(prev => !prev);
    onToggle(!showFilters);
  };

  return (
    <Button variant="info" onClick={handleToggle}>
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
  );
};

export default FilterToggle;
