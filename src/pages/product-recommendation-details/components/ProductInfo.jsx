import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product = {} }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out this amazing skincare product: ${product?.name}`,
          url: window.location?.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-2">
            {product?.name}
          </h1>
          <p className="text-muted-foreground font-body text-lg mb-1">
            {product?.brand}
          </p>
          <p className="text-muted-foreground font-body text-sm">
            {product?.category}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              className={isFavorite ? "fill-current text-primary" : ""} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="Share" size={20} />
          </Button>
        </div>
      </div>
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="font-data font-semibold text-3xl md:text-4xl text-foreground">
            {formatPrice(selectedVariant?.price || product?.price)}
          </span>
          {product?.originalPrice && (
            <span className="font-data text-xl text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
          {product?.discount && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md font-caption font-medium text-sm">
              {product?.discount}% OFF
            </span>
          )}
        </div>
        {product?.priceNote && (
          <p className="text-muted-foreground font-body text-sm">
            {product?.priceNote}
          </p>
        )}
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)]?.map((_, index) => (
            <Icon
              key={index}
              name="Star"
              size={16}
              className={`${
                index < Math.floor(product?.rating || 0)
                  ? 'text-warning fill-current' :'text-muted-foreground'
              }`}
            />
          ))}
          <span className="font-data font-medium text-foreground ml-1">
            {product?.rating || 0}
          </span>
        </div>
        <span className="text-muted-foreground font-body text-sm">
          ({product?.reviewCount || 0} reviews)
        </span>
      </div>
      {/* Key Benefits */}
      {product?.keyBenefits?.length > 0 && (
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Key Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product?.keyBenefits?.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={12} className="text-success" />
                </div>
                <span className="font-body text-sm text-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Variants/Sizes */}
      {product?.variants?.length > 0 && (
        <div>
          <h3 className="font-heading font-medium text-foreground mb-3">
            Available Sizes
          </h3>
          <div className="flex flex-wrap gap-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border font-caption text-sm transition-colors duration-200 ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">{variant?.size}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatPrice(variant?.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          product?.inStock ? 'bg-success' : 'bg-error'
        }`}></div>
        <span className={`font-body text-sm ${
          product?.inStock ? 'text-success' : 'text-error'
        }`}>
          {product?.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        {product?.stockCount && product?.stockCount < 10 && (
          <span className="text-warning font-body text-sm">
            Only {product?.stockCount} left!
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;