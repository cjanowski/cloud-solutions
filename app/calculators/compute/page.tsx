import { ComputeCalculator } from '@/components/calculators/ComputeCalculator';

export default function ComputePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Compute Cost Calculator
        </h1>
        <p className="text-white/70">
          Compare VM and instance pricing across AWS, GCP, and Azure
        </p>
      </div>
      <ComputeCalculator />
    </div>
  );
}

