import { CapacityCalculator } from '@/components/calculators/CapacityCalculator';

export default function CapacityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
          Back-of-the-Envelope Calculator
        </h1>
        <p className="text-white/70">
          Estimate system resources, storage, bandwidth, and infrastructure requirements
        </p>
      </div>
      <CapacityCalculator />
    </div>
  );
}

