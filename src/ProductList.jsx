import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const ProductList = ({ onViewCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Example list of products (you can replace with your API or JSON data)
  const products = [
    { name: 'Aloe Vera', cost: '$10', image: 'https://via.placeholder.com/100', quantity: 1 },
    { name: 'Peace Lily', cost: '$15', image: 'https://via.placeholder.com/100', quantity: 1 },
    { name: 'Snake Plant', cost: '$12', image: 'https://via.placeholder.com/100', quantity: 1 },
  ];

  // Check if a product is already in the cart
  const isProductInCart = (name) => {
    return cartItems.some(item => item.name === name);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  // Calculate total number of items in the cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="product-list-container">
      <div className="cart-summary">
        🛒 Total Items in Cart: <strong>{totalCartItems}</strong>
        <button className="view-cart-btn" onClick={onViewCart}>
          View Cart
        </button>
      </div>

      <h2 style={{ color: 'black' }}>Available Plants</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.name}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: {product.cost}</p>

            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
              disabled={isProductInCart(product.name)}
            >
              {isProductInCart(product.name) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
