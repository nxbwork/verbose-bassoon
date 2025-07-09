// Last modified: July 9, 2025
// Payment processors configuration for card payment integration

export const paymentProcessors = {
  stripe: {
    name: 'Stripe',
    key: 'stripe',
    minAmount: 2,
    maxAmount: 10000,
    countries: ['US'],
    fees: '2.9% + 30¢',
    description: 'Credit/debit cards, digital wallets (North America only)',
    icon: '💳',
    supported: true
  },
  coinbase: {
    name: 'Coinbase Pay',
    key: 'coinbase',
    minAmount: 2,
    maxAmount: 50000,
    countries: ['US', 'EU', 'UK'],
    fees: '1.49%',
    description: 'Crypto payments with Coinbase',
    icon: '🪙',
    supported: true
  },
  rampnetwork: {
    name: 'Ramp Network',
    key: 'rampnetwork',
    minAmount: 4,
    maxAmount: 20000,
    countries: ['US', 'EU', 'UK', 'CA'],
    fees: '0.49% - 2.49%',
    description: 'Fiat to crypto onramp',
    icon: '🌉',
    supported: true
  },
  robinhood: {
    name: 'Robinhood',
    key: 'robinhood',
    minAmount: 5,
    maxAmount: 10000,
    countries: ['US'],
    fees: '1.5%',
    description: 'Commission-free trading platform',
    icon: '🟢',
    supported: true
  },
  unlimit: {
    name: 'Unlimit',
    key: 'unlimit',
    minAmount: 10,
    maxAmount: 50000,
    countries: ['US', 'EU', 'UK'],
    fees: '2.9%',
    description: 'Global payment processing',
    icon: '♾️',
    supported: true
  },
  bitnovo: {
    name: 'Bitnovo',
    key: 'bitnovo',
    minAmount: 10,
    maxAmount: 1000,
    countries: ['ES', 'IT', 'PT'],
    fees: '5%',
    description: 'Cash payments for crypto',
    icon: '💶',
    supported: true
  },
  swipelux: {
    name: 'SwipeLux',
    key: 'swipelux',
    minAmount: 14,
    maxAmount: 5000,
    countries: ['US'],
    fees: '2.9% + 30¢',
    description: 'Mobile payment solutions',
    icon: '📱',
    supported: true
  },
  alchemypay: {
    name: 'Alchemy Pay',
    key: 'alchemypay',
    minAmount: 15,
    maxAmount: 10000,
    countries: ['US', 'EU', 'UK', 'SG'],
    fees: '2.5%',
    description: 'Hybrid crypto-fiat payment',
    icon: '⚗️',
    supported: true
  },
  revolut: {
    name: 'Revolut',
    key: 'revolut',
    minAmount: 15,
    maxAmount: 10000,
    countries: ['US', 'EU', 'UK'],
    fees: '1.5%',
    description: 'Digital banking platform',
    icon: '🔄',
    supported: true
  },
  transak: {
    name: 'Transak',
    key: 'transak',
    minAmount: 15,
    maxAmount: 20000,
    countries: ['US', 'EU', 'UK', 'IN'],
    fees: '0.5% - 2.5%',
    description: 'Fiat to crypto gateway',
    icon: '🔄',
    supported: true
  },
  moonpay: {
    name: 'MoonPay',
    key: 'moonpay',
    minAmount: 20,
    maxAmount: 50000,
    countries: ['US', 'EU', 'UK', 'CA'],
    fees: '1% - 4.5%',
    description: 'Crypto payment infrastructure',
    icon: '🌙',
    supported: true
  },
  banxa: {
    name: 'Banxa',
    key: 'banxa',
    minAmount: 20,
    maxAmount: 20000,
    countries: ['US', 'EU', 'UK', 'AU'],
    fees: '1% - 3.5%',
    description: 'Fiat to crypto exchange',
    icon: '🏦',
    supported: true
  },
  guardarian: {
    name: 'Guardarian',
    key: 'guardarian',
    minAmount: 20,
    maxAmount: 15000,
    countries: ['US', 'EU', 'UK'],
    fees: '1% - 3%',
    description: 'Crypto payment gateway',
    icon: '🛡️',
    supported: true
  },
  mercuryo: {
    name: 'Mercuryo',
    key: 'mercuryo',
    minAmount: 30,
    maxAmount: 10000,
    countries: ['US', 'EU', 'UK'],
    fees: '1% - 4%',
    description: 'Crypto payment solutions',
    icon: '☿',
    supported: true
  },
  simpleswap: {
    name: 'SimpleSwap',
    key: 'simpleswap',
    minAmount: 30,
    maxAmount: 5000,
    countries: ['US', 'EU', 'UK'],
    fees: '2% - 5%',
    description: 'Instant crypto exchange',
    icon: '🔄',
    supported: true
  },
  sardine: {
    name: 'Sardine',
    key: 'sardine',
    minAmount: 30,
    maxAmount: 10000,
    countries: ['US'],
    fees: '2.5%',
    description: 'Fraud prevention platform',
    icon: '🐟',
    supported: true
  },
  particle: {
    name: 'Particle Network',
    key: 'particle',
    minAmount: 30,
    maxAmount: 5000,
    countries: ['US', 'EU', 'UK'],
    fees: '2% - 4%',
    description: 'Web3 infrastructure',
    icon: '⚛️',
    supported: true
  },
  finchpay: {
    name: 'FinchPay',
    key: 'finchpay',
    minAmount: 40,
    maxAmount: 10000,
    countries: ['US'],
    fees: '2.9%',
    description: 'Digital payment platform',
    icon: '🐦',
    supported: true
  },
  simplex: {
    name: 'Simplex',
    key: 'simplex',
    minAmount: 50,
    maxAmount: 20000,
    countries: ['US', 'EU', 'UK'],
    fees: '2.5% - 5%',
    description: 'Fiat to crypto processing',
    icon: '📊',
    supported: true
  },
  utorg: {
    name: 'UTORG',
    key: 'utorg',
    minAmount: 50,
    maxAmount: 15000,
    countries: ['US', 'EU', 'UK'],
    fees: '2% - 4%',
    description: 'Crypto payment gateway',
    icon: '🪙',
    supported: true
  }
};

// Get available processors based on amount
export const getAvailableProcessors = (amount) => {
  return Object.values(paymentProcessors)
    .filter(processor => processor.supported && amount >= processor.minAmount && amount <= processor.maxAmount)
    .sort((a, b) => a.minAmount - b.minAmount);
};

// Get processor by key
export const getProcessorByKey = (processorKey) => {
  return paymentProcessors[processorKey] || null;
}; 