import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  Download,
  Volume2,
  Settings,
  Sparkles,
  BarChart3
} from "lucide-react";
import { useState } from "react";

export default function TTSPlayground() {
  const [text, setText] = useState("Welcome to the Convin Voice Intelligence Platform. Experience the power of natural speech synthesis with advanced emotion control and neural voice technology.");
  const [selectedVoice, setSelectedVoice] = useState("sarah-professional");
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);
  const [emotion, setEmotion] = useState("neutral");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const voices = [
    { id: "sarah-professional", name: "Sarah - Professional", category: "Customer Support" },
    { id: "alex-empathetic", name: "Alex - Empathetic", category: "Customer Support" },
    { id: "marcus-energetic", name: "Marcus - Energetic", category: "Marketing" },
    { id: "emma-friendly", name: "Emma - Friendly", category: "General" },
    { id: "david-assertive", name: "David - Assertive", category: "Sales" }
  ];

  const emotions = ["Neutral", "Empathetic", "Assertive", "Friendly", "Energetic"];

  const handleGenerate = () => {
    setIsGenerated(false);
    setTimeout(() => {
      setIsGenerated(true);
    }, 1500);
  };

  const handlePlayPause = () => {
    if (!isGenerated) return;
    
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 4000);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Text-to-Speech Playground</h1>
          <p className="text-muted-foreground">
            Generate natural-sounding speech from text with customizable voices and emotions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Input & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Voice Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Choose Voice</label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          <div className="flex flex-col">
                            <span>{voice.name}</span>
                            <span className="text-xs text-muted-foreground">{voice.category}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Emotion Tone</label>
                  <Select value={emotion} onValueChange={setEmotion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {emotions.map((emo) => (
                        <SelectItem key={emo} value={emo.toLowerCase()}>
                          {emo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Voice Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Speed</label>
                    <span className="text-sm text-muted-foreground">{speed[0]}x</span>
                  </div>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Pitch</label>
                    <span className="text-sm text-muted-foreground">{pitch[0]}x</span>
                  </div>
                  <Slider
                    value={pitch}
                    onValueChange={setPitch}
                    max={1.5}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {isGenerated && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Audio Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">4.2s</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quality:</span>
                    <span className="font-medium">24kHz</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">MP3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">128KB</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Text Input & Waveform */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the text you want to convert to speech..."
                  className="min-h-32"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{text.length} characters</span>
                  <span>Est. duration: {Math.ceil(text.length / 15)}s</span>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  className="w-full bg-gradient-to-r from-primary to-chart-2"
                  disabled={!text.trim()}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Speech
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  Audio Playback
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isGenerated ? (
                  <div className="p-12 text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Generate speech to see audio visualization
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Waveform Visualization */}
                    <div className="relative h-32 border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-chart-2/5">
                      <div className="flex items-end justify-between h-full gap-1">
                        {[...Array(40)].map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t transition-all ${
                              isPlaying 
                                ? "bg-gradient-to-t from-primary to-chart-2 animate-pulse" 
                                : "bg-gradient-to-t from-primary/30 to-chart-2/30"
                            }`}
                            style={{
                              height: `${Math.random() * 100}%`,
                              animationDelay: `${i * 30}ms`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Audio Controls */}
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={handlePlayPause}
                        size="lg"
                        className={isPlaying ? "bg-destructive hover:bg-destructive/90" : "bg-gradient-to-r from-primary to-chart-2"}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-5 w-5 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 mr-2" />
                            Play
                          </>
                        )}
                      </Button>

                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-chart-2 transition-all"
                            style={{ width: isPlaying ? "100%" : "0%" }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                          <span>0:00</span>
                          <span>4:20</span>
                        </div>
                      </div>

                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download MP3
                      </Button>
                    </div>

                    {/* Format Options */}
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        MP3
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        WAV
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        OGG
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

