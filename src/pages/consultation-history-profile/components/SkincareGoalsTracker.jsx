import React from 'react';
import Icon from '../../../components/AppIcon';

const SkincareGoalsTracker = ({ goals, onUpdateGoal }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-accent';
  };

  const getGoalIcon = (goalType) => {
    const icons = {
      'hydration': 'Droplets',
      'acne_reduction': 'Zap',
      'anti_aging': 'Clock',
      'brightening': 'Sun',
      'protection': 'Shield',
      'texture': 'Layers'
    };
    return icons?.[goalType] || 'Target';
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Skincare Goals
        </h3>
        <Icon name="Target" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {goals?.map((goal) => (
          <div key={goal?.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={getGoalIcon(goal?.type)} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <h4 className="font-heading font-medium text-sm text-foreground">
                    {goal?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-body">
                    Target: {goal?.targetDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-data font-semibold text-sm text-foreground">
                  {goal?.progress}%
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  Complete
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal?.progress)}`}
                style={{ width: `${goal?.progress}%` }}
              />
            </div>

            {/* Milestones */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-caption">
                Started: {goal?.startDate}
              </span>
              {goal?.progress >= 100 && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={12} />
                  <span className="font-caption font-medium">Achieved!</span>
                </div>
              )}
            </div>

            {/* Current Actions */}
            {goal?.currentActions?.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-3">
                <h5 className="font-heading font-medium text-xs text-foreground mb-2">
                  Current Actions:
                </h5>
                <div className="space-y-1">
                  {goal?.currentActions?.map((action, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      <span className="text-xs text-muted-foreground font-body">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add New Goal */}
      <button
        onClick={() => onUpdateGoal?.()}
        className="w-full mt-4 p-3 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors group"
      >
        <div className="flex items-center justify-center space-x-2">
          <Icon 
            name="Plus" 
            size={16} 
            className="text-muted-foreground group-hover:text-primary transition-colors" 
          />
          <span className="text-sm text-muted-foreground group-hover:text-primary font-body transition-colors">
            Add New Goal
          </span>
        </div>
      </button>
    </div>
  );
};

export default SkincareGoalsTracker;