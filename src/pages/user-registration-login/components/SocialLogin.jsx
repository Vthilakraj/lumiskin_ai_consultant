import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading, className = "" }) => {
  const socialOptions = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      color: 'text-red-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600'
    }
  ];

  const handleSocialClick = (provider) => {
    onSocialLogin?.(provider);
  };

  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-background text-muted-foreground font-body">
            Or continue with
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {socialOptions?.map((option) => (
          <Button
            key={option?.id}
            variant="outline"
            onClick={() => handleSocialClick(option?.id)}
            disabled={isLoading}
            className="w-full"
          >
            <Icon 
              name={option?.icon} 
              size={16} 
              className={`mr-2 ${option?.color}`} 
            />
            {option?.name}
          </Button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground font-body">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;