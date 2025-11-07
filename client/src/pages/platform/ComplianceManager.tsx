import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  MoreHorizontal,
  FileText
} from "lucide-react";
import { useState } from "react";

interface ConsentRecord {
  id: string;
  voiceId: string;
  voiceName: string;
  consentFile: string;
  owner: string;
  uploadDate: string;
  expiryDate: string;
  status: "active" | "expiring" | "expired";
}

export default function ComplianceManager() {
  const [searchQuery, setSearchQuery] = useState("");

  const consentRecords: ConsentRecord[] = [
    {
      id: "1",
      voiceId: "VC-001",
      voiceName: "Sarah - Professional",
      consentFile: "consent_sarah_2024.pdf",
      owner: "Sarah Johnson",
      uploadDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "active"
    },
    {
      id: "2",
      voiceId: "VC-002",
      voiceName: "Alex - Empathetic",
      consentFile: "consent_alex_2024.pdf",
      owner: "Alex Martinez",
      uploadDate: "2024-03-20",
      expiryDate: "2024-12-20",
      status: "expiring"
    },
    {
      id: "3",
      voiceId: "VC-003",
      voiceName: "Marcus - Energetic",
      consentFile: "consent_marcus_2023.pdf",
      owner: "Marcus Chen",
      uploadDate: "2023-06-10",
      expiryDate: "2024-06-10",
      status: "expired"
    },
    {
      id: "4",
      voiceId: "VC-004",
      voiceName: "Emma - Friendly",
      consentFile: "consent_emma_2024.pdf",
      owner: "Emma Wilson",
      uploadDate: "2024-02-28",
      expiryDate: "2025-02-28",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expiring":
        return "bg-yellow-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "expiring":
        return <Clock className="h-4 w-4" />;
      case "expired":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const expiringCount = consentRecords.filter(r => r.status === "expiring").length;
  const expiredCount = consentRecords.filter(r => r.status === "expired").length;
  const activeCount = consentRecords.filter(r => r.status === "active").length;

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Compliance & Consent Manager</h1>
            <p className="text-muted-foreground">
              Manage voice consent records and ensure regulatory compliance
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-chart-2">
            <Upload className="h-4 w-4 mr-2" />
            Upload Consent
          </Button>
        </div>

        {/* Alert Banners */}
        {expiredCount > 0 && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-900 dark:text-red-100">Action Required</h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {expiredCount} voice consent(s) have expired. Please renew immediately to maintain compliance.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700">
              View Expired
            </Button>
          </div>
        )}

        {expiringCount > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 rounded-lg flex items-start gap-3">
            <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Warning</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {expiringCount} voice consent(s) expiring within 30 days. Plan renewal to avoid service interruption.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
              View Expiring
            </Button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Consents</p>
                  <h3 className="text-3xl font-bold text-green-500">{activeCount}</h3>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expiring Soon</p>
                  <h3 className="text-3xl font-bold text-yellow-500">{expiringCount}</h3>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-950">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expired</p>
                  <h3 className="text-3xl font-bold text-red-500">{expiredCount}</h3>
                </div>
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-950">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consent Records Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Consent Records</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Voice ID</th>
                    <th className="text-left p-4 font-semibold">Voice Name</th>
                    <th className="text-left p-4 font-semibold">Consent File</th>
                    <th className="text-left p-4 font-semibold">Owner</th>
                    <th className="text-left p-4 font-semibold">Expiry Date</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-center p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {consentRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-mono text-sm">{record.voiceId}</td>
                      <td className="p-4 font-medium">{record.voiceName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{record.consentFile}</span>
                        </div>
                      </td>
                      <td className="p-4">{record.owner}</td>
                      <td className="p-4">{new Date(record.expiryDate).toLocaleDateString()}</td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(record.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Compliance Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Required Documentation</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Written consent from voice owner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Proof of identity verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Scope of usage rights clearly defined</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Consent validity period specified</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Renewal Process</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>System sends alerts 30 days before expiry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Upload renewed consent documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Verification and approval within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Voice remains active during renewal review</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

