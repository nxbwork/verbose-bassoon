import React from 'react';
import { useQRCode } from '../composables/useQRCode';
import { useCopyToClipboard } from '../composables/useCopyToClipboard';

/**
 * Modal component for displaying QR codes
 * @param {Object} props - Component props
 * @param {Object} props.crypto - Selected cryptocurrency data
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to close modal
 */
const QRCodeModal = ({ crypto, isOpen, onClose }) => {
  const { qrCodeData, loading, error } = useQRCode(crypto?.address);
  const { copyToClipboard, copied } = useCopyToClipboard();

  /**
   * Handle copy address button click
   */
  const handleCopyAddress = () => {
    copyToClipboard(crypto.address);
  };

  /**
   * Handle overlay click to close modal
   * @param {Event} e - Click event
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render if modal is not open
  if (!isOpen || !crypto) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <h2>{crypto.name} ({crypto.symbol})</h2>
        <p>{crypto.network}</p>
        
        <div className="qr-code">
          {loading && <div className="loading"></div>}
          {error && <p>Error: {error}</p>}
          {qrCodeData && (
            <img 
              src={qrCodeData} 
              alt={`QR Code for ${crypto.name} address`}
              style={{ maxWidth: '200px', height: 'auto' }}
            />
          )}
        </div>
        
        <div className="crypto-address" style={{ marginBottom: '16px' }}>
          {crypto.address}
        </div>
        
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopyAddress}
          style={{ 
            background: copied ? '#48bb78' : '#667eea',
            borderColor: copied ? '#48bb78' : '#667eea',
            color: 'white'
          }}
        >
          {copied ? 'Copied!' : 'Copy Address'}
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal; 