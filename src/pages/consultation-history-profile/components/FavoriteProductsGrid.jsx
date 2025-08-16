import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoriteProductsGrid = ({ favoriteProducts, onRemoveFavorite, onReorder }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleProductClick = (product) => {
    navigate('/product-recommendation-details', { 
      state: { product, fromFavorites: true } 
    });
  };

  if (favoriteProducts?.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Favorite Products
          </h3>
          <Icon name="Heart" size={20} className="text-primary" />
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-heading font-medium text-foreground mb-2">
            No favorites yet
          </h4>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Save products during consultations to see them here
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/product-search-browse')}
            iconName="Search"
            iconPosition="left"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Favorite Products ({favoriteProducts?.length})
        </h3>
        <Icon name="Heart" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteProducts?.map((product) => (
          <div
            key={product?.id}
            className="bg-background rounded-xl p-4 border border-border hover:shadow-md transition-all duration-200 group"
          >
            {/* Product Image */}
            <div className="relative mb-3">
              <div 
                className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <button
                onClick={() => onRemoveFavorite(product?.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                <Icon name="Heart" size={16} className="text-red-500 fill-current" />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <div>
                <h4 
                  className="font-heading font-medium text-sm text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleProductClick(product)}
                >
                  {product?.name}
                </h4>
                <p className="text-xs text-muted-foreground font-body">
                  {product?.brand}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-data font-semibold text-sm text-foreground">
                  {formatPrice(product?.price)}
                </span>
                {product?.originalPrice && (
                  <span className="font-data text-xs text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
              </div>

              {/* Key Benefits */}
              {product?.keyBenefits?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product?.keyBenefits?.slice(0, 2)?.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary/10 text-secondary rounded-md text-xs font-caption"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReorder(product)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="flex-1"
                >
                  Reorder
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleProductClick(product)}
                  iconName="Eye"
                  iconPosition="left"
                  className="flex-1"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      {favoriteProducts?.length > 6 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/product-search-browse', { 
              state: { showFavorites: true } 
            })}
          >
            View All Favorites
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoriteProductsGrid;