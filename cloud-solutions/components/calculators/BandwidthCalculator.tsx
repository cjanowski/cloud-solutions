'use client';

import { useState, useEffect } from 'react';
import { GlassCard, GlassInput, GlassSelect } from '@/components/ui';
import { PricingData, BandwidthPricing } from '@/lib/pricing-data';

export const BandwidthCalculator = () => {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [dataGB, setDataGB] = useState(1000);
  const [direction, setDirection] = useState<'ingress' | 'egress' | 'inter-region'>('egress');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => {
        setPricingData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pricing:', error);
        setLoading(false);
      });
  }, []);

  const calculateCost = (pricing: BandwidthPricing) => {
    return (pricing.pricePerGB * dataGB).toFixed(2);
  };

  const getBandwidthOptions = () => {
    if (!pricingData) return [];
    return pricingData.bandwidth.filter(b => b.direction === direction);
  };

  const bandwidthOptions = getBandwidthOptions();

  if (loading) {
    return (
      <GlassCard className="p-8">
        <div className="text-white text-center">Loading pricing data...</div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Data Transfer Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <GlassInput
            type="number"
            label="Data Transfer (GB)"
            value={dataGB}
            onChange={(e) => setDataGB(Number(e.target.value))}
            min={1}
            max={1000000}
          />
          <GlassSelect
            label="Transfer Direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'ingress' | 'egress' | 'inter-region')}
            options={[
              { value: 'ingress', label: 'Ingress (Data In)' },
              { value: 'egress', label: 'Egress (Data Out)' },
              { value: 'inter-region', label: 'Inter-Region Transfer' },
            ]}
          />
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Monthly Cost Comparison</h2>
        <div className="space-y-4">
          {['aws', 'gcp', 'azure'].map(provider => {
            const providerOptions = bandwidthOptions.filter(b => b.provider === provider);
            
            if (providerOptions.length === 0) return null;

            return (
              <div key={provider}>
                <h3 className="text-lg font-semibold text-white mb-3 uppercase">
                  {provider}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {providerOptions.map((option, idx) => (
                    <GlassCard key={idx} className="p-4 space-y-2" hover>
                      <div className="font-semibold text-white">{option.tier}</div>
                      <div className="text-sm text-white/70">{option.region}</div>
                      <div className="text-xs text-white/50 capitalize">{option.direction}</div>
                      <div className="pt-2 border-t border-white/10">
                        <div className="text-sm text-white/70">
                          ${option.pricePerGB}/GB
                        </div>
                        <div className="text-xl font-bold text-white">
                          ${calculateCost(option)}
                        </div>
                        <div className="text-xs text-white/50">
                          for {dataGB} GB
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-sm text-white/70 space-y-2">
          <div>
            <strong>Data Transfer Types:</strong>
          </div>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Ingress:</strong> Data transferred into the cloud (usually free)</li>
            <li><strong>Egress:</strong> Data transferred out of the cloud (typically charged)</li>
            <li><strong>Inter-Region:</strong> Data transferred between regions (varies by provider)</li>
          </ul>
          <div className="mt-4">
            <strong>Note:</strong> Prices often have tiered pricing based on volume. Higher volumes typically get better rates.
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

