import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading, errors, className = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 6) strength += 1;
    if (password?.match(/[a-z]/) && password?.match(/[A-Z]/)) strength += 1;
    if (password?.match(/\d/)) strength += 1;
    if (password?.match(/[^a-zA-Z\d]/)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-error';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-accent';
      case 4:
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.name}
        onChange={handleInputChange}
        error={errors?.name}
        required
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="+91 XXXXX XXXXX"
        value={formData?.phone}
        onChange={handleInputChange}
        error={errors?.phone}
        required
      />
      <div>
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex-1 bg-muted rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
              <span className="text-xs font-caption text-muted-foreground">
                {getPasswordStrengthText()}
              </span>
            </div>
          </div>
        )}
      </div>
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        error={errors?.confirmPassword}
        required
      />
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleInputChange}
        error={errors?.agreeToTerms}
        required
      />
      {errors?.submit && (
        <div className="text-error text-sm font-body text-center bg-error/10 p-3 rounded-lg">
          <Icon name="AlertCircle" size={16} className="inline mr-2" />
          {errors?.submit}
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Create Your LumiSkin Account 🌟
      </Button>
    </form>
  );
};

export default RegisterForm;