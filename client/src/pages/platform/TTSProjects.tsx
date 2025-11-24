import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    FileAudio,
    Search,
    Plus,
    MoreHorizontal,
    Play,
    Download,
    Trash2,
    Calendar,
    Clock
} from "lucide-react";
import { useState } from "react";

interface Project {
    id: string;
    name: string;
    voice: string;
    duration: string;
    format: string;
    created: string;
    status: "ready" | "processing" | "failed";
}

export default function TTSProjects() {
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data
    const projects: Project[] = [
        {
            id: "1",
            name: "Welcome Message - Marketing",
            voice: "Sarah - Professional",
            duration: "0:45",
            format: "MP3",
            created: "2024-03-15",
            status: "ready"
        },
        {
            id: "2",
            name: "Product Demo Narration",
            voice: "Alex - Empathetic",
            duration: "2:30",
            format: "WAV",
            created: "2024-03-14",
            status: "ready"
        },
        {
            id: "3",
            name: "IVR Menu Options",
            voice: "Emma - Friendly",
            duration: "1:15",
            format: "MP3",
            created: "2024-03-12",
            status: "ready"
        },
        {
            id: "4",
            name: "E-learning Module 1",
            voice: "Marcus - Energetic",
            duration: "5:20",
            format: "WAV",
            created: "2024-03-10",
            status: "processing"
        },
        {
            id: "5",
            name: "Podcast Intro",
            voice: "David - Assertive",
            duration: "0:30",
            format: "MP3",
            created: "2024-03-08",
            status: "failed"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ready": return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
            case "processing": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
            case "failed": return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
            default: return "bg-gray-500/10 text-gray-500";
        }
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">TTS Projects</h1>
                        <p className="text-muted-foreground">
                            Manage your generated audio files and projects
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-chart-2">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <FileAudio className="h-5 w-5 text-primary" />
                                All Projects
                            </CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Voice</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Format</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-muted">
                                                    <FileAudio className="h-4 w-4 text-primary" />
                                                </div>
                                                {project.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{project.voice}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {project.duration}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{project.format}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {project.created}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(project.status)} variant="secondary">
                                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="icon" variant="ghost" disabled={project.status !== "ready"}>
                                                    <Play className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem disabled={project.status !== "ready"}>
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
