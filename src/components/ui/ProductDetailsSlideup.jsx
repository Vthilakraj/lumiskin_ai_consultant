import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ProductDetailsSlideup = ({ 
  isOpen = false, 
  onClose, 
  product = null,
  sourceContext = 'chat', // 'chat' | 'browse'
  className = ""
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product?.variants?.[0]);
    }
  }, [product]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose?.();
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful add to cart
      console.log('Added to cart:', {
        product: product?.id,
        variant: selectedVariant?.id,
        quantity
      });
      
      // Show success feedback
      // In real app, this would trigger a toast notification
      
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  if (!isOpen || !product) return null;

  const slideupContent = (
    <div 
      className={`fixed inset-0 z-1100 bg-black/50 backdrop-blur-sm animate-fade-in ${className}`}
      onClick={handleBackdropClick}
    >
      {/* Mobile Slideup */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-muted rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg text-foreground">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square bg-muted">
              <Image
                src={product?.images?.[activeImageIndex] || '/assets/images/no_image.png'}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product?.images?.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product?.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeImageIndex ? 'bg-primary' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-4">
            <div>
              <h1 className="font-heading font-semibold text-xl text-foreground mb-2">
                {product?.name}
              </h1>
              <p className="text-muted-foreground font-body text-sm mb-3">
                {product?.brand}
              </p>
              <div className="flex items-center space-x-2">
                <span className="font-data font-medium text-2xl text-foreground">
                  {formatPrice(selectedVariant?.price || product?.price)}
                </span>
                {product?.originalPrice && (
                  <span className="font-data text-sm text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Variants */}
            {product?.variants?.length > 0 && (
              <div>
                <h3 className="font-heading font-medium text-sm text-foreground mb-2">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product?.variants?.map((variant) => (
                    <button
                      key={variant?.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-2 rounded-lg border font-caption text-sm transition-colors ${
                        selectedVariant?.id === variant?.id
                          ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      {variant?.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-heading font-medium text-sm text-foreground mb-2">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="font-data font-medium text-lg w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading font-medium text-sm text-foreground mb-2">
                Description
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Key Ingredients */}
            {product?.keyIngredients?.length > 0 && (
              <div>
                <h3 className="font-heading font-medium text-sm text-foreground mb-2">
                  Key Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product?.keyIngredients?.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary/10 text-secondary rounded-md font-caption text-xs"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex space-x-3">
            <Button variant="outline" size="icon">
              <Icon name="Heart" size={20} />
            </Button>
            <Button
              variant="default"
              fullWidth
              loading={isAddingToCart}
              onClick={handleAddToCart}
              iconName="ShoppingCart"
              iconPosition="left"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Panel */}
      <div className="hidden md:block fixed right-0 top-0 bottom-0 w-[60%] max-w-2xl bg-card shadow-warm-lg overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={product?.images?.[activeImageIndex] || '/assets/images/no_image.png'}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product?.images?.length > 1 && (
                <div className="flex space-x-2">
                  {product?.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === activeImageIndex ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product?.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading font-semibold text-2xl text-foreground mb-2">
                  {product?.name}
                </h1>
                <p className="text-muted-foreground font-body mb-4">
                  {product?.brand}
                </p>
                <div className="flex items-center space-x-3">
                  <span className="font-data font-medium text-3xl text-foreground">
                    {formatPrice(selectedVariant?.price || product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="font-data text-lg text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Variants */}
              {product?.variants?.length > 0 && (
                <div>
                  <h3 className="font-heading font-medium text-foreground mb-3">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product?.variants?.map((variant) => (
                      <button
                        key={variant?.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 rounded-lg border font-caption transition-colors ${
                          selectedVariant?.id === variant?.id
                            ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-primary/50'
                        }`}
                      >
                        {variant?.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-heading font-medium text-foreground mb-3">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="font-data font-medium text-xl w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button variant="outline" size="icon">
                  <Icon name="Heart" size={20} />
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  loading={isAddingToCart}
                  onClick={handleAddToCart}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-heading font-medium text-foreground mb-3">
                  Description
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Key Ingredients */}
              {product?.keyIngredients?.length > 0 && (
                <div>
                  <h3 className="font-heading font-medium text-foreground mb-3">
                    Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product?.keyIngredients?.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/10 text-secondary rounded-md font-caption text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(slideupContent, document.body);
};

export default ProductDetailsSlideup;