import React from 'react';
import Icon from '../../../components/AppIcon';


const WelcomeHeader = ({ mode, className = "" }) => {
  const getWelcomeContent = () => {
    if (mode === 'login') {
      return {
        title: "Welcome Back! 💖",
        subtitle: "Continue your skincare journey with Lumi",
        description: "Sign in to access your personalized consultations and product recommendations.",
        emoji: "✨"
      };
    } else {
      return {
        title: "Join LumiSkin Family! 🌟",
        subtitle: "Start your personalized skincare journey",
        description: "Create your account to get AI-powered skincare consultations tailored just for you.",
        emoji: "🌸"
      };
    }
  };

  const content = getWelcomeContent();

  return (
    <div className={`text-center space-y-4 ${className}`}>
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-warm-md">
            <span className="text-white font-heading font-bold text-lg">L</span>
          </div>
          <div className="text-left">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              LumiSkin
            </h1>
            <p className="text-sm text-muted-foreground font-body">
              AI Beauty Consultant
            </p>
          </div>
        </div>
      </div>
      {/* Welcome Content */}
      <div className="space-y-3">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          {content?.title}
        </h2>
        <p className="text-primary font-body font-medium">
          {content?.subtitle}
        </p>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm mx-auto">
          {content?.description}
        </p>
      </div>
      {/* Decorative Elements */}
      <div className="hidden md:block">
        <div className="flex justify-center space-x-8 mt-8 opacity-60">
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name="Sparkles" size={24} className="text-secondary" />
            </div>
            <p className="text-xs text-muted-foreground font-caption">
              AI Powered
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <Icon name="Heart" size={24} className="text-accent" />
            </div>
            <p className="text-xs text-muted-foreground font-caption">
              Personalized
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
            <p className="text-xs text-muted-foreground font-caption">
              Trusted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;