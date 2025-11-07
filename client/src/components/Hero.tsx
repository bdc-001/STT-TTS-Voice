import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Play, Mic, Volume2, Zap, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Voice_AI_hero_visualization_6bcdd956.png";

export default function Hero() {
  const handlePlayDemo = () => {
    console.log('Play demo triggered');
  };

  const handleGetStarted = () => {
    console.log('Get started triggered');
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Now Available
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                AI Agent Platform for{" "}
                <span className="text-primary">
                  Customer Conversations
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Transform your applications with intelligent voice AI. 
                High-accuracy Speech-to-Text and natural Text-to-Speech APIs 
                built for enterprise scale.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  data-testid="button-get-started"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold uppercase text-sm transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handlePlayDemo}
                data-testid="button-play-demo"
                className="rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-semibold"
              >
                <Play className="mr-2 h-4 w-4" />
                See Convin's AI Agents in Action
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span><strong>99.9%</strong> Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span><strong>&lt;300ms</strong> Latency</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mic className="h-4 w-4 text-blue-500" />
                <span><strong>36+</strong> Languages</span>
              </div>
            </div>
          </div>

          {/* Right content - Interactive demo preview */}
          <div className="order-1 lg:order-2 lg:justify-self-end">
            <Card className="w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 backdrop-blur-sm bg-card/95 rounded-2xl shadow-lg border">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold">Try it Live</h3>
                
                {/* STT Demo */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Speech-to-Text</span>
                  </div>
                  <div className="bg-muted rounded-lg p-3 sm:p-4 min-h-[50px] sm:min-h-[60px] flex items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground italic">
                      Click the microphone to start recording...
                    </span>
                  </div>
                  <Button size="sm" variant="outline" data-testid="button-record" className="w-full sm:w-auto">
                    <Mic className="h-4 w-4 mr-2" />
                    Record
                  </Button>
                </div>

                {/* TTS Demo */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-chart-2" />
                    <span className="text-sm font-medium">Text-to-Speech</span>
                  </div>
                  <div className="bg-muted rounded-lg p-3 sm:p-4">
                    <span className="text-xs sm:text-sm">
                      "Transform your applications with natural voice AI."
                    </span>
                  </div>
                  <Button size="sm" variant="outline" data-testid="button-play-tts" className="w-full sm:w-auto">
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}