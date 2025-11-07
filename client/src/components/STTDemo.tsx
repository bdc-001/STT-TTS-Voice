import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Upload } from "lucide-react";
import { useState } from "react";

export default function STTDemo() {
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = () => {
    console.log('File upload triggered');
    setIsProcessing(true);
    // Mock file processing - todo: remove mock functionality
    setTimeout(() => {
      setTranscript("This is a sample transcription from an uploaded audio file. The Convin API processes your audio and returns accurate text with timestamps and speaker identification.");
      setIsProcessing(false);
    }, 1500);
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/10 via-background to-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 lg:mb-16 space-y-6">
          <Badge className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-500 border-blue-500/20">
            <Mic className="h-3 w-3 mr-1" />
            Speech-to-Text Demo
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
            Try Our STT API{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Live
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload audio files for accurate transcription with speaker detection and multi-language support.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-6 lg:p-10 bg-white hover:bg-hover backdrop-blur-sm border border-border hover:border-primary/40 shadow-xl transition-all duration-300">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Mic className="h-6 w-6 text-blue-500" />
                </div>
                Interactive STT Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Controls */}
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-52 bg-background/50 backdrop-blur" data-testid="select-language">
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
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/30"
                  onClick={handleFileUpload}
                  disabled={isProcessing}
                  data-testid="button-upload-file"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Upload Audio'}
                </Button>

                {transcript && (
                  <Button
                    variant="ghost"
                    onClick={clearTranscript}
                    data-testid="button-clear-transcript"
                    className="hover:bg-muted/50"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <div className={`h-3 w-3 rounded-full ${isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-sm font-medium">
                  {isProcessing ? 'Processing audio...' : 'Ready to upload audio file'}
                </span>
              </div>

              {/* Transcript Output */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Transcript</label>
                <Textarea
                  value={transcript}
                  placeholder="Your transcribed text will appear here with timestamps and speaker identification..."
                  className="min-h-40 resize-none bg-background/50 backdrop-blur border-border/50 focus:border-blue-500/50 transition-colors"
                  readOnly
                  data-testid="textarea-transcript"
                />
              </div>

              {/* Features showcase */}
              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border/50">
                <div className="text-center p-6 bg-white hover:bg-hover rounded-2xl border border-border hover:border-primary/40 transition-all duration-300">
                  <div className="text-4xl font-bold text-primary">99.2%</div>
                  <div className="text-sm text-muted-foreground mt-2">Accuracy Rate</div>
                </div>
                <div className="text-center p-6 bg-white hover:bg-hover rounded-2xl border border-border hover:border-primary/40 transition-all duration-300">
                  <div className="text-4xl font-bold text-accent">285ms</div>
                  <div className="text-sm text-muted-foreground mt-2">Avg Latency</div>
                </div>
                <div className="text-center p-6 bg-white hover:bg-hover rounded-2xl border border-border hover:border-primary/40 transition-all duration-300">
                  <div className="text-4xl font-bold text-chart-3">36+</div>
                  <div className="text-sm text-muted-foreground mt-2">Languages</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}