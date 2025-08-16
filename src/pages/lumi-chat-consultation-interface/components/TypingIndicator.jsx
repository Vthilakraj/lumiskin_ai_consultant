import React from 'react';
import Image from '../../../components/AppImage';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] md:max-w-[70%]">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616c9c9b8d8?w=50&h=50&fit=crop&crop=face"
              alt="Lumi"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground font-caption">Lumi is typing...</span>
        </div>
        
        <div className="bg-muted rounded-2xl px-4 py-3 mr-4">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;