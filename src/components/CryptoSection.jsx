import React from 'react';
import CryptoCard from './CryptoCard';

/**
 * Component for displaying a section of cryptocurrencies
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {Array} props.cryptos - Array of cryptocurrency keys
 * @param {Object} props.cryptoData - Object containing all cryptocurrency data
 * @param {Function} props.onSelect - Function called when a crypto is selected
 * @param {string} props.selectedCryptoKey - Key of currently selected cryptocurrency
 */
const CryptoSection = ({ title, cryptos, cryptoData, onSelect, selectedCryptoKey }) => {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className="crypto-grid">
        {cryptos.map((cryptoKey) => {
          const crypto = cryptoData[cryptoKey];
          if (!crypto) return null;
          
          return (
            <CryptoCard
              key={cryptoKey}
              crypto={crypto}
              onSelect={onSelect}
              isSelected={selectedCryptoKey === cryptoKey}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CryptoSection; 