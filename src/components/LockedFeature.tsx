import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedFeatureProps {
  featureName: string;
  onUpgradeClick: () => void;
  children?: React.ReactNode;
  variant?: "overlay" | "inline";
}

export const LockedFeature = ({
  featureName,
  onUpgradeClick,
  children,
  variant = "overlay",
}: LockedFeatureProps) => {
  if (variant === "inline") {
    return (
      <Button
        variant="ghost"
        onClick={onUpgradeClick}
        className="flex items-center gap-2 text-muted-foreground hover:text-amber-500 transition-colors"
      >
        <Lock className="w-4 h-4" />
        <span className="text-sm">{featureName}</span>
        <Crown className="w-3 h-3 text-amber-500" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <div className="opacity-30 pointer-events-none blur-[1px]">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl p-4">
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-400/10 p-3 rounded-full mb-3">
          <Lock className="w-5 h-5 text-amber-500" />
        </div>
        <p className="font-medium text-sm text-foreground mb-1">{featureName}</p>
        <p className="text-xs text-muted-foreground mb-3 text-center">Part of the Elite experience</p>
        <Button
          size="sm"
          onClick={onUpgradeClick}
          className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white font-semibold shadow-md"
        >
          <Crown className="w-4 h-4 mr-1" />
          Go Elite
        </Button>
      </div>
    </div>
  );
};
