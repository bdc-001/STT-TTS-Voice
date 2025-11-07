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
      "File upload only",
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
      "Batch file processing",
      "Speaker diarization",
      "Custom vocabulary",
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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 lg:mb-20 space-y-6">
          <Badge className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border-primary/20">
            Flexible Pricing
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprise charges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <Card 
                key={index} 
                className={`relative group hover:shadow-2xl hover:-translate-y-2 hover:bg-hover transition-all duration-300 bg-white backdrop-blur-sm border-2 ${
                  plan.popular ? 'border-primary/40 shadow-xl shadow-primary/10 scale-105' : 'border-border hover:border-primary/40'
                }`}
                data-testid={`card-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-white px-6 py-1.5 text-sm font-semibold shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-primary/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300`}>
                      <plan.icon className={`h-8 w-8 text-primary`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">{plan.name}</CardTitle>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">{plan.price}</span>
                      <span className="text-muted-foreground text-lg">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground px-4">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/30' : ''}`}
                    onClick={() => handlePlanSelect(plan.name)}
                    data-testid={`button-select-${plan.name.toLowerCase()}`}
                  >
                    {plan.buttonText}
                  </Button>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1">
                            <Check className={`h-4 w-4 text-primary`} />
                          </div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                  {plan.limitations && (
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="h-4 w-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                              <div className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full" />
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
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="text-center mt-20 p-10 bg-white rounded-3xl border border-border hover:bg-hover transition-all duration-300 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Need something different?</h3>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            We offer custom solutions for unique requirements. Volume discounts available for high-usage applications.
          </p>
          <Button 
            variant="outline" 
            data-testid="button-contact-sales"
            className="px-8 py-6 text-base hover:bg-hover hover:border-primary/50"
          >
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
}