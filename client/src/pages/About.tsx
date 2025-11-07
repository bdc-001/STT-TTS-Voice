import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building, 
  Users, 
  Target, 
  Award,
  Zap,
  Shield,
  Globe,
  Heart,
  ArrowRight,
  Linkedin,
  Twitter
} from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former VP of Engineering at Deepgram with 15 years in voice AI",
    initials: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-founder", 
    bio: "Ex-OpenAI researcher specializing in speech recognition models",
    initials: "MR"
  },
  {
    name: "Dr. Emily Watson",
    role: "Head of AI Research",
    bio: "PhD in Machine Learning from Stanford, 50+ published papers",
    initials: "EW"
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Former senior engineer at Google Speech, scaling expert",
    initials: "DK"
  }
];

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "We believe your data belongs to you. End-to-end encryption and GDPR compliance are built into our DNA."
  },
  {
    icon: Zap,
    title: "Performance Obsessed",
    description: "Sub-300ms latency isn't just a target—it's our minimum standard. We optimize every millisecond."
  },
  {
    icon: Globe,
    title: "Globally Accessible",
    description: "Voice AI should work for everyone, everywhere. We support 36+ languages and growing."
  },
  {
    icon: Heart,
    title: "Developer Love",
    description: "We're developers building for developers. Beautiful APIs, clear docs, and exceptional support."
  }
];

const milestones = [
  {
    year: "2023",
    title: "Company Founded",
    description: "Started with a vision to democratize voice AI technology"
  },
  {
    year: "2024",
    title: "Series A Funding", 
    description: "Raised $15M to accelerate platform development"
  },
  {
    year: "2024",
    title: "Beta Launch",
    description: "Launched private beta with 100+ enterprise customers"
  },
  {
    year: "2024",
    title: "Public Launch",
    description: "General availability of the Convin Voice AI Platform"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Building className="h-3 w-3 mr-1" />
              About Convin
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Building the Future of{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Voice AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make voice AI accessible to every developer and enterprise. 
              Our platform combines cutting-edge research with enterprise-grade reliability to power 
              the next generation of voice-enabled applications.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">
                <Target className="h-3 w-3 mr-1" />
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold">
                Democratizing Voice AI Technology
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe voice AI should be accessible to every developer, from startups building their first app 
                to enterprises processing millions of audio hours. Our platform removes the complexity of voice AI 
                while providing enterprise-grade performance and security.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By offering best-in-class Speech-to-Text and Text-to-Speech APIs, we're empowering developers 
                to create more natural, accessible, and engaging user experiences.
              </p>
            </div>
            
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-chart-2/5">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1M+</div>
                  <div className="text-sm text-muted-foreground">API Calls Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-2">500+</div>
                  <div className="text-sm text-muted-foreground">Enterprise Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover-elevate" data-testid={`card-value-${index}`}>
                <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              World-class experts in AI, engineering, and voice technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover-elevate" data-testid={`card-team-${index}`}>
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-chart-2 text-white text-lg font-semibold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" data-testid={`button-linkedin-${index}`}>
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-twitter-${index}`}>
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">
              Key milestones in building the future of voice AI.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-center" data-testid={`milestone-${index}`}>
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <Card className="flex-1 p-6">
                    <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Join Us in Shaping the Future</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you're a developer looking to integrate voice AI or a talented individual wanting to join our mission, 
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button data-testid="button-get-started">
                  Start Building
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" data-testid="button-view-careers">
                  <Users className="h-4 w-4 mr-2" />
                  View Careers
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}