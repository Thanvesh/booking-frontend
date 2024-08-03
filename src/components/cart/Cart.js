// src/components/booking/Cart.js
import React, { useState, useEffect, useContext } from 'react';
import CartItem from './CartItem';
import BookingModal from '../property/BookingModal';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../../api';
import AuthContext from '../../contexts/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectedItemPrices, setSelectedItemPrices] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const { originalProperties } = useContext(AuthContext);

  const fetchCartItems = async () => {
    setLoading(true); // Set loading to true when fetching
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/cart/`, config);
      setCartItems(data.items);
    } catch (error) {
      console.error('Failed to fetch cart items', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.delete(`/cart/item/${id}`, config);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      setSelectedItems((prevSelected) => new Set([...prevSelected].filter((itemId) => itemId !== id)));
    } catch (error) {
      console.error('Failed to remove cart item', error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    fetchCartItems();
  };

  const handleSelectItem = (id, isChecked, totalPrice) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      const updatedPrices = { ...selectedItemPrices };

      if (isChecked) {
        newSelected.add(id);
        updatedPrices[id] = totalPrice; // Add item price
        setTotalCost((prevTotalCost) => prevTotalCost + totalPrice);
      } else {
        newSelected.delete(id);
        const { [id]: removedPrice} = updatedPrices;
        setTotalCost((prevTotalCost) => prevTotalCost - (removedPrice || 0));
        updatedPrices[id] = undefined; // Remove item price
      }

      setSelectedItemPrices(updatedPrices);
      return newSelected;
    });
  };

  const handleCheckout = () => {
    const itemsWithTotalPrice = cartItems
      .filter((item) => selectedItems.has(item._id))
      .map((item) => ({
        ...item,
        totalPrice: selectedItemPrices[item._id],
      }));

    navigate('/checkout', { state: { itemsWithTotalPrice } });
  };

  if (loading) return <div className="d-flex flex-column gap-2 justify-content-center align-items-center" style={{ height: '100vh' }}><ClipLoader size={50} color="#000" /><p> Please Wait Cart Items are loading</p> </div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={10} md={8}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={handleRemoveItem}
                onEdit={handleEditItem}
                onSelect={handleSelectItem}
                isSelected={selectedItems.has(item._id)}
                originalProperties={originalProperties}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Col>
        <Col lg={2} md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Cart Summary</h4>
              <div className="mb-3">
                <h5>Total Cost:</h5>
                <h3>${totalCost.toFixed(2)}</h3>
              </div>
              <Button
                variant="success"
                size="lg"
                block
                onClick={handleCheckout}
                disabled={selectedItems.size === 0}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedItem && (
        <BookingModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          item={selectedItem}
          onSave={handleSaveChanges}
          originalProperties={originalProperties}
        />
      )}
    </Container>
  );
};

export default Cart;
