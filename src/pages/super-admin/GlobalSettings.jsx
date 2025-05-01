import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Components
import Card from '../../components/common/Card';
import Tabs from '../../components/common/Tabs';
import FormField from '../../components/common/FormField';
import ActionBar from '../../components/common/ActionBar';

// Mock data for feature flags
const INITIAL_FEATURE_FLAGS = [
  { id: 1, name: 'Multi-branch Support', enabled: true, description: 'Allow schools to have multiple branches' },
  { id: 2, name: 'Health Module', enabled: true, description: 'Enable health records management' },
  { id: 3, name: 'E-Library', enabled: true, description: 'Enable electronic library features' },
  { id: 4, name: 'Events Calendar', enabled: true, description: 'Enable school events calendar' },
  { id: 5, name: 'Parent Portal', enabled: false, description: 'Enable parent access portal', beta: true },
  { id: 6, name: 'SMS Notifications', enabled: false, description: 'Enable SMS notifications for events', beta: true },
  { id: 7, name: 'Reports Dashboard', enabled: false, description: 'Advanced reporting dashboard', beta: true },
];

// Mock data for system settings
const INITIAL_SYSTEM_SETTINGS = [
  { id: 1, name: 'defaultLanguage', label: 'Default Language', value: 'English', type: 'select', options: ['English', 'Spanish', 'French', 'Arabic'] },
  { id: 2, name: 'sessionTimeout', label: 'Session Timeout (minutes)', value: 30, type: 'number', min: 5, max: 120 },
  { id: 3, name: 'passwordPolicy', label: 'Password Policy', value: 'Strong', type: 'select', options: ['Basic', 'Medium', 'Strong'] },
  { id: 4, name: 'maxFileSize', label: 'Max File Upload Size (MB)', value: 10, type: 'number', min: 1, max: 50 },
  { id: 5, name: 'schoolYearStartMonth', label: 'School Year Start Month', value: 'September', type: 'select', options: ['January', 'September'] },
];

// Mock data for notification settings
const INITIAL_NOTIFICATION_SETTINGS = [
  { id: 1, name: 'emailNotifications', label: 'Email Notifications', enabled: true, description: 'Send system notifications via email' },
  { id: 2, name: 'smsNotifications', label: 'SMS Notifications', enabled: false, description: 'Send urgent notifications via SMS' },
  { id: 3, name: 'inAppNotifications', label: 'In-App Notifications', enabled: true, description: 'Show notifications within the application' },
  { id: 4, name: 'weeklyDigest', label: 'Weekly Summary Email', enabled: true, description: 'Send a weekly summary of activities' },
  { id: 5, name: 'marketingEmails', label: 'Marketing Emails', enabled: false, description: 'Send information about new features and updates' },
];

// Mock data for security settings
const INITIAL_SECURITY_SETTINGS = [
  { id: 1, name: 'twoFactorAuth', label: 'Two-Factor Authentication', enabled: false, description: 'Require 2FA for all admin users' },
  { id: 2, name: 'loginAttempts', label: 'Maximum Login Attempts', value: 5, type: 'number', min: 3, max: 10 },
  { id: 3, name: 'passwordExpiry', label: 'Password Expiry (days)', value: 90, type: 'number', min: 30, max: 365 },
  { id: 4, name: 'dataDeletion', label: 'Automatic Data Deletion', enabled: false, description: 'Automatically delete inactive user data after 2 years' },
  { id: 5, name: 'ipRestriction', label: 'IP Restriction', enabled: false, description: 'Restrict admin access to specific IP addresses' },
];

const GlobalSettings = () => {
  const [featureFlags, setFeatureFlags] = useState(INITIAL_FEATURE_FLAGS);
  const [systemSettings, setSystemSettings] = useState(INITIAL_SYSTEM_SETTINGS);
  const [notificationSettings, setNotificationSettings] = useState(INITIAL_NOTIFICATION_SETTINGS);
  const [securitySettings, setSecuritySettings] = useState(INITIAL_SECURITY_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  // Toggle feature flag
  const handleToggleFeature = (id) => {
    setFeatureFlags(currentFlags => {
      return currentFlags.map(flag => {
        if (flag.id === id) {
          return { ...flag, enabled: !flag.enabled };
        }
        return flag;
      });
    });
  };

  // Update system setting
  const handleUpdateSetting = (id, value) => {
    setSystemSettings(currentSettings => {
      return currentSettings.map(setting => {
        if (setting.id === id) {
          return { ...setting, value };
        }
        return setting;
      });
    });
  };

  // Toggle notification setting
  const handleToggleNotification = (id) => {
    setNotificationSettings(currentSettings => {
      return currentSettings.map(setting => {
        if (setting.id === id) {
          return { ...setting, enabled: !setting.enabled };
        }
        return setting;
      });
    });
  };

  // Toggle security setting
  const handleToggleSecurity = (id) => {
    setSecuritySettings(currentSettings => {
      return currentSettings.map(setting => {
        if (setting.id === id && setting.enabled !== undefined) {
          return { ...setting, enabled: !setting.enabled };
        }
        return setting;
      });
    });
  };

  // Update security setting value
  const handleUpdateSecuritySetting = (id, value) => {
    setSecuritySettings(currentSettings => {
      return currentSettings.map(setting => {
        if (setting.id === id && setting.value !== undefined) {
          return { ...setting, value };
        }
        return setting;
      });
    });
  };

  // Save all settings
  const handleSaveSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Settings saved successfully');
    }, 800);
  };

  // Tab content for Feature Flags
  const FeatureFlagsTab = () => (
    <Card 
      title="Feature Flags" 
      description="Enable or disable features across the platform"
      headerActions={
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      }
    >
      <div className="divide-y">
        {featureFlags.map(flag => (
          <div key={flag.id} className="py-4">
            <FormField
              type="toggle"
              id={`feature-${flag.id}`}
              name={`feature-${flag.id}`}
              label={flag.name}
              description={flag.description}
              checked={flag.enabled}
              onChange={() => handleToggleFeature(flag.id)}
              badgeText={flag.beta ? 'BETA' : null}
              badgeColor={flag.beta ? 'amber' : null}
            />
          </div>
        ))}
      </div>
    </Card>
  );

  // Tab content for System Settings
  const SystemSettingsTab = () => (
    <Card 
      title="System Settings" 
      description="Configure global system settings"
      headerActions={
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      }
    >
      <div className="divide-y">
        {systemSettings.map(setting => (
          <div key={setting.id} className="py-4">
            {setting.type === 'select' ? (
              <FormField
                type="select"
                id={setting.name}
                name={setting.name}
                label={setting.label}
                value={setting.value}
                onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
              >
                {setting.options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FormField>
            ) : setting.type === 'number' ? (
              <FormField
                type="number"
                id={setting.name}
                name={setting.name}
                label={setting.label}
                value={setting.value}
                min={setting.min}
                max={setting.max}
                onChange={(e) => handleUpdateSetting(setting.id, parseInt(e.target.value, 10))}
              />
            ) : (
              <FormField
                type="text"
                id={setting.name}
                name={setting.name}
                label={setting.label}
                value={setting.value}
                onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );

  // Tab content for Notification Settings
  const NotificationSettingsTab = () => (
    <Card 
      title="Notification Settings" 
      description="Configure how and when notifications are sent"
      headerActions={
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      }
    >
      <div className="divide-y">
        {notificationSettings.map(setting => (
          <div key={setting.id} className="py-4">
            <FormField
              type="toggle"
              id={setting.name}
              name={setting.name}
              label={setting.label}
              description={setting.description}
              checked={setting.enabled}
              onChange={() => handleToggleNotification(setting.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  );

  // Tab content for Security Settings
  const SecuritySettingsTab = () => (
    <Card 
      title="Security Settings" 
      description="Configure security options for the platform"
      headerActions={
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      }
    >
      <div className="divide-y">
        {securitySettings.map(setting => (
          <div key={setting.id} className="py-4">
            {setting.enabled !== undefined ? (
              <FormField
                type="toggle"
                id={setting.name}
                name={setting.name}
                label={setting.label}
                description={setting.description}
                checked={setting.enabled}
                onChange={() => handleToggleSecurity(setting.id)}
              />
            ) : (
              <FormField
                type="number"
                id={setting.name}
                name={setting.name}
                label={setting.label}
                value={setting.value}
                min={setting.min}
                max={setting.max}
                onChange={(e) => handleUpdateSecuritySetting(setting.id, parseInt(e.target.value, 10))}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );

  // Define tabs configuration
  const tabsConfig = [
    {
      id: 'features',
      label: 'Features',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: <FeatureFlagsTab />
    },
    {
      id: 'system',
      label: 'System',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: <SystemSettingsTab />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      content: <NotificationSettingsTab />
    },
    {
      id: 'security',
      label: 'Security',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: <SecuritySettingsTab />
    }
  ];

  return (
    <div className="space-y-6">
      <ActionBar
        title="Global Settings"
        subtitle="Configure system-wide settings and features"
      />
      <Tabs 
        tabs={tabsConfig}
        defaultTab="features" 
        currentTab={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
};

export default GlobalSettings; 