import React from 'react';
import Image from '../../../components/AppImage';

const WelcomeMessage = () => {
  const currentHour = new Date()?.getHours();
  let greeting = 'Good morning';
  let greetingEmoji = '🌅';

  if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good afternoon';
    greetingEmoji = '☀️';
  } else if (currentHour >= 17) {
    greeting = 'Good evening';
    greetingEmoji = '🌙';
  }

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[85%] md:max-w-[70%]">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616c9c9b8d8?w=50&h=50&fit=crop&crop=face"
              alt="Lumi"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground font-caption">Lumi</span>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl px-4 py-4 mr-4 border border-primary/20">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{greetingEmoji}</span>
              <h2 className="font-heading font-semibold text-lg text-foreground">
                {greeting}! I'm Lumi
              </h2>
            </div>
            
            <p className="font-body text-sm text-foreground leading-relaxed">
              Your personal AI skincare expert! I'm here to help you discover the perfect LumiSkin products for your unique skin needs. ✨
            </p>
            
            <div className="bg-card/50 rounded-lg p-3 space-y-2">
              <p className="font-body text-xs text-muted-foreground font-medium">
                I can help you with:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  '🔍 Skin Analysis',
                  '💫 Product Recommendations', 
                  '📋 Routine Building',
                  '🌿 Ingredient Education'
                ]?.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md font-caption text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="font-body text-sm text-foreground">
              Ready to start your personalized skincare journey? 🚀
            </p>
          </div>
        </div>
        
        <div className="flex items-center mt-1">
          <span className="text-xs text-muted-foreground font-caption">
            {new Date()?.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;