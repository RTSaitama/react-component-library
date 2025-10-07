import React, { useState } from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'number' | 'password' | 'email';
  value: string;
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  clearable = false,
  disabled = false,
  error,
  label,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    if (!disabled) {
      onChange('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const showClearButton = clearable && value && !disabled;
  const showPasswordToggle = type === 'password';

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <div
        className={`input-container ${isFocused ? 'focused' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <input
          type={inputType}
          value={value}
          className="input-field"
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}

          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className="input-icons">
          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="input-icon-button"
              disabled={disabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}

          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="input-icon-button clear-button"
              aria-label="Clear input"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="input-error">
          {error}
        </div>
      )}
    </div>
  );
};

 
export default function InputDemo() {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '40px', fontFamily: 'system-ui, sans-serif' }}>Input Component Demo</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Input
          type="text"
          value={textValue}
          onChange={setTextValue}
          label="Text Input"
          placeholder="Enter some text..."
          clearable
        />

        <Input
          type="password"
          value={passwordValue}
          onChange={setPasswordValue}
          label="Password Input"
          placeholder="Enter password..."
          clearable
        />

        <Input
          type="number"
          value={numberValue}
          onChange={setNumberValue}
          label="Number Input"
          placeholder="Enter a number..."
          clearable
        />

        <Input
          type="email"
          value={emailValue}
          onChange={setEmailValue}
          label="Email Input"
          placeholder="Enter your email..."
          clearable
          error={emailValue && !emailValue.includes('@') ? 'Please enter a valid email' : undefined}
        />

        <Input
          type="text"
          value="Disabled input"
          onChange={() => { }}
          label="Disabled Input"
          disabled
        />
      </div>
    </div>
  );
}