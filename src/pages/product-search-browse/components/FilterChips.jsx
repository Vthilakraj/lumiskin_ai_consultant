import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ 
  activeFilters, 
  onFilterChange, 
  onClearAll,
  className = "" 
}) => {
  const filterCategories = [
    {
      id: 'category',
      label: 'Category',
      icon: 'Grid3X3',
      options: [
        { value: 'cleanser', label: 'Cleansers' },
        { value: 'serum', label: 'Serums' },
        { value: 'moisturizer', label: 'Moisturizers' },
        { value: 'sunscreen', label: 'Sunscreens' },
        { value: 'toner', label: 'Toners' },
        { value: 'mask', label: 'Face Masks' }
      ]
    },
    {
      id: 'skinType',
      label: 'Skin Type',
      icon: 'User',
      options: [
        { value: 'oily', label: 'Oily' },
        { value: 'dry', label: 'Dry' },
        { value: 'combination', label: 'Combination' },
        { value: 'sensitive', label: 'Sensitive' },
        { value: 'normal', label: 'Normal' }
      ]
    },
    {
      id: 'priceRange',
      label: 'Price Range',
      icon: 'IndianRupee',
      options: [
        { value: '0-500', label: 'Under ₹500' },
        { value: '500-1000', label: '₹500 - ₹1,000' },
        { value: '1000-2000', label: '₹1,000 - ₹2,000' },
        { value: '2000-5000', label: '₹2,000 - ₹5,000' },
        { value: '5000+', label: 'Above ₹5,000' }
      ]
    },
    {
      id: 'concern',
      label: 'Skin Concerns',
      icon: 'Target',
      options: [
        { value: 'acne', label: 'Acne' },
        { value: 'pigmentation', label: 'Pigmentation' },
        { value: 'dryness', label: 'Dryness' },
        { value: 'aging', label: 'Anti-aging' },
        { value: 'dullness', label: 'Dullness' },
        { value: 'sensitivity', label: 'Sensitivity' }
      ]
    }
  ];

  const quickFilters = [
    { id: 'bestseller', label: 'Bestsellers', icon: 'Star' },
    { id: 'new', label: 'New Arrivals', icon: 'Sparkles' },
    { id: 'organic', label: 'Organic', icon: 'Leaf' },
    { id: 'dermatologist', label: 'Dermatologist Tested', icon: 'Shield' }
  ];

  const handleChipClick = (filterId, value) => {
    const currentValues = activeFilters?.[filterId] || [];
    const isSelected = currentValues?.includes(value);
    
    let newValues;
    if (isSelected) {
      newValues = currentValues?.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    onFilterChange(filterId, newValues);
  };

  const handleQuickFilterClick = (filterId) => {
    const isActive = activeFilters?.[filterId];
    onFilterChange(filterId, !isActive);
  };

  const getTotalActiveFilters = () => {
    return Object.values(activeFilters)?.reduce((total, filterValues) => {
      if (Array.isArray(filterValues)) {
        return total + filterValues?.length;
      }
      return total + (filterValues ? 1 : 0);
    }, 0);
  };

  const totalActive = getTotalActiveFilters();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters?.map((filter) => {
          const isActive = activeFilters?.[filter?.id];
          return (
            <button
              key={filter?.id}
              onClick={() => handleQuickFilterClick(filter?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <Icon name={filter?.icon} size={14} />
              <span className="font-caption text-sm font-medium">{filter?.label}</span>
            </button>
          );
        })}
      </div>
      {/* Category Filters */}
      <div className="space-y-3">
        {filterCategories?.map((category) => {
          const activeValues = activeFilters?.[category?.id] || [];
          const hasActiveFilters = activeValues?.length > 0;

          return (
            <div key={category?.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                <span className="font-heading font-medium text-sm text-foreground">
                  {category?.label}
                </span>
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-caption font-medium">
                    {activeValues?.length}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {category?.options?.map((option) => {
                  const isSelected = activeValues?.includes(option?.value);
                  return (
                    <button
                      key={option?.value}
                      onClick={() => handleChipClick(category?.id, option?.value)}
                      className={`px-3 py-1.5 rounded-full border text-sm font-caption font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-secondary text-secondary-foreground border-secondary shadow-sm'
                          : 'bg-card text-muted-foreground border-border hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary'
                      }`}
                    >
                      {option?.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Clear All Filters */}
      {totalActive > 0 && (
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground font-body">
            {totalActive} filter{totalActive !== 1 ? 's' : ''} applied
          </span>
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary/80 font-body font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterChips;