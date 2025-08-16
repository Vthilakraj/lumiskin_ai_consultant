import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortOptions = ({ 
  currentSort, 
  onSortChange, 
  resultCount = 0,
  className = "" 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest Arrivals', icon: 'Clock' },
    { value: 'bestseller', label: 'Best Sellers', icon: 'Award' },
    { value: 'name-az', label: 'Name: A to Z', icon: 'ArrowUp' },
    { value: 'name-za', label: 'Name: Z to A', icon: 'ArrowDown' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentSortLabel = () => {
    const current = sortOptions?.find(option => option?.value === currentSort);
    return current ? current?.label : 'Relevance';
  };

  const getCurrentSortIcon = () => {
    const current = sortOptions?.find(option => option?.value === currentSort);
    return current ? current?.icon : 'Target';
  };

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setShowDropdown(false);
  };

  const formatResultCount = (count) => {
    return new Intl.NumberFormat('en-IN')?.format(count);
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground font-body">
          {formatResultCount(resultCount)} product{resultCount !== 1 ? 's' : ''} found
        </span>
      </div>
      {/* Sort Dropdown */}
      <div ref={dropdownRef} className="relative">
        <Button
          variant="outline"
          onClick={() => setShowDropdown(!showDropdown)}
          iconName={getCurrentSortIcon()}
          iconPosition="left"
          className="min-w-[160px] justify-between"
        >
          <span className="truncate">{getCurrentSortLabel()}</span>
          <Icon 
            name={showDropdown ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2 flex-shrink-0" 
          />
        </Button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-lg shadow-warm-lg z-50 py-1">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSortSelect(option?.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                  currentSort === option?.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                <Icon 
                  name={option?.icon} 
                  size={16} 
                  className={currentSort === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className="font-body text-sm">{option?.label}</span>
                {currentSort === option?.value && (
                  <Icon name="Check" size={14} className="text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortOptions;