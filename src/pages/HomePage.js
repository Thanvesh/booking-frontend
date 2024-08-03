// src/pages/HomePage.js
import React, { useState, useContext } from 'react';
import PropertyList from '../components/property/PropertyList';
import FilterBar from '../components/property/FilterBar';
import FilterToggle from '../components/property/FilterToggle';
import AuthContext from '../contexts/AuthContext';

const HomePage = () => {
  const { properties, onFilters, clearFilters } = useContext(AuthContext);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = (filters) => {
    onFilters(filters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div>
      <FilterToggle onToggle={setShowFilters} />
      {showFilters && (
        <FilterBar onApply={handleFilter} onClear={handleClearFilters} />
      )}
      <PropertyList properties={properties} />
    </div>
  );
};

export default HomePage;
