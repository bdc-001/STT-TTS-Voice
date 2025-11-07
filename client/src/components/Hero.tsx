import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Play, Mic, Volume2, Zap, Shield, Sparkles } from "lucide-react";
import WaveformBackground from "./WaveformBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Animated Waveform Background */}
      <div className="absolute inset-0">
        <WaveformBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 dark:from-slate-950/60 dark:via-slate-950/40 dark:to-slate-950/80" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Badge className="w-fit bg-primary text-white border-0 shadow-lg shadow-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Voice Platform
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
                  Voice AI Platform
                </span>
                <br />
                <span className="text-foreground">
                  for Developers
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Build intelligent voice experiences with enterprise-grade Speech-to-Text and Text-to-Speech APIs. 
                Real-time transcription, natural synthesis, and cutting-edge AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/platform">
                <Button 
                  size="lg" 
                  data-testid="button-get-started"
                  className="group bg-primary hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 text-white rounded-xl font-semibold text-base px-8 transition-all duration-300 hover:scale-105"
                >
                  Launch Platform
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/signup">
                <Button 
                  variant="outline" 
                  size="lg" 
                  data-testid="button-signup"
                  className="rounded-xl border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 backdrop-blur-sm transition-all duration-300 font-semibold"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 sm:gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 bg-chart-3/20 rounded-lg">
                  <Shield className="h-4 w-4 text-chart-3" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-base">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-base">&lt;300ms</div>
                  <div className="text-xs text-muted-foreground">Latency</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Mic className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-base">36+</div>
                  <div className="text-xs text-muted-foreground">Languages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Interactive demo preview */}
          <div className="order-1 lg:order-2 lg:justify-self-end">
            <Card className="w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl p-6 sm:p-8 space-y-6 backdrop-blur-xl bg-white/95 dark:bg-slate-900/40 rounded-3xl shadow-2xl border border-border hover:border-primary/30 transition-all duration-300">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">Try it Live</h3>
                  <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">
                    <div className="w-2 h-2 bg-chart-3 rounded-full mr-2 animate-pulse" />
                    Live
                  </Badge>
                </div>
                
                {/* STT Demo */}
                <div className="space-y-3 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mic className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Speech-to-Text</span>
                  </div>
                  <div className="bg-muted backdrop-blur-sm rounded-xl p-4 min-h-[60px] flex items-center border border-border/50">
                    <span className="text-sm text-muted-foreground italic">
                      "Transform your voice into accurate text in real-time..."
                    </span>
                  </div>
                </div>

                {/* TTS Demo */}
                <div className="space-y-3 p-4 bg-chart-2/5 rounded-2xl border border-chart-2/20">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-chart-2/10 rounded-lg">
                      <Volume2 className="h-4 w-4 text-chart-2" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Text-to-Speech</span>
                  </div>
                  <div className="bg-muted backdrop-blur-sm rounded-xl p-4 border border-border/50">
                    <span className="text-sm text-foreground">
                      "Experience natural, human-like voice synthesis with multiple voices and languages."
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    data-testid="button-play-tts" 
                    className="w-full bg-chart-2 hover:bg-chart-2/90 text-white border-0 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-chart-2/50"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Sample
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