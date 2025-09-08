import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, label, showPercentage = true, variant = "default", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const variantClasses = {
      default: "bg-primary",
      primary: "bg-primary",
      secondary: "bg-secondary",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500",
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{label}</span>
            {showPercentage && (
              <span className="text-sm text-muted-foreground">
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        )}
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-500 ease-in-out",
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };