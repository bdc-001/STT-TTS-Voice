import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Download,
    Eye,
    Trash2,
    MoreVertical,
    FileAudio,
    Filter,
    Calendar,
    Clock
} from "lucide-react";
import { useState } from "react";

interface Transcript {
    id: string;
    filename: string;
    date: string;
    duration: string;
    language: string;
    speakers: number;
    status: "completed" | "processing" | "failed";
    accuracy?: number;
}

export default function STTTranscripts() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [languageFilter, setLanguageFilter] = useState("all");

    // Mock data - replace with actual API call
    const transcripts: Transcript[] = [
        {
            id: "1",
            filename: "customer_call_2024_01_15.mp3",
            date: "2024-01-15",
            duration: "12:34",
            language: "en-US",
            speakers: 2,
            status: "completed",
            accuracy: 97.2
        },
        {
            id: "2",
            filename: "team_meeting_recording.wav",
            date: "2024-01-14",
            duration: "45:12",
            language: "en-US",
            speakers: 5,
            status: "completed",
            accuracy: 94.8
        },
        {
            id: "3",
            filename: "interview_session_01.m4a",
            date: "2024-01-13",
            duration: "28:45",
            language: "en-GB",
            speakers: 2,
            status: "completed",
            accuracy: 96.5
        },
        {
            id: "4",
            filename: "sales_pitch_demo.mp3",
            date: "2024-01-12",
            duration: "8:22",
            language: "en-US",
            speakers: 1,
            status: "processing"
        },
        {
            id: "5",
            filename: "conference_keynote.wav",
            date: "2024-01-11",
            duration: "1:23:45",
            language: "en-US",
            speakers: 3,
            status: "failed"
        }
    ];

    const filteredTranscripts = transcripts.filter(transcript => {
        const matchesSearch = transcript.filename.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || transcript.status === statusFilter;
        const matchesLanguage = languageFilter === "all" || transcript.language === languageFilter;
        return matchesSearch && matchesStatus && matchesLanguage;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-500">Completed</Badge>;
            case "processing":
                return <Badge className="bg-blue-500">Processing</Badge>;
            case "failed":
                return <Badge variant="destructive">Failed</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const handleView = (id: string) => {
        // TODO: Implement view transcript functionality
        console.log("View transcript:", id);
    };

    const handleDownload = (id: string) => {
        // TODO: Implement download functionality
        console.log("Download transcript:", id);
    };

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        console.log("Delete transcript:", id);
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Transcripts</h1>
                    <p className="text-muted-foreground">
                        View and manage all your speech-to-text transcriptions
                    </p>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search transcripts by filename..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Language Filter */}
                            <Select value={languageFilter} onValueChange={setLanguageFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Languages</SelectItem>
                                    <SelectItem value="en-US">English (US)</SelectItem>
                                    <SelectItem value="en-GB">English (UK)</SelectItem>
                                    <SelectItem value="hi-IN">Hindi</SelectItem>
                                    <SelectItem value="es-ES">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Transcripts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>All Transcripts ({filteredTranscripts.length})</span>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export All
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {filteredTranscripts.length === 0 ? (
                            <div className="p-12 text-center">
                                <FileAudio className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-sm text-muted-foreground">
                                    No transcripts found. Upload audio files in the STT Playground to get started.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Filename</TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Date
                                            </div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Duration
                                            </div>
                                        </TableHead>
                                        <TableHead>Language</TableHead>
                                        <TableHead>Speakers</TableHead>
                                        <TableHead>Accuracy</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTranscripts.map((transcript) => (
                                        <TableRow key={transcript.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <FileAudio className="h-4 w-4 text-muted-foreground" />
                                                    {transcript.filename}
                                                </div>
                                            </TableCell>
                                            <TableCell>{transcript.date}</TableCell>
                                            <TableCell>{transcript.duration}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{transcript.language}</Badge>
                                            </TableCell>
                                            <TableCell>{transcript.speakers}</TableCell>
                                            <TableCell>
                                                {transcript.accuracy ? (
                                                    <span className="font-medium text-green-600">
                                                        {transcript.accuracy}%
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(transcript.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleView(transcript.id)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Transcript
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDownload(transcript.id)}>
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(transcript.id)}
                                                            className="text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
