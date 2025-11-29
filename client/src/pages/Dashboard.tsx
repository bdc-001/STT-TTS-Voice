import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Mic,
  Volume2,
  Zap,
  Settings,
  Bell,
  User,
  CreditCard,
  Activity,
  TrendingUp,
  Clock,
  FileText,
  Play,
  Upload,
  Download,
  Copy,
  MoreHorizontal,
  Plus,
  Filter,
  Search
} from "lucide-react";
import { user } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [usageStats, setUsageStats] = useState({
    sttMinutes: 0,
    ttsCharacters: 0,
    apiCalls: 0,
    monthlyLimit: 10000
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usageRes, keysRes] = await Promise.all([
          user.getUsage(),
          user.getApiKeys()
        ]);

        if (usageRes.data.success) {
          const data = usageRes.data.data;
          setUsageStats({
            sttMinutes: data.total_stt_minutes || 0,
            ttsCharacters: data.total_tts_characters || 0,
            apiCalls: data.usage_count || 0,
            monthlyLimit: 10000 // Mock limit for now
          });

          // Map usage history to recent activity
          const activity = data.usage?.slice(0, 5).map((u: any) => ({
            id: u.id,
            type: u.type.toUpperCase(),
            description: u.type === 'stt' ? 'Transcribed audio' : 'Generated speech',
            time: new Date(u.created_at).toLocaleDateString(),
            status: 'completed' // Assuming success for now
          })) || [];
          setRecentActivity(activity);
        }

        if (keysRes.data.success) {
          setApiKeys(keysRes.data.data.map((k: any) => ({
            id: k.id,
            name: k.name,
            key: k.key,
            lastUsed: k.last_used_at ? new Date(k.last_used_at).toLocaleDateString() : "Never",
            status: k.is_active ? "active" : "inactive"
          })));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Silent fail for now or show toast
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-chart-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">Convin Voice AI</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here's what's happening with your voice AI projects.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">STT Minutes</CardTitle>
              <Mic className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.sttMinutes.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
              <p className="text-xs text-muted-foreground">Total processed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TTS Characters</CardTitle>
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.ttsCharacters.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.apiCalls.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usage Limit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((usageStats.apiCalls / usageStats.monthlyLimit) * 100)}%
              </div>
              <Progress value={(usageStats.apiCalls / usageStats.monthlyLimit) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Start using the API right away</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex-col space-y-2" variant="default">
                      <Upload className="h-6 w-6" />
                      <span>Upload for STT</span>
                    </Button>
                    <Button className="h-20 flex-col space-y-2" variant="outline">
                      <Volume2 className="h-6 w-6" />
                      <span>Generate TTS</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest API usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                    ) : (
                      recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                          <Badge variant={activity.status === 'completed' ? 'default' : 'destructive'}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Your API usage over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12" />
                  <span className="ml-2">Chart visualization would go here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playground" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Playground</CardTitle>
                <CardDescription>Test your API calls in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Speech-to-Text</h3>
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        variant="default"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Audio File
                      </Button>
                      <div className="bg-muted rounded-lg p-4 min-h-[100px]">
                        <p className="text-sm text-muted-foreground">
                          Upload an audio file to start transcribing
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Text-to-Speech</h3>
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-3 border rounded-lg resize-none"
                        placeholder="Enter text to convert to speech..."
                        rows={4}
                      />
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Generate Speech
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">API Keys</h3>
                <p className="text-sm text-muted-foreground">Manage your API keys and access</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Key
              </Button>
            </div>

            <div className="space-y-4">
              {apiKeys.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No API keys found</p>
              ) : (
                apiKeys.map((key) => (
                  <Card key={key.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{key.name}</h4>
                          <p className="text-sm text-muted-foreground font-mono">
                            {key.key.substring(0, 8)}...{key.key.substring(key.key.length - 4)}
                          </p>
                          <p className="text-xs text-muted-foreground">Last used: {key.lastUsed}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={key.status === 'active' ? 'default' : 'secondary'}>
                            {key.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Usage</CardTitle>
                <CardDescription>Manage your subscription and view usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Current Plan</h4>
                    <p className="text-2xl font-bold">Pro</p>
                    <p className="text-sm text-muted-foreground">$29/month</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Next Billing</h4>
                    <p className="text-2xl font-bold">Dec 15</p>
                    <p className="text-sm text-muted-foreground">Auto-renewal</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Usage This Month</h4>
                    <p className="text-2xl font-bold">
                      {Math.round((usageStats.apiCalls / usageStats.monthlyLimit) * 100)}%
                    </p>
                    <Progress value={(usageStats.apiCalls / usageStats.monthlyLimit) * 100} className="mt-2" />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment
                  </Button>
                  <Button variant="outline">
                    View Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}


