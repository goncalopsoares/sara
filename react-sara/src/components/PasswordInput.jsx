import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'react-feather';

const PasswordInput = forwardRef(({ id, name, placeholder }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="position-relative" style={{ marginTop: "1rem" }}>
            <label htmlFor={id} className="form-label">
                {placeholder}
            </label>
            <div className="input-container" style={{ position: 'relative' }}>
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder={placeholder}
                    required
                    className="form-control pr-10"
                    style={{ paddingRight: '2.5rem' }} // Extra padding to accommodate the icon
                />
                <div
                    className="password-toggle-icon"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0.75rem',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer'
                    }}
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <EyeOff className="feather-eye" />
                    ) : (
                        <Eye className="feather-eye" />
                    )}
                </div>
            </div>
        </div>
    );
});

export default PasswordInput;
