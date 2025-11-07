import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "/month",
    description: "Perfect for experimentation and small projects",
    features: [
      "1,000 STT minutes/month",
      "10,000 TTS characters/month",
      "Basic voices (4 options)",
      "Standard accuracy",
      "Community support",
      "REST API access"
    ],
    limitations: [
      "No real-time streaming",
      "No custom voices",
      "Rate limited"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$49",
    period: "/month",
    description: "For growing businesses and applications",
    features: [
      "10,000 STT minutes/month", 
      "100,000 TTS characters/month",
      "Premium neural voices (12 options)",
      "Real-time streaming",
      "Speaker diarization",
      "Custom vocabulary",
      "WebSocket support",
      "Priority support",
      "Advanced analytics"
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    icon: Building,
    price: "Custom",
    period: "/month",
    description: "For large-scale applications with custom needs",
    features: [
      "Unlimited usage",
      "All premium features",
      "Voice cloning",
      "Custom model training",
      "On-premises deployment",
      "Dedicated support",
      "SLA guarantees",
      "Custom integrations",
      "White-label options",
      "Advanced security"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }
];

export default function Pricing() {
  const handlePlanSelect = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprise charges. Pay only for what you use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover-elevate transition-all duration-200 ${
                plan.popular ? 'border-primary border-2 shadow-lg' : ''
              }`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-chart-2 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-primary/10 to-chart-2/10">
                    <plan.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={() => handlePlanSelect(plan.name)}
                  data-testid={`button-select-${plan.name.toLowerCase()}`}
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-4">
                  <h4 className="font-medium">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="h-4 w-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                              <div className="h-1 w-1 bg-muted-foreground rounded-full" />
                            </div>
                            <span className="text-xs text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ or additional info */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Need something different?</h3>
          <p className="text-muted-foreground mb-6">
            We offer custom solutions for unique requirements. Volume discounts available for high-usage applications.
          </p>
          <Button variant="outline" data-testid="button-contact-sales">
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
}