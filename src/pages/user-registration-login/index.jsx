import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import WelcomeHeader from './components/WelcomeHeader';
import LanguageToggle from './components/LanguageToggle';
import Image from '../../components/AppImage';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    email: "user@lumiskin.com",
    phone: "+91 98765 43210",
    password: "lumiskin123"
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('lumiSkinUser');
    if (isAuthenticated) {
      navigate('/lumi-chat-consultation-interface');
    }
  }, [navigate]);

  const validateLoginForm = (formData) => {
    const newErrors = {};

    if (!formData?.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }

    // Check mock credentials
    const isValidEmail = formData?.emailOrPhone === mockCredentials?.email;
    const isValidPhone = formData?.emailOrPhone === mockCredentials?.phone;
    const isValidPassword = formData?.password === mockCredentials?.password;

    if (formData?.emailOrPhone && formData?.password) {
      if ((!isValidEmail && !isValidPhone) || !isValidPassword) {
        newErrors.submit = `Invalid credentials. Try: ${mockCredentials?.email} / ${mockCredentials?.password}`;
      }
    }

    return newErrors;
  };

  const validateRegisterForm = (formData) => {
    const newErrors = {};

    if (!formData?.name || formData?.name?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91\s\d{5}\s\d{5}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number (+91 XXXXX XXXXX)';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors)?.length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      const userData = {
        id: '1',
        name: 'Beauty Enthusiast',
        email: formData?.emailOrPhone?.includes('@') ? formData?.emailOrPhone : mockCredentials?.email,
        phone: formData?.emailOrPhone?.includes('@') ? mockCredentials?.phone : formData?.emailOrPhone,
        joinDate: new Date()?.toISOString(),
        consultations: 0
      };

      localStorage.setItem('lumiSkinUser', JSON.stringify(userData));
      navigate('/lumi-chat-consultation-interface');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors)?.length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const userData = {
        id: Date.now()?.toString(),
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        joinDate: new Date()?.toISOString(),
        consultations: 0
      };

      localStorage.setItem('lumiSkinUser', JSON.stringify(userData));
      navigate('/lumi-chat-consultation-interface');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);

    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData = {
        id: Date.now()?.toString(),
        name: `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`,
        email: `user@${provider}.com`,
        phone: '+91 98765 43210',
        joinDate: new Date()?.toISOString(),
        consultations: 0,
        provider
      };

      localStorage.setItem('lumiSkinUser', JSON.stringify(userData));
      navigate('/lumi-chat-consultation-interface');
    } catch (error) {
      setErrors({ submit: `${provider} login failed. Please try again.` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="h-16 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-semibold text-sm">L</span>
            </div>
            <span className="font-heading font-semibold text-lg text-foreground">LumiSkin</span>
          </div>
          <LanguageToggle />
        </div>
      </header>
      {/* Main Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <WelcomeHeader mode={authMode} className="mb-8" />

          {/* Auth Toggle */}
          <AuthToggle 
            activeMode={authMode} 
            onModeChange={handleModeChange}
            className="mb-6"
          />

          {/* Auth Forms */}
          <div className="bg-card rounded-2xl shadow-warm-lg p-6 space-y-6">
            {authMode === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                errors={errors}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isLoading}
                errors={errors}
              />
            )}

            {/* Social Login */}
            <SocialLogin
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground font-body">
              © {new Date()?.getFullYear()} LumiSkin. All rights reserved.
            </p>
          </div>
        </div>

        {/* Desktop Side Images */}
        <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-1/4 opacity-20">
          <div className="h-full flex flex-col justify-center space-y-8 p-8">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
                alt="Skincare products"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?w=400&h=400&fit=crop"
                alt="Beauty routine"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-1/4 opacity-20">
          <div className="h-full flex flex-col justify-center space-y-8 p-8">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.jpg?w=400&h=400&fit=crop"
                alt="Glowing skin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop"
                alt="Natural ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistrationLogin;