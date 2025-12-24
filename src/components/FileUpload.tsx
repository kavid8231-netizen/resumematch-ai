import { useState, useCallback } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload = ({ onFileSelect, isLoading }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    return validTypes.includes(file.type) || file.name.endsWith(".txt");
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="card-elevated p-8 animate-scale-in">
      <h2 className="text-2xl font-bold text-foreground mb-2">Upload Resume</h2>
      <p className="text-muted-foreground mb-6">
        Supported formats: PDF, DOC, DOCX, TXT
      </p>

      <div
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
          dragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        {!selectedFile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Drag & drop your resume here
              </p>
              <p className="text-muted-foreground mt-1">
                or click to browse files
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <div className="p-3 rounded-lg bg-success/10">
              <FileText className="w-8 h-8 text-success" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="p-2 rounded-full hover:bg-destructive/10 transition-colors"
            >
              <X className="w-5 h-5 text-destructive" />
            </button>
          </div>
        )}
      </div>

      {selectedFile && (
        <Button
          variant="hero"
          size="lg"
          className="w-full mt-6"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Parse Resume with AI
            </>
          )}
        </Button>
      )}
    </div>
  );
};

import { Sparkles } from "lucide-react";
export default FileUpload;
