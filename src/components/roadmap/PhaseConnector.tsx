interface PhaseConnectorProps {
  className?: string;
}

export default function PhaseConnector({ className = "" }: PhaseConnectorProps) {
  return (
    <div className={`flex justify-center py-2 ${className}`}>
      <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-300 to-indigo-200 dark:from-indigo-600 dark:to-indigo-700" />
    </div>
  );
}
