import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProductDetailsSlideup from '../../../components/ui/ProductDetailsSlideup';

const ProductGrid = ({ 
  products, 
  loading = false, 
  onLoadMore,
  hasMore = false,
  searchQuery = "",
  className = "" 
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleAddToCart = async (productId, e) => {
    e?.stopPropagation();
    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Added to cart:', productId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={12} className="text-warning fill-current" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground/30" />
      );
    }
    
    return stars;
  };

  const SkeletonCard = () => (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="flex items-center space-x-2">
          <div className="h-3 bg-muted rounded w-16"></div>
          <div className="h-3 bg-muted rounded w-8"></div>
        </div>
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-8 bg-muted rounded"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className={`space-y-6 ${className}`}>
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products?.map((product) => (
            <div
              key={product?.id}
              onClick={() => handleProductClick(product)}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-warm-md transition-all duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product?.isNew && (
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                    New
                  </span>
                )}
                {product?.discount && (
                  <span className="absolute top-2 right-2 bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                    -{product?.discount}%
                  </span>
                )}
                
                {/* Quick Actions */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-8 h-8 shadow-warm-sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle wishlist
                    }}
                  >
                    <Icon name="Heart" size={14} />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-medium text-sm text-foreground line-clamp-2 leading-tight">
                  {highlightSearchTerm(product?.name, searchQuery)}
                </h3>
                
                <p className="text-xs text-muted-foreground font-body">
                  {product?.brand}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground font-caption">
                    ({product?.reviewCount})
                  </span>
                </div>

                {/* Key Ingredients */}
                {product?.keyIngredients && product?.keyIngredients?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product?.keyIngredients?.slice(0, 2)?.map((ingredient, index) => (
                      <span
                        key={index}
                        className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-caption"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {product?.keyIngredients?.length > 2 && (
                      <span className="text-xs text-muted-foreground font-caption">
                        +{product?.keyIngredients?.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="font-data font-semibold text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="font-data text-xs text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  loading={addingToCart?.[product?.id]}
                  onClick={(e) => handleAddToCart(product?.id, e)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="mt-3"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}

          {/* Loading Skeletons */}
          {loading && Array.from({ length: 8 })?.map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={onLoadMore}
              iconName="ChevronDown"
              iconPosition="right"
            >
              Load More Products
            </Button>
          </div>
        )}

        {/* No Results */}
        {!loading && products?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-medium text-lg text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or filters.`
                : "No products match your current filters. Try adjusting your selection."
              }
            </p>
          </div>
        )}
      </div>
      {/* Product Details Slideup */}
      <ProductDetailsSlideup
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        product={selectedProduct}
        sourceContext="browse"
      />
    </>
  );
};

export default ProductGrid;