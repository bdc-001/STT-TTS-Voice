import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Library,
  Wand2,
  Copy,
  Sparkles,
  Heart,
  Briefcase,
  TrendingUp,
  Globe,
  Download,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { tts } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Voice {
  id: string;
  name: string;
  description: string;
  category: string;
  emotion: string;
  image: string;
  isFavorite?: boolean;
  isCustom?: boolean;
}

export default function VoiceLibrary() {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Voices");
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await tts.getVoices();
        if (response.data.success) {
          const apiVoices = response.data.data.map((v: any) => ({
            id: v.id,
            name: v.name,
            description: v.description,
            category: v.gender === "Female" ? "Customer Support" : "Marketing", // Simple mapping
            emotion: "Professional", // Default
            image: v.gender === "Female"
              ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop"
              : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop",
            isFavorite: false
          }));
          setVoices(apiVoices);
        }
      } catch (error) {
        console.error("Failed to fetch voices:", error);
        toast({
          title: "Error",
          description: "Failed to load voices",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const filteredVoices = selectedCategory === "All Voices"
    ? voices
    : voices.filter(v =>
      v.category === selectedCategory ||
      (selectedCategory === "Empathy Voices" && v.emotion.includes("Empathetic"))
    );

  const togglePlay = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate auto-stop after 3 seconds
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Library</h1>
          <p className="text-muted-foreground">
            Explore our collection of professional voices or create your own custom voice
          </p>
        </div>

        {/* CTA Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                  <Library className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Explore Voice Library</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Browse pre-built professional voices
                  </p>
                  <Button size="sm" variant="outline">
                    Explore Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Design a Custom Voice</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create a unique voice with AI prompts
                  </p>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-chart-2">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Design Voice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10">
                  <Copy className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Clone a Voice</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload audio sample to clone any voice
                  </p>
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Clone Voice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="All Voices" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              <span className="hidden sm:inline">All Voices</span>
              <Badge variant="secondary" className="ml-1">{voices.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Customer Support" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Customer Support</span>
              <Badge variant="secondary" className="ml-1">{voices.filter(v => v.category === "Customer Support").length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Marketing" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Marketing</span>
              <Badge variant="secondary" className="ml-1">{voices.filter(v => v.category === "Marketing").length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Regional" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Regional</span>
              <Badge variant="secondary" className="ml-1">{voices.filter(v => v.category === "Regional").length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Empathy Voices" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Empathy Voices</span>
              <Badge variant="secondary" className="ml-1">{voices.filter(v => v.emotion.includes("Empathetic")).length}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Voice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVoices.map((voice) => (
            <Card key={voice.id} className="overflow-hidden hover:shadow-xl transition-all group">
              {/* Voice Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={voice.image}
                  alt={voice.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => togglePlay(voice.id)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                    {playingVoice === voice.id ? (
                      <Pause className="h-8 w-8 text-primary" />
                    ) : (
                      <Play className="h-8 w-8 text-primary ml-1" />
                    )}
                  </div>
                </button>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {voice.isFavorite && (
                    <Badge className="bg-yellow-500">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {voice.isCustom && (
                    <Badge className="bg-purple-500">Custom</Badge>
                  )}
                </div>

                {/* Voice Name */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg">{voice.name}</h3>
                </div>
              </div>

              {/* Voice Details */}
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {voice.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge variant="outline" className="mr-2">
                      {voice.category}
                    </Badge>
                    <Badge variant="secondary">
                      <Heart className="h-3 w-3 mr-1" />
                      {voice.emotion}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Use Voice
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no voices match filter) */}
        {filteredVoices.length === 0 && (
          <div className="text-center py-16">
            <Library className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Voices Found</h3>
            <p className="text-muted-foreground mb-6">
              Try selecting a different category or create your own custom voice
            </p>
            <Button className="bg-gradient-to-r from-primary to-chart-2">
              <Wand2 className="h-4 w-4 mr-2" />
              Create Custom Voice
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

