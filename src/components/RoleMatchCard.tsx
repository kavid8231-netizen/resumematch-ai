import { Code, BarChart3, Palette, Server, Cloud, Smartphone, Brain, ClipboardList, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  BarChart3,
  Palette,
  Server,
  Cloud,
  Smartphone,
  Brain,
  ClipboardList,
};

interface RoleMatchCardProps {
  role: string;
  icon: string;
  description: string;
  percentage: number;
  matchedSkills: string[];
  totalSkills: number;
  delay?: number;
}

const RoleMatchCard = ({
  role,
  icon,
  description,
  percentage,
  matchedSkills,
  totalSkills,
  delay = 0,
}: RoleMatchCardProps) => {
  const Icon = iconMap[icon] || Code;

  const getMatchColor = () => {
    if (percentage >= 70) return "success";
    if (percentage >= 40) return "warning";
    return "destructive";
  };

  const getGradientClass = () => {
    if (percentage >= 70) return "bg-gradient-to-r from-success to-accent";
    if (percentage >= 40) return "bg-gradient-to-r from-warning to-amber-400";
    return "bg-gradient-to-r from-destructive to-orange-500";
  };

  const color = getMatchColor();

  return (
    <div
      className="card-elevated card-hover p-6 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-xl ${percentage >= 70 ? 'gradient-bg' : 'bg-muted'}`}>
          <Icon className={`w-6 h-6 ${percentage >= 70 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{role}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-bold text-${color}`}>{percentage}%</span>
          <p className="text-xs text-muted-foreground">match</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${getGradientClass()} animate-progress`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Matched Skills */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          Matched {matchedSkills.length} of {totalSkills} required skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {matchedSkills.slice(0, 5).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 text-xs font-medium rounded-full bg-${color}/10 text-${color}`}
            >
              {skill}
            </span>
          ))}
          {matchedSkills.length > 5 && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
              +{matchedSkills.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleMatchCard;
