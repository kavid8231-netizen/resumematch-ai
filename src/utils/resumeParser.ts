import { ParsedResume } from "@/components/ResumeDetails";

// Common skills to look for in resumes
const commonSkills = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js", "Python",
  "Java", "C++", "C#", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin",
  "HTML", "CSS", "SASS", "SCSS", "Tailwind", "Bootstrap", "Material UI",
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub",
  "REST API", "GraphQL", "Microservices", "Agile", "Scrum", "JIRA",
  "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator",
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP",
  "Data Analysis", "Data Visualization", "Tableau", "Power BI", "Excel",
  "Pandas", "NumPy", "R", "Statistics", "Hadoop", "Spark",
  "React Native", "Flutter", "iOS", "Android", "Mobile Development",
  "Linux", "Bash", "Shell Scripting", "Terraform", "Jenkins", "Ansible",
  "Communication", "Leadership", "Team Management", "Problem Solving",
  "Project Management", "Risk Management", "Stakeholder Management",
  "Responsive Design", "Accessibility", "SEO", "Performance Optimization",
  "Testing", "Jest", "Cypress", "Selenium", "Unit Testing", "TDD",
  "Security", "OAuth", "JWT", "Authentication", "Encryption",
  "Webpack", "Vite", "Babel", "ESLint", "Prettier"
];

export const parseResumeText = (text: string): ParsedResume => {
  // Extract name (usually first line or after "Name:")
  const nameMatch = text.match(/(?:name[:\s]*)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i);
  const name = nameMatch ? nameMatch[1].trim() : "Not Found";

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const email = emailMatch ? emailMatch[0] : "Not Found";

  // Extract phone
  const phoneMatch = text.match(/(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : "Not Found";

  // Extract skills
  const textLower = text.toLowerCase();
  const foundSkills = commonSkills.filter(skill => 
    textLower.includes(skill.toLowerCase())
  );

  // Extract education (simplified)
  const educationPatterns = [
    /(?:bachelor|b\.?s\.?|master|m\.?s\.?|ph\.?d\.?|mba|degree|diploma)[\s\w]*(?:in|of)?[\s\w]*/gi,
  ];
  
  const educationMatches: { degree: string; institution: string; year: string }[] = [];
  educationPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.slice(0, 2).forEach(match => {
        const yearMatch = text.slice(text.indexOf(match)).match(/20\d{2}|19\d{2}/);
        educationMatches.push({
          degree: match.trim(),
          institution: "University",
          year: yearMatch ? yearMatch[0] : "N/A"
        });
      });
    }
  });

  // If no education found, add a placeholder
  if (educationMatches.length === 0) {
    educationMatches.push({
      degree: "Degree information not detected",
      institution: "Please update manually",
      year: "N/A"
    });
  }

  // Extract experience (simplified)
  const experiencePatterns = [
    /(?:software engineer|developer|designer|manager|analyst|consultant|intern)[\s\w]*/gi,
  ];

  const experienceMatches: { title: string; company: string; duration: string; description: string }[] = [];
  experiencePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.slice(0, 3).forEach(match => {
        experienceMatches.push({
          title: match.trim(),
          company: "Company Name",
          duration: "Duration not detected",
          description: "Experience details parsed from resume"
        });
      });
    }
  });

  // If no experience found, add a placeholder
  if (experienceMatches.length === 0) {
    experienceMatches.push({
      title: "Experience information not detected",
      company: "Please update manually",
      duration: "N/A",
      description: "Upload a more detailed resume for better parsing"
    });
  }

  return {
    name,
    email,
    phone,
    skills: foundSkills.length > 0 ? foundSkills : ["No skills detected - please update manually"],
    education: educationMatches,
    experience: experienceMatches
  };
};

export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      // For PDF/DOC files, we'll use a simple text extraction
      // In a real app, you'd use a proper PDF parser or backend service
      reader.readAsText(file);
    }
  });
};
