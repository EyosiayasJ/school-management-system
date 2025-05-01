import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OnboardSchool = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    timezone: 'UTC',
    logo: null
  });
  
  const [branchData, setBranchData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: ''
  });
  
  const [directorData, setDirectorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSchoolChange = (e) => {
    const { name, value } = e.target;
    setSchoolData(prev => ({ ...prev, [name]: value }));
  };

  const handleBranchChange = (e) => {
    const { name, value } = e.target;
    setBranchData(prev => ({ ...prev, [name]: value }));
  };

  const handleDirectorChange = (e) => {
    const { name, value } = e.target;
    setDirectorData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSchoolData(prev => ({ ...prev, logo: e.target.files[0] }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return schoolData.name && schoolData.address && schoolData.city && schoolData.email;
      case 2:
        return branchData.name && branchData.address && branchData.city;
      case 3:
        return directorData.firstName && directorData.lastName && directorData.email && 
               directorData.password && directorData.password === directorData.confirmPassword;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('School onboarded successfully!');
      setIsSubmitting(false);
      navigate('/support-admin/schools');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Onboard New School</h1>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
              <div className="flex text-xs justify-between mt-2">
                <div className={`${currentStep >= 1 ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>School Information</div>
                <div className={`${currentStep >= 2 ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>Branch Setup</div>
                <div className={`${currentStep >= 3 ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>Director Account</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: School Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-gray-800">School Information</h2>
            <p className="text-sm text-gray-500">Enter the basic information about the school.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={schoolData.name}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter school name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">School Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={schoolData.email}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="school@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={schoolData.phone}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={schoolData.website}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={schoolData.address}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="123 Main St"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={schoolData.city}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="New York"
                  required
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={schoolData.state}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="NY"
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={schoolData.zipCode}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="10001"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={schoolData.country}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="United States"
                />
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={schoolData.timezone}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="MST">MST (Mountain Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                </select>
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">School Logo</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Branch Setup */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-gray-800">Branch Setup</h2>
            <p className="text-sm text-gray-500">Set up the first branch for {schoolData.name}.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-1">Branch Name *</label>
                <input
                  type="text"
                  id="branchName"
                  name="name"
                  value={branchData.name}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Main Campus"
                  required
                />
              </div>

              <div>
                <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700 mb-1">Branch Email</label>
                <input
                  type="email"
                  id="branchEmail"
                  name="email"
                  value={branchData.email}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="branch@example.com"
                />
              </div>

              <div>
                <label htmlFor="branchPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="branchPhone"
                  name="phone"
                  value={branchData.phone}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="branchAddress" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  id="branchAddress"
                  name="address"
                  value={branchData.address}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="123 Main St"
                  required
                />
              </div>

              <div>
                <label htmlFor="branchCity" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  id="branchCity"
                  name="city"
                  value={branchData.city}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="New York"
                  required
                />
              </div>

              <div>
                <label htmlFor="branchState" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input
                  type="text"
                  id="branchState"
                  name="state"
                  value={branchData.state}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="NY"
                />
              </div>

              <div>
                <label htmlFor="branchZipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                <input
                  type="text"
                  id="branchZipCode"
                  name="zipCode"
                  value={branchData.zipCode}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="10001"
                />
              </div>

              <div>
                <label htmlFor="branchCountry" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  id="branchCountry"
                  name="country"
                  value={branchData.country}
                  onChange={handleBranchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="United States"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Director Account */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-gray-800">Branch Director Account</h2>
            <p className="text-sm text-gray-500">Create an account for the branch director of {branchData.name}.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={directorData.firstName}
                  onChange={handleDirectorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={directorData.lastName}
                  onChange={handleDirectorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="directorEmail" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="directorEmail"
                  name="email"
                  value={directorData.email}
                  onChange={handleDirectorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="director@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="directorPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="directorPhone"
                  name="phone"
                  value={directorData.phone}
                  onChange={handleDirectorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={directorData.password}
                  onChange={handleDirectorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={directorData.confirmPassword}
                  onChange={handleDirectorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      An email with login instructions will be sent to the director's email address. The director will be required to change their password on first login.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Complete Onboarding'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardSchool;