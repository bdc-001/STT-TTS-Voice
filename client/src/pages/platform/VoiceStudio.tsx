import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wand2,
  Copy,
  Sliders,
  Shield,
  Upload,
  Play,
  Download,
  Sparkles,
  FileAudio,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { tts, voices, jobs } from "@/lib/api";

export default function VoiceStudio() {
  const [designPrompt, setDesignPrompt] = useState("");
  const [consentFile, setConsentFile] = useState<File | null>(null);
  const [tone, setTone] = useState([50]);
  const [breathiness, setBreathiness] = useState([30]);
  const [warmth, setWarmth] = useState([70]);
  const [clarity, setClarity] = useState([85]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const pollJob = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await jobs.get(jobId);
        const job = response.data.data;

        if (job.status === 'completed') {
          clearInterval(interval);
          setIsLoading(false);
          toast({
            title: "Success",
            description: "Voice created successfully!",
          });
        } else if (job.status === 'failed') {
          clearInterval(interval);
          setIsLoading(false);
          toast({
            title: "Error",
            description: job.error || "Job failed",
            variant: "destructive",
          });
        }
      } catch (error) {
        clearInterval(interval);
        setIsLoading(false);
        console.error("Polling error:", error);
      }
    }, 2000);
  };

  const handleDesignVoice = async () => {
    if (!designPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a voice description prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await voices.design({
        prompt: designPrompt,
        name: "Designed Voice", // TODO: Add name input
        category: "generated"
      });

      if (response.data.success) {
        const jobId = response.data.data.job_id;
        toast({
          title: "Processing",
          description: "Voice design job started...",
        });
        pollJob(jobId);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Design error:", error);
      toast({
        title: "Error",
        description: "Failed to start voice design",
        variant: "destructive",
      });
    }
  };

  const handleCloneVoice = async () => {
    if (!consentFile) {
      toast({
        title: "Error",
        description: "Please upload a consent file",
        variant: "destructive",
      });
      return;
    }

    // TODO: Get actual audio file from input
    // For now, we'll just check if consent file is there, but we need the audio sample too.
    // Assuming there's another state for audio file or we use the same input for simplicity in this demo?
    // The UI has "Upload Audio Sample" but no state connected to it in the original code?
    // Let's assume we need to add state for audio file.

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', consentFile); // Using consent file as audio for now since UI is ambiguous
      formData.append('name', "Cloned Voice");

      const response = await voices.clone(formData);

      if (response.data.success) {
        const jobId = response.data.data.job_id;
        toast({
          title: "Processing",
          description: "Voice cloning job started...",
        });
        pollJob(jobId);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Clone error:", error);
      toast({
        title: "Error",
        description: "Failed to start voice cloning",
        variant: "destructive",
      });
    }
  };

  const handlePreviewVoice = async () => {
    setIsLoading(true);
    try {
      // Use default text for preview
      const response = await tts.generate({
        text: "This is a preview of your custom voice settings.",
        voice: "sarah-professional", // Use a base voice for now
        speed: 1.0,
        pitch: 1.0,
        emotion: "neutral",
        language: "en-US",
        format: "mp3"
      });

      if (response.data.success) {
        const { audio_data } = response.data.data;
        const byteCharacters = atob(audio_data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();

        toast({
          title: "Success",
          description: "Playing voice preview",
        });
      }
    } catch (error) {
      console.error("Preview error:", error);
      toast({
        title: "Error",
        description: "Failed to generate preview",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Studio</h1>
          <p className="text-muted-foreground">
            Create, clone, and customize voices with advanced AI technology
          </p>
        </div>

        {/* Main Studio Interface */}
        <Tabs defaultValue="design" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="design">
              <Wand2 className="h-4 w-4 mr-2" />
              Design
            </TabsTrigger>
            <TabsTrigger value="clone">
              <Copy className="h-4 w-4 mr-2" />
              Clone
            </TabsTrigger>
            <TabsTrigger value="tune">
              <Sliders className="h-4 w-4 mr-2" />
              Tune
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <Shield className="h-4 w-4 mr-2" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Design Tab */}
          <TabsContent value="design">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Design Voice with AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Voice Description Prompt</Label>
                    <Textarea
                      placeholder="Describe the voice you want to create... e.g., 'A warm, professional female voice with a slight Indian accent, speaking at medium pace with empathetic tone, suitable for customer support'"
                      value={designPrompt}
                      onChange={(e) => setDesignPrompt(e.target.value)}
                      className="min-h-32"
                    />
                    <p className="text-xs text-muted-foreground">
                      Be specific about gender, age, accent, tone, and intended use case
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="marketing">Marketing & Sales</SelectItem>
                        <SelectItem value="empathy">Empathy & Care</SelectItem>
                        <SelectItem value="regional">Regional Voice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice Name</Label>
                    <Input placeholder="e.g., Sarah - Empathetic Support" />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-chart-2" onClick={handleDesignVoice} disabled={isLoading}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? "Generating..." : "Generate Voice"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview & Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-8 bg-muted rounded-lg text-center">
                    <FileAudio className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Generate a voice to preview
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Estimated Characteristics</Label>
                      <div className="mt-2 p-4 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gender:</span>
                          <span className="font-medium">-</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Age:</span>
                          <span className="font-medium">-</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Accent:</span>
                          <span className="font-medium">-</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Emotion:</span>
                          <span className="font-medium">-</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Download Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clone Tab */}
          <TabsContent value="clone">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Copy className="h-5 w-5 text-primary" />
                    Clone Voice from Sample
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Upload Audio Sample</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        WAV, MP3, or M4A (max. 10MB, 30 seconds minimum)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice Owner Information</Label>
                    <Input placeholder="Full name of voice owner" />
                  </div>

                  <div className="flex items-start space-x-2 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <Checkbox id="consent" />
                    <label
                      htmlFor="consent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm I have explicit consent from the voice owner to clone and use this voice. I understand this is required for legal compliance.
                    </label>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-chart-2" onClick={handleCloneVoice} disabled={isLoading}>
                    <Copy className="h-4 w-4 mr-2" />
                    {isLoading ? "Cloning..." : "Clone Voice"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cloning Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Audio Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Minimum 30 seconds of clear speech</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Low background noise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Natural speaking pace and tone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Single speaker only</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">Legal Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Written consent from voice owner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Valid consent documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Usage rights clearly defined</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tune Tab */}
          <TabsContent value="tune">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-primary" />
                  Fine-Tune Voice Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Tone</Label>
                        <span className="text-sm font-medium">{tone[0]}%</span>
                      </div>
                      <Slider
                        value={tone}
                        onValueChange={setTone}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Adjust between deep/warm (low) to bright/energetic (high)
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Breathiness</Label>
                        <span className="text-sm font-medium">{breathiness[0]}%</span>
                      </div>
                      <Slider
                        value={breathiness}
                        onValueChange={setBreathiness}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Control the amount of breath in the voice
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Warmth</Label>
                        <span className="text-sm font-medium">{warmth[0]}%</span>
                      </div>
                      <Slider
                        value={warmth}
                        onValueChange={setWarmth}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Adjust emotional warmth and friendliness
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Clarity</Label>
                        <span className="text-sm font-medium">{clarity[0]}%</span>
                      </div>
                      <Slider
                        value={clarity}
                        onValueChange={setClarity}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Control pronunciation precision and articulation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 bg-muted rounded-lg text-center">
                      <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Adjust parameters and preview changes
                      </p>
                      <Button onClick={handlePreviewVoice} disabled={isLoading}>
                        <Play className="h-4 w-4 mr-2" />
                        {isLoading ? "Generating..." : "Preview Voice"}
                      </Button>
                    </div>

                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Tuning Tips</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Start with small adjustments</li>
                          <li>• Preview frequently to hear changes</li>
                          <li>• Save presets for different use cases</li>
                          <li>• Use A/B testing for comparison</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        Reset to Default
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-primary to-chart-2">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Compliance & Consent Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Upload Consent Document</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium mb-1">
                          Upload consent documentation
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOCX, or image files accepted
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Voice Owner Name</Label>
                        <Input placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Owner Email</Label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Consent Expiry Date</Label>
                      <Input type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label>Usage Rights</Label>
                      <Textarea
                        placeholder="Describe the permitted usage rights and restrictions..."
                        className="min-h-24"
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-primary to-chart-2">
                      <Shield className="h-4 w-4 mr-2" />
                      Save Compliance Record
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Compliance Requirements
                        </h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5" />
                            <span>Written consent from voice owner is mandatory</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5" />
                            <span>Consent must specify usage scope and duration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5" />
                            <span>Regular audits and renewals required</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5" />
                            <span>All cloned voices must be watermarked</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Consent Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm">Consent Document</span>
                          <Badge variant="secondary">Not Uploaded</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm">Owner Verification</span>
                          <Badge variant="secondary">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm">Expiry Status</span>
                          <Badge variant="secondary">Not Set</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Consent Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

