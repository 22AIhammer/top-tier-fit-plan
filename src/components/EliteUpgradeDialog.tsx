import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, History, Trophy, Quote, Check } from "lucide-react";

interface EliteUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
  trigger?: "milestone" | "feature" | "general";
  featureName?: string;
}

const eliteFeatures = [
  { icon: History, label: "Full Streak History", description: "Track your journey over time" },
  { icon: Trophy, label: "Milestone Celebrations", description: "Animated celebrations at 3, 7, 14, 30 days" },
  { icon: Quote, label: "Bonus Motivation Quotes", description: "Exclusive daily inspiration" },
];

export const EliteUpgradeDialog = ({
  open,
  onOpenChange,
  onUpgrade,
  trigger = "general",
  featureName,
}: EliteUpgradeDialogProps) => {
  const getTitle = () => {
    if (trigger === "milestone") {
      return "Celebrate Your Achievement! 🎉";
    }
    if (trigger === "feature" && featureName) {
      return `Unlock ${featureName}`;
    }
    return "Upgrade to Elite";
  };

  const getDescription = () => {
    if (trigger === "milestone") {
      return "You've hit a milestone! Upgrade to Elite to unlock animated celebrations and track your streak history.";
    }
    if (trigger === "feature") {
      return `This feature is part of the Elite experience. Upgrade to unlock ${featureName?.toLowerCase()} and other premium benefits.`;
    }
    return "Take your fitness journey to the next level with exclusive Elite features.";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border-primary/20">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 blur-xl opacity-50 rounded-full" />
            <div className="relative bg-gradient-to-r from-amber-500 to-yellow-400 p-4 rounded-2xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
              {getTitle()}
            </span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {eliteFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-400/10">
                <feature.icon className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{feature.label}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
              <Check className="w-4 h-4 text-amber-500" />
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={() => {
              onUpgrade();
              onOpenChange(false);
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white font-bold py-6 text-lg shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Upgrade to Elite
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full text-muted-foreground"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
