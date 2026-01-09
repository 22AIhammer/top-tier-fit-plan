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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl">
        <Lock className="w-6 h-6 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-3">{featureName}</p>
        <Button
          size="sm"
          onClick={onUpgradeClick}
          className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white font-semibold"
        >
          <Crown className="w-4 h-4 mr-1" />
          Unlock Elite
        </Button>
      </div>
    </div>
  );
};
