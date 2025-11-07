import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Mic,
  Volume2,
  Users,
  Globe,
  Heart,
  Download,
  Calendar
} from "lucide-react";

export default function Analytics() {
  const kpiData = [
    {
      title: "Total Audio Hours",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Clock,
      color: "text-blue-500"
    },
    {
      title: "Avg Latency",
      value: "245ms",
      change: "-5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Word Error Rate",
      value: "2.4%",
      change: "-0.8%",
      trend: "up",
      icon: BarChart3,
      color: "text-primary"
    },
    {
      title: "Emotion Accuracy",
      value: "94.7%",
      change: "+3.1%",
      trend: "up",
      icon: Heart,
      color: "text-pink-500"
    },
    {
      title: "Voices Created",
      value: "47",
      change: "+8",
      trend: "up",
      icon: Volume2,
      color: "text-purple-500"
    },
    {
      title: "Active Users",
      value: "2,341",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-orange-500"
    }
  ];

  const topVoices = [
    { name: "Sarah - Professional", usage: 1247, emotion: "Neutral", category: "Customer Support" },
    { name: "Alex - Empathetic", usage: 982, emotion: "Empathetic", category: "Customer Support" },
    { name: "Marcus - Energetic", usage: 756, emotion: "Energetic", category: "Marketing" },
    { name: "Emma - Friendly", usage: 634, emotion: "Friendly", category: "Customer Support" },
    { name: "David - Assertive", usage: 521, emotion: "Assertive", category: "Marketing" }
  ];

  const languageDistribution = [
    { language: "English (US)", percentage: 45, color: "bg-blue-500" },
    { language: "Hindi", percentage: 25, color: "bg-green-500" },
    { language: "Spanish", percentage: 15, color: "bg-yellow-500" },
    { language: "French", percentage: 10, color: "bg-purple-500" },
    { language: "German", percentage: 5, color: "bg-pink-500" }
  ];

  const emotionUsage = [
    { emotion: "Neutral", count: 3240, percentage: 35 },
    { emotion: "Empathetic", count: 2786, percentage: 30 },
    { emotion: "Energetic", count: 1858, percentage: 20 },
    { emotion: "Friendly", count: 1021, percentage: 11 },
    { emotion: "Assertive", count: 372, percentage: 4 }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
            <p className="text-muted-foreground">
              Track voice quality, usage patterns, and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                    <h3 className="text-3xl font-bold mb-2">{kpi.value}</h3>
                    <div className="flex items-center gap-1">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        kpi.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${kpi.color}`}>
                    <kpi.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Voice Usage by Emotion - Pie Chart Representation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Voice Usage by Emotion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emotionUsage.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.emotion}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{item.count} uses</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Language Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Language Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languageDistribution.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.language}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STT Latency Trend - Line Chart Representation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              STT Latency Trend (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[280, 265, 270, 245, 240, 238, 242, 235, 245, 240, 235, 230, 245, 240].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-chart-2 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(value / 300) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {index % 3 === 0 ? `D${index + 1}` : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Day 1</span>
              <span>Day 30</span>
            </div>
          </CardContent>
        </Card>

        {/* Top Voices Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              Top Performing Voices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">Voice Name</th>
                    <th className="text-left p-4 font-semibold">Category</th>
                    <th className="text-left p-4 font-semibold">Emotion</th>
                    <th className="text-right p-4 font-semibold">Usage Count</th>
                    <th className="text-right p-4 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topVoices.map((voice, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            #{index + 1}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4 font-medium">{voice.name}</td>
                      <td className="p-4">
                        <Badge variant="outline">{voice.category}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">
                          <Heart className="h-3 w-3 mr-1" />
                          {voice.emotion}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-medium">{voice.usage.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-500">+{Math.floor(Math.random() * 20 + 5)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

