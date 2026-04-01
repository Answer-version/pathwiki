import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export default function Card({ children, className = "", hover = false, padding = "md" }: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-card border border-slate-100 dark:border-slate-700 ${paddingStyles[padding]} ${
        hover ? "transition-all duration-150 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
