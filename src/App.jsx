// Last modified: July 9, 2025
// Main App component for NXBREW donation site
// Handles crypto and card payment modes with PayGate.to integration

import React, { useState, useEffect, useRef } from 'react';
import { cryptoAddresses } from './config/crypto';
import CryptoSection from './components/CryptoSection';
import PaymentModeSelector from './components/PaymentModeSelector';
import CardPaymentForm from './components/CardPaymentForm';
import { createPayGateWallet, generatePaymentUrl } from './services/paygateService';
import './styles/main.css';
import { useQRCode } from './composables/useQRCode';
import { useCopyToClipboard } from './composables/useCopyToClipboard';

function App() {
  // Payment mode state (crypto or card)
  const [selectedMode, setSelectedMode] = useState('crypto');
  
  // Crypto selection state
  const [selectedCryptoKey, setSelectedCryptoKey] = useState(Object.keys(cryptoAddresses)[0]);
  const selectedCrypto = cryptoAddresses[selectedCryptoKey];
  
  // QR code generation for selected crypto address
  const { qrCodeBase64 } = useQRCode(selectedCrypto?.address || '');
  
  // Card payment processing state
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  
  // Copy to clipboard functionality
  const { copyToClipboard, copied } = useCopyToClipboard();
  
  // Responsive design state
  const [isMobile, setIsMobile] = useState(false);
  const copyBtnRef = useRef(null);

  // Handle responsive design changes
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 700);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Truncate crypto address for mobile display
  const truncateAddress = (addr) => {
    if (!isMobile || !addr) return addr;
    return addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;
  };

  // Handle card payment form submission
  const handleCardPaymentSubmit = async (paymentData) => {
    setIsProcessingCard(true);
    setPaymentUrl(null);
    try {
      // Create callback URL for payment completion
      const callbackUrl = `${window.location.origin}/payment-success`;
      
      // Generate PayGate wallet and payment URL
      const walletData = await createPayGateWallet(callbackUrl);
      const generatedPaymentUrl = generatePaymentUrl(
        walletData,
        paymentData.amount,
        paymentData.email,
        paymentData.processor.key
      );
      
      // Store payment URL and open popup
      setPaymentUrl(generatedPaymentUrl);
      window.open(generatedPaymentUrl, '_blank');
    } catch (error) {
      console.error('Error processing card payment:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setIsProcessingCard(false);
    }
  };

  // Handle payment link click (fallback for blocked popups)
  const handlePaymentLinkClick = () => {
    window.open(paymentUrl, '_blank');
  };

  return (
    <div className="nxbrew-root">
      <div className="main-area">
        {/* Header with logo and stats */}
        <header className="header header-nxbrew">
          <div className="header-content">
            <div className="header-main">
              <div className="banner-logo-title">
                <div className="title-section">
                  <h1>
                    <img src="/icon.png" alt="NXBREW Logo" className="title-logo" />
                  </h1>
                  <p className="header-subtitle">
                    Support the project and help us keep the site alive!
                  </p>
                </div>
              </div>
              <div className="header-stats">
                <div className="stat-item">
                  <span className="stat-number">24+</span>
                  <span className="stat-label">Payment Methods</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Secure</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">0%</span>
                  <span className="stat-label">Crypto Fees</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container">
          <div className="main-content">
            {/* Payment mode selector (crypto vs card) */}
            <PaymentModeSelector
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
            />

            {/* Crypto payment section */}
            {selectedMode === 'crypto' && (
              <section className="crypto-simple-section">
                <label htmlFor="crypto-select" className="section-title">Choose your cryptocurrency</label>
                <select
                  id="crypto-select"
                  className="crypto-select"
                  value={selectedCryptoKey}
                  onChange={e => setSelectedCryptoKey(e.target.value)}
                >
                  {Object.entries(cryptoAddresses).map(([key, crypto]) => (
                    <option key={key} value={key}>
                      {isMobile ? `${crypto.name} (${crypto.symbol})` : `${crypto.name} (${crypto.symbol}) - ${crypto.network}`}
                    </option>
                  ))}
                </select>
                <div className="crypto-simple-details">
                  {/* Crypto info display */}
                  <div className="crypto-simple-info">
                    <span className="crypto-simple-icon">{selectedCrypto.icon}</span>
                    <span className="crypto-simple-name">{selectedCrypto.name} ({selectedCrypto.symbol})</span>
                    {!isMobile && <span className="crypto-simple-network">{selectedCrypto.network}</span>}
                  </div>
                  
                  {/* Crypto address with copy functionality */}
                  <div className="crypto-simple-address-row">
                    <div className="crypto-simple-address-label">Address:</div>
                    <div className="crypto-simple-address-box">
                      <span className="crypto-simple-address-value" title={selectedCrypto.address}>{truncateAddress(selectedCrypto.address)}</span>
                      <div className="copy-btn-wrapper">
                        <button
                          ref={copyBtnRef}
                          className={`crypto-copy-btn${copied ? ' copied' : ''}`}
                          onClick={() => copyToClipboard(selectedCrypto.address)}
                          aria-label="Copy address"
                          type="button"
                        >
                          <span className="visually-hidden">Copy</span>
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="6" y="6" width="10" height="10" rx="3" stroke="#c00" strokeWidth="2" fill="#fff"/>
                            <rect x="10" y="2" width="8" height="8" rx="2" stroke="#c00" strokeWidth="2" fill="#fff"/>
                          </svg>
                        </button>
                        <div className={`copy-tooltip${copied ? ' copied' : ''}`}>{copied ? 'Copied!' : 'Copy'}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* QR code for mobile scanning */}
                  <div className="crypto-simple-qr-block">
                    <div className="crypto-simple-qr-title">Scan QR code</div>
                    <div className="crypto-simple-qr-center">
                      {qrCodeBase64 && <img src={qrCodeBase64} alt="QR Code" className={`crypto-simple-qr-img${isMobile ? ' mobile' : ''}`} />}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Card payment section */}
            {selectedMode === 'card' && (
              <div className="card-payment-section">
                {!paymentUrl ? (
                  // Show payment form if no URL generated yet
                  <CardPaymentForm onPaymentSubmit={handleCardPaymentSubmit} />
                ) : (
                  // Show payment link after generation
                  <div className="payment-link-section">
                    <div className="payment-link-header">
                      <h3>Payment Link Generated</h3>
                      <p>If the payment page didn't open automatically, click the link below:</p>
                    </div>
                    <div className="payment-link-container">
                      <a 
                        href={paymentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="payment-link"
                        onClick={handlePaymentLinkClick}
                      >
                        Open Payment Page
                      </a>
                      <button
                        className="copy-payment-link-btn"
                        onClick={() => copyToClipboard(paymentUrl)}
                        aria-label="Copy payment link"
                      >
                        Copy Link
                      </button>
                      <button
                        className="new-payment-btn"
                        onClick={() => setPaymentUrl(null)}
                        aria-label="Start new payment"
                      >
                        Start New Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="footer footer-nxbrew">
          <p>
            Attention: Donations are voluntary and non-refundable.<br />
            Thank you for your support!
          </p>
        </footer>
      </div>

      {/* Loading overlay for card payment processing */}
      {isProcessingCard && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Preparing payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
