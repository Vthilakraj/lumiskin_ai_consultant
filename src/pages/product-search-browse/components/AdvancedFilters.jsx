import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  className = "" 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState([
    localFilters?.minPrice || 0,
    localFilters?.maxPrice || 10000
  ]);

  const ingredientOptions = [
    { value: 'vitamin-c', label: 'Vitamin C', popular: true },
    { value: 'hyaluronic-acid', label: 'Hyaluronic Acid', popular: true },
    { value: 'niacinamide', label: 'Niacinamide', popular: true },
    { value: 'retinol', label: 'Retinol', popular: true },
    { value: 'salicylic-acid', label: 'Salicylic Acid', popular: true },
    { value: 'glycolic-acid', label: 'Glycolic Acid' },
    { value: 'peptides', label: 'Peptides' },
    { value: 'ceramides', label: 'Ceramides' },
    { value: 'kojic-acid', label: 'Kojic Acid' },
    { value: 'arbutin', label: 'Arbutin' },
    { value: 'tea-tree', label: 'Tea Tree Oil' },
    { value: 'aloe-vera', label: 'Aloe Vera' },
    { value: 'rose-water', label: 'Rose Water' },
    { value: 'turmeric', label: 'Turmeric' },
    { value: 'neem', label: 'Neem' }
  ];

  const brandOptions = [
    { value: 'lumiskin', label: 'LumiSkin', count: 45 },
    { value: 'glow-naturals', label: 'Glow Naturals', count: 32 },
    { value: 'pure-essence', label: 'Pure Essence', count: 28 },
    { value: 'radiant-care', label: 'Radiant Care', count: 24 },
    { value: 'skin-science', label: 'Skin Science', count: 19 },
    { value: 'herbal-beauty', label: 'Herbal Beauty', count: 16 },
    { value: 'derma-plus', label: 'Derma Plus', count: 12 }
  ];

  const benefitOptions = [
    { value: 'hydrating', label: 'Hydrating', icon: 'Droplets' },
    { value: 'anti-aging', label: 'Anti-aging', icon: 'Clock' },
    { value: 'brightening', label: 'Brightening', icon: 'Sun' },
    { value: 'acne-fighting', label: 'Acne Fighting', icon: 'Zap' },
    { value: 'gentle', label: 'Gentle', icon: 'Heart' },
    { value: 'exfoliating', label: 'Exfoliating', icon: 'RotateCcw' },
    { value: 'soothing', label: 'Soothing', icon: 'Leaf' },
    { value: 'firming', label: 'Firming', icon: 'ArrowUp' }
  ];

  const handleLocalFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleIngredientToggle = (ingredient) => {
    const current = localFilters?.ingredients || [];
    const updated = current?.includes(ingredient)
      ? current?.filter(i => i !== ingredient)
      : [...current, ingredient];
    handleLocalFilterChange('ingredients', updated);
  };

  const handleBrandToggle = (brand) => {
    const current = localFilters?.brands || [];
    const updated = current?.includes(brand)
      ? current?.filter(b => b !== brand)
      : [...current, brand];
    handleLocalFilterChange('brands', updated);
  };

  const handleBenefitToggle = (benefit) => {
    const current = localFilters?.benefits || [];
    const updated = current?.includes(benefit)
      ? current?.filter(b => b !== benefit)
      : [...current, benefit];
    handleLocalFilterChange('benefits', updated);
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    handleLocalFilterChange('minPrice', newRange?.[0]);
    handleLocalFilterChange('maxPrice', newRange?.[1]);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {};
    setLocalFilters(resetFilters);
    setPriceRange([0, 10000]);
    onFiltersChange(resetFilters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[90vh] overflow-hidden">
          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 bg-muted rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-4 border-b border-border">
            <h2 className="font-heading font-semibold text-lg text-foreground">Advanced Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-160px)] p-4 space-y-6">
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="IndianRupee" size={16} />
                <span>Price Range</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground font-caption">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange?.[0]}
                      onChange={(e) => handlePriceRangeChange(0, e?.target?.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-data text-foreground">{formatPrice(priceRange?.[0])}</span>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground font-caption">Max Price</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange?.[1]}
                      onChange={(e) => handlePriceRangeChange(1, e?.target?.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-data text-foreground">{formatPrice(priceRange?.[1])}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Ingredients */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="Leaf" size={16} />
                <span>Key Ingredients</span>
              </h3>
              <div className="space-y-2">
                {/* Popular Ingredients */}
                <div>
                  <h4 className="text-sm font-caption text-muted-foreground mb-2">Popular</h4>
                  <div className="space-y-2">
                    {ingredientOptions?.filter(ing => ing?.popular)?.map((ingredient) => (
                      <Checkbox
                        key={ingredient?.value}
                        label={ingredient?.label}
                        checked={(localFilters?.ingredients || [])?.includes(ingredient?.value)}
                        onChange={() => handleIngredientToggle(ingredient?.value)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Other Ingredients */}
                <div>
                  <h4 className="text-sm font-caption text-muted-foreground mb-2">Others</h4>
                  <div className="space-y-2">
                    {ingredientOptions?.filter(ing => !ing?.popular)?.map((ingredient) => (
                      <Checkbox
                        key={ingredient?.value}
                        label={ingredient?.label}
                        checked={(localFilters?.ingredients || [])?.includes(ingredient?.value)}
                        onChange={() => handleIngredientToggle(ingredient?.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="Tag" size={16} />
                <span>Brands</span>
              </h3>
              <div className="space-y-2">
                {brandOptions?.map((brand) => (
                  <div key={brand?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={brand?.label}
                      checked={(localFilters?.brands || [])?.includes(brand?.value)}
                      onChange={() => handleBrandToggle(brand?.value)}
                    />
                    <span className="text-xs text-muted-foreground font-caption">
                      ({brand?.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="Sparkles" size={16} />
                <span>Benefits</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {benefitOptions?.map((benefit) => (
                  <button
                    key={benefit?.value}
                    onClick={() => handleBenefitToggle(benefit?.value)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                      (localFilters?.benefits || [])?.includes(benefit?.value)
                        ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    <Icon name={benefit?.icon} size={16} />
                    <span className="font-caption text-sm">{benefit?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleResetFilters} className="flex-1">
                Reset
              </Button>
              <Button variant="default" onClick={handleApplyFilters} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block ${className}`}>
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg text-foreground">Filters</h2>
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
              Reset
            </Button>
          </div>

          {/* Same content as mobile but without the overlay structure */}
          <div className="space-y-6">
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="IndianRupee" size={16} />
                <span>Price Range</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground font-caption">Min: {formatPrice(priceRange?.[0])}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange?.[0]}
                      onChange={(e) => handlePriceRangeChange(0, e?.target?.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-caption">Max: {formatPrice(priceRange?.[1])}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange?.[1]}
                      onChange={(e) => handlePriceRangeChange(1, e?.target?.value)}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Ingredients */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="Leaf" size={16} />
                <span>Key Ingredients</span>
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {ingredientOptions?.map((ingredient) => (
                  <Checkbox
                    key={ingredient?.value}
                    label={ingredient?.label}
                    checked={(localFilters?.ingredients || [])?.includes(ingredient?.value)}
                    onChange={() => handleIngredientToggle(ingredient?.value)}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="Tag" size={16} />
                <span>Brands</span>
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brandOptions?.map((brand) => (
                  <div key={brand?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={brand?.label}
                      checked={(localFilters?.brands || [])?.includes(brand?.value)}
                      onChange={() => handleBrandToggle(brand?.value)}
                      size="sm"
                    />
                    <span className="text-xs text-muted-foreground font-caption">
                      ({brand?.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
                <Icon name="Sparkles" size={16} />
                <span>Benefits</span>
              </h3>
              <div className="space-y-2">
                {benefitOptions?.map((benefit) => (
                  <button
                    key={benefit?.value}
                    onClick={() => handleBenefitToggle(benefit?.value)}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg border transition-all text-left ${
                      (localFilters?.benefits || [])?.includes(benefit?.value)
                        ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    <Icon name={benefit?.icon} size={14} />
                    <span className="font-caption text-sm">{benefit?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button variant="default" fullWidth onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilters;