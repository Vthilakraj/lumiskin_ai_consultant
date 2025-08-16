import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, onProductClick, onQuickReply }) => {
  const isUser = message?.sender === 'user';
  const timestamp = new Date(message.timestamp)?.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] md:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616c9c9b8d8?w=50&h=50&fit=crop&crop=face"
                alt="Lumi"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground font-caption">Lumi</span>
          </div>
        )}
        
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-4' 
            : 'bg-muted text-foreground mr-4'
        }`}>
          {message?.type === 'text' && (
            <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">
              {message?.content}
            </p>
          )}
          
          {message?.type === 'assessment' && (
            <div className="space-y-3">
              <p className="font-body text-sm leading-relaxed">
                {message?.content}
              </p>
              {message?.options && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message?.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => onQuickReply?.(option)}
                      className="text-xs"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {message?.type === 'product_recommendation' && (
            <div className="space-y-4">
              <p className="font-body text-sm leading-relaxed mb-4">
                {message?.content}
              </p>
              {message?.products?.map((product) => (
                <div key={product?.id} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex space-x-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-sm text-foreground mb-1 truncate">
                        {product?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-body mb-2">
                        {product?.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-data font-medium text-lg text-foreground">
                          {formatPrice(product?.price)}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                          >
                            <Icon name="Heart" size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onProductClick?.(product)}
                            className="text-xs px-3"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      {product?.keyIngredients && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product?.keyIngredients?.slice(0, 2)?.map((ingredient, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-secondary/10 text-secondary rounded-md font-caption text-xs"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {message?.type === 'progress' && (
            <div className="space-y-3">
              <p className="font-body text-sm leading-relaxed">
                {message?.content}
              </p>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-caption text-muted-foreground">
                    Assessment Progress
                  </span>
                  <span className="text-xs font-caption text-muted-foreground">
                    {message?.progress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${message?.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className={`flex items-center mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-muted-foreground font-caption">
            {timestamp}
          </span>
          {message?.status && isUser && (
            <Icon 
              name={message?.status === 'sent' ? 'Check' : 'CheckCheck'} 
              size={12} 
              className={`ml-1 ${message?.status === 'read' ? 'text-primary' : 'text-muted-foreground'}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;