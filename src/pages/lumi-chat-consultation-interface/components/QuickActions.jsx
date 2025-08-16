import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onActionClick, disabled = false }) => {
  const quickActions = [
    {
      id: 'skin_analysis',
      label: 'Skin Analysis',
      icon: 'Scan',
      description: 'Get personalized skin assessment'
    },
    {
      id: 'product_recommendation',
      label: 'Product Recommendations',
      icon: 'Sparkles',
      description: 'Find perfect products for you'
    },
    {
      id: 'routine_help',
      label: 'Routine Help',
      icon: 'Clock',
      description: 'Build your skincare routine'
    },
    {
      id: 'ingredient_info',
      label: 'Ingredient Guide',
      icon: 'Leaf',
      description: 'Learn about skincare ingredients'
    }
  ];

  return (
    <div className="p-4 space-y-3">
      <div className="text-center mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          How can I help you today? ✨
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          Choose a topic or ask me anything about skincare
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            onClick={() => onActionClick?.(action?.id)}
            disabled={disabled}
            className="h-auto p-4 flex flex-col items-start space-y-2 text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={action?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-medium text-sm text-foreground mb-1">
                  {action?.label}
                </h4>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {action?.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={16} className="text-white" />
          </div>
          <div>
            <p className="font-body text-sm text-foreground">
              <span className="font-medium">Pro Tip:</span> Upload a photo of your skin for more accurate recommendations! 📸
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;