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
    Clock,
    RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";
import { jobs } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Project {
    id: string;
    name: string;
    voice: string;
    duration: string;
    format: string;
    created: string;
    status: "ready" | "processing" | "failed" | "pending" | "completed";
}

export default function TTSProjects() {
    const [searchQuery, setSearchQuery] = useState("");
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await jobs.list();
            if (response.data.success) {
                const mappedProjects = response.data.data.map((job: any) => ({
                    id: job.id,
                    name: job.type === 'voice_clone' ? 'Voice Clone Project' : 'Voice Design Project', // TODO: Store actual name in job
                    voice: 'Custom Voice', // Placeholder
                    duration: '-',
                    format: 'WAV',
                    created: new Date(job.created_at).toLocaleDateString(),
                    status: job.status
                }));
                setProjectList(mappedProjects);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast({
                title: "Error",
                description: "Failed to load projects",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
            case "ready": return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
            case "processing": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
            case "failed": return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
            default: return "bg-gray-500/10 text-gray-500";
        }
    };

    const filteredProjects = projectList.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={fetchProjects} disabled={isLoading}>
                            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Link href="/platform/tts/playground">
                            <Button className="bg-gradient-to-r from-primary to-chart-2">
                                <Plus className="h-4 w-4 mr-2" />
                                New Project
                            </Button>
                        </Link>
                    </div>
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
                                {filteredProjects.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            {isLoading ? "Loading projects..." : "No projects found. Create one to get started."}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProjects.map((project) => (
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
                                                    <Button size="icon" variant="ghost" disabled={project.status !== "completed" && project.status !== "ready"}>
                                                        <Play className="h-4 w-4" />
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem disabled={project.status !== "completed" && project.status !== "ready"}>
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
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
