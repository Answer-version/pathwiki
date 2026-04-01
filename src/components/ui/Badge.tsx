import type { Difficulty } from "@/types/roadmap";

interface BadgeProps {
  variant?: "difficulty" | "free" | "paid" | "custom";
  difficulty?: Difficulty;
  children?: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "custom", difficulty, children, className = "" }: BadgeProps) {
  if (variant === "difficulty" && difficulty) {
    const difficultyStyles = {
      beginner: "bg-beginner-bg text-beginner-dark",
      intermediate: "bg-intermediate-bg text-intermediate-dark",
      advanced: "bg-advanced-bg text-advanced-dark",
    };

    const difficultyLabels = {
      beginner: "入门",
      intermediate: "进阶",
      advanced: "高级",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyStyles[difficulty]} ${className}`}
      >
        {difficultyLabels[difficulty]}
      </span>
    );
  }

  if (variant === "free") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 ${className}`}
      >
        免费
      </span>
    );
  }

  if (variant === "paid") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 ${className}`}
      >
        付费
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 ${className}`}
    >
      {children}
    </span>
  );
}
