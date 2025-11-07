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
import { useState } from "react";

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

const voices: Voice[] = [
  {
    id: "1",
    name: "Sarah - Professional",
    description: "Clear, professional voice ideal for customer support and business communications",
    category: "Customer Support",
    emotion: "Neutral, Professional",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop",
    isFavorite: true
  },
  {
    id: "2",
    name: "Alex - Empathetic",
    description: "Warm and understanding tone perfect for sensitive customer interactions",
    category: "Customer Support",
    emotion: "Empathetic, Caring",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=225&fit=crop"
  },
  {
    id: "3",
    name: "Marcus - Energetic",
    description: "Dynamic and enthusiastic voice for marketing and promotional content",
    category: "Marketing",
    emotion: "Energetic, Confident",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=225&fit=crop"
  },
  {
    id: "4",
    name: "Emma - Friendly",
    description: "Approachable and friendly tone for general interactions",
    category: "Customer Support",
    emotion: "Friendly, Warm",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=225&fit=crop"
  },
  {
    id: "5",
    name: "David - Assertive",
    description: "Confident and direct voice for sales and business development",
    category: "Marketing",
    emotion: "Assertive, Direct",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop"
  },
  {
    id: "6",
    name: "Priya - Regional (Hindi)",
    description: "Native Hindi speaker with professional clarity",
    category: "Regional",
    emotion: "Professional, Clear",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=225&fit=crop"
  }
];

const categories = [
  { name: "All Voices", icon: Library, count: voices.length },
  { name: "Customer Support", icon: Heart, count: voices.filter(v => v.category === "Customer Support").length },
  { name: "Marketing", icon: TrendingUp, count: voices.filter(v => v.category === "Marketing").length },
  { name: "Regional", icon: Globe, count: voices.filter(v => v.category === "Regional").length },
  { name: "Empathy Voices", icon: Heart, count: voices.filter(v => v.emotion.includes("Empathetic")).length }
];

export default function VoiceLibrary() {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Voices");

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
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <Badge variant="secondary" className="ml-1">{category.count}</Badge>
              </TabsTrigger>
            ))}
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

