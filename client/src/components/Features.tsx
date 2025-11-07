import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Volume2, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Code2, 
  BarChart3,
  Clock,
  Headphones,
  Settings,
  FileAudio
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Speech-to-Text API",
    description: "High-accuracy transcription with real-time streaming and batch processing. Support for 36+ languages with speaker diarization.",
    features: ["Real-time streaming", "Speaker diarization", "Custom vocabulary", "Smart formatting"]
  },
  {
    icon: Volume2,
    title: "Text-to-Speech API", 
    description: "Natural-sounding voices with emotional expression. Clone voices and generate speech in multiple languages and styles.",
    features: ["Neural voices", "Voice cloning", "SSML support", "Multiple formats"]
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-300ms latency for real-time applications. Optimized infrastructure with global edge deployment.",
    features: ["<300ms latency", "Global CDN", "Auto-scaling", "99.9% uptime"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption. On-premises deployment available for sensitive data.",
    features: ["SOC 2 compliant", "End-to-end encryption", "On-premises option", "GDPR ready"]
  },
  {
    icon: Code2,
    title: "Developer-Friendly",
    description: "Comprehensive SDKs, detailed documentation, and interactive playground. Get started in minutes.",
    features: ["REST & WebSocket APIs", "Multiple SDKs", "Code examples", "Interactive docs"]
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Real-time monitoring and detailed analytics. Track usage, performance, and costs with comprehensive dashboards.",
    features: ["Real-time metrics", "Usage tracking", "Cost analytics", "Performance insights"]
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Everything you need to build with{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Voice AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful APIs designed for developers, with enterprise-grade reliability and security built in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`card-feature-${index}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}