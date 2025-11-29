import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    FileText,
    Code,
    Shield,
    ExternalLink,
    Video,
    MessageSquare,
    Github,
    Play,
    ArrowLeft
} from "lucide-react";
import { useRoute, Link } from "wouter";

export default function Resources() {
    const [match, params] = useRoute("/platform/resources/:tab?");
    const activeTab = params?.tab;

    const resources = [
        {
            title: "Documentation",
            description: "Comprehensive guides and API references for developers.",
            icon: BookOpen,
            link: "/docs",
            type: "internal"
        },
        {
            title: "API Reference",
            description: "Detailed endpoints, parameters, and response formats.",
            icon: Code,
            link: "/docs#api-reference",
            type: "internal"
        },
        {
            title: "Ethical Guidelines",
            description: "Best practices for responsible AI voice usage.",
            icon: Shield,
            link: "/platform/resources/ethics",
            type: "internal"
        },
        {
            title: "SDKs & Libraries",
            description: "Official client libraries for Python, Node.js, and Go.",
            icon: Github,
            link: "https://github.com/convin-ai",
            type: "external"
        }
    ];

    const tutorials = [
        {
            title: "Getting Started with STT",
            duration: "5 min read",
            category: "Guide"
        },
        {
            title: "Building a Voice Bot",
            duration: "15 min read",
            category: "Tutorial"
        },
        {
            title: "Custom Voice Cloning Best Practices",
            duration: "10 min read",
            category: "Best Practices"
        }
    ];

    if (activeTab === "ethics") {
        return (
            <DashboardLayout>
                <div className="p-8">
                    <div className="mb-8">
                        <Link href="/platform/resources">
                            <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Resources
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold mb-2">Ethical Guidelines</h1>
                        <p className="text-muted-foreground">
                            Best practices for responsible AI voice usage
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Responsible AI Principles</CardTitle>
                            <CardDescription>
                                At Convin Voice AI, we are committed to the ethical development and deployment of AI technologies.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">1. Consent and Transparency</h3>
                                <p className="text-sm text-muted-foreground">
                                    Users must always be informed when they are interacting with an AI voice. When using voice cloning, you must have explicit consent from the voice owner.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">2. Prevention of Harm</h3>
                                <p className="text-sm text-muted-foreground">
                                    Our platform must not be used to generate content that promotes hate speech, discrimination, harassment, or violence.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">3. Data Privacy</h3>
                                <p className="text-sm text-muted-foreground">
                                    We protect user data and voice samples with enterprise-grade security. We do not use your private voice data to train our base models without permission.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Resources & Support</h1>
                    <p className="text-muted-foreground">
                        Everything you need to build with Convin Voice API
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {resources.map((resource, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <resource.icon className="h-8 w-8 text-primary mb-2" />
                                <CardTitle className="text-lg">{resource.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {resource.description}
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={resource.link} target={resource.type === "external" ? "_blank" : "_self"}>
                                        {resource.type === "external" ? (
                                            <>
                                                View on GitHub <ExternalLink className="h-4 w-4 ml-2" />
                                            </>
                                        ) : (
                                            "Read More"
                                        )}
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Latest Tutorials
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {tutorials.map((tutorial, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-primary/10 rounded">
                                                    <FileText className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{tutorial.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{tutorial.duration}</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary">{tutorial.category}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-primary text-primary-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Need Help?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm opacity-90">
                                    Our support team is available 24/7 to help you with any integration issues.
                                </p>
                                <Button variant="secondary" className="w-full">
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video className="h-5 w-5 text-primary" />
                                    Video Guides
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                                    <Play className="h-12 w-12 text-muted-foreground" />
                                </div>
                                <p className="mt-2 text-sm font-medium text-center">
                                    Platform Overview (2:30)
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
