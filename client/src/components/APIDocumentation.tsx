import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Copy, Play, Book, Zap } from "lucide-react";
import { useState } from "react";

const codeExamples = {
  javascript: {
    stt: `// Real-time Speech-to-Text
const ws = new WebSocket('wss://api.convin.ai/v1/stt/stream');
ws.onopen = () => {
  ws.send(JSON.stringify({
    config: {
      language: 'en-US',
      sampleRate: 16000,
      enableDiarization: true
    }
  }));
};

// Send audio chunks
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(event.data);
      }
    };
    recorder.start(100); // Send chunks every 100ms
  });

// Handle transcripts
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Transcript:', data.transcript);
  console.log('Speaker:', data.speaker);
};`,
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
    stt: `# Real-time Speech-to-Text with Python
import asyncio
import websockets
import json
import pyaudio

async def stream_audio():
    uri = "wss://api.convin.ai/v1/stt/stream"
    headers = {"Authorization": "Bearer YOUR_API_KEY"}
    
    async with websockets.connect(uri, extra_headers=headers) as websocket:
        # Send configuration
        config = {
            "config": {
                "language": "en-US",
                "sampleRate": 16000,
                "enableDiarization": True
            }
        }
        await websocket.send(json.dumps(config))
        
        # Setup audio stream
        audio = pyaudio.PyAudio()
        stream = audio.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=16000,
            input=True,
            frames_per_buffer=1024
        )
        
        while True:
            data = stream.read(1024)
            await websocket.send(data)
            
            response = await websocket.recv()
            result = json.loads(response)
            print(f"Transcript: {result['transcript']}")`,
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
  -F "audio=@recording.wav" \\
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">
            <Book className="h-3 w-3 mr-1" />
            API Documentation
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Minutes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive documentation with code examples, SDKs, and interactive playground to help you integrate voice AI quickly.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Code Examples & Integration Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedExample} onValueChange={setSelectedExample} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stt" data-testid="tab-stt">Speech-to-Text</TabsTrigger>
                  <TabsTrigger value="tts" data-testid="tab-tts">Text-to-Speech</TabsTrigger>
                </TabsList>

                <div className="flex gap-2 mb-4">
                  {Object.keys(codeExamples).map((lang) => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                      data-testid={`button-lang-${lang}`}
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
              <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
                <Card className="hover-elevate" data-testid="card-quickstart">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Quick Start
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get your API key and make your first request in under 5 minutes.
                    </p>
                    <Button variant="outline" size="sm" data-testid="button-view-quickstart">
                      View Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate" data-testid="card-sdks">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-chart-2" />
                      SDKs & Libraries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Official SDKs for Python, JavaScript, Go, and more languages.
                    </p>
                    <Button variant="outline" size="sm" data-testid="button-download-sdks">
                      Download SDKs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate" data-testid="card-playground">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Play className="h-4 w-4 text-green-500" />
                      API Playground
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Test API endpoints interactively with our web-based playground.
                    </p>
                    <Button variant="outline" size="sm" data-testid="button-open-playground">
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