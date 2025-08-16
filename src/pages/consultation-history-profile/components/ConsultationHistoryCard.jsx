import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConsultationHistoryCard = ({ consultation, onRestartConsultation }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

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
      state: { product, fromHistory: true } 
    });
  };

  const getConcernIcon = (concern) => {
    const icons = {
      'acne': 'Zap',
      'dullness': 'Sun',
      'dryness': 'Droplets',
      'pigmentation': 'Palette',
      'fine lines': 'Minus',
      'wrinkles': 'Waves',
      'sun damage': 'Shield'
    };
    return icons?.[concern?.toLowerCase()] || 'Circle';
  };

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6 shadow-sm border border-border">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="MessageCircle" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-medium text-foreground">
              Consultation #{consultation?.id}
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              {formatDate(consultation?.date)} • {consultation?.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${
            consultation?.status === 'completed' 
              ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            {consultation?.status}
          </span>
        </div>
      </div>
      {/* Concerns Discussed */}
      <div className="mb-4">
        <h4 className="font-heading font-medium text-sm text-foreground mb-2">
          Concerns Discussed
        </h4>
        <div className="flex flex-wrap gap-2">
          {consultation?.concerns?.map((concern, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-lg"
            >
              <Icon 
                name={getConcernIcon(concern)} 
                size={12} 
                className="text-muted-foreground" 
              />
              <span className="text-xs font-caption text-muted-foreground">
                {concern}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Summary */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          {consultation?.summary}
        </p>
      </div>
      {/* Recommended Products */}
      <div className="mb-4">
        <h4 className="font-heading font-medium text-sm text-foreground mb-3">
          Recommended Products ({consultation?.recommendedProducts?.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {consultation?.recommendedProducts?.map((product) => (
            <div
              key={product?.id}
              onClick={() => handleProductClick(product)}
              className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-heading font-medium text-sm text-foreground truncate">
                  {product?.name}
                </h5>
                <p className="text-xs text-muted-foreground font-body">
                  {product?.brand}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-data font-medium text-sm text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="font-data text-xs text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRestartConsultation(consultation)}
          iconName="RotateCcw"
          iconPosition="left"
          className="flex-1"
        >
          Similar Consultation
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/lumi-chat-consultation-interface', { 
            state: { consultationId: consultation?.id } 
          })}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ConsultationHistoryCard;