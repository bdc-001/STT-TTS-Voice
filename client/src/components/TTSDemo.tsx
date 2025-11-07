import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Volume2, Play, Pause, Download, AudioWaveform } from "lucide-react";
import { useState } from "react";

export default function TTSDemo() {
  const [text, setText] = useState("Transform your applications with natural, expressive voice AI. Experience the future of human-computer interaction.");
  const [selectedVoice, setSelectedVoice] = useState("sarah-neural");
  const [speed, setSpeed] = useState([1.0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock voice options - todo: remove mock functionality
  const voices = [
    { id: "sarah-neural", name: "Sarah", gender: "Female", accent: "US English" },
    { id: "john-neural", name: "John", gender: "Male", accent: "US English" },
    { id: "emma-neural", name: "Emma", gender: "Female", accent: "UK English" },
    { id: "alex-neural", name: "Alex", gender: "Male", accent: "Canadian" },
    { id: "maria-neural", name: "María", gender: "Female", accent: "Spanish" },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(`${isPlaying ? 'Pausing' : 'Playing'} TTS audio`);
    
    if (!isPlaying) {
      // Mock playback simulation - todo: remove mock functionality
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleDownload = () => {
    console.log('Downloading audio file');
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-4">
            <Volume2 className="h-3 w-3 mr-1" />
            Text-to-Speech Demo
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Natural Voice{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Generation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create lifelike speech from text with our advanced neural voices. Perfect for accessibility, content creation, and interactive applications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-chart-2" />
                Interactive TTS Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Text Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter Text to Convert</label>
                <Textarea
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Type the text you want to convert to speech..."
                  className="min-h-24 resize-none"
                  data-testid="textarea-tts-input"
                />
                <div className="text-xs text-muted-foreground">
                  {text.length} characters • Estimated duration: {Math.ceil(text.length / 120)} seconds
                </div>
              </div>

              {/* Voice Controls */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voice Selection</label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger data-testid="select-voice">
                      <SelectValue placeholder="Choose voice" />
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
              </div>

              {/* Audio Controls */}
              <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
                <Button
                  variant={isPlaying ? "destructive" : "default"}
                  onClick={handlePlayPause}
                  data-testid="button-play-pause"
                  className="flex items-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Generate & Play
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDownload}
                  data-testid="button-download-audio"
                  disabled={!text.trim()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download MP3
                </Button>

                {/* Audio Visualization */}
                <div className="flex-1 flex items-center justify-center min-h-12 bg-muted rounded-lg">
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
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <AudioWaveform className="h-4 w-4" />
                      Audio visualization will appear here
                    </span>
                  )}
                </div>
              </div>

              {/* Features showcase */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-chart-2">12+</div>
                  <div className="text-sm text-muted-foreground">Neural Voices</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-primary">24kHz</div>
                  <div className="text-sm text-muted-foreground">Audio Quality</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-green-500">SSML</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}