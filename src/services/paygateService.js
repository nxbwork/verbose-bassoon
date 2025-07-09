// Last modified: July 9, 2025
// PayGate.to integration service for card payments

import { cryptoAddresses } from '../config/crypto';

// Get USDC Polygon address for PayGate.to wallet creation
const getUSDCAddress = () => {
  return cryptoAddresses.USDC_POLYGON?.address || cryptoAddresses.USDT_POLYGON?.address;
};

// Create PayGate.to wallet
export const createPayGateWallet = async (callbackUrl) => {
  try {
    const address = getUSDCAddress();
    if (!address) {
      throw new Error('USDC Polygon address not found in configuration');
    }

    // Encode callback URL for API request
    const encodedCallback = encodeURIComponent(callbackUrl);
    const walletUrl = `https://api.paygate.to/control/wallet.php?address=${address}&callback=${encodedCallback}`;

    const response = await fetch(walletUrl);
    if (!response.ok) {
      throw new Error(`Failed to create wallet: ${response.status}`);
    }

    const walletData = await response.json();
    return walletData;
  } catch (error) {
    console.error('Error creating PayGate wallet:', error);
    throw error;
  }
};

// Generate payment URL for PayGate.to checkout
export const generatePaymentUrl = (walletData, amount, email, provider = 'moonpay') => {
  try {
    const { address_in } = walletData;
    if (!address_in) {
      throw new Error('Invalid wallet data: missing address_in');
    }

    // Build URL manually to avoid encoding the crypto address
    const baseUrl = 'https://checkout.paygate.to/process-payment.php';
    const params = [
      `address=${address_in}`,
      `amount=${amount}`,
      `provider=${provider}`,
      `email=${encodeURIComponent(email)}`,
      `currency=USD`
    ];

    return `${baseUrl}?${params.join('&')}`;
  } catch (error) {
    console.error('Error generating payment URL:', error);
    throw error;
  }
};

// Validate payment amount against processor limits
export const validatePaymentAmount = (amount, processor) => {
  if (!amount || isNaN(amount) || amount <= 0) {
    return { valid: false, error: 'Invalid amount' };
  }

  if (amount < processor.minAmount) {
    return { 
      valid: false, 
      error: `Minimum amount required: $${processor.minAmount}` 
    };
  }

  if (amount > processor.maxAmount) {
    return { 
      valid: false, 
      error: `Maximum amount allowed: $${processor.maxAmount}` 
    };
  }

  return { valid: true };
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; 