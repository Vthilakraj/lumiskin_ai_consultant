import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageInstructions = ({ instructions = [] }) => {
  const getStepIcon = (stepNumber) => {
    const icons = ['Droplets', 'Hand', 'RotateCcw', 'Sun', 'Moon'];
    return icons?.[stepNumber - 1] || 'Circle';
  };

  if (!instructions?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          How to Use
        </h3>
      </div>
      <div className="space-y-4">
        {instructions?.map((instruction, index) => (
          <div key={index} className="flex space-x-4">
            {/* Step Number */}
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon 
                name={getStepIcon(instruction?.step)} 
                size={18} 
                className="text-primary" 
              />
            </div>

            {/* Step Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-heading font-medium text-foreground">
                  Step {instruction?.step}
                </span>
                {instruction?.timing && (
                  <span className="text-muted-foreground font-body text-sm">
                    • {instruction?.timing}
                  </span>
                )}
              </div>
              
              <p className="text-foreground font-body text-sm leading-relaxed">
                {instruction?.description}
              </p>

              {instruction?.tips && (
                <div className="bg-accent/10 rounded-lg p-3 mt-2">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-accent-foreground font-body text-sm">
                      <span className="font-medium">Tip:</span> {instruction?.tips}
                    </p>
                  </div>
                </div>
              )}

              {instruction?.warning && (
                <div className="bg-warning/10 rounded-lg p-3 mt-2">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-warning-foreground font-body text-sm">
                      <span className="font-medium">Warning:</span> {instruction?.warning}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Usage Frequency */}
      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <h4 className="font-heading font-medium text-foreground text-sm">
            Recommended Usage
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Sun" size={14} className="text-warning" />
            <span className="text-foreground font-body">Morning: Apply after cleansing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Moon" size={14} className="text-primary" />
            <span className="text-foreground font-body">Evening: Use before moisturizer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageInstructions;