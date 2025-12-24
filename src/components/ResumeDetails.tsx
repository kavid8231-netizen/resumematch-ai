import { User, Mail, Phone, Briefcase, GraduationCap, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

interface ResumeDetailsProps {
  resume: ParsedResume;
}

const ResumeDetails = ({ resume }: ResumeDetailsProps) => {
  return (
    <div className="card-elevated p-8 animate-slide-up">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <div className="p-2 rounded-lg gradient-bg">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
        Extracted Information
      </h2>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Name</p>
              <p className="font-semibold text-foreground">{resume.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
              <p className="font-semibold text-foreground">{resume.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 md:col-span-2">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
              <p className="font-semibold text-foreground">{resume.phone}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Education</h3>
          </div>
          <div className="space-y-3">
            {resume.education.map((edu, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 border-l-4 border-accent">
                <p className="font-semibold text-foreground">{edu.degree}</p>
                <p className="text-muted-foreground">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Experience</h3>
          </div>
          <div className="space-y-3">
            {resume.experience.map((exp, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-foreground">{exp.title}</p>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
