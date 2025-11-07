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
    description: "High-accuracy transcription with batch processing. Support for 36+ languages with speaker diarization.",
    features: ["File upload processing", "Speaker diarization", "Custom vocabulary", "Smart formatting"]
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
    features: ["REST APIs", "Multiple SDKs", "Code examples", "Interactive docs"]
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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 space-y-6">
          <Badge className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border-primary/20">
            Platform Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Voice Intelligence
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Powerful APIs built for developers, with enterprise-grade reliability, security, and performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            // Assign different gradient colors to each card
            const gradients = [
              'from-blue-500/10 to-blue-600/5 border-blue-500/20',
              'from-purple-500/10 to-purple-600/5 border-purple-500/20',
              'from-pink-500/10 to-pink-600/5 border-pink-500/20',
              'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20',
              'from-violet-500/10 to-violet-600/5 border-violet-500/20',
              'from-rose-500/10 to-rose-600/5 border-rose-500/20',
            ];
            const iconColors = [
              'text-blue-500',
              'text-purple-500',
              'text-pink-500',
              'text-cyan-500',
              'text-violet-500',
              'text-rose-500',
            ];
            
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-xl hover:-translate-y-1 hover:bg-hover transition-all duration-300 bg-white border hover:border-primary/40`}
                data-testid={`card-feature-${index}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-primary/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300`}>
                      <feature.icon className={`h-6 w-6 text-primary`} />
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2.5">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm">
                        <div className={`h-1.5 w-1.5 rounded-full bg-primary`} />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}