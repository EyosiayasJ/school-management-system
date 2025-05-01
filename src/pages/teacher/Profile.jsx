import { useState, useEffect } from 'react';
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';

// Mock teacher profile data
const MOCK_TEACHER_PROFILE = {
  id: 'teacher-001',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@schooldomain.edu',
  phone: '(555) 123-4567',
  title: 'Mathematics Teacher',
  department: 'Science & Mathematics',
  employeeId: 'EMP-2023-T21',
  joinDate: '2020-08-15',
  qualifications: [
    { degree: 'Master of Education', institution: 'University of Education', year: '2018' },
    { degree: 'Bachelor of Science in Mathematics', institution: 'State University', year: '2015' }
  ],
  expertise: ['Algebra', 'Calculus', 'Statistics', 'Geometry'],
  address: {
    street: '123 Teacher Lane',
    city: 'Eduville',
    state: 'ED',
    zipCode: '12345'
  },
  emergencyContact: {
    name: 'Michael Johnson',
    relationship: 'Spouse',
    phone: '(555) 987-6543'
  },
  profileImage: null,
  bio: 'Experienced mathematics teacher with a passion for making complex concepts accessible to students of all learning levels. Specializes in interactive teaching methods and technology integration in the classroom.'
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    bio: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    profile: { loading: false, success: false, error: null },
    password: { loading: false, success: false, error: null }
  });
  
  // Fetch teacher profile
  useEffect(() => {
    const fetchProfile = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          setProfile(MOCK_TEACHER_PROFILE);
          
          // Initialize form data with profile data
          setFormData({
            name: MOCK_TEACHER_PROFILE.name,
            email: MOCK_TEACHER_PROFILE.email,
            phone: MOCK_TEACHER_PROFILE.phone,
            title: MOCK_TEACHER_PROFILE.title,
            address: { ...MOCK_TEACHER_PROFILE.address },
            emergencyContact: { ...MOCK_TEACHER_PROFILE.emergencyContact },
            bio: MOCK_TEACHER_PROFILE.bio
          });
          
          setLoading(false);
        } catch (err) {
          setError('Failed to load profile information.');
          setLoading(false);
        }
      }, 800);
    };
    
    fetchProfile();
  }, []);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile update submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // Reset any previous status
    setFormStatus(prev => ({
      ...prev,
      profile: { loading: true, success: false, error: null }
    }));
    
    // In a real app, you would make an API call here
    // For now, simulate the API call with a timeout
    setTimeout(() => {
      try {
        // "Update" the profile with form data
        setProfile(prev => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          title: formData.title,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
          bio: formData.bio
        }));
        
        // Set success status
        setFormStatus(prev => ({
          ...prev,
          profile: { loading: false, success: true, error: null }
        }));
        
        // Reset success status after a delay
        setTimeout(() => {
          setFormStatus(prev => ({
            ...prev,
            profile: { ...prev.profile, success: false }
          }));
        }, 3000);
      } catch (error) {
        setFormStatus(prev => ({
          ...prev,
          profile: { loading: false, success: false, error: 'Failed to update profile. Please try again.' }
        }));
      }
    }, 1000);
  };
  
  // Handle password change submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setFormStatus(prev => ({
        ...prev,
        password: { loading: false, success: false, error: 'New passwords do not match.' }
      }));
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setFormStatus(prev => ({
        ...prev,
        password: { loading: false, success: false, error: 'Password must be at least 8 characters long.' }
      }));
      return;
    }
    
    // Reset any previous status
    setFormStatus(prev => ({
      ...prev,
      password: { loading: true, success: false, error: null }
    }));
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, you would send the password change request to the server
        console.log('Password change request:', {
          currentPassword: '********', // Don't log actual passwords!
          newPassword: '********'      // Don't log actual passwords!
        });
        
        // Reset form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Set success status
        setFormStatus(prev => ({
          ...prev,
          password: { loading: false, success: true, error: null }
        }));
        
        // Reset success status after a delay
        setTimeout(() => {
          setFormStatus(prev => ({
            ...prev,
            password: { ...prev.password, success: false }
          }));
        }, 3000);
      } catch (error) {
        setFormStatus(prev => ({
          ...prev,
          password: { loading: false, success: false, error: 'Failed to update password. Please try again.' }
        }));
      }
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <ActionBar
        title="Profile & Settings"
        subtitle="Manage your account information and preferences"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold mb-4">
                {profile.name.charAt(0)}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-gray-600 mt-1">{profile.title}</p>
              <p className="text-sm text-gray-500 mt-1">{profile.department}</p>
              
              <div className="mt-6 w-full">
                <div className="text-left space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-800">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-800">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Employee ID</p>
                    <p className="text-gray-800">{profile.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Joined</p>
                    <p className="text-gray-800">{new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Qualifications Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Qualifications</h3>
            <ul className="space-y-4">
              {profile.qualifications.map((qualification, index) => (
                <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <p className="font-medium text-gray-800">{qualification.degree}</p>
                  <p className="text-sm text-gray-600">{qualification.institution}</p>
                  <p className="text-sm text-gray-500">{qualification.year}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Expertise Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Edit Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Edit Profile</h3>
            
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
                  required
                />
                
                <FormField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  required
                />
                
                <FormField
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                />
                
                <FormField
                  label="Job Title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleProfileChange}
                />
              </div>
              
              <hr className="my-6" />
              
              <h4 className="text-base font-medium text-gray-800 mb-4">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Street Address"
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleProfileChange}
                />
                
                <FormField
                  label="City"
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleProfileChange}
                />
                
                <FormField
                  label="State/Province"
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleProfileChange}
                />
                
                <FormField
                  label="Zip/Postal Code"
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleProfileChange}
                />
              </div>
              
              <hr className="my-6" />
              
              <h4 className="text-base font-medium text-gray-800 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Contact Name"
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleProfileChange}
                />
                
                <FormField
                  label="Relationship"
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleProfileChange}
                />
                
                <FormField
                  label="Contact Phone"
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleProfileChange}
                />
              </div>
              
              <hr className="my-6" />
              
              <FormField
                label="Bio"
                type="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                rows={4}
              />
              
              <div className="flex items-center justify-between">
                <div>
                  {formStatus.profile.error && (
                    <p className="text-sm text-red-600">{formStatus.profile.error}</p>
                  )}
                  {formStatus.profile.success && (
                    <p className="text-sm text-green-600">Profile updated successfully!</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formStatus.profile.loading}
                >
                  {formStatus.profile.loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
          
          {/* Change Password Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Change Password</h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <FormField
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                
                <FormField
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  {formStatus.password.error && (
                    <p className="text-sm text-red-600">{formStatus.password.error}</p>
                  )}
                  {formStatus.password.success && (
                    <p className="text-sm text-green-600">Password updated successfully!</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formStatus.password.loading}
                >
                  {formStatus.password.loading ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 