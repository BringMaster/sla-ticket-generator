import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileText, Settings } from "lucide-react";

export const TicketGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    sla: "",
    task: "",
    taskTitle: "",
    location: "",
    serverId: "",
    description: "",
  });
  const [output, setOutput] = useState("");

  const slaOptions = ["Basic", "Silver", "Gold", "Bronze", "Platinum"];
  const taskOptions = [
    "Replace HDD",
    "Replace RAM", 
    "Replace Server",
    "Reboot Server",
    "Run Diagnostics"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOutput = () => {
    if (!formData.sla || !formData.task || !formData.taskTitle) {
      toast({
        title: "Missing Information",
        description: "Please fill in SLA, Task, and Task Title fields.",
        variant: "destructive",
      });
      return;
    }

    const ticketNumber = `TKT-${Date.now().toString().slice(-6)}`;
    
    const formatted = `[${formData.sla}] ${formData.taskTitle}
SLA: ${formData.sla}
Ticket number: ${ticketNumber}
Location: ${formData.location || "Not specified"}
Server ID: ${formData.serverId || "Not specified"}

Task description:
${formData.description || `Hi team, please ${formData.task.toLowerCase()} as requested.`}`;

    setOutput(formatted);
    
    toast({
      title: "Ticket Generated",
      description: "Your SLA ticket has been generated successfully.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Ticket content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SLA Ticket Generator
            </h1>
          </div>
          <p className="text-muted-foreground">
            Generate professional IT support tickets with formatted output
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form Card */}
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Ticket Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SLA Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="sla">SLA Level *</Label>
                <Select value={formData.sla} onValueChange={(value) => handleInputChange("sla", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select SLA level" />
                  </SelectTrigger>
                  <SelectContent>
                    {slaOptions.map((sla) => (
                      <SelectItem key={sla} value={sla}>
                        {sla}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Task Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="task">Task Type *</Label>
                <Select value={formData.task} onValueChange={(value) => handleInputChange("task", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskOptions.map((task) => (
                      <SelectItem key={task} value={task}>
                        {task}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Input Fields */}
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Task Title *</Label>
                <Input
                  id="taskTitle"
                  placeholder="Enter task title"
                  value={formData.taskTitle}
                  onChange={(e) => handleInputChange("taskTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., AMS-01, NYC-02"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serverId">Server ID</Label>
                <Input
                  id="serverId"
                  placeholder="e.g., SRV-001, WEB-PROD-01"
                  value={formData.serverId}
                  onChange={(e) => handleInputChange("serverId", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed task description..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <Button 
                onClick={generateOutput} 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                Generate Output
              </Button>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5 text-primary" />
                Generated Ticket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="output">Formatted Output</Label>
                <Textarea
                  id="output"
                  value={output}
                  readOnly
                  rows={12}
                  className="font-mono text-sm bg-muted/50"
                  placeholder="Generated ticket will appear here..."
                />
              </div>
              
              <Button
                onClick={copyToClipboard}
                disabled={!output}
                variant="secondary"
                className="w-full"
                size="lg"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};