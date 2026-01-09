import { Calendar, Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreakCalendarPreviewProps {
  streakHistory: { date: string; streak: number }[];
  currentStreak: number;
  onUpgradeClick: () => void;
}

export const StreakCalendarPreview = ({
  streakHistory,
  currentStreak,
  onUpgradeClick,
}: StreakCalendarPreviewProps) => {
  // Generate last 14 days for preview
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return date.toISOString().split("T")[0];
  });

  const checkedDates = new Set(streakHistory.map((h) => h.date));

  return (
    <div className="relative mt-6">
      {/* Calendar Preview - Blurred */}
      <div className="opacity-40 blur-[2px] pointer-events-none select-none">
        <div className="p-4 bg-muted/20 rounded-xl border border-border/30">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Your Journey</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {last14Days.map((date, idx) => {
              const isChecked = checkedDates.has(date);
              const dayNum = new Date(date).getDate();
              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                    isChecked
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{streakHistory.length} total check-ins</span>
            <span>🔥 {currentStreak} day streak</span>
          </div>
        </div>
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[1px] rounded-xl">
        <div className="text-center p-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-400/10 mb-3">
            <Lock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="font-semibold text-sm text-foreground mb-1">See Your Journey</p>
          <p className="text-xs text-muted-foreground mb-3 max-w-[200px]">
            Track every win. Elite members see their full streak calendar.
          </p>
          <Button
            size="sm"
            onClick={onUpgradeClick}
            className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white font-semibold shadow-md"
          >
            <Crown className="w-4 h-4 mr-1" />
            Unlock My Journey
          </Button>
        </div>
      </div>
    </div>
  );
};
