import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleProductClick = (productId) => {
    // In a real app, this would navigate to the specific product
    navigate(`/product-recommendation-details?id=${productId}`);
  };

  if (!products?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Grid3X3" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Similar Products
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/product-search-browse')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto pb-4">
        <div className="flex space-x-4" style={{ width: 'max-content' }}>
          {products?.map((product) => (
            <div
              key={product?.id}
              className="w-48 bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product?.id)}
            >
              <div className="aspect-square bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <h4 className="font-heading font-medium text-foreground text-sm line-clamp-2">
                  {product?.name}
                </h4>
                <p className="text-muted-foreground font-body text-xs">
                  {product?.brand}
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={12}
                      className={`${
                        index < Math.floor(product?.rating || 0)
                          ? 'text-warning fill-current' :'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-muted-foreground font-body text-xs ml-1">
                    ({product?.reviewCount || 0})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-data font-semibold text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="aspect-square bg-muted relative overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {product?.discount && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md font-caption font-medium text-xs">
                  {product?.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-heading font-medium text-foreground line-clamp-2 mb-1">
                  {product?.name}
                </h4>
                <p className="text-muted-foreground font-body text-sm">
                  {product?.brand}
                </p>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={14}
                    className={`${
                      index < Math.floor(product?.rating || 0)
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-muted-foreground font-body text-sm ml-1">
                  ({product?.reviewCount || 0})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-data font-semibold text-lg text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="font-data text-sm text-muted-foreground line-through block">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Handle add to cart
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;