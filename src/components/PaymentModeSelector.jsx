import React from 'react';

/**
 * Component for selecting payment mode (crypto or card)
 */
const PaymentModeSelector = ({ selectedMode, onModeChange }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 700;
  return (
    <div className="payment-mode-selector">
      <h2 className="section-title">Choose your payment method</h2>
      <div className="mode-options">
        <button
          className={`mode-option ${selectedMode === 'crypto' ? 'active' : ''}`}
          onClick={() => onModeChange('crypto')}
        >
          <div className={`mode-icon${isMobile ? ' mobile' : ''}`}>🪙</div>
          <div className="mode-content">
            <h3>Cryptocurrencies</h3>
            {!isMobile && <p>Direct cryptocurrency payments</p>}
            <ul>
              <li>No additional fees</li>
              {isMobile ? null : <li>Instant payment</li>}
              {isMobile ? null : <li>Support for many cryptocurrencies</li>}
            </ul>
          </div>
        </button>

        <button
          className={`mode-option ${selectedMode === 'card' ? 'active' : ''}`}
          onClick={() => onModeChange('card')}
        >
          <div className={`mode-icon${isMobile ? ' mobile' : ''}`}>💳</div>
          <div className="mode-content">
            <h3>Credit Card</h3>
            {!isMobile && <p>Card payment via PayGate.to</p>}
            <ul>
              <li>Automatic conversion to USDC</li>
              {isMobile ? null : <li>Variable fees depending on processor</li>}
              {isMobile ? null : <li>Minimum amounts vary by processor</li>}
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PaymentModeSelector; 