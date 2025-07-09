# NXBREW Donate

A modern, responsive donation site supporting both cryptocurrency and card payments.

## Features

- **Crypto Payments**: Direct wallet addresses with QR codes
- **Card Payments**: Multiple payment processors for secure processing
- **Responsive Design**: Optimized for desktop and mobile
- **Copy to Clipboard**: Easy address copying with visual feedback
- **QR Code Generation**: Local QR code generation for mobile scanning

## Tech Stack

- React 18
- Vite
- CSS3 with modern features
- Multiple payment processor integrations

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Payment Methods

### Cryptocurrency
- Bitcoin (BTC)
- Ethereum (ETH)
- USDC (Polygon)
- USDT (Polygon)
- And more...

### Card Payments
- Multiple payment processors available
- Dynamic processor selection based on amount
- Secure payment processing
- Note: Stripe is available for North America only

## Project Structure

```
src/
├── components/          # React components
├── composables/         # Custom hooks
├── config/             # Configuration files
├── services/           # API services
└── styles/             # CSS stylesheets
```

## Configuration

Update `src/config/crypto.js` to add or modify cryptocurrency addresses.

## License

Private project - All rights reserved.
