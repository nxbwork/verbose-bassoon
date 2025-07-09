import React from 'react';
import { useCopyToClipboard } from '../composables/useCopyToClipboard';

/**
 * Component for displaying a cryptocurrency donation card
 * @param {Object} props - Component props
 * @param {Object} props.crypto - Cryptocurrency data object
 * @param {Function} props.onSelect - Function called when card is selected
 * @param {boolean} props.isSelected - Whether this card is currently selected
 */
const CryptoCard = ({ crypto, onSelect, isSelected }) => {
  const { copyToClipboard, copied } = useCopyToClipboard();

  /**
   * Handle copy button click
   * @param {Event} e - Click event
   */
  const handleCopyClick = (e) => {
    e.stopPropagation(); // Prevent card selection when copying
    copyToClipboard(crypto.address);
  };

  /**
   * Handle card click to select cryptocurrency
   */
  const handleCardClick = () => {
    onSelect(crypto);
  };

  return (
    <div 
      className={`crypto-card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
    >
      <div className="crypto-header">
        <div className="crypto-icon">
          {crypto.icon}
        </div>
        <div className="crypto-info">
          <h3>{crypto.name}</h3>
          <div className="network">{crypto.network}</div>
        </div>
      </div>
      
      <div className="crypto-address">
        {crypto.address}
      </div>
      
      <button 
        className={`copy-button ${copied ? 'copied' : ''}`}
        onClick={handleCopyClick}
      >
        {copied ? 'Copied!' : 'Copy Address'}
      </button>
    </div>
  );
};

export default CryptoCard; 