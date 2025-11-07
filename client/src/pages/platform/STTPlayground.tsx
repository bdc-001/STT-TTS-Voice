import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Download,
  Play,
  Copy,
  FileAudio,
  Clock,
  Users,
  Heart,
  Smile,
  Frown,
  Meh
} from "lucide-react";
import { useState } from "react";

export default function STTPlayground() {
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [speakerCount, setSpeakerCount] = useState("auto");
  const [outputType, setOutputType] = useState("text");
  const [processingComplete, setProcessingComplete] = useState(false);

  const handleUpload = () => {
    // Simulate processing
    setProcessingComplete(false);
    setTimeout(() => {
      setTranscript(
        "Speaker 1 [00:00-00:15]: Hello, thank you for calling Convin support. How can I help you today?\n\n" +
        "Speaker 2 [00:15-00:35]: Hi, I'm having issues with my voice transcription service. The accuracy seems lower than expected.\n\n" +
        "Speaker 1 [00:35-00:55]: I understand your concern. Let me check your account settings. Can you tell me what language you're primarily using?\n\n" +
        "Speaker 2 [00:55-01:10]: We're using English US, but we have some callers with regional accents."
      );
      setProcessingComplete(true);
    }, 2000);
  };

  const emotionTimeline = [
    { time: "00:00", emotion: "neutral", intensity: 0.5 },
    { time: "00:15", emotion: "concerned", intensity: 0.7 },
    { time: "00:30", emotion: "empathetic", intensity: 0.8 },
    { time: "00:45", emotion: "neutral", intensity: 0.5 },
    { time: "01:00", emotion: "satisfied", intensity: 0.6 }
  ];

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "satisfied": return "bg-green-500";
      case "empathetic": return "bg-blue-500";
      case "concerned": return "bg-yellow-500";
      case "neutral": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Speech-to-Text Playground</h1>
          <p className="text-muted-foreground">
            Upload audio files for accurate transcription with speaker diarization and emotion analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upload Audio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    WAV, MP3, M4A (max. 100MB)
                  </p>
                </div>

                <Button onClick={handleUpload} className="w-full bg-gradient-to-r from-primary to-chart-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Process Audio
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Speaker Count</label>
                  <Select value={speakerCount} onValueChange={setSpeakerCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Detect</SelectItem>
                      <SelectItem value="1">1 Speaker</SelectItem>
                      <SelectItem value="2">2 Speakers</SelectItem>
                      <SelectItem value="3">3+ Speakers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select value={outputType} onValueChange={setOutputType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Plain Text</SelectItem>
                      <SelectItem value="json">JSON with Timestamps</SelectItem>
                      <SelectItem value="srt">SRT Subtitles</SelectItem>
                      <SelectItem value="vtt">VTT Subtitles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {processingComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Processing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">1:23</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="font-medium">97.2%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Speakers:</span>
                    <span className="font-medium">2 Detected</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="font-medium">2.1s</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Transcript & Emotion Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Transcript</CardTitle>
                  {processingComplete && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!processingComplete && !transcript ? (
                  <div className="p-12 text-center">
                    <FileAudio className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Upload an audio file to start transcription
                    </p>
                  </div>
                ) : (
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="min-h-64 font-mono text-sm"
                    placeholder="Transcribed text will appear here..."
                  />
                )}
              </CardContent>
            </Card>

            {processingComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Emotion Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Emotion Legend */}
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Smile className="h-4 w-4 text-green-500" />
                        <span>Satisfied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-blue-500" />
                        <span>Empathetic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Frown className="h-4 w-4 text-yellow-500" />
                        <span>Concerned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Meh className="h-4 w-4 text-gray-400" />
                        <span>Neutral</span>
                      </div>
                    </div>

                    {/* Timeline Graph */}
                    <div className="relative h-32 border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-end justify-between h-full gap-1">
                        {emotionTimeline.map((point, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="flex-1 w-full flex items-end">
                              <div
                                className={`w-full ${getEmotionColor(point.emotion)} rounded-t transition-all hover:opacity-80 relative group cursor-pointer`}
                                style={{ height: `${point.intensity * 100}%` }}
                              >
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                  {point.emotion}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{point.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emotion Summary */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-muted text-center">
                        <div className="text-2xl font-bold text-green-500">42%</div>
                        <div className="text-xs text-muted-foreground">Positive</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted text-center">
                        <div className="text-2xl font-bold">35%</div>
                        <div className="text-xs text-muted-foreground">Neutral</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted text-center">
                        <div className="text-2xl font-bold text-blue-500">18%</div>
                        <div className="text-xs text-muted-foreground">Empathetic</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted text-center">
                        <div className="text-2xl font-bold text-yellow-500">5%</div>
                        <div className="text-xs text-muted-foreground">Concerned</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

