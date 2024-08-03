// src/pages/FavoritesPage.js
import React, { useContext, useState, useEffect } from 'react';
import FavoritesList from '../components/favorites/FavoritesList';
import AuthContext from '../contexts/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';

const FavoritesPage = () => {
  const { favorites } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length !== undefined) {
      setLoading(false);
    }
  }, [favorites]);

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><ClipLoader size={50} color="#000" /></div>;

  return <FavoritesList favorites={favorites} />;
};

export default FavoritesPage;
