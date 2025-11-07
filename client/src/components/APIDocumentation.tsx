import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Copy, Play, Book, Zap } from "lucide-react";
import { useState } from "react";

const codeExamples = {
  javascript: {
    stt: `// Batch Speech-to-Text with File Upload
async function transcribeAudio(audioFile) {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('config', JSON.stringify({
    language: 'en-US',
    enableDiarization: true,
    customVocabulary: ['Convin', 'API']
  }));

  const response = await fetch('https://api.convin.ai/v1/stt/transcribe', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  });

  const result = await response.json();
  console.log('Transcript:', result.transcript);
  console.log('Segments:', result.segments);
  return result;
}

// Usage
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  transcribeAudio(file);
});`,
    tts: `// Text-to-Speech API
async function generateSpeech(text, voice = 'sarah-neural') {
  const response = await fetch('https://api.convin.ai/v1/tts/synthesize', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      voice: voice,
      outputFormat: 'mp3',
      sampleRate: 24000,
      speed: 1.0
    })
  });
  
  const audioBlob = await response.blob();
  const audio = new Audio(URL.createObjectURL(audioBlob));
  audio.play();
}`
  },
  python: {
    stt: `# Batch Speech-to-Text with File Upload
import requests
import json

def transcribe_audio(audio_file_path):
    url = "https://api.convin.ai/v1/stt/transcribe"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    # Prepare the multipart request
    files = {
        'audio': open(audio_file_path, 'rb')
    }
    
    config = {
        "language": "en-US",
        "enableDiarization": True,
        "customVocabulary": ["Convin", "API"]
    }
    
    data = {
        'config': json.dumps(config)
    }
    
    # Send request
    response = requests.post(url, headers=headers, files=files, data=data)
    
    if response.status_code == 200:
        result = response.json()
        print(f"Transcript: {result['transcript']}")
        
        # Print speaker segments
        for segment in result['segments']:
            print(f"[{segment['startTime']}-{segment['endTime']}] "
                  f"{segment['speaker']}: {segment['text']}")
        
        return result
    else:
        print(f"Error: {response.status_code}")
        return None

# Usage
transcribe_audio("path/to/audio.wav")`,
    tts: `# Text-to-Speech with Python
import requests
import io
import pygame

def generate_speech(text, voice="sarah-neural"):
    url = "https://api.convin.ai/v1/tts/synthesize"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    
    payload = {
        "text": text,
        "voice": voice,
        "outputFormat": "mp3",
        "sampleRate": 24000,
        "speed": 1.0
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        # Play audio
        pygame.mixer.init()
        audio_data = io.BytesIO(response.content)
        pygame.mixer.music.load(audio_data)
        pygame.mixer.music.play()
        
        return response.content
    else:
        print(f"Error: {response.status_code}")`
  },
  curl: {
    stt: `# Batch Speech-to-Text
curl -X POST https://api.convin.ai/v1/stt/transcribe \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio=@audio.wav" \\
  -F "config={
    \\"language\\": \\"en-US\\",
    \\"enableDiarization\\": true,
    \\"customVocabulary\\": [\\"Convin\\", \\"API\\"]
  }"
  
# Response:
{
  "transcript": "Welcome to the Convin API demonstration...",
  "segments": [
    {
      "speaker": "Speaker_1",
      "startTime": 0.0,
      "endTime": 2.5,
      "text": "Welcome to the Convin API",
      "confidence": 0.98
    }
  ],
  "processingTime": 1.2
}`,
    tts: `# Text-to-Speech
curl -X POST https://api.convin.ai/v1/tts/synthesize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Transform your applications with voice AI",
    "voice": "sarah-neural",
    "outputFormat": "mp3",
    "sampleRate": 24000,
    "speed": 1.0,
    "ssml": false
  }' \\
  --output speech.mp3
  
# Advanced SSML example
curl -X POST https://api.convin.ai/v1/tts/synthesize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "<speak><prosody rate=\\"slow\\">Hello</prosody> <break time=\\"1s\\"/> <emphasis level=\\"strong\\">world!</emphasis></speak>",
    "voice": "john-neural",
    "outputFormat": "wav",
    "ssml": true
  }'`
  }
};

export default function APIDocumentation() {
  const [selectedExample, setSelectedExample] = useState('stt');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    console.log('Code copied to clipboard');
  };

  const runExample = () => {
    console.log('Running example in playground');
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/10 via-background to-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 lg:mb-20 space-y-6">
          <Badge className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-500/20">
            <Book className="h-3 w-3 mr-1" />
            API Documentation
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Minutes
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive documentation with code examples, SDKs, and interactive playground to help you integrate voice AI quickly.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-6 lg:p-10 bg-white hover:bg-hover backdrop-blur-sm border border-border hover:border-primary/40 shadow-xl transition-all duration-300">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Code2 className="h-6 w-6 text-purple-500" />
                </div>
                Code Examples & Integration Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedExample} onValueChange={setSelectedExample} className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 p-1.5 bg-muted/50 rounded-xl">
                  <TabsTrigger 
                    value="stt" 
                    data-testid="tab-stt"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                  >
                    Speech-to-Text
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tts" 
                    data-testid="tab-tts"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                  >
                    Text-to-Speech
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-2">
                  {Object.keys(codeExamples).map((lang) => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                      data-testid={`button-lang-${lang}`}
                      className={selectedLanguage === lang ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600" : ""}
                    >
                      {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
                    </Button>
                  ))}
                </div>

                <TabsContent value="stt" className="space-y-6">
                  <div className="relative">
                    <pre className="bg-card border rounded-lg p-6 overflow-x-auto text-sm">
                      <code className="font-mono">
                        {codeExamples[selectedLanguage as keyof typeof codeExamples]?.stt}
                      </code>
                    </pre>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyCode(codeExamples[selectedLanguage as keyof typeof codeExamples]?.stt)}
                        data-testid="button-copy-stt"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={runExample}
                        data-testid="button-run-stt"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tts" className="space-y-6">
                  <div className="relative">
                    <pre className="bg-card border rounded-lg p-6 overflow-x-auto text-sm">
                      <code className="font-mono">
                        {codeExamples[selectedLanguage as keyof typeof codeExamples]?.tts}
                      </code>
                    </pre>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyCode(codeExamples[selectedLanguage as keyof typeof codeExamples]?.tts)}
                        data-testid="button-copy-tts"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={runExample}
                        data-testid="button-run-tts"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Quick Start Links */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
                <Card className="group hover:shadow-xl hover:-translate-y-1 hover:bg-hover transition-all duration-300 bg-white border border-border hover:border-primary/40" data-testid="card-quickstart">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      Quick Start
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Get your API key and make your first request in under 5 minutes.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      data-testid="button-view-quickstart"
                      className="hover:bg-hover hover:border-primary/50"
                    >
                      View Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl hover:-translate-y-1 hover:bg-hover transition-all duration-300 bg-white border border-border hover:border-primary/40" data-testid="card-sdks">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <Code2 className="h-5 w-5 text-primary" />
                      </div>
                      SDKs & Libraries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Official SDKs for Python, JavaScript, Go, and more languages.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      data-testid="button-download-sdks"
                      className="hover:bg-hover hover:border-primary/50"
                    >
                      Download SDKs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl hover:-translate-y-1 hover:bg-hover transition-all duration-300 bg-white border border-border hover:border-primary/40" data-testid="card-playground">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <Play className="h-5 w-5 text-primary" />
                      </div>
                      API Playground
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Test API endpoints interactively with our web-based playground.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      data-testid="button-open-playground"
                      className="hover:bg-hover hover:border-primary/50"
                    >
                      Open Playground
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}