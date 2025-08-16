import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit,
  className = "" 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const suggestions = [
    { type: 'concern', text: 'Acne treatment', icon: 'Zap' },
    { type: 'concern', text: 'Dark spots removal', icon: 'Sun' },
    { type: 'concern', text: 'Anti-aging serum', icon: 'Clock' },
    { type: 'ingredient', text: 'Vitamin C', icon: 'Leaf' },
    { type: 'ingredient', text: 'Hyaluronic acid', icon: 'Droplets' },
    { type: 'ingredient', text: 'Niacinamide', icon: 'Sparkles' },
    { type: 'product', text: 'Face wash', icon: 'Waves' },
    { type: 'product', text: 'Moisturizer', icon: 'Heart' },
    { type: 'product', text: 'Sunscreen', icon: 'Shield' },
    { type: 'concern', text: 'Oily skin care', icon: 'Droplet' },
    { type: 'concern', text: 'Dry skin remedy', icon: 'Snowflake' },
    { type: 'ingredient', text: 'Retinol', icon: 'Star' }
  ];

  const filteredSuggestions = suggestions?.filter(suggestion =>
    suggestion?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    setShowSuggestions(value?.length > 0);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < filteredSuggestions?.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions?.length - 1
        );
        break;
      case 'Enter':
        e?.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(filteredSuggestions?.[activeSuggestionIndex]);
        } else {
          onSearchSubmit(searchQuery);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion?.text);
    onSearchSubmit(suggestion?.text);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'concern': return 'text-accent';
      case 'ingredient': return 'text-secondary';
      case 'product': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'concern': return 'Concern';
      case 'ingredient': return 'Ingredient';
      case 'product': return 'Product';
      default: return '';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for products, ingredients, or skin concerns..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-4 h-12 text-base"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-lg shadow-warm-lg max-h-80 overflow-y-auto"
        >
          {filteredSuggestions?.slice(0, 8)?.map((suggestion, index) => (
            <button
              key={`${suggestion?.type}-${suggestion?.text}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                index === activeSuggestionIndex ? 'bg-muted/50' : ''
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === filteredSuggestions?.slice(0, 8)?.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <Icon 
                name={suggestion?.icon} 
                size={16} 
                className={getTypeColor(suggestion?.type)} 
              />
              <div className="flex-1">
                <span className="font-body text-foreground">{suggestion?.text}</span>
                <span className={`ml-2 text-xs font-caption ${getTypeColor(suggestion?.type)}`}>
                  {getTypeLabel(suggestion?.type)}
                </span>
              </div>
              <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;