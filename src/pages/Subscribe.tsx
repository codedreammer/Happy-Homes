import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";
import { Check, Crown, Eye, Zap } from "lucide-react";

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: [
        "Browse products",
        "3D product viewing",
        "Basic search filters",
        "Contact professionals"
      ],
      current: true
    },
    {
      name: "Pro",
      price: { monthly: 999, yearly: 9999 },
      features: [
        "Everything in Free",
        "AR product viewing",
        "Advanced filters",
        "Priority support",
        "Exclusive deals",
        "Save unlimited products"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Crown className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-lg opacity-90">
            Unlock AR viewing and premium features to enhance your design experience
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-muted rounded-lg p-1">
              <Button
                variant={selectedPlan === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPlan('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={selectedPlan === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPlan('yearly')}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-800">Save 17%</Badge>
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`hover-lift shadow-soft relative ${
                  plan.popular ? 'border-primary shadow-elegant' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ₹{plan.price[selectedPlan]}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{selectedPlan === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-primary hover:shadow-elegant' 
                        : plan.current 
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : ''
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Highlight */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Why Upgrade to Pro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AR Viewing</h3>
                <p className="text-sm text-muted-foreground">
                  See how products look in your actual space
                </p>
              </div>
              <div className="text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Priority Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get faster responses from our support team
                </p>
              </div>
              <div className="text-center">
                <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Exclusive Access</h3>
                <p className="text-sm text-muted-foreground">
                  Early access to new features and products
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}