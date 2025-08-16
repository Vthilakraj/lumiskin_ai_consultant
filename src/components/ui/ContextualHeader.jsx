import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualHeader = ({ 
  title, 
  showBack = false, 
  showSearch = false, 
  showSettings = false,
  onSearchClick,
  onSettingsClick,
  rightActions = [],
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  const getLogo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
        <span className="text-white font-heading font-semibold text-sm">L</span>
      </div>
      <span className="font-heading font-semibold text-lg text-foreground">LumiSkin</span>
    </div>
  );

  const getContextualContent = () => {
    if (location?.pathname === '/lumi-chat-consultation-interface') {
      return (
        <div className="flex items-center justify-between w-full">
          {getLogo()}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onSettingsClick}>
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      );
    }

    if (location?.pathname === '/product-search-browse') {
      return (
        <div className="flex items-center justify-between w-full">
          {getLogo()}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onSearchClick}>
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onSettingsClick}>
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      );
    }

    if (location?.pathname === '/consultation-history-profile') {
      return (
        <div className="flex items-center justify-between w-full">
          {getLogo()}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onSettingsClick}>
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      );
    }

    if (location?.pathname === '/product-recommendation-details') {
      return (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <span className="font-heading font-medium text-lg">Product Details</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Heart" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Share" size={20} />
            </Button>
          </div>
        </div>
      );
    }

    // Default header with custom content
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          {showBack && (
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
          )}
          {!showBack && getLogo()}
          {title && (
            <span className="font-heading font-medium text-lg">{title}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button variant="ghost" size="icon" onClick={onSearchClick}>
              <Icon name="Search" size={20} />
            </Button>
          )}
          {rightActions?.map((action, index) => (
            <Button 
              key={index}
              variant="ghost" 
              size="icon" 
              onClick={action?.onClick}
            >
              <Icon name={action?.icon} size={20} />
            </Button>
          ))}
          {showSettings && (
            <Button variant="ghost" size="icon" onClick={onSettingsClick}>
              <Icon name="Settings" size={20} />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-200 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="h-16 md:h-18 px-4 md:px-6 flex items-center">
        {getContextualContent()}
      </div>
    </header>
  );
};

export default ContextualHeader;