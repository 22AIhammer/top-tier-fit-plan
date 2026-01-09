import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EliteBadgeProps {
  onClick?: () => void;
  variant?: "small" | "default";
}

export const EliteBadge = ({ onClick, variant = "default" }: EliteBadgeProps) => {
  if (variant === "small") {
    return (
      <Badge
        onClick={onClick}
        className="cursor-pointer px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-0 hover:from-amber-600 hover:to-yellow-500 transition-all"
      >
        <Crown className="w-3 h-3 mr-1" />
        Elite
      </Badge>
    );
  }

  return (
    <Badge
      onClick={onClick}
      className="cursor-pointer px-3 py-1 text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-0 hover:from-amber-600 hover:to-yellow-500 transition-all shadow-lg"
    >
      <Crown className="w-4 h-4 mr-1" />
      Elite Member
    </Badge>
  );
};
