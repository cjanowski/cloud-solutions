import { BandwidthCalculator } from '@/components/calculators/BandwidthCalculator';

export default function BandwidthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Bandwidth Cost Calculator
        </h1>
        <p className="text-white/70">
          Compare data transfer and egress pricing across AWS, GCP, and Azure
        </p>
      </div>
      <BandwidthCalculator />
    </div>
  );
}

