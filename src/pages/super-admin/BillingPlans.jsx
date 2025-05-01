import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Components
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';
import Modal from '../../components/common/Modal';

// Mock data for subscription plans
const SUBSCRIPTION_PLANS = [
  {
    id: 1,
    name: 'Basic',
    price: '$99',
    billingCycle: 'monthly',
    description: 'Best for small schools with basic needs',
    features: [
      { feature: 'Up to 200 students', included: true },
      { feature: 'Up to 20 teachers', included: true },
      { feature: 'Basic attendance tracking', included: true },
      { feature: 'Core academic features', included: true },
      { feature: 'E-Library access', included: false },
      { feature: 'Health management', included: false },
      { feature: 'Multi-branch support', included: false },
      { feature: 'Advanced reporting', included: false },
    ],
  },
  {
    id: 2,
    name: 'Professional',
    price: '$299',
    billingCycle: 'monthly',
    description: 'Perfect for medium-sized schools needing more features',
    features: [
      { feature: 'Up to 500 students', included: true },
      { feature: 'Unlimited teachers', included: true },
      { feature: 'Advanced attendance tracking', included: true },
      { feature: 'Core academic features', included: true },
      { feature: 'E-Library access', included: true },
      { feature: 'Health management', included: true },
      { feature: 'Multi-branch support', included: false },
      { feature: 'Advanced reporting', included: false },
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '$599',
    billingCycle: 'monthly',
    description: 'Complete solution for large schools with multiple branches',
    features: [
      { feature: 'Unlimited students', included: true },
      { feature: 'Unlimited teachers', included: true },
      { feature: 'Advanced attendance tracking', included: true },
      { feature: 'Core academic features', included: true },
      { feature: 'E-Library access', included: true },
      { feature: 'Health management', included: true },
      { feature: 'Multi-branch support', included: true },
      { feature: 'Advanced reporting', included: true },
    ],
  },
];

// Mock data for current schools and their plans
const CURRENT_SUBSCRIPTIONS = [
  { id: 1, schoolName: 'Westfield Academy', planId: 2, startDate: '2023-09-01', nextBillingDate: '2024-02-01' },
  { id: 2, schoolName: 'Springfield Elementary', planId: 1, startDate: '2023-08-15', nextBillingDate: '2024-01-15' },
  { id: 3, schoolName: 'Highland High School', planId: 3, startDate: '2023-10-05', nextBillingDate: '2024-03-05' },
  { id: 4, schoolName: 'Oakridge Preparatory', planId: 2, startDate: '2023-11-10', nextBillingDate: '2024-04-10' },
];

const BillingPlans = () => {
  const [plans, setPlans] = useState(SUBSCRIPTION_PLANS);
  const [subscriptions] = useState(CURRENT_SUBSCRIPTIONS);
  const [showModal, setShowModal] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Format date for display
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  // Start editing a plan
  const handleEditPlan = (planId) => {
    const plan = plans.find(p => p.id === planId);
    setEditingPlan({...plan});
    setEditingPlanId(planId);
    setShowModal(true);
  };

  // Save plan changes
  const handleSavePlan = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPlans(currentPlans => {
        return currentPlans.map(plan => {
          if (plan.id === editingPlanId) {
            return editingPlan;
          }
          return plan;
        });
      });
      
      setShowModal(false);
      setEditingPlanId(null);
      setEditingPlan(null);
      setLoading(false);
      toast.success('Plan updated successfully');
    }, 800);
  };

  // Update plan during edit
  const handleUpdatePlan = (field, value) => {
    setEditingPlan(current => ({
      ...current,
      [field]: value
    }));
  };

  // Update plan feature during edit
  const handleUpdateFeature = (index, field, value) => {
    setEditingPlan(current => {
      const updatedFeatures = [...current.features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [field]: value
      };
      
      return {
        ...current,
        features: updatedFeatures
      };
    });
  };

  // Cancel plan editing
  const handleCancelEdit = () => {
    setShowModal(false);
    setEditingPlanId(null);
    setEditingPlan(null);
  };

  // Show change plan modal for a school
  const handleShowChangePlan = (subscription) => {
    setSelectedSubscription(subscription);
    setShowChangePlanModal(true);
  };

  // Change a school's plan
  const handleChangePlan = (newPlanId) => {
    // In a real app, you would call an API to update the subscription
    console.log(`Changing ${selectedSubscription.schoolName}'s plan to ${newPlanId}`);
    toast.success(`Plan updated for ${selectedSubscription.schoolName}`);
    setShowChangePlanModal(false);
    setSelectedSubscription(null);
  };

  // Define DataTable columns for subscriptions
  const subscriptionColumns = [
    {
      field: 'schoolName',
      header: 'School',
      sortable: true
    },
    {
      field: 'planId',
      header: 'Plan',
      sortable: true,
      render: (row) => {
        const plan = plans.find(p => p.id === row.planId);
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {plan?.name}
          </span>
        );
      }
    },
    {
      field: 'startDate',
      header: 'Start Date',
      sortable: true,
      render: (row) => formatDate(row.startDate)
    },
    {
      field: 'nextBillingDate',
      header: 'Next Billing',
      sortable: true,
      render: (row) => formatDate(row.nextBillingDate)
    }
  ];

  // Render row actions for subscription table
  const renderSubscriptionActions = (row) => (
    <div className="flex justify-end">
      <button 
        className="text-blue-600 hover:text-blue-900"
        onClick={() => handleShowChangePlan(row)}
      >
        Change Plan
      </button>
    </div>
  );

  // Render plan cards with a grid layout
  const renderPlanCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map(plan => (
        <Card 
          key={plan.id}
          className={`h-full flex flex-col ${plan.popular ? 'border-2 border-blue-500' : ''}`}
          title={
            <div>
              {plan.popular && (
                <div className="mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="text-xl font-bold">{plan.name}</div>
            </div>
          }
          headerActions={
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-1">/{plan.billingCycle}</span>
            </div>
          }
          description={plan.description}
        >
          <div className="space-y-3 mb-6 flex-grow">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <span className={`mr-2 text-lg ${feature.included ? 'text-green-500' : 'text-gray-300'}`}>
                  {feature.included ? '✓' : '×'}
                </span>
                <span className={feature.included ? '' : 'text-gray-400'}>
                  {feature.feature}
                </span>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => handleEditPlan(plan.id)}
            className="w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 mt-auto"
          >
            Edit Plan
          </button>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <ActionBar
        title="Subscription Plans & Billing"
        subtitle="Manage subscription plans and monitor school billing"
      />
      
      {/* Plans Section */}
      <Card 
        title="Subscription Plans"
        description="Configure pricing plans and features available to schools"
      >
        {renderPlanCards()}
      </Card>
      
      {/* Current Subscriptions Section */}
      <Card 
        title="Current School Subscriptions"
        description="Manage the subscription plans for individual schools"
      >
        <DataTable
          columns={subscriptionColumns}
          data={subscriptions}
          renderRowActions={renderSubscriptionActions}
          emptyMessage="No school subscriptions found."
        />
      </Card>
      
      {/* Edit Plan Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCancelEdit}
        title={`Edit ${editingPlan?.name} Plan`}
        size="lg"
      >
        {editingPlan && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Plan Name"
                id="planName"
                name="planName"
                value={editingPlan.name}
                onChange={(e) => handleUpdatePlan('name', e.target.value)}
                required
              />
              
              <FormField
                label="Price"
                id="price"
                name="price"
                value={editingPlan.price}
                onChange={(e) => handleUpdatePlan('price', e.target.value)}
                required
              />
              
              <FormField
                label="Billing Cycle"
                id="billingCycle"
                name="billingCycle"
                type="select"
                value={editingPlan.billingCycle}
                onChange={(e) => handleUpdatePlan('billingCycle', e.target.value)}
                required
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
              </FormField>
              
              <FormField
                label="Popular Plan"
                id="popular"
                name="popular"
                type="toggle"
                checked={!!editingPlan.popular}
                onChange={(e) => handleUpdatePlan('popular', e.target.checked)}
              />
            </div>
            
            <FormField
              label="Description"
              id="description"
              name="description"
              type="textarea"
              value={editingPlan.description}
              onChange={(e) => handleUpdatePlan('description', e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="border rounded-md p-4 space-y-3">
                {editingPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <FormField
                      id={`feature-${index}`}
                      name={`feature-${index}`}
                      value={feature.feature}
                      onChange={(e) => handleUpdateFeature(index, 'feature', e.target.value)}
                      containerClassName="flex-grow mb-0"
                    />
                    <FormField
                      id={`included-${index}`}
                      name={`included-${index}`}
                      type="toggle"
                      label="Included"
                      checked={feature.included}
                      onChange={(e) => handleUpdateFeature(index, 'included', e.target.checked)}
                      containerClassName="mb-0"
                    />
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => {
                    setEditingPlan(current => ({
                      ...current,
                      features: [
                        ...current.features,
                        { feature: '', included: false }
                      ]
                    }));
                  }}
                  className="mt-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Add Feature
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePlan}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Change Plan Modal */}
      <Modal
        isOpen={showChangePlanModal}
        onClose={() => setShowChangePlanModal(false)}
        title="Change Subscription Plan"
        size="md"
      >
        {selectedSubscription && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Change the subscription plan for <strong>{selectedSubscription.schoolName}</strong>.
            </p>
            
            <FormField
              label="Select New Plan"
              id="newPlanId"
              name="newPlanId"
              type="select"
              defaultValue={selectedSubscription.planId}
              onChange={(e) => handleChangePlan(parseInt(e.target.value, 10))}
            >
              {plans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} ({plan.price}/{plan.billingCycle})
                </option>
              ))}
            </FormField>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowChangePlanModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BillingPlans; 