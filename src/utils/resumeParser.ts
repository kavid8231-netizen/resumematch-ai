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

// Words to ignore when detecting names
const ignoreWords = [
  "resume", "curriculum", "vitae", "cv", "profile", "objective", 
  "summary", "contact", "details", "information", "personal"
];

// Extract name from resume text
const extractName = (text: string): string => {
  const lines = text.split(/\n/).map(line => line.trim()).filter(line => line.length > 0);
  
  // Method 1: Check first few lines for a name pattern
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    
    // Skip lines with ignored words
    if (ignoreWords.some(word => line.toLowerCase().includes(word))) {
      continue;
    }
    
    // Skip lines with email, phone, or URLs
    if (line.includes("@") || line.match(/\d{3}/) || line.includes("http") || line.includes("www")) {
      continue;
    }
    
    // Check if line is mostly alphabetic with spaces (typical name pattern)
    const cleanLine = line.replace(/[^a-zA-Z\s]/g, "").trim();
    if (cleanLine.length > 3 && cleanLine.split(/\s+/).length >= 2 && cleanLine.split(/\s+/).length <= 4) {
      // Verify it looks like a name (capitalized words)
      const words = cleanLine.split(/\s+/);
      const isName = words.every(word => /^[A-Z][a-z]*$/.test(word) || /^[A-Z]+$/.test(word));
      if (isName || words.length >= 2) {
        return cleanLine;
      }
    }
  }
  
  // Method 2: Look for "Name:" pattern
  const namePattern = /(?:name\s*[:\-]\s*)([A-Za-z]+(?:\s+[A-Za-z]+)+)/i;
  const nameMatch = text.match(namePattern);
  if (nameMatch) {
    return nameMatch[1].trim();
  }
  
  // Method 3: Find first occurrence of 2-4 capitalized words together
  const capitalizedNamePattern = /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})$/m;
  const capMatch = text.match(capitalizedNamePattern);
  if (capMatch) {
    const potential = capMatch[1].trim();
    if (!ignoreWords.some(word => potential.toLowerCase().includes(word))) {
      return potential;
    }
  }
  
  return "Not detected";
};

// Extract phone number from resume text
const extractPhone = (text: string): string => {
  // Remove all whitespace for easier matching
  const cleanText = text.replace(/\s+/g, " ");
  
  // Phone patterns to match various formats
  const phonePatterns = [
    // +91 followed by 10 digits (with optional separators)
    /\+91[-.\s]?(\d{10})/,
    /\+91[-.\s]?(\d{5})[-.\s]?(\d{5})/,
    // Country code formats
    /\+\d{1,3}[-.\s]?(\d{10})/,
    /\+\d{1,3}[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})/,
    // 10 digit formats
    /(?:^|\s)(\d{10})(?:\s|$)/,
    /(?:^|\s)(\d{3})[-.\s](\d{3})[-.\s](\d{4})(?:\s|$)/,
    /(?:^|\s)(\d{5})[-.\s](\d{5})(?:\s|$)/,
    // With parentheses
    /\((\d{3})\)[-.\s]?(\d{3})[-.\s]?(\d{4})/,
    // Phone/Mobile label patterns
    /(?:phone|mobile|tel|cell|contact)[-:\s]*\+?\d*[-.\s]?(\d{10})/i,
    /(?:phone|mobile|tel|cell|contact)[-:\s]*\+?\d*[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})/i,
  ];
  
  for (const pattern of phonePatterns) {
    const match = cleanText.match(pattern);
    if (match) {
      // Extract only digits from the match
      const digits = match.slice(1).join("").replace(/\D/g, "");
      
      // Validate length (10-13 digits)
      if (digits.length >= 10 && digits.length <= 13) {
        // Return last 10 digits for consistency (removes country code)
        return digits.slice(-10);
      }
    }
  }
  
  // Fallback: Find any sequence of 10+ digits
  const allDigits = text.match(/\d{10,13}/g);
  if (allDigits) {
    for (const digits of allDigits) {
      // Return last 10 digits
      return digits.slice(-10);
    }
  }
  
  return "Not detected";
};

export const parseResumeText = (text: string): ParsedResume => {
  // Extract name using enhanced logic
  const name = extractName(text);

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const email = emailMatch ? emailMatch[0] : "Not detected";

  // Extract phone using enhanced logic
  const phone = extractPhone(text);

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
      degree: "Not detected",
      institution: "Not detected",
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
      title: "Not detected",
      company: "Not detected",
      duration: "N/A",
      description: "Experience not detected from resume"
    });
  }

  return {
    name,
    email,
    phone,
    skills: foundSkills.length > 0 ? foundSkills : ["No skills detected"],
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
