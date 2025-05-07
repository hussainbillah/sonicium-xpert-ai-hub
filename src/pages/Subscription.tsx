
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { mockPlans, getMockSubscriptionData, updateMockSubscription } from "@/utils/mockSubscriptionHelper";

const Subscription = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState(mockPlans);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [cancelingPlan, setCancelingPlan] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptionData();
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      // Use mock data instead of Supabase
      const mockSubscriptionData = getMockSubscriptionData();
      setUserSubscription(mockSubscriptionData[0] || null);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradePlan = async (planId: string, planName: string, price: number) => {
    setUpgrading(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update mock subscription data
      const updatedSubscription = {
        ...userSubscription,
        plan_id: planId,
        plan_name: planName,
        amount: price,
        updated_at: new Date().toISOString(),
      };
      
      // Update the mock data
      updateMockSubscription(updatedSubscription);
      
      // Update state
      setUserSubscription(updatedSubscription);
      
      toast({
        title: "Plan upgraded",
        description: `You have successfully subscribed to the ${planName} plan`,
      });
    } catch (error) {
      console.error('Error upgrading plan:', error);
      toast({
        title: "Error",
        description: "Failed to upgrade plan",
        variant: "destructive",
      });
    } finally {
      setUpgrading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelingPlan(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update mock subscription data
      const updatedSubscription = {
        ...userSubscription,
        status: "canceled",
        updated_at: new Date().toISOString(),
      };
      
      // Update the mock data
      updateMockSubscription(updatedSubscription);
      
      // Update state
      setUserSubscription(updatedSubscription);
      
      toast({
        title: "Subscription canceled",
        description: "Your subscription has been canceled",
      });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setCancelingPlan(false);
    }
  };

  // Helper function to check if a plan is the current active plan
  const isCurrentPlan = (planId: string) => {
    return userSubscription && userSubscription.plan_id === planId && userSubscription.status === "active";
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Subscription Plans</h1>
          <p className="text-muted-foreground max-w-2xl">
            Choose the right plan for your needs. All plans include access to core features.
          </p>
        </div>

        {userSubscription && (
          <Card className="mb-8 border-accent-foreground/10">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{userSubscription.plan_name}</h3>
                  <Badge variant={userSubscription.status === "active" ? "default" : "secondary"} className="mt-2">
                    {userSubscription.status === "active" ? "Active" : "Canceled"}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    ${userSubscription.amount}/month
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-muted-foreground">
                    Next billing date: {new Date(userSubscription.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Started on: {new Date(userSubscription.start_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {userSubscription.status === "active" && (
                <Button 
                  variant="outline" 
                  onClick={handleCancelSubscription}
                  disabled={cancelingPlan}
                >
                  {cancelingPlan ? "Canceling..." : "Cancel Subscription"}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`border ${plan.is_popular ? 'border-accent shadow-lg' : 'border-border'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  {plan.is_popular && (
                    <Badge>Popular</Badge>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billing_period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={isCurrentPlan(plan.id) ? "outline" : "default"}
                  disabled={isCurrentPlan(plan.id) || upgrading}
                  onClick={() => handleUpgradePlan(plan.id, plan.name, plan.price)}
                >
                  {isCurrentPlan(plan.id) ? 'Current Plan' : upgrading ? 'Processing...' : 'Choose Plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
