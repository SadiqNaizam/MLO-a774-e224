import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists for cn

interface PollingProgressDisplayProps {
  pollingStatus: string;
  currentProgress: number; // Expected to be a value between 0 and 100
  progressDescription: string;
  className?: string;
}

const PollingProgressDisplay: React.FC<PollingProgressDisplayProps> = ({
  pollingStatus,
  currentProgress,
  progressDescription,
  className,
}) => {
  console.log('PollingProgressDisplay loaded:', { pollingStatus, currentProgress, progressDescription });

  return (
    <div className={cn("w-full p-4 space-y-3 bg-card text-card-foreground rounded-lg shadow", className)}>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-muted-foreground">
          Status: <span className="font-semibold text-foreground">{pollingStatus}</span>
        </p>
        <p className="text-sm font-semibold text-foreground">{currentProgress.toFixed(0)}%</p>
      </div>

      <Progress value={currentProgress} className="w-full h-3" aria-label={`Progress: ${currentProgress}%`} />

      {progressDescription && (
        <p className="text-xs text-muted-foreground pt-1">
          {progressDescription}
        </p>
      )}
    </div>
  );
};

export default PollingProgressDisplay;