import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Calculator,
  HelpCircle,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const comparisonFeatures = [
  {
    category: "Core Features",
    features: [
      { name: "STT Minutes/Month", free: "1,000", pro: "10,000", enterprise: "Unlimited" },
      { name: "TTS Characters/Month", free: "10,000", pro: "100,000", enterprise: "Unlimited" },
      { name: "File Upload Processing", free: true, pro: true, enterprise: true },
      { name: "Batch Processing", free: true, pro: true, enterprise: true },
      { name: "Multiple Audio Formats", free: true, pro: true, enterprise: true }
    ]
  },
  {
    category: "Voice Options",
    features: [
      { name: "Basic Voices", free: "4", pro: "12", enterprise: "12+" },
      { name: "Premium Neural Voices", free: false, pro: true, enterprise: true },
      { name: "Voice Cloning", free: false, pro: false, enterprise: true },
      { name: "Custom Voices", free: false, pro: false, enterprise: true },
      { name: "SSML Support", free: false, pro: true, enterprise: true }
    ]
  },
  {
    category: "Advanced Features",
    features: [
      { name: "Speaker Diarization", free: false, pro: true, enterprise: true },
      { name: "Custom Vocabulary", free: false, pro: true, enterprise: true },
      { name: "Language Detection", free: false, pro: true, enterprise: true },
      { name: "Profanity Filtering", free: false, pro: true, enterprise: true },
      { name: "Custom Model Training", free: false, pro: false, enterprise: true }
    ]
  },
  {
    category: "Infrastructure",
    features: [
      { name: "Rate Limits", free: "Limited", pro: "Higher", enterprise: "Custom" },
      { name: "SLA Guarantee", free: false, pro: "99.5%", enterprise: "99.9%" },
      { name: "On-premises Deployment", free: false, pro: false, enterprise: true },
      { name: "Dedicated Support", free: false, pro: true, enterprise: true },
      { name: "Priority Processing", free: false, pro: true, enterprise: true }
    ]
  }
];

const faqs = [
  {
    question: "How is usage calculated?",
    answer: "STT usage is measured in minutes of audio processed. TTS usage is calculated by characters in the input text. Partial minutes/characters are rounded up."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "Free tier requests will be rate limited. Pro and Enterprise plans have overage billing at standard rates. You'll receive notifications as you approach limits."
  },
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes, we offer custom pricing for high-volume usage. Contact our sales team to discuss your specific needs and get a tailored quote."
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, Pro plan includes a 14-day free trial with full access to all features. No credit card required to start."
  }
];

export default function PricingPage() {
  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="h-3 w-3 mr-1" />
              Pricing
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Simple,{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprise charges. Pay only for what you use.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <Pricing />

      {/* Detailed Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed Feature Comparison</h2>
            <p className="text-muted-foreground">
              Compare all features across our plans to find the perfect fit for your needs.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Features</th>
                    <th className="text-center p-4 font-semibold">Free</th>
                    <th className="text-center p-4 font-semibold bg-primary/5">
                      Pro
                      <Badge className="ml-2" variant="default">Popular</Badge>
                    </th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="bg-muted/30">
                        <td colSpan={4} className="p-4 font-medium text-sm uppercase tracking-wider">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b hover:bg-muted/20">
                          <td className="p-4">{feature.name}</td>
                          <td className="p-4 text-center">{renderFeatureValue(feature.free)}</td>
                          <td className="p-4 text-center bg-primary/5">{renderFeatureValue(feature.pro)}</td>
                          <td className="p-4 text-center">{renderFeatureValue(feature.enterprise)}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Usage Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Calculate Your Costs</h2>
            <p className="text-muted-foreground">
              Estimate your monthly costs based on your expected usage.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto p-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Usage Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">STT Minutes/Month</label>
                  <input 
                    type="number" 
                    placeholder="1000"
                    className="w-full p-3 border rounded-lg"
                    data-testid="input-stt-minutes"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">TTS Characters/Month</label>
                  <input 
                    type="number" 
                    placeholder="10000"
                    className="w-full p-3 border rounded-lg"
                    data-testid="input-tts-characters"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$0/month</div>
                  <div className="text-sm text-muted-foreground">Estimated cost</div>
                </div>
              </div>

              <Button className="w-full" data-testid="button-get-started">
                Get Started with This Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about our pricing and plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline" data-testid="button-contact-support">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}