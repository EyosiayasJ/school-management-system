import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormField from '../common/FormField';
import Card from '../common/Card';
import Tabs from '../common/Tabs';
import { toast } from 'react-hot-toast';
import superAdminApi from '../../services/superAdminApi';

const SchoolSettingsTab = ({ school }) => {
  const queryClient = useQueryClient();
  
  // Settings mutation
  const updateSettings = useMutation({
    mutationFn: async (data) => {
      const response = await superAdminApi.updateSchoolSettings(school.id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school', school.id] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  });

  // Feature settings from school object
  const [featureSettings, setFeatureSettings] = useState({
    enableAttendance: school?.settings?.enableAttendance ?? true,
    enableGradebook: school?.settings?.enableGradebook ?? true,
    enableCalendar: school?.settings?.enableCalendar ?? true,
    enableLibrary: school?.settings?.enableLibrary ?? false,
    enableHealthRecords: school?.settings?.enableHealthRecords ?? false,
    enableFinance: school?.settings?.enableFinance ?? false,
    enableTransportation: school?.settings?.enableTransportation ?? false,
    enableParentPortal: school?.settings?.enableParentPortal ?? true,
    enableStudentPortal: school?.settings?.enableStudentPortal ?? false,
    enableMobileApp: school?.settings?.enableMobileApp ?? false
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: school?.settings?.emailNotifications ?? true,
    smsNotifications: school?.settings?.smsNotifications ?? false,
    attendanceAlerts: school?.settings?.attendanceAlerts ?? true,
    gradeAlerts: school?.settings?.gradeAlerts ?? true,
    paymentReminders: school?.settings?.paymentReminders ?? true,
    systemUpdates: school?.settings?.systemUpdates ?? true,
    marketingEmails: school?.settings?.marketingEmails ?? false
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: school?.settings?.twoFactorAuth ?? false,
    passwordComplexity: school?.settings?.passwordComplexity ?? 'medium',
    passwordExpiry: school?.settings?.passwordExpiry ?? 90,
    sessionTimeout: school?.settings?.sessionTimeout ?? 30,
    ipRestriction: school?.settings?.ipRestriction ?? false,
    dataEncryption: school?.settings?.dataEncryption ?? true
  });

  // Handle feature toggle change
  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFeatureSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle notification toggle change
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle security setting change
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save settings
  const handleSaveSettings = (section) => {
    let settingsData;
    
    switch(section) {
      case 'features':
        settingsData = { settings: { ...school.settings, ...featureSettings } };
        break;
      case 'notifications':
        settingsData = { settings: { ...school.settings, ...notificationSettings } };
        break;
      case 'security':
        settingsData = { settings: { ...school.settings, ...securitySettings } };
        break;
      default:
        return;
    }
    
    updateSettings.mutate(settingsData);
  };

  // Settings tabs configuration
  const tabsConfig = [
    {
      id: 'features',
      label: 'Features',
      content: (
        <Card 
          title="Available Features" 
          description="Control which features are available to this school"
          headerActions={
            <button 
              onClick={() => handleSaveSettings('features')}
              disabled={updateSettings.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="enableAttendance"
              name="enableAttendance"
              type="toggle"
              label="Attendance Management"
              description="Track student attendance and generate reports"
              checked={featureSettings.enableAttendance}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableGradebook"
              name="enableGradebook"
              type="toggle"
              label="Gradebook"
              description="Record and manage student grades"
              checked={featureSettings.enableGradebook}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableCalendar"
              name="enableCalendar"
              type="toggle"
              label="Calendar & Events"
              description="Manage school events and academic calendar"
              checked={featureSettings.enableCalendar}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableLibrary"
              name="enableLibrary"
              type="toggle"
              label="Library Management"
              description="Track books and resources in the library"
              checked={featureSettings.enableLibrary}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableHealthRecords"
              name="enableHealthRecords"
              type="toggle"
              label="Health Records"
              description="Track student health information and visits"
              checked={featureSettings.enableHealthRecords}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableFinance"
              name="enableFinance"
              type="toggle"
              label="Finance & Billing"
              description="Manage fees, invoices, and payments"
              checked={featureSettings.enableFinance}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableTransportation"
              name="enableTransportation"
              type="toggle"
              label="Transportation"
              description="Manage buses, routes, and student transport"
              checked={featureSettings.enableTransportation}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableParentPortal"
              name="enableParentPortal"
              type="toggle"
              label="Parent Portal"
              description="Allow parents to access student information"
              checked={featureSettings.enableParentPortal}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableStudentPortal"
              name="enableStudentPortal"
              type="toggle"
              label="Student Portal"
              description="Allow students to access their information"
              checked={featureSettings.enableStudentPortal}
              onChange={handleFeatureChange}
            />
            <FormField
              id="enableMobileApp"
              name="enableMobileApp"
              type="toggle"
              label="Mobile App"
              description="Enable access through mobile applications"
              checked={featureSettings.enableMobileApp}
              onChange={handleFeatureChange}
            />
          </div>
        </Card>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <Card 
          title="Notification Settings" 
          description="Configure the types of notifications this school can send"
          headerActions={
            <button 
              onClick={() => handleSaveSettings('notifications')}
              disabled={updateSettings.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="emailNotifications"
              name="emailNotifications"
              type="toggle"
              label="Email Notifications"
              description="Send notifications via email"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationChange}
            />
            <FormField
              id="smsNotifications"
              name="smsNotifications"
              type="toggle"
              label="SMS Notifications"
              description="Send notifications via SMS"
              checked={notificationSettings.smsNotifications}
              onChange={handleNotificationChange}
            />
            <FormField
              id="attendanceAlerts"
              name="attendanceAlerts"
              type="toggle"
              label="Attendance Alerts"
              description="Send alerts for student absences"
              checked={notificationSettings.attendanceAlerts}
              onChange={handleNotificationChange}
            />
            <FormField
              id="gradeAlerts"
              name="gradeAlerts"
              type="toggle"
              label="Grade Alerts"
              description="Send alerts when grades are posted"
              checked={notificationSettings.gradeAlerts}
              onChange={handleNotificationChange}
            />
            <FormField
              id="paymentReminders"
              name="paymentReminders"
              type="toggle"
              label="Payment Reminders"
              description="Send reminders for upcoming and overdue payments"
              checked={notificationSettings.paymentReminders}
              onChange={handleNotificationChange}
            />
            <FormField
              id="systemUpdates"
              name="systemUpdates"
              type="toggle"
              label="System Updates"
              description="Send notifications about system updates"
              checked={notificationSettings.systemUpdates}
              onChange={handleNotificationChange}
            />
            <FormField
              id="marketingEmails"
              name="marketingEmails"
              type="toggle"
              label="Marketing Emails"
              description="Send promotional emails about new features"
              checked={notificationSettings.marketingEmails}
              onChange={handleNotificationChange}
            />
          </div>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <Card 
          title="Security Settings" 
          description="Configure security options for this school"
          headerActions={
            <button 
              onClick={() => handleSaveSettings('security')}
              disabled={updateSettings.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="twoFactorAuth"
              name="twoFactorAuth"
              type="toggle"
              label="Two-Factor Authentication"
              description="Require two-factor authentication for login"
              checked={securitySettings.twoFactorAuth}
              onChange={handleSecurityChange}
            />
            <FormField
              id="passwordComplexity"
              name="passwordComplexity"
              type="select"
              label="Password Complexity"
              description="Set minimum password requirements"
              value={securitySettings.passwordComplexity}
              onChange={handleSecurityChange}
            >
              <option value="low">Low - 6+ characters</option>
              <option value="medium">Medium - 8+ chars, mixed case</option>
              <option value="high">High - 10+ chars, mixed case, numbers, symbols</option>
            </FormField>
            <FormField
              id="passwordExpiry"
              name="passwordExpiry"
              type="select"
              label="Password Expiry"
              description="Days until passwords must be changed"
              value={securitySettings.passwordExpiry}
              onChange={handleSecurityChange}
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="0">Never</option>
            </FormField>
            <FormField
              id="sessionTimeout"
              name="sessionTimeout"
              type="select"
              label="Session Timeout"
              description="Minutes until automatic logout due to inactivity"
              value={securitySettings.sessionTimeout}
              onChange={handleSecurityChange}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="120">2 hours</option>
            </FormField>
            <FormField
              id="ipRestriction"
              name="ipRestriction"
              type="toggle"
              label="IP Restriction"
              description="Restrict access to specific IP addresses"
              checked={securitySettings.ipRestriction}
              onChange={handleSecurityChange}
            />
            <FormField
              id="dataEncryption"
              name="dataEncryption"
              type="toggle"
              label="Enhanced Data Encryption"
              description="Enable additional encryption for sensitive data"
              checked={securitySettings.dataEncryption}
              onChange={handleSecurityChange}
            />
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs tabs={tabsConfig} defaultTab="features" />
    </div>
  );
};

SchoolSettingsTab.propTypes = {
  school: PropTypes.object.isRequired
};

export default SchoolSettingsTab; 