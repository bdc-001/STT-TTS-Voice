import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause,
  Square,
  Mic, 
  Upload, 
  Volume2, 
  Download,
  Code2,
  Settings,
  BarChart3,
  Copy,
  Zap
} from "lucide-react";
import { useState } from "react";

export default function Playground() {
  const [activeTab, setActiveTab] = useState("stt");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sttTranscript, setSttTranscript] = useState("");
  const [ttsText, setTtsText] = useState("Welcome to the Convin Voice AI Platform. Experience the power of natural speech synthesis and accurate transcription.");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [selectedVoice, setSelectedVoice] = useState("sarah-neural");
  const [speed, setSpeed] = useState([1.0]);
  const [apiKey, setApiKey] = useState("");

  // Mock data - todo: remove mock functionality
  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "hi-IN", name: "Hindi" }
  ];

  const voices = [
    { id: "sarah-neural", name: "Sarah", gender: "Female", accent: "US English" },
    { id: "john-neural", name: "John", gender: "Male", accent: "US English" },
    { id: "emma-neural", name: "Emma", gender: "Female", accent: "UK English" },
    { id: "alex-neural", name: "Alex", gender: "Male", accent: "Canadian" }
  ];

  const handleRecord = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? 'Stopped recording' : 'Started recording');
    
    if (!isRecording) {
      // Mock recording simulation - todo: remove mock functionality
      setTimeout(() => {
        setSttTranscript("This is a sample transcription from the playground. The Convin Voice AI platform provides high-accuracy speech-to-text conversion with real-time processing capabilities.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleUpload = () => {
    console.log('File upload triggered');
    // Mock file processing - todo: remove mock functionality
    setSttTranscript("Transcription from uploaded file: Hello, this is a test of the Convin Voice AI platform's batch processing capabilities. The system can handle various audio formats with high accuracy.");
  };

  const handlePlayTTS = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Stopped TTS playback' : 'Started TTS playback');
    
    if (!isPlaying) {
      // Mock playback simulation - todo: remove mock functionality
      setTimeout(() => {
        setIsPlaying(false);
      }, 4000);
    }
  };

  const generateCode = () => {
    if (activeTab === "stt") {
      return `// Speech-to-Text Example
const response = await fetch('https://api.convin.ai/v1/stt/transcribe', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}',
    'Content-Type': 'multipart/form-data'
  },
  body: formData // Your audio file
});

const result = await response.json();
console.log(result.transcript);`;
    } else {
      return `// Text-to-Speech Example  
const response = await fetch('https://api.convin.ai/v1/tts/synthesize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: "${ttsText}",
    voice: "${selectedVoice}",
    speed: ${speed[0]}
  })
});

const audioBlob = await response.blob();
const audio = new Audio(URL.createObjectURL(audioBlob));
audio.play();`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    console.log('Code copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Play className="h-3 w-3 mr-1" />
              API Playground
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Test Our{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Voice APIs
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interactive playground to test Speech-to-Text and Text-to-Speech APIs with real-time results.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Key</label>
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    data-testid="input-api-key"
                  />
                  <p className="text-xs text-muted-foreground">
                    Required for live API testing
                  </p>
                </div>

                {activeTab === "stt" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {activeTab === "tts" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Voice</label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger data-testid="select-voice">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice) => (
                            <SelectItem key={voice.id} value={voice.id}>
                              <div className="flex flex-col">
                                <span>{voice.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {voice.gender} • {voice.accent}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Speed: {speed[0]}x</label>
                      <Slider
                        value={speed}
                        onValueChange={setSpeed}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="w-full"
                        data-testid="slider-speed"
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requests today:</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg latency:</span>
                      <span className="font-medium">245ms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Testing Area */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="stt" data-testid="tab-stt">
                    <Mic className="h-4 w-4 mr-2" />
                    Speech-to-Text
                  </TabsTrigger>
                  <TabsTrigger value="tts" data-testid="tab-tts">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Text-to-Speech
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stt" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Speech-to-Text Testing</h3>
                    
                    {/* Recording Controls */}
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button
                        variant={isRecording ? "destructive" : "default"}
                        onClick={handleRecord}
                        data-testid="button-record"
                      >
                        {isRecording ? (
                          <>
                            <Square className="h-4 w-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>

                      <Button variant="outline" onClick={handleUpload} data-testid="button-upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                      </Button>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
                      <div className={`h-2 w-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                      <span className="text-sm">
                        {isRecording ? 'Recording audio...' : 'Ready to record'}
                      </span>
                    </div>

                    {/* Transcript Output */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Transcript Result</label>
                      <Textarea
                        value={sttTranscript}
                        placeholder="Transcribed text will appear here..."
                        className="min-h-32"
                        readOnly
                        data-testid="textarea-transcript"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tts" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Text-to-Speech Testing</h3>
                    
                    {/* Text Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Text to Convert</label>
                      <Textarea
                        value={ttsText}
                        onChange={(e) => setTtsText(e.target.value)}
                        placeholder="Enter text to convert to speech..."
                        className="min-h-24"
                        data-testid="textarea-tts-input"
                      />
                    </div>

                    {/* Audio Controls */}
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button
                        variant={isPlaying ? "destructive" : "default"}
                        onClick={handlePlayTTS}
                        data-testid="button-play-tts"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Generate & Play
                          </>
                        )}
                      </Button>

                      <Button variant="outline" data-testid="button-download">
                        <Download className="h-4 w-4 mr-2" />
                        Download MP3
                      </Button>
                    </div>

                    {/* Audio Visualization */}
                    <div className="p-8 bg-muted/30 rounded-lg flex items-center justify-center min-h-24">
                      {isPlaying ? (
                        <div className="flex items-center gap-1">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-primary rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 24 + 8}px`,
                                animationDelay: `${i * 50}ms`
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Audio visualization will appear here
                        </span>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Code Generation */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Generated Code
                  </h4>
                  <Button variant="outline" size="sm" onClick={copyCode} data-testid="button-copy-code">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{generateCode()}</code>
                </pre>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to Integrate?</h3>
            <p className="text-muted-foreground">
              Get your API key and start building with our powerful voice APIs.
            </p>
            <Button data-testid="button-get-started">
              <Zap className="h-4 w-4 mr-2" />
              Get API Key
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}