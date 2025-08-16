import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, errors, className = "" }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Email or Phone"
        name="emailOrPhone"
        type="text"
        placeholder="Enter your email or phone number"
        value={formData?.emailOrPhone}
        onChange={handleInputChange}
        error={errors?.emailOrPhone}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 font-body font-medium transition-colors"
        >
          Forgot Password?
        </button>
      </div>
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
        Sign In to LumiSkin ✨
      </Button>
    </form>
  );
};

export default LoginForm;