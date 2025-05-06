
/**
 * Helper functions for working with mock subscription data
 */

import { getMockData } from "./mockDatabaseHelper";

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  plan_name: string;
  status: string;
  amount: number;
  payment_provider: string;
  payment_id: string;
  start_date: string;
  end_date: string;
}

export interface PaymentHistory {
  id: string;
  subscription_id: string;
  amount: number;
  status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
}

/**
 * Gets the active subscription for a user
 * @param userId The ID of the user
 * @returns The active subscription or null if none exists
 */
export const getActiveSubscription = (userId: string): Subscription | null => {
  const subscriptions = getMockData('subscriptions') as Subscription[];
  return subscriptions.find(sub => sub.user_id === userId && sub.status === 'active') || null;
};

/**
 * Gets mock payment history for a subscription
 * @param subscriptionId The ID of the subscription
 * @returns An array of payment history items
 */
export const getMockPaymentHistory = (subscriptionId: string): PaymentHistory[] => {
  // Generate some mock payment history items
  return [
    {
      id: '1',
      subscription_id: subscriptionId,
      amount: 49.99,
      status: 'completed',
      payment_date: '2025-04-01T00:00:00Z',
      payment_method: 'Card ending in 4242',
      transaction_id: 'tx_123456789'
    },
    {
      id: '2',
      subscription_id: subscriptionId,
      amount: 49.99,
      status: 'completed',
      payment_date: '2025-03-01T00:00:00Z',
      payment_method: 'Card ending in 4242',
      transaction_id: 'tx_123456788'
    },
    {
      id: '3',
      subscription_id: subscriptionId,
      amount: 49.99,
      status: 'completed',
      payment_date: '2025-02-01T00:00:00Z',
      payment_method: 'Card ending in 4242',
      transaction_id: 'tx_123456787'
    }
  ];
};

/**
 * Updates the subscription status in the mock data
 * @param subscriptionId The ID of the subscription to update
 * @param newStatus The new status for the subscription
 * @returns Boolean indicating success
 */
export const updateSubscriptionStatus = (subscriptionId: string, newStatus: string): boolean => {
  // In a real app, this would update the database
  // For now, we'll just log it
  console.log(`Updating subscription ${subscriptionId} to status: ${newStatus}`);
  return true;
};
