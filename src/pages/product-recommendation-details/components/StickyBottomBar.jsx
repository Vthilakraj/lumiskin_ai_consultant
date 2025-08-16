import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyBottomBar = ({ product = {}, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart?.({ product, quantity });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const totalPrice = (product?.price || 0) * quantity;

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-md bg-background flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              <Icon name="Minus" size={14} />
            </button>
            <span className="font-data font-medium text-foreground w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="w-8 h-8 rounded-md bg-background flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Icon name="Plus" size={14} />
            </button>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex-1 flex items-center space-x-3">
            <div className="text-right">
              <div className="font-data font-semibold text-lg text-foreground">
                {formatPrice(totalPrice)}
              </div>
              {quantity > 1 && (
                <div className="text-muted-foreground font-body text-xs">
                  {formatPrice(product?.price)} × {quantity}
                </div>
              )}
            </div>
            <Button
              variant="default"
              loading={isAdding}
              onClick={handleAddToCart}
              disabled={!product?.inStock}
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-1"
            >
              {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Sticky Bottom Bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h3 className="font-heading font-medium text-foreground">
                {product?.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                {product?.brand}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 bg-muted rounded-lg p-2">
              <span className="text-muted-foreground font-body text-sm">Qty:</span>
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-md bg-background flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="font-data font-medium text-foreground w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-8 h-8 rounded-md bg-background flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="font-data font-semibold text-2xl text-foreground">
                {formatPrice(totalPrice)}
              </div>
              {quantity > 1 && (
                <div className="text-muted-foreground font-body text-sm">
                  {formatPrice(product?.price)} × {quantity}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="lg"
                iconName="Heart"
                iconPosition="left"
              >
                Save for Later
              </Button>
              <Button
                variant="default"
                size="lg"
                loading={isAdding}
                onClick={handleAddToCart}
                disabled={!product?.inStock}
                iconName="ShoppingCart"
                iconPosition="left"
              >
                {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer to prevent content overlap */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default StickyBottomBar;