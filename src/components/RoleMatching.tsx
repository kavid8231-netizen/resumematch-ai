import { TrendingUp } from "lucide-react";
import RoleMatchCard from "./RoleMatchCard";
import jobRolesData from "@/data/jobRoles.json";

interface RoleMatchingProps {
  skills: string[];
}

interface RoleMatch {
  id: string;
  role: string;
  icon: string;
  description: string;
  percentage: number;
  matchedSkills: string[];
  totalSkills: number;
}

const RoleMatching = ({ skills }: RoleMatchingProps) => {
  const normalizedUserSkills = skills.map((s) => s.toLowerCase().trim());

  const calculateMatches = (): RoleMatch[] => {
    return jobRolesData.roles
      .map((role) => {
        const roleSkillsLower = role.skills.map((s) => s.toLowerCase());
        const matchedSkills = role.skills.filter((skill) =>
          normalizedUserSkills.some(
            (userSkill) =>
              userSkill.includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(userSkill)
          )
        );

        const percentage = Math.round(
          (matchedSkills.length / role.skills.length) * 100
        );

        return {
          id: role.id,
          role: role.role,
          icon: role.icon,
          description: role.description,
          percentage,
          matchedSkills,
          totalSkills: role.skills.length,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
  };

  const matches = calculateMatches();
  const topMatch = matches[0];

  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-bg">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Role Matching</h2>
      </div>

      {topMatch && topMatch.percentage >= 50 && (
        <div className="mb-6 p-4 rounded-xl gradient-bg text-primary-foreground animate-pulse-glow">
          <p className="text-sm font-medium opacity-90">🎯 Best Match</p>
          <p className="text-xl font-bold">
            {topMatch.role} - {topMatch.percentage}% Match!
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {matches.map((match, index) => (
          <RoleMatchCard
            key={match.id}
            role={match.role}
            icon={match.icon}
            description={match.description}
            percentage={match.percentage}
            matchedSkills={match.matchedSkills}
            totalSkills={match.totalSkills}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleMatching;
