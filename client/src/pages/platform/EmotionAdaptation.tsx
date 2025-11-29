import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Play, Save, RefreshCw, Mic } from "lucide-react";
import { useState } from "react";

export default function EmotionAdaptation() {
    const [intensity, setIntensity] = useState([50]);
    const [pitch, setPitch] = useState([50]);
    const [speed, setSpeed] = useState([50]);

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Emotion Adaptation</h1>
                    <p className="text-muted-foreground">
                        Fine-tune the emotional delivery of your custom voices
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-primary" />
                                    Emotional Parameters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Emotional Intensity</Label>
                                        <Badge variant="outline">{intensity}%</Badge>
                                    </div>
                                    <Slider
                                        value={intensity}
                                        onValueChange={setIntensity}
                                        max={100}
                                        step={1}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Controls how strongly the emotion is expressed
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Pitch Variance</Label>
                                        <Badge variant="outline">{pitch}%</Badge>
                                    </div>
                                    <Slider
                                        value={pitch}
                                        onValueChange={setPitch}
                                        max={100}
                                        step={1}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Adjusts the dynamic range of the voice pitch
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Speaking Rate</Label>
                                        <Badge variant="outline">{speed}%</Badge>
                                    </div>
                                    <Slider
                                        value={speed}
                                        onValueChange={setSpeed}
                                        max={100}
                                        step={1}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Modifies the speed of speech delivery
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Test Phrase</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-muted rounded-lg italic text-muted-foreground">
                                    "I can't believe we finally made it to the summit! The view is absolutely breathtaking."
                                </div>
                                <div className="flex gap-2">
                                    <Button className="w-full">
                                        <Play className="h-4 w-4 mr-2" />
                                        Preview Emotion
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Presets</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Happy", "Sad", "Angry", "Excited", "Whisper", "Shout"].map((emotion) => (
                                        <Button key={emotion} variant="outline" className="justify-start">
                                            {emotion}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Mic className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Voice Cloning</h3>
                                        <p className="text-xs text-muted-foreground">Capture your own emotional range</p>
                                    </div>
                                </div>
                                <Button className="w-full" variant="secondary">
                                    Go to Voice Studio
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
