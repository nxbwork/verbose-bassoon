// Cryptocurrency donation addresses configuration
export const cryptoAddresses = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1q2uxffna34phncf2lz4lw46gyeemmj4hgddtp9p',
    network: 'Bitcoin',
    icon: '₿'
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x42a0a0e1416e5954331470050b501114ff0AD21c',
    network: 'ERC-20',
    icon: 'Ξ'
  },
  BNB: {
    name: 'BNB',
    symbol: 'BNB',
    address: '0x42a0a0e1416e5954331470050b501114ff0AD21c',
    network: 'BNB Smart Chain',
    icon: '🟡'
  },
  USDT_TRC20: {
    name: 'USDT',
    symbol: 'USDT',
    address: 'TEMc4aSZmQDWT7P1U2HvHE4uqthHwD1Hjp',
    network: 'TRC-20',
    icon: '💵'
  },
  USDT_ERC20: {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x42a0a0e1416e5954331470050b501114ff0AD21c',
    network: 'ERC-20',
    icon: '💵'
  },
  USDT_POLYGON: {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x42a0a0e1416e5954331470050b501114ff0AD21c',
    network: 'Polygon POS',
    icon: '💵'
  },
  USDT_TON: {
    name: 'USDT',
    symbol: 'USDT',
    address: 'UQDbRJckt8W-b27978Ke_BuUGJxGvXlyoLFIQalRXgspZRXC',
    network: 'TON Network',
    icon: '💵'
  },
  USDC_TRC20: {
    name: 'USDC',
    symbol: 'USDC',
    address: 'TEMc4aSZmQDWT7P1U2HvHE4uqthHwD1Hjp',
    network: 'TRC-20',
    icon: '💙'
  },
  USDC_BEP20: {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x42a0a0e1416e5954331470050b501114ff0AD21c',
    network: 'BEP-20',
    icon: '💙'
  },
  TRON: {
    name: 'TRON',
    symbol: 'TRX',
    address: 'TEMc4aSZmQDWT7P1U2HvHE4uqthHwD1Hjp',
    network: 'Tron',
    icon: '⚡'
  },
  POLYGON: {
    name: 'Polygon',
    symbol: 'MATIC',
    address: '0x42a0a0e1416e5954331470050b501114ff0AD21c',
    network: 'ERC-20',
    icon: '🔷'
  },
  SOLANA: {
    name: 'Solana',
    symbol: 'SOL',
    address: '62eKQjv5sFk2g2Ekicib4GqeoirPhPAQ6aw8Go1PUZXx',
    network: 'Solana',
    icon: '◎'
  },
  LITECOIN: {
    name: 'Litecoin',
    symbol: 'LTC',
    address: 'ltc1qcw4t34lc6tqv7mrz67kxh7mqfxgn647hr58w0r',
    network: 'Litecoin',
    icon: 'Ł'
  },
  DASH: {
    name: 'Dash',
    symbol: 'DASH',
    address: 'XjMATUix63oiFVLdbohTrFKWLQmrN6gHzc',
    network: 'Dash',
    icon: 'Ð'
  }
};

// Group cryptocurrencies by type for better organization
export const cryptoGroups = {
  major: ['BTC', 'ETH', 'BNB', 'SOLANA'],
  stablecoins: ['USDT_TRC20', 'USDT_ERC20', 'USDT_POLYGON', 'USDT_TON', 'USDC_TRC20', 'USDC_BEP20'],
  altcoins: ['TRON', 'POLYGON', 'LITECOIN', 'DASH']
}; 