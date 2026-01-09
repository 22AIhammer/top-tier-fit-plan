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
  { icon: History, label: "Your Full Journey", description: "See every step you've taken—proof of who you're becoming" },
  { icon: Trophy, label: "Milestone Celebrations", description: "Celebrate wins at 3, 7, 14 & 30 days like a champion" },
  { icon: Quote, label: "Elite Mindset Quotes", description: "Fuel your transformation with handpicked wisdom" },
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
      return "You're Becoming Someone New 🔥";
    }
    if (trigger === "feature" && featureName) {
      return `Unlock Your ${featureName}`;
    }
    return "Unlock Elite Consistency";
  };

  const getDescription = () => {
    if (trigger === "milestone") {
      return "This milestone proves who you're becoming. Elite gives you the tools to see your journey, celebrate progress, and stay unstoppable.";
    }
    if (trigger === "feature") {
      return `Your progress deserves to be seen. ${featureName} is part of Elite—designed for people serious about their transformation.`;
    }
    return "Elite is for people who show up. Track your journey, celebrate milestones, and see the person you're becoming.";
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

        <p className="text-center text-xs text-muted-foreground italic mb-2">
          "Every day you show up, you become more of who you want to be."
        </p>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={() => {
              onUpgrade();
              onOpenChange(false);
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white font-bold py-6 text-lg shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Join Elite
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Not right now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
