// Last modified: July 9, 2025
// Custom hook for generating QR codes from text (base64 only, no network)

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export const useQRCode = (text) => {
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!text) {
      setQrCodeBase64(null);
      return;
    }

    const generateQRCode = async () => {
      setLoading(true);
      setError(null);
      setQrCodeBase64(null);
      try {
        // Generate QR code as base64 data URL
        const dataUrl = await QRCode.toDataURL(text, {
          width: 240,
          margin: 2,
          color: {
            dark: '#222',
            light: '#fff'
          }
        });
        setQrCodeBase64(dataUrl);
        setLoading(false);
      } catch {
        setError('Failed to generate QR code');
        setLoading(false);
      }
    };

    generateQRCode();
  }, [text]);

  return { qrCodeBase64, loading, error };
}; 