import React from 'react';

const AuthToggle = ({ activeMode, onModeChange, className = "" }) => {
  return (
    <div className={`flex bg-muted rounded-lg p-1 ${className}`}>
      <button
        onClick={() => onModeChange('login')}
        className={`flex-1 py-2 px-4 rounded-md font-body font-medium text-sm transition-all duration-200 ${
          activeMode === 'login' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('register')}
        className={`flex-1 py-2 px-4 rounded-md font-body font-medium text-sm transition-all duration-200 ${
          activeMode === 'register' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthToggle;