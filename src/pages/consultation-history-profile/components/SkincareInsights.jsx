import React from 'react';
import Icon from '../../../components/AppIcon';

const SkincareInsights = ({ insights }) => {
  const getInsightIcon = (type) => {
    const icons = {
      'improvement': 'TrendingUp',
      'recommendation': 'Lightbulb',
      'warning': 'AlertTriangle',
      'achievement': 'Award',
      'tip': 'Info'
    };
    return icons?.[type] || 'Info';
  };

  const getInsightColor = (type) => {
    const colors = {
      'improvement': 'text-success bg-success/10',
      'recommendation': 'text-primary bg-primary/10',
      'warning': 'text-warning bg-warning/10',
      'achievement': 'text-accent bg-accent/10',
      'tip': 'text-secondary bg-secondary/10'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted/10';
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Skincare Insights
        </h3>
        <Icon name="Brain" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => (
          <div
            key={insight?.id}
            className="flex items-start space-x-3 p-4 bg-background rounded-xl border border-border"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getInsightColor(insight?.type)}`}>
              <Icon 
                name={getInsightIcon(insight?.type)} 
                size={16} 
                className="text-current" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-heading font-medium text-sm text-foreground">
                  {insight?.title}
                </h4>
                <span className="text-xs text-muted-foreground font-caption flex-shrink-0 ml-2">
                  {insight?.date}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                {insight?.description}
              </p>

              {/* Progress or Metrics */}
              {insight?.metrics && (
                <div className="flex items-center space-x-4 mb-3">
                  {insight?.metrics?.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-xs font-caption text-foreground">
                        <span className="font-medium">{metric?.label}:</span> {metric?.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Items */}
              {insight?.actionItems?.length > 0 && (
                <div className="space-y-1">
                  <h5 className="text-xs font-heading font-medium text-foreground">
                    Recommended Actions:
                  </h5>
                  {insight?.actionItems?.map((action, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="ArrowRight" size={12} className="text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground font-body">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Related Products */}
              {insight?.relatedProducts?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Package" size={12} className="text-primary" />
                    <span className="text-xs font-heading font-medium text-foreground">
                      Suggested Products:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {insight?.relatedProducts?.map((product, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-caption hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* View More Insights */}
      <div className="text-center mt-6">
        <button className="text-sm text-primary hover:text-primary/80 font-body font-medium transition-colors">
          View All Insights
        </button>
      </div>
    </div>
  );
};

export default SkincareInsights;