import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Key,
    Copy,
    Trash2,
    Plus,
    CreditCard,
    Activity,
    CheckCircle,
    AlertTriangle,
    RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";
import { user } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
    const [apiKeys, setApiKeys] = useState<any[]>([]);
    const [usageData, setUsageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newKeyName, setNewKeyName] = useState("");
    const [activeTab, setActiveTab] = useState("keys");
    const { toast } = useToast();

    useEffect(() => {
        fetchData();

        // Set active tab based on URL hash
        const hash = window.location.hash.replace('#', '');
        if (hash && ['keys', 'usage', 'billing'].includes(hash)) {
            setActiveTab(hash);
        }

        // Listen for hash changes
        const handleHashChange = () => {
            const newHash = window.location.hash.replace('#', '');
            if (newHash && ['keys', 'usage', 'billing'].includes(newHash)) {
                setActiveTab(newHash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const fetchData = async () => {
        try {
            const [keysRes, usageRes] = await Promise.all([
                user.getApiKeys(),
                user.getUsage()
            ]);

            if (keysRes.data.success) {
                setApiKeys(keysRes.data.data);
            }

            if (usageRes.data.success) {
                setUsageData(usageRes.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch settings data:", error);
            // Don't show error toast on initial load to avoid spam if auth is missing
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateKey = async () => {
        if (!newKeyName.trim()) return;

        try {
            const response = await user.createApiKey({
                name: newKeyName,
                permissions: "all"
            });

            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "API Key created successfully",
                });
                setNewKeyName("");
                fetchData();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create API key",
                variant: "destructive",
            });
        }
    };

    const handleDeleteKey = async (id: number) => {
        try {
            await user.deleteApiKey(id);
            toast({
                title: "Success",
                description: "API Key deleted successfully",
            });
            fetchData();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete API key",
                variant: "destructive",
            });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied",
            description: "API Key copied to clipboard",
        });
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your API keys, billing, and usage limits
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="keys" className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            API Keys
                        </TabsTrigger>
                        <TabsTrigger value="usage" className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Usage & Limits
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Billing
                        </TabsTrigger>
                    </TabsList>

                    {/* API Keys Tab */}
                    <TabsContent value="keys">
                        <Card>
                            <CardHeader>
                                <CardTitle>API Keys</CardTitle>
                                <CardDescription>
                                    Manage your API keys for accessing the Convin Voice API. Keep these keys secret.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Label htmlFor="new-key-name">New Key Name</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="new-key-name"
                                            placeholder="e.g., Production App"
                                            value={newKeyName}
                                            onChange={(e) => setNewKeyName(e.target.value)}
                                        />
                                        <Button
                                            onClick={handleCreateKey}
                                            disabled={!newKeyName.trim()}
                                            className="flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Create Key
                                        </Button>
                                    </div>
                                </div>

                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Key</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead>Last Used</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {apiKeys.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                        No API keys found. Create one to get started.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                apiKeys.map((key) => (
                                                    <TableRow key={key.id}>
                                                        <TableCell className="font-medium">{key.name}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                                                    {key.key.substring(0, 8)}...{key.key.substring(key.key.length - 4)}
                                                                </code>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-6 w-6"
                                                                    onClick={() => copyToClipboard(key.key)}
                                                                >
                                                                    <Copy className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                                                        <TableCell>
                                                            {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : "Never"}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={key.is_active ? "default" : "secondary"}>
                                                                {key.is_active ? "Active" : "Inactive"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => handleDeleteKey(key.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Usage Tab */}
                    <TabsContent value="usage">
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Usage</CardTitle>
                                    <CardDescription>
                                        Your usage for the current billing period
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">Speech-to-Text (Minutes)</span>
                                            <span className="text-muted-foreground">
                                                {usageData?.total_stt_minutes.toFixed(1) || 0} / 1000
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${Math.min(((usageData?.total_stt_minutes || 0) / 1000) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">Text-to-Speech (Characters)</span>
                                            <span className="text-muted-foreground">
                                                {usageData?.total_tts_characters.toLocaleString() || 0} / 500,000
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-purple-500 rounded-full"
                                                style={{ width: `${Math.min(((usageData?.total_tts_characters || 0) / 500000) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">Storage (GB)</span>
                                            <span className="text-muted-foreground">1.2 / 10.0</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: "12%" }} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing">
                        <Card>
                            <CardHeader>
                                <CardTitle>Plan & Billing</CardTitle>
                                <CardDescription>
                                    Manage your subscription and payment methods
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <CreditCard className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Pro Plan</h4>
                                            <p className="text-sm text-muted-foreground">$49.00 / month</p>
                                        </div>
                                    </div>
                                    <Badge>Active</Badge>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Payment Method</h4>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="font-medium">Visa ending in 4242</p>
                                                <p className="text-xs text-muted-foreground">Expires 12/25</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Update</Button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <Button variant="outline" className="w-full">
                                        View Billing History
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
