// src/pages/PropertyPage.js
import React from 'react';
import PropertyDetail from '../components/property/PropertyDetail';

const PropertyPage = ({ match }) => {
  return <PropertyDetail match={match} />;
};

export default PropertyPage;
