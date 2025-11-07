import { StorageCalculator } from '@/components/calculators/StorageCalculator';

export default function StoragePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Storage Cost Calculator
        </h1>
        <p className="text-white/70">
          Compare storage pricing across AWS, GCP, and Azure
        </p>
      </div>
      <StorageCalculator />
    </div>
  );
}

