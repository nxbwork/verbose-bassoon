import React, { useState, useEffect } from 'react';
import { getAvailableProcessors } from '../config/paymentProcessors';
import { validatePaymentAmount, validateEmail } from '../services/paygateService';

/**
 * Component for card payment form with processor selection
 */
const CardPaymentForm = ({ onPaymentSubmit }) => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [availableProcessors, setAvailableProcessors] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Update available processors when amount changes
  useEffect(() => {
    if (amount && !isNaN(amount) && amount > 0) {
      const processors = getAvailableProcessors(parseFloat(amount));
      setAvailableProcessors(processors);
      setSelectedProcessor(processors.length > 0 ? processors[0] : null);
    } else {
      setAvailableProcessors([]);
      setSelectedProcessor(null);
    }
  }, [amount]);

  const validateForm = () => {
    const newErrors = {};

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (selectedProcessor) {
      const amountValidation = validatePaymentAmount(parseFloat(amount), selectedProcessor);
      if (!amountValidation.valid) {
        newErrors.amount = amountValidation.error;
      }
    }

    // Validate email
    if (!email) {
      newErrors.email = 'Please enter your email address';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate processor selection
    if (!selectedProcessor) {
      newErrors.processor = 'Please select a payment processor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onPaymentSubmit({
        amount: parseFloat(amount),
        email,
        processor: selectedProcessor
      });
    } catch {
      setErrors({ submit: 'Error processing payment. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-payment-form">
      <h3 className="form-title">Credit Card Payment</h3>
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="amount">Amount (USD)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {amount && availableProcessors.length > 0 && (
          <div className="form-group">
            <label>Available payment processor</label>
            <div className="processor-options">
              {availableProcessors.map((processor) => (
                <button
                  key={processor.key}
                  type="button"
                  className={`processor-option ${selectedProcessor?.key === processor.key ? 'active' : ''}`}
                  onClick={() => setSelectedProcessor(processor)}
                >
                  <div className="processor-icon">{processor.icon}</div>
                  <div className="processor-info">
                    <div className="processor-name">{processor.name}</div>
                    <div className="processor-details">
                      <span>Min: ${processor.minAmount}</span>
                      <span>Fees: {processor.fees}</span>
                    </div>
                    <div className="processor-description">{processor.description}</div>
                  </div>
                </button>
              ))}
            </div>
            {errors.processor && <span className="error-message">{errors.processor}</span>}
          </div>
        )}

        {amount && availableProcessors.length === 0 && (
          <div className="no-processors">
            <p>No processor available for this amount.</p>
            <p>Minimum amount required: $2</p>
          </div>
        )}

        {selectedProcessor && (
          <div className="processor-summary">
            <h4>Payment Summary</h4>
            <div className="summary-details">
              <p><strong>Amount:</strong> ${amount}</p>
              <p><strong>Processor:</strong> {selectedProcessor.name}</p>
              <p><strong>Fees:</strong> {selectedProcessor.fees}</p>
              <p className="note">
                Note: The final amount may vary slightly depending on the payment processor fees.
              </p>
            </div>
          </div>
        )}

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button
          type="submit"
          className="submit-button"
          disabled={!selectedProcessor || isLoading}
        >
          {isLoading ? 'Processing...' : 'Proceed to payment'}
        </button>
      </form>
    </div>
  );
};

export default CardPaymentForm; 