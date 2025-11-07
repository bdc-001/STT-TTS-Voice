import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Upload, Play, Square, Volume2 } from "lucide-react";
import { useState } from "react";

export default function STTDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  
  // Mock data for demo purposes - todo: remove mock functionality
  const mockTranscripts = [
    "Hello, welcome to the Convin Voice AI platform demonstration.",
    "This is a real-time speech-to-text conversion showing the capabilities of our API.",
    "The system supports multiple languages and provides high accuracy transcription with speaker diarization.",
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
    
    // Mock recording simulation - todo: remove mock functionality
    let transcriptIndex = 0;
    const interval = setInterval(() => {
      if (transcriptIndex < mockTranscripts.length) {
        setTranscript(prev => prev + (prev ? " " : "") + mockTranscripts[transcriptIndex]);
        transcriptIndex++;
      } else {
        setIsRecording(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
  };

  const handleFileUpload = () => {
    console.log('File upload triggered');
    // Mock file processing - todo: remove mock functionality
    setTranscript("This is a sample transcription from an uploaded audio file. The Convin API processes your audio and returns accurate text with timestamps and speaker identification.");
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-4">
            <Mic className="h-3 w-3 mr-1" />
            Speech-to-Text Demo
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Try Our STT API{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Live
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience real-time transcription with high accuracy, speaker detection, and multi-language support.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                Interactive STT Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Controls */}
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40" data-testid="select-language">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="es-ES">Spanish</SelectItem>
                    <SelectItem value="fr-FR">French</SelectItem>
                    <SelectItem value="de-DE">German</SelectItem>
                    <SelectItem value="hi-IN">Hindi</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={isRecording ? "destructive" : "default"}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  data-testid="button-record-toggle"
                  className="flex items-center gap-2"
                >
                  {isRecording ? (
                    <>
                      <Square className="h-4 w-4" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      Start Recording
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleFileUpload}
                  data-testid="button-upload-file"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Audio
                </Button>

                {transcript && (
                  <Button
                    variant="ghost"
                    onClick={clearTranscript}
                    data-testid="button-clear-transcript"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-muted-foreground">
                  {isRecording ? 'Recording in progress...' : 'Ready to record'}
                </span>
              </div>

              {/* Transcript Output */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Live Transcript</label>
                <Textarea
                  value={transcript}
                  placeholder="Your transcribed text will appear here..."
                  className="min-h-32 resize-none"
                  readOnly
                  data-testid="textarea-transcript"
                />
              </div>

              {/* Features showcase */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-primary">99.2%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-chart-2">285ms</div>
                  <div className="text-sm text-muted-foreground">Avg Latency</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-green-500">36+</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}