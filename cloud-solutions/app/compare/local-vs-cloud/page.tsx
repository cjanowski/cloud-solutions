import { LocalVsCloudCalculator } from '@/components/compare/LocalVsCloudCalculator';

export default function LocalVsCloudPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Local Storage vs Cloud TCO Calculator
        </h1>
        <p className="text-white/70">
          Compare total cost of ownership between on-premises storage and cloud solutions
        </p>
      </div>
      <LocalVsCloudCalculator />
    </div>
  );
}

