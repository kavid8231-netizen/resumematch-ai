import { FileText, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="gradient-hero py-16 px-6 text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
          <div className="p-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            CODEBOT
          </h1>
          <Sparkles className="w-6 h-6 text-accent animate-pulse" />
        </div>
        <p className="text-center text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          AI-Powered Resume Parser & Job Role Matcher
        </p>
        <p className="text-center text-sm text-primary-foreground/60 mt-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Upload your resume and discover your best-fit roles instantly
        </p>
      </div>
    </header>
  );
};

export default Header;
