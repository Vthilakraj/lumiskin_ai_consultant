import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onMenuClick, onSettingsClick }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616c9c9b8d8?w=100&h=100&fit=crop&crop=face"
              alt="Lumi AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
        </div>
        <div>
          <h1 className="font-heading font-semibold text-lg text-foreground">Lumi</h1>
          <p className="text-xs text-muted-foreground font-body">Your AI Skincare Expert</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Icon name="Settings" size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Icon name="Menu" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;