import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ className = "" }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('lumiSkinLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('lumiSkinLanguage', newLanguage);
  };

  const getLanguageText = () => {
    return currentLanguage === 'en' ? 'हिंदी' : 'English';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`text-muted-foreground hover:text-foreground ${className}`}
    >
      <Icon name="Globe" size={16} className="mr-2" />
      {getLanguageText()}
    </Button>
  );
};

export default LanguageToggle;