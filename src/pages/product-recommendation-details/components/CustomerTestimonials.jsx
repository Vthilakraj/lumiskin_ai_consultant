import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CustomerTestimonials = ({ testimonials = [] }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  if (!testimonials?.length) {
    return null;
  }

  const testimonial = testimonials?.[currentTestimonial];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="MessageSquare" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Customer Reviews
        </h3>
      </div>
      {/* Main Testimonial */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        {/* Customer Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <Image
              src={testimonial?.customerImage}
              alt={testimonial?.customerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-heading font-medium text-foreground">
              {testimonial?.customerName}
            </h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={14}
                    className={`${
                      index < testimonial?.rating
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground font-body text-sm">
                {testimonial?.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-foreground font-body leading-relaxed">
          "{testimonial?.review}"
        </p>

        {/* Before/After Images */}
        {testimonial?.beforeAfter && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h5 className="font-heading font-medium text-foreground text-sm">
                Before
              </h5>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={testimonial?.beforeAfter?.before}
                  alt="Before using product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-heading font-medium text-foreground text-sm">
                After {testimonial?.beforeAfter?.duration}
              </h5>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={testimonial?.beforeAfter?.after}
                  alt="After using product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skin Type & Concerns */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-md font-caption text-xs">
            {testimonial?.skinType}
          </span>
          {testimonial?.concerns?.map((concern, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/10 text-accent-foreground rounded-md font-caption text-xs"
            >
              {concern}
            </span>
          ))}
        </div>
      </div>
      {/* Navigation */}
      {testimonials?.length > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={prevTestimonial}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
            <span className="font-body text-sm">Previous</span>
          </button>

          <div className="flex space-x-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="font-body text-sm">Next</span>
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      )}
      {/* Review Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-data font-semibold text-lg text-foreground">4.8</div>
            <div className="text-muted-foreground font-body text-sm">Average Rating</div>
          </div>
          <div>
            <div className="font-data font-semibold text-lg text-foreground">1,247</div>
            <div className="text-muted-foreground font-body text-sm">Total Reviews</div>
          </div>
          <div>
            <div className="font-data font-semibold text-lg text-foreground">94%</div>
            <div className="text-muted-foreground font-body text-sm">Recommend</div>
          </div>
          <div>
            <div className="font-data font-semibold text-lg text-foreground">2-4</div>
            <div className="text-muted-foreground font-body text-sm">Weeks Results</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;