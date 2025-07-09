// Last modified: July 9, 2025
// Component for selecting between crypto and card payment modes

import React from 'react';

const PaymentModeSelector = ({ selectedMode, onModeChange }) => {
  return (
    <div className="payment-mode-selector">
      <h2>Choose Payment Method</h2>
      <div className="mode-options">
        <button
          className={`mode-option ${selectedMode === 'crypto' ? 'active' : ''}`}
          onClick={() => onModeChange('crypto')}
        >
          <span className="mode-icon">₿</span>
          <div className="mode-content">
            <h3>Cryptocurrency</h3>
            <p>Pay directly with crypto</p>
            <ul>
              <li>No fees</li>
              <li>Instant confirmation</li>
              <li>Multiple cryptocurrencies</li>
            </ul>
          </div>
        </button>

        <button
          className={`mode-option ${selectedMode === 'card' ? 'active' : ''}`}
          onClick={() => onModeChange('card')}
        >
          <span className="mode-icon">💳</span>
          <div className="mode-content">
            <h3>Credit/Debit Card</h3>
            <p>Secure card payment</p>
            <ul>
              <li>Multiple processors</li>
              <li>Instant processing</li>
              <li>Global availability</li>
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PaymentModeSelector; 