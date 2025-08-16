import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IngredientsSection = ({ ingredients = [] }) => {
  const [expandedIngredient, setExpandedIngredient] = useState(null);

  const toggleIngredient = (index) => {
    setExpandedIngredient(expandedIngredient === index ? null : index);
  };

  const getIngredientIcon = (type) => {
    switch (type) {
      case 'natural':
        return 'Leaf';
      case 'scientific':
        return 'Atom';
      case 'active':
        return 'Zap';
      default:
        return 'Circle';
    }
  };

  const getIngredientColor = (type) => {
    switch (type) {
      case 'natural':
        return 'text-success bg-success/10';
      case 'scientific':
        return 'text-primary bg-primary/10';
      case 'active':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (!ingredients?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Beaker" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Key Ingredients
        </h3>
      </div>
      <div className="space-y-3">
        {ingredients?.map((ingredient, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-sm"
          >
            <button
              onClick={() => toggleIngredient(index)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getIngredientColor(ingredient?.type)}`}>
                  <Icon 
                    name={getIngredientIcon(ingredient?.type)} 
                    size={16} 
                  />
                </div>
                <div>
                  <h4 className="font-heading font-medium text-foreground">
                    {ingredient?.name}
                  </h4>
                  <p className="text-muted-foreground font-body text-sm">
                    {ingredient?.concentration}
                  </p>
                </div>
              </div>
              <Icon
                name={expandedIngredient === index ? "ChevronUp" : "ChevronDown"}
                size={20}
                className="text-muted-foreground"
              />
            </button>

            {expandedIngredient === index && (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <p className="text-foreground font-body text-sm leading-relaxed">
                  {ingredient?.description}
                </p>
                
                {ingredient?.benefits?.length > 0 && (
                  <div>
                    <h5 className="font-heading font-medium text-foreground text-sm mb-2">
                      Benefits:
                    </h5>
                    <ul className="space-y-1">
                      {ingredient?.benefits?.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-2">
                          <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground font-body text-sm">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ingredient?.suitableFor && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={14} className="text-primary" />
                    <span className="text-muted-foreground font-body text-sm">
                      Best for: {ingredient?.suitableFor}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Ingredient Legend */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-heading font-medium text-foreground text-sm mb-3">
          Ingredient Types
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="Leaf" size={12} className="text-success" />
            </div>
            <span className="font-body text-sm text-foreground">Natural</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Atom" size={12} className="text-primary" />
            </div>
            <span className="font-body text-sm text-foreground">Scientific</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-warning" />
            </div>
            <span className="font-body text-sm text-foreground">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsSection;