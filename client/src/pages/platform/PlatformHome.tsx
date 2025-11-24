import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Sparkles,
  Wand2,
  Upload,
  Library,
  Mic,
  Volume2,
  Heart,
  BarChart3,
  TrendingUp,
  Clock,
  ArrowRight,
  Play,
  FileAudio
} from "lucide-react";

export default function PlatformHome() {
  const recentActivity = [
    { type: "voice_created", title: "Created 'Sarah - Professional'", time: "2 hours ago", icon: Wand2 },
    { type: "stt_complete", title: "Transcribed meeting recording", time: "5 hours ago", icon: Mic },
    { type: "tts_generated", title: "Generated marketing audio", time: "1 day ago", icon: Volume2 },
    { type: "emotion_analyzed", title: "Analyzed customer calls", time: "2 days ago", icon: Heart }
  ];

  const quickStats = [
    { label: "Total Voices", value: "47", icon: Volume2, color: "text-purple-500" },
    { label: "Audio Hours", value: "1,247", icon: Clock, color: "text-blue-500" },
    { label: "Accuracy", value: "94.7%", icon: BarChart3, color: "text-green-500" },
    { label: "Avg Latency", value: "245ms", icon: TrendingUp, color: "text-orange-500" }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">John</span>
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your voice intelligence platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Link href="/platform/voices/studio">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                        <Wand2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Build Voice</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Create or clone a custom voice
                        </p>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-chart-2">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Start Building
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/platform/stt/playground">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Upload Audio</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Transcribe audio to text
                        </p>
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/platform/tts/playground">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                        <Volume2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Generate Speech</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Convert text to voice
                        </p>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/platform/voices/library">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                        <Library className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Voice Library</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Browse pre-built voices
                        </p>
                        <Button size="sm" variant="outline">
                          <Library className="h-4 w-4 mr-2" />
                          Explore
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Activity
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Modules */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/platform/analytics">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">Analytics & Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track performance metrics and usage patterns
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/platform/compliance">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <FileAudio className="h-8 w-8 text-green-500" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">Compliance Manager</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage voice consent and governance
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

