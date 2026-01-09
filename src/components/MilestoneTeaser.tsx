import { Trophy, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MilestoneTeaserProps {
  milestone: number;
  onUpgradeClick: () => void;
}

const milestoneMessages: Record<number, { title: string; message: string; emoji: string }> = {
  3: {
    title: "3-Day Momentum!",
    message: "You're building something real. Elite members celebrate this with style.",
    emoji: "🌱",
  },
  7: {
    title: "One Week Strong!",
    message: "A full week of showing up. Elite unlocks your streak history to see the journey.",
    emoji: "💪",
  },
  14: {
    title: "Two Weeks of Discipline!",
    message: "This is what consistency looks like. Elite members get animated celebrations.",
    emoji: "🔥",
  },
  30: {
    title: "30-Day Legend!",
    message: "You've proven you're unstoppable. Elite celebrates champions like you.",
    emoji: "👑",
  },
};

export const MilestoneTeaser = ({ milestone, onUpgradeClick }: MilestoneTeaserProps) => {
  const content = milestoneMessages[milestone];
  if (!content) return null;

  return (
    <div className="p-4 bg-gradient-to-r from-amber-500/5 to-yellow-400/5 border border-amber-500/20 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-400/20">
          <Trophy className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-foreground flex items-center gap-2">
            {content.emoji} {content.title}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{content.message}</p>
          <Button
            size="sm"
            onClick={onUpgradeClick}
            className="mt-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white font-semibold shadow-md"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Unlock Elite Consistency
          </Button>
        </div>
      </div>
    </div>
  );
};
