import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [originalProperties, setOriginalProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const fetchProperties = useCallback(async () => {
    try {
      const { data } = await api.get('/properties');
      setOriginalProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Failed to fetch properties', error);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/properties/${userId}/favorites`, config);
      setFavorites(data);
    } catch (error) {
      console.error('Failed to fetch favorite properties', error);
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setIsAuthenticated(true);
      setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
      fetchProperties();
      fetchFavorites();
    }
  }, [fetchProperties, fetchFavorites]);

  const onFilters = (filters) => {
    console.log(filters);
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, ...filters };
  
      const updatedFilteredProperties = originalProperties.filter(property => {
        let matches = true;
  
        if (newFilters.priceRange) {
          const [minPrice, maxPrice] = newFilters.priceRange;
          const price = property.pricePerNight;
          if ((maxPrice && price > maxPrice) || price < minPrice) matches = false;
        }
  
        if (newFilters.location) {
          const location = newFilters.location.toLowerCase();
          if (property.location.toLowerCase().indexOf(location) === -1) {
            matches = false;
          }
        }
  
        if (newFilters.bedrooms) {
          const bedroomFilters = newFilters.bedrooms;
  
          if (
            (bedroomFilters.single && property.rooms.single < bedroomFilters.single) ||
            (bedroomFilters.double && property.rooms.double < bedroomFilters.double) ||
            (bedroomFilters.triple && property.rooms.triple < bedroomFilters.triple)
          ) {
            matches = false;
          }
        }
  
        return matches;
      });
  
      setFilteredProperties(updatedFilteredProperties);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({});
    setFilteredProperties(originalProperties);
  };

  const login = (token, adminStatus) => {
    const decoded = jwtDecode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', adminStatus);
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    setUserId(decoded.id);
    navigate(adminStatus ? '/admin' : '/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserId(null);
    setOriginalProperties([]);
    setFilteredProperties([]);
    setFavorites([]);
    navigate('/login');
  };

  // Booking Modal Functions


  return (
    <AuthContext.Provider value={{
      isAuthenticated, isAdmin, userId, properties: filteredProperties,
      fetchProperties, clearFilters, favorites, setFavorites, fetchFavorites,
      login, logout, onFilters,originalProperties,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
