import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'chat',
      label: 'Chat',
      icon: 'MessageCircle',
      path: '/lumi-chat-consultation-interface',
      badge: null
    },
    {
      id: 'browse',
      label: 'Browse',
      icon: 'Search',
      path: '/product-search-browse',
      badge: null
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/consultation-history-profile',
      badge: null
    }
  ];

  const handleTabClick = (tab) => {
    navigate(tab?.path);
  };

  const isActiveTab = (tabPath) => {
    return location?.pathname === tabPath;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border ${className}`}>
        <div className="flex items-center justify-around h-16 px-4">
          {tabs?.map((tab) => {
            const isActive = isActiveTab(tab?.path);
            return (
              <button
                key={tab?.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center justify-center space-y-1 min-w-0 flex-1 py-2 px-1 transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={tab?.icon} 
                    size={20} 
                    className={isActive ? 'text-primary' : 'text-current'}
                  />
                  {tab?.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-caption font-medium">
                      {tab?.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-caption font-medium truncate ${
                  isActive ? 'text-primary' : 'text-current'
                }`}>
                  {tab?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Desktop Top Navigation */}
      <nav className={`hidden md:block fixed top-16 md:top-18 left-0 right-0 z-100 bg-card border-b border-border ${className}`}>
        <div className="flex items-center justify-center h-12 px-6">
          <div className="flex items-center space-x-8">
            {tabs?.map((tab) => {
              const isActive = isActiveTab(tab?.path);
              return (
                <button
                  key={tab?.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      name={tab?.icon} 
                      size={18} 
                      className={isActive ? 'text-primary' : 'text-current'}
                    />
                    {tab?.badge && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-caption font-medium">
                        {tab?.badge}
                      </span>
                    )}
                  </div>
                  <span className={`font-body font-medium ${
                    isActive ? 'text-primary' : 'text-current'
                  }`}>
                    {tab?.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;