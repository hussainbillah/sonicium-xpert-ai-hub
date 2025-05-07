
// Mock subscription data helper functions

// Mock subscription plans
export const mockPlans = [
  {
    id: 'plan-1',
    name: 'Basic',
    description: 'Essential features for individuals',
    price: 9.99,
    billing_period: 'monthly',
    features: ['500 API calls/day', 'Basic analytics', '3 social accounts', 'Email support'],
    is_popular: false,
    is_public: true
  },
  {
    id: 'plan-2',
    name: 'Professional',
    description: 'Advanced features for growing businesses',
    price: 49.99,
    billing_period: 'monthly',
    features: ['5,000 API calls/day', 'Advanced analytics', '25 social accounts', 'Priority support', 'Custom integrations'],
    is_popular: true,
    is_public: true
  },
  {
    id: 'plan-3',
    name: 'Enterprise',
    description: 'Complete solution for large organizations',
    price: 199.99,
    billing_period: 'monthly',
    features: ['Unlimited API calls', 'Enterprise analytics', 'Unlimited social accounts', 'Dedicated support manager', 'Custom integrations', 'White labeling'],
    is_popular: false,
    is_public: true
  }
];

// Mock user subscription data
export const mockUserSubscription = {
  id: 'sub-1',
  user_id: 'user-1',
  plan_id: 'plan-2',
  plan_name: 'Professional',
  status: 'active',
  amount: 49.99,
  payment_provider: 'stripe',
  payment_id: 'pay_1234567890',
  start_date: '2025-04-01T00:00:00Z',
  end_date: '2026-04-01T00:00:00Z',
  created_at: '2025-04-01T00:00:00Z',
  updated_at: '2025-04-01T00:00:00Z'
};

// Function to get mock subscription data
export const getMockSubscriptionData = () => {
  // Check if mock data exists in window global object
  if (window.__MOCK_DATA__?.subscriptions) {
    return window.__MOCK_DATA__.subscriptions;
  }
  
  return [mockUserSubscription];
};

// Function to update mock subscription data
export const updateMockSubscription = (updatedData: any) => {
  if (window.__MOCK_DATA__) {
    window.__MOCK_DATA__.subscriptions = [updatedData];
  } else {
    window.__MOCK_DATA__ = {
      subscriptions: [updatedData]
    };
  }
  return updatedData;
};
