import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ user, onEditProfile }) => {
  const getSkinTypeColor = (skinType) => {
    const colors = {
      'oily': 'bg-blue-100 text-blue-800',
      'dry': 'bg-orange-100 text-orange-800',
      'combination': 'bg-purple-100 text-purple-800',
      'sensitive': 'bg-pink-100 text-pink-800',
      'normal': 'bg-green-100 text-green-800'
    };
    return colors?.[skinType?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-muted">
            <Image
              src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
            <Icon name="Check" size={12} className="text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-1">
                {user?.name}
              </h2>
              <p className="text-muted-foreground font-body text-sm mb-3">
                Member since {user?.joinDate}
              </p>
            </div>
            <button
              onClick={onEditProfile}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="Edit2" size={16} className="text-muted-foreground" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-caption font-medium ${getSkinTypeColor(user?.skinType)}`}>
              {user?.skinType} Skin
            </span>
            {user?.primaryConcerns?.slice(0, 2)?.map((concern, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-caption font-medium"
              >
                {concern}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-data font-semibold text-lg text-foreground">
                {user?.totalConsultations}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Consultations
              </div>
            </div>
            <div className="text-center">
              <div className="font-data font-semibold text-lg text-foreground">
                {user?.productsRecommended}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Products
              </div>
            </div>
            <div className="text-center">
              <div className="font-data font-semibold text-lg text-foreground">
                {user?.skinScore}%
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Skin Score
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;