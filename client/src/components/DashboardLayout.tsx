import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home,
  Mic,
  Volume2,
  Heart,
  BarChart3,
  Shield,
  Settings,
  Search,
  BookOpen,
  ChevronDown,
  User,
  Bell,
  LogOut,
  Sparkles,
  Library,
  Wand2,
  Activity,
  FileAudio,
  Key,
  CreditCard,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  label: string;
  icon: any;
  path: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    icon: Home,
    path: "/platform"
  },
  {
    label: "Voices",
    icon: Volume2,
    path: "/platform/voices",
    children: [
      { label: "Library", icon: Library, path: "/platform/voices/library" },
      { label: "Voice Studio", icon: Wand2, path: "/platform/voices/studio" },
      { label: "Emotion Adaptation", icon: Heart, path: "/platform/voices/emotion" }
    ]
  },
  {
    label: "Text-to-Speech",
    icon: Volume2,
    path: "/platform/tts",
    children: [
      { label: "Playground", icon: Sparkles, path: "/platform/tts/playground" },
      { label: "Projects", icon: FileAudio, path: "/platform/tts/projects" }
    ]
  },
  {
    label: "Speech-to-Text",
    icon: Mic,
    path: "/platform/stt",
    children: [
      { label: "Playground", icon: Sparkles, path: "/platform/stt/playground" },
      { label: "Transcripts", icon: FileAudio, path: "/platform/stt/transcripts" },
      { label: "Reports", icon: BarChart3, path: "/platform/stt/reports" }
    ]
  },
  {
    label: "Speech-to-Speech",
    icon: Activity,
    path: "/platform/sts",
    children: [
      { label: "Emotion Transfer", icon: Heart, path: "/platform/sts/emotion" },
      { label: "Accent Normalization", icon: Mic, path: "/platform/sts/accent" }
    ]
  },
  {
    label: "Analytics & Insights",
    icon: BarChart3,
    path: "/platform/analytics"
  },
  {
    label: "Compliance & Consent",
    icon: Shield,
    path: "/platform/compliance"
  },
  {
    label: "Platform",
    icon: Settings,
    path: "/platform/settings",
    children: [
      { label: "API Keys", icon: Key, path: "/platform/settings/api-keys" },
      { label: "Usage", icon: Activity, path: "/platform/settings/usage" },
      { label: "Billing", icon: CreditCard, path: "/platform/settings/billing" }
    ]
  },
  {
    label: "Resources",
    icon: BookOpen,
    path: "/platform/resources",
    children: [
      { label: "Documentation", icon: BookOpen, path: "/platform/resources/docs" },
      { label: "Ethical Guidelines", icon: Shield, path: "/platform/resources/ethics" }
    ]
  }
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => {
    return location === path || location.startsWith(path + "/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Navigation Bar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/platform">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-chart-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Convin Voice</h1>
                <p className="text-xs text-muted-foreground">Intelligence Platform</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-hover transition-colors ${
                        isActive(item.path) ? "bg-hover" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedItems.includes(item.label) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedItems.includes(item.label) && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <Link href={child.path}>
                              <a
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-hover transition-colors ${
                                  isActive(child.path) ? "bg-hover font-medium" : ""
                                }`}
                              >
                                <child.icon className="h-4 w-4" />
                                <span>{child.label}</span>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.path}>
                    <a
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-hover transition-colors ${
                        isActive(item.path) ? "bg-hover font-medium" : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & Support
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Toolbar */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search voices, transcripts, campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button className="bg-gradient-to-r from-primary to-chart-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Build Voice
              </Button>

              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@convin.ai</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}

