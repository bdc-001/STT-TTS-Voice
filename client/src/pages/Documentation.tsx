import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, 
  Search, 
  Zap, 
  Code2, 
  Play, 
  Copy,
  ArrowRight,
  Mic,
  Volume2,
  Settings,
  Key,
  Globe,
  Shield
} from "lucide-react";
import { useState } from "react";

const quickStartSteps = [
  {
    title: "Get Your API Key",
    description: "Sign up and get your API key from the dashboard",
    code: `# Set your API key as environment variable
export CONVIN_API_KEY="your_api_key_here"`
  },
  {
    title: "Install SDK",
    description: "Install our official SDK for your preferred language",
    code: `# JavaScript/Node.js
npm install convin-voice-ai

# Python
pip install convin-voice-ai

# Go
go get github.com/convin/voice-ai-go`
  },
  {
    title: "Make Your First Request",
    description: "Send your first STT or TTS request",
    code: `// JavaScript Example
import ConvinVoice from 'convin-voice-ai';

const client = new ConvinVoice(process.env.CONVIN_API_KEY);

// Speech-to-Text
const transcript = await client.stt.transcribe({
  audio: audioBuffer,
  language: 'en-US'
});

console.log(transcript.text);`
  }
];

const apiSections = [
  {
    icon: Mic,
    title: "Speech-to-Text API",
    description: "Convert speech to text with high accuracy",
    endpoints: [
      { method: "POST", path: "/v1/stt/transcribe", description: "Transcribe audio file" },
      { method: "WSS", path: "/v1/stt/stream", description: "Real-time streaming STT" },
      { method: "GET", path: "/v1/stt/languages", description: "Get supported languages" }
    ]
  },
  {
    icon: Volume2,
    title: "Text-to-Speech API",
    description: "Generate natural-sounding speech from text",
    endpoints: [
      { method: "POST", path: "/v1/tts/synthesize", description: "Generate speech from text" },
      { method: "GET", path: "/v1/tts/voices", description: "List available voices" },
      { method: "POST", path: "/v1/tts/clone", description: "Clone a voice (Enterprise)" }
    ]
  },
  {
    icon: Settings,
    title: "Management API",
    description: "Manage your account and usage",
    endpoints: [
      { method: "GET", path: "/v1/account", description: "Get account information" },
      { method: "GET", path: "/v1/usage", description: "Get usage statistics" },
      { method: "POST", path: "/v1/keys", description: "Generate new API key" }
    ]
  }
];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    console.log('Code copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Book className="h-3 w-3 mr-1" />
              Documentation
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Build with{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Voice AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate speech-to-text and text-to-speech into your applications.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-docs"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <nav className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Getting Started
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#quick-start" className="text-muted-foreground hover:text-primary">Quick Start</a></li>
                    <li><a href="#authentication" className="text-muted-foreground hover:text-primary">Authentication</a></li>
                    <li><a href="#rate-limits" className="text-muted-foreground hover:text-primary">Rate Limits</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-chart-2" />
                    API Reference
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#stt-api" className="text-muted-foreground hover:text-primary">Speech-to-Text</a></li>
                    <li><a href="#tts-api" className="text-muted-foreground hover:text-primary">Text-to-Speech</a></li>
                    <li><a href="#management" className="text-muted-foreground hover:text-primary">Management</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-500" />
                    Resources
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#sdks" className="text-muted-foreground hover:text-primary">SDKs</a></li>
                    <li><a href="#examples" className="text-muted-foreground hover:text-primary">Examples</a></li>
                    <li><a href="#tutorials" className="text-muted-foreground hover:text-primary">Tutorials</a></li>
                  </ul>
                </div>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Quick Start */}
            <section id="quick-start">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Quick Start
              </h2>
              
              <div className="space-y-8">
                {quickStartSteps.map((step, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <div className="relative">
                          <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                            <code>{step.code}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => copyCode(step.code)}
                            data-testid={`button-copy-step-${index}`}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* API Sections */}
            <section id="api-reference">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Code2 className="h-6 w-6 text-chart-2" />
                API Reference
              </h2>
              
              <div className="space-y-8">
                {apiSections.map((section, index) => (
                  <Card key={index} className="p-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <section.icon className="h-5 w-5 text-primary" />
                        {section.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{section.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {section.endpoints.map((endpoint, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                            <Badge variant={endpoint.method === 'POST' ? 'default' : endpoint.method === 'GET' ? 'secondary' : 'outline'}>
                              {endpoint.method}
                            </Badge>
                            <code className="font-mono text-sm">{endpoint.path}</code>
                            <span className="text-sm text-muted-foreground flex-1">{endpoint.description}</span>
                            <Button variant="ghost" size="sm" data-testid={`button-try-${idx}`}>
                              <Play className="h-3 w-3 mr-1" />
                              Try
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Try our interactive playground or jump straight into your first integration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button data-testid="button-try-playground">
                    <Play className="h-4 w-4 mr-2" />
                    Try Playground
                  </Button>
                  <Button variant="outline" data-testid="button-get-api-key">
                    <Key className="h-4 w-4 mr-2" />
                    Get API Key
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}