
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const plans = [
  {
    name: "Free",
    description: "Perfect for exploring the platform",
    price: "$0",
    period: "forever",
    features: [
      "1 marketing channel",
      "5 campaigns per month",
      "Basic analytics",
      "Email support"
    ],
    limitations: [
      "No AI content generation",
      "Limited templates",
      "No automation features",
      "Community support only"
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline",
    popular: false,
    disabled: true
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: "$49",
    period: "per month",
    features: [
      "5 marketing channels",
      "Unlimited campaigns",
      "Advanced analytics",
      "AI content generation",
      "Priority support",
      "Campaign automation"
    ],
    limitations: [],
    buttonText: "Subscribe Now",
    buttonVariant: "default",
    popular: true,
    disabled: false
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "tailored plan",
    features: [
      "Unlimited marketing channels",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "Team collaboration tools",
      "White-labeled reports"
    ],
    limitations: [],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
    disabled: false
  }
];

interface UserSubscription {
  id: string;
  plan_name: string;
  status: string;
  start_date: string;
  end_date: string;
}

const Subscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user!.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planName: string) => {
    toast({
      title: "Coming Soon",
      description: "Payment integration will be available soon!",
    });

    // Demo: Create a mock subscription for testing
    if (planName === "Pro") {
      try {
        const now = new Date();
        const endDate = new Date();
        endDate.setMonth(now.getMonth() + 1);
        
        const { error } = await supabase.from('subscriptions').insert([
          {
            user_id: user!.id,
            plan_id: 'pro_monthly',
            plan_name: 'Pro',
            status: 'active',
            amount: 49.00,
            payment_provider: 'demo',
            payment_id: `demo_${Date.now()}`,
            start_date: now.toISOString(),
            end_date: endDate.toISOString()
          }
        ]);
        
        if (error) throw error;
        
        fetchSubscription();
        
        toast({
          title: "Demo Subscription",
          description: "Pro subscription activated for demo purposes!"
        });
      } catch (error) {
        console.error('Error creating demo subscription:', error);
      }
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.id);
      
      if (error) throw error;
      
      setSubscription(null);
      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled"
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Subscription</h1>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading subscription details...</p>
          </div>
        ) : subscription ? (
          <Card className="border-2 border-sonicium-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{subscription.plan_name} Plan</CardTitle>
                  <p className="text-gray-500 mt-1">Active Subscription</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Billing Period</div>
                  <div>
                    {new Date(subscription.start_date).toLocaleDateString()} to {new Date(subscription.end_date).toLocaleDateString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Next Payment</div>
                  <div>{new Date(subscription.end_date).toLocaleDateString()}</div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            <h2 className="text-xl font-medium mb-8">Choose a Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.name}
                  className={`relative overflow-hidden ${
                    plan.popular ? 'border-2 border-sonicium-500 shadow-xl' : 'border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-sonicium-500 text-white px-3 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <p className="text-gray-500">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Features</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckIcon className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Limitations</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-500">
                              <XIcon className="text-gray-400 h-4 w-4 mr-2 flex-shrink-0" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        plan.popular ? 'bg-sonicium-600 hover:bg-sonicium-700' : ''
                      }`}
                      variant={plan.buttonVariant as "outline" | "default"}
                      disabled={plan.disabled}
                      onClick={() => handleSubscribe(plan.name)}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
