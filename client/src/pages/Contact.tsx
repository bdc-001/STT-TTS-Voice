import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  Send,
  Clock,
  Users,
  Building,
  HelpCircle,
  Zap
} from "lucide-react";
import { useState } from "react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our technical support team",
    contact: "support@convin.ai",
    response: "< 4 hours"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team in real-time",
    contact: "Available 9AM-6PM EST",
    response: "Immediate"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our enterprise team",
    contact: "+1 (555) 123-4567",
    response: "Enterprise only"
  },
  {
    icon: Building,
    title: "Enterprise Sales",
    description: "Discuss custom solutions and pricing",
    contact: "sales@convin.ai", 
    response: "< 2 hours"
  }
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street\nSan Francisco, CA 94103",
    type: "Headquarters"
  },
  {
    city: "New York",
    address: "456 Broadway\nNew York, NY 10013", 
    type: "Sales Office"
  },
  {
    city: "London",
    address: "789 King's Road\nLondon SW3 4NX",
    type: "European Office"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [inquiryType, setInquiryType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, inquiryType });
    // Reset form - todo: integrate with actual contact system
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    setInquiryType("");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              <MessageSquare className="h-3 w-3 mr-1" />
              Contact Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Let's{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our Voice AI platform? Need technical support? 
              Want to discuss enterprise solutions? We're here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="p-4 hover-elevate" data-testid={`card-contact-${index}`}>
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-lg p-3">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {method.description}
                        </p>
                        <p className="text-sm font-medium text-primary">{method.contact}</p>
                        <p className="text-xs text-muted-foreground">
                          Response: {method.response}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Our Offices
              </h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className="text-sm" data-testid={`office-${index}`}>
                    <div className="font-medium flex items-center gap-2">
                      {office.city}
                      <Badge variant="outline">{office.type}</Badge>
                    </div>
                    <p className="text-muted-foreground whitespace-pre-line mt-1">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@company.com"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                        data-testid="input-company"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Inquiry Type *</label>
                      <Select value={inquiryType} onValueChange={setInquiryType} required>
                        <SelectTrigger data-testid="select-inquiry-type">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your inquiry"
                      data-testid="input-subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      className="min-h-32"
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-muted-foreground">
                      * Required fields. We typically respond within 24 hours.
                    </p>
                    <Button type="submit" data-testid="button-send-message">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 pt-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                How do I get started with the API?
              </h3>
              <p className="text-sm text-muted-foreground">
                Sign up for a free account, get your API key, and start with our quick start guide. 
                You can make your first API call in under 5 minutes.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                What are your support hours?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our support team is available 9AM-6PM EST, Monday through Friday. 
                Enterprise customers have 24/7 priority support.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Do you offer custom integrations?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes, we provide custom integration services for enterprise customers. 
                Contact our sales team to discuss your specific requirements.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                What's your API uptime guarantee?
              </h3>
              <p className="text-sm text-muted-foreground">
                We maintain 99.9% uptime with enterprise SLAs. Our infrastructure is 
                designed for high availability with global redundancy.
              </p>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}