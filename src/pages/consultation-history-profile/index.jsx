import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import ConsultationHistoryCard from './components/ConsultationHistoryCard';
import SkincareGoalsTracker from './components/SkincareGoalsTracker';
import FavoriteProductsGrid from './components/FavoriteProductsGrid';
import AccountSettings from './components/AccountSettings';
import SkincareInsights from './components/SkincareInsights';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConsultationHistoryProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data
  const userData = {
    id: "user_001",
    name: "Thilak",
    email: "priya.sharma@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2024",
    skinType: "Combination",
    primaryConcerns: ["Acne", "Dullness", "Pigmentation"],
    totalConsultations: 12,
    productsRecommended: 28,
    skinScore: 78
  };

  // Mock consultation history
  const consultationHistory = [
    {
      id: "CONS_001",
      date: "2024-08-15T10:30:00Z",
      duration: "8 mins",
      status: "completed",
      concerns: ["Acne", "Oily T-zone"],
      summary: `Discussed persistent acne issues around the T-zone area and recommended a gentle yet effective routine focusing on salicylic acid and niacinamide. Emphasized the importance of not over-cleansing and maintaining skin barrier health.`,
      recommendedProducts: [
        {
          id: "PROD_001",
          name: "Clear Skin Salicylic Acid Cleanser",
          brand: "LumiSkin",
          price: 1299,
          originalPrice: 1599,
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop"
        },
        {
          id: "PROD_002", 
          name: "Niacinamide 10% + Zinc Serum",
          brand: "LumiSkin",
          price: 899,
          originalPrice: 1199,
          image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: "CONS_002",
      date: "2024-08-10T14:15:00Z", 
      duration: "12 mins",
      status: "completed",
      concerns: ["Dullness", "Uneven tone"],
      summary: `Focused on brightening routine with vitamin C and gentle exfoliation. Recommended incorporating antioxidants and SPF for better protection against environmental damage.`,
      recommendedProducts: [
        {
          id: "PROD_003",
          name: "Vitamin C Brightening Serum",
          brand: "LumiSkin", 
          price: 1599,
          originalPrice: 1999,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: "CONS_003",
      date: "2024-08-05T16:45:00Z",
      duration: "6 mins", 
      status: "completed",
      concerns: ["Dryness", "Fine lines"],
      summary: `Addressed concerns about increasing dryness and early signs of aging. Recommended hydrating ingredients like hyaluronic acid and gentle retinol introduction.`,
      recommendedProducts: [
        {
          id: "PROD_004",
          name: "Hyaluronic Acid Hydrating Serum",
          brand: "LumiSkin",
          price: 1199,
          originalPrice: 1499,
          image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop"
        }
      ]
    }
  ];

  // Mock skincare goals
  const skincareGoals = [
    {
      id: "GOAL_001",
      type: "acne_reduction",
      title: "Clear Acne Breakouts",
      progress: 65,
      startDate: "01 Mar 2024",
      targetDate: "01 Sep 2024",
      currentActions: [
        "Using salicylic acid cleanser daily",
        "Applying niacinamide serum twice daily",
        "Maintaining consistent routine"
      ]
    },
    {
      id: "GOAL_002", 
      type: "brightening",
      title: "Achieve Even Skin Tone",
      progress: 45,
      startDate: "15 Mar 2024",
      targetDate: "15 Oct 2024",
      currentActions: [
        "Daily vitamin C serum application",
        "Weekly gentle exfoliation",
        "Consistent SPF usage"
      ]
    },
    {
      id: "GOAL_003",
      type: "hydration",
      title: "Improve Skin Hydration",
      progress: 85,
      startDate: "01 Feb 2024", 
      targetDate: "01 Aug 2024",
      currentActions: [
        "Hyaluronic acid serum morning & night",
        "Using hydrating face mask weekly",
        "Drinking 8 glasses of water daily"
      ]
    }
  ];

  // Mock favorite products
  const favoriteProducts = [
    {
      id: "PROD_001",
      name: "Clear Skin Salicylic Acid Cleanser",
      brand: "LumiSkin",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
      keyBenefits: ["Acne Control", "Deep Cleansing"]
    },
    {
      id: "PROD_002",
      name: "Niacinamide 10% + Zinc Serum", 
      brand: "LumiSkin",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
      keyBenefits: ["Pore Minimizing", "Oil Control"]
    },
    {
      id: "PROD_003",
      name: "Vitamin C Brightening Serum",
      brand: "LumiSkin",
      price: 1599,
      originalPrice: 1999, 
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      keyBenefits: ["Brightening", "Antioxidant"]
    },
    {
      id: "PROD_004",
      name: "Hyaluronic Acid Hydrating Serum",
      brand: "LumiSkin",
      price: 1199,
      originalPrice: 1499,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop", 
      keyBenefits: ["Deep Hydration", "Plumping"]
    },
    {
      id: "PROD_005",
      name: "Gentle Retinol Night Cream",
      brand: "LumiSkin",
      price: 1899,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop",
      keyBenefits: ["Anti-aging", "Skin Renewal"]
    },
    {
      id: "PROD_006",
      name: "Broad Spectrum SPF 50 Sunscreen",
      brand: "LumiSkin", 
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      keyBenefits: ["UV Protection", "Non-greasy"]
    }
  ];

  // Mock account settings
  const [accountSettings, setAccountSettings] = useState({
    consultationStyle: 'detailed',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    productAlerts: false,
    dataSharing: true,
    marketingEmails: false
  });

  // Mock skincare insights
  const skincareInsights = [
    {
      id: "INSIGHT_001",
      type: "improvement",
      title: "Skin Hydration Improved by 25%",
      description: `Your consistent use of hyaluronic acid serum has significantly improved your skin's moisture levels. Keep up the excellent routine!`,
      date: "2 days ago",
      metrics: [
        { label: "Hydration Level", value: "85%" },
        { label: "Improvement", value: "+25%" }
      ],
      actionItems: [
        "Continue current hydrating routine",
        "Consider adding a humidifier to your bedroom"
      ]
    },
    {
      id: "INSIGHT_002", 
      type: "recommendation",
      title: "Time to Introduce Retinol",
      description: `Based on your skin's adaptation to current products, you're ready to incorporate a gentle retinol for anti-aging benefits.`,
      date: "1 week ago",
      actionItems: [
        "Start with retinol 2-3 times per week",
        "Always use SPF during the day",
        "Monitor for any irritation"
      ],
      relatedProducts: ["Gentle Retinol Night Cream", "Hydrating Recovery Mask"]
    },
    {
      id: "INSIGHT_003",
      type: "achievement", 
      title: "Acne Reduction Goal 65% Complete",
      description: `Congratulations! Your dedicated skincare routine has reduced acne breakouts significantly. You're on track to achieve your goal.`,
      date: "3 days ago",
      metrics: [
        { label: "Breakout Reduction", value: "65%" },
        { label: "Goal Progress", value: "On Track" }
      ]
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleEditProfile = () => {
    // Navigate to profile edit or show modal
    console.log('Edit profile clicked');
  };

  const handleRestartConsultation = (consultation) => {
    navigate('/lumi-chat-consultation-interface', {
      state: { 
        restartConsultation: true,
        previousConcerns: consultation?.concerns 
      }
    });
  };

  const handleUpdateGoal = () => {
    console.log('Update goal clicked');
  };

  const handleRemoveFavorite = (productId) => {
    console.log('Remove favorite:', productId);
  };

  const handleReorder = (product) => {
    console.log('Reorder product:', product);
  };

  const handleUpdateSettings = (newSettings) => {
    setAccountSettings(newSettings);
    console.log('Settings updated:', newSettings);
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const tabItems = [
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' },
    { id: 'insights', label: 'Insights', icon: 'Brain' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ContextualHeader 
        title="Profile"
        showSettings={true}
        onSettingsClick={handleSettingsClick}
        onSearchClick={() => {}}
      />
      {/* Main Content */}
      <main className="pt-16 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
          {/* Profile Header */}
          <ProfileHeader 
            user={userData}
            onEditProfile={handleEditProfile}
          />

          {/* Desktop Tab Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-muted/50 rounded-xl p-1">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-body font-medium ${
                    activeTab === tab?.id
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors font-body font-medium ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Consultation History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    Consultation History ({consultationHistory?.length})
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    loading={isRefreshing}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Refresh
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {consultationHistory?.map((consultation) => (
                    <ConsultationHistoryCard
                      key={consultation?.id}
                      consultation={consultation}
                      onRestartConsultation={handleRestartConsultation}
                    />
                  ))}
                </div>

                {consultationHistory?.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageCircle" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-medium text-foreground mb-2">
                      No consultations yet
                    </h3>
                    <p className="text-muted-foreground font-body mb-4">
                      Start your first consultation with Lumi to get personalized skincare advice
                    </p>
                    <Button
                      variant="default"
                      onClick={() => navigate('/lumi-chat-consultation-interface')}
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Start Consultation
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Skincare Goals Tab */}
            {activeTab === 'goals' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkincareGoalsTracker
                  goals={skincareGoals}
                  onUpdateGoal={handleUpdateGoal}
                />
                <SkincareInsights insights={skincareInsights} />
              </div>
            )}

            {/* Favorite Products Tab */}
            {activeTab === 'favorites' && (
              <FavoriteProductsGrid
                favoriteProducts={favoriteProducts}
                onRemoveFavorite={handleRemoveFavorite}
                onReorder={handleReorder}
              />
            )}

            {/* Skincare Insights Tab */}
            {activeTab === 'insights' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkincareInsights insights={skincareInsights} />
                <SkincareGoalsTracker
                  goals={skincareGoals}
                  onUpdateGoal={handleUpdateGoal}
                />
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="max-w-4xl">
                <AccountSettings
                  settings={accountSettings}
                  onUpdateSettings={handleUpdateSettings}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default ConsultationHistoryProfile;