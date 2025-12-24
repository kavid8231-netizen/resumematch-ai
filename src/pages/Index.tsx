import { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import ResumeDetails, { ParsedResume } from "@/components/ResumeDetails";
import RoleMatching from "@/components/RoleMatching";
import { parseResumeText, readFileContent } from "@/utils/resumeParser";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);

    try {
      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const content = await readFileContent(file);
      const parsed = parseResumeText(content);

      setParsedResume(parsed);

      toast({
        title: "Resume Parsed Successfully!",
        description: `Found ${parsed.skills.length} skills and ${parsed.experience.length} experience entries.`,
      });
    } catch (error) {
      toast({
        title: "Error Parsing Resume",
        description: "Please try uploading a different file format.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setParsedResume(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-6xl px-6 py-12">
        {!parsedResume ? (
          <div className="max-w-xl mx-auto">
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Parse New Resume
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <ResumeDetails resume={parsedResume} />
              <RoleMatching skills={parsedResume.skills} />
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-muted-foreground border-t border-border">
        <p className="text-sm">
          Built with AI-powered resume parsing technology
        </p>
      </footer>
    </div>
  );
};

export default Index;
