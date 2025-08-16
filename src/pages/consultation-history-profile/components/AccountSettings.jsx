import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isExpanded, setIsExpanded] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' }
  ];

  const consultationStyleOptions = [
    { value: 'detailed', label: 'Detailed Analysis', description: 'Comprehensive skin assessment with detailed explanations' },
    { value: 'quick', label: 'Quick Recommendations', description: 'Fast product suggestions based on key concerns' },
    { value: 'educational', label: 'Educational Focus', description: 'Learn about ingredients and skincare science' }
  ];

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...localSettings, [key]: value };
    setLocalSettings(updatedSettings);
    onUpdateSettings?.(updatedSettings);
  };

  const settingSections = [
    {
      title: 'Consultation Preferences',
      icon: 'MessageCircle',
      items: [
        {
          type: 'select',
          key: 'consultationStyle',
          label: 'Consultation Style',
          options: consultationStyleOptions,
          value: localSettings?.consultationStyle
        },
        {
          type: 'select',
          key: 'language',
          label: 'Preferred Language',
          options: languageOptions,
          value: localSettings?.language
        }
      ]
    },
    {
      title: 'Notifications',
      icon: 'Bell',
      items: [
        {
          type: 'checkbox',
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive skincare tips and product updates',
          checked: localSettings?.emailNotifications
        },
        {
          type: 'checkbox',
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Get reminders for skincare routine',
          checked: localSettings?.pushNotifications
        },
        {
          type: 'checkbox',
          key: 'productAlerts',
          label: 'Product Alerts',
          description: 'Notify when favorite products are on sale',
          checked: localSettings?.productAlerts
        }
      ]
    },
    {
      title: 'Privacy & Data',
      icon: 'Shield',
      items: [
        {
          type: 'checkbox',
          key: 'dataSharing',
          label: 'Improve Recommendations',
          description: 'Share anonymized data to enhance AI suggestions',
          checked: localSettings?.dataSharing
        },
        {
          type: 'checkbox',
          key: 'marketingEmails',
          label: 'Marketing Communications',
          description: 'Receive promotional offers and beauty tips',
          checked: localSettings?.marketingEmails
        }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Account Settings
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              Manage your preferences and privacy
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground transition-transform duration-200" 
        />
      </div>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {settingSections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <div className="flex items-center space-x-2 pt-4">
                <Icon name={section?.icon} size={16} className="text-primary" />
                <h4 className="font-heading font-medium text-foreground">
                  {section?.title}
                </h4>
              </div>

              <div className="space-y-4 pl-6">
                {section?.items?.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item?.type === 'select' && (
                      <Select
                        label={item?.label}
                        options={item?.options}
                        value={item?.value}
                        onChange={(value) => handleSettingChange(item?.key, value)}
                        className="max-w-sm"
                      />
                    )}

                    {item?.type === 'checkbox' && (
                      <Checkbox
                        label={item?.label}
                        description={item?.description}
                        checked={item?.checked}
                        onChange={(e) => handleSettingChange(item?.key, e?.target?.checked)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Account Actions */}
          <div className="pt-6 border-t border-border space-y-3">
            <h4 className="font-heading font-medium text-foreground flex items-center space-x-2">
              <Icon name="User" size={16} className="text-primary" />
              <span>Account Actions</span>
            </h4>
            
            <div className="flex flex-col sm:flex-row gap-3 pl-6">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Reset Preferences
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;