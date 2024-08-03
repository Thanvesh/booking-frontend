// src/components/booking/Checkout.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import BookingForm from './BookingForm';
import api from '../../api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.itemsWithTotalPrice || {};

  const handlePlaceOrder = async (orderDetail) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.post('/orders/', orderDetail, config);
      alert('Order placed successfully');

      // Remove placed items from the cart
      const removeItemPromises = orderDetail.orderDetails.map(item =>
        api.delete(`/cart/item/${item._id}`, config)
      );
      await Promise.all(removeItemPromises);

      // Reset the state and navigate back to the home page
      navigate('/');
    } catch (error) {
      console.error('Order placement failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order Summary</h2>
      <div className="mb-4">
        <OrderSummary orderDetails={orderDetails} />
      </div>
      <BookingForm orderDetails={orderDetails} onPlaceOrder={handlePlaceOrder} />
    </div>
  );
};

export default Checkout;
