import { FeatureComparison } from '@/components/compare/FeatureComparison';
import { PricingComparison } from '@/components/compare/PricingComparison';
import { TradeoffMatrix } from '@/components/compare/TradeoffMatrix';

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Provider Comparison
        </h1>
        <p className="text-white/70">
          Side-by-side comparison of features, pricing, and trade-offs across AWS, GCP, and Azure
        </p>
      </div>

      <PricingComparison />
      <FeatureComparison />
      <TradeoffMatrix />
    </div>
  );
}

