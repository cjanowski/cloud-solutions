'use client';

import { useState, useEffect } from 'react';
import { GlassCard, GlassInput, GlassSelect } from '@/components/ui';
import { ComputeInstance, PricingData } from '@/lib/pricing-data';

export const ComputeCalculator = () => {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [vcpus, setVcpus] = useState(2);
  const [memory, setMemory] = useState(4);
  const [hours, setHours] = useState(730);
  const [region, setRegion] = useState('us-east-1');
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

  const findMatchingInstances = () => {
    if (!pricingData) return [];
    
    return pricingData.compute.filter(
      instance => instance.vcpus >= vcpus && instance.memory >= memory
    ).sort((a, b) => a.pricePerHour - b.pricePerHour);
  };

  const matchingInstances = findMatchingInstances();

  const calculateCost = (instance: ComputeInstance) => {
    return (instance.pricePerHour * hours).toFixed(2);
  };

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
        <h2 className="text-2xl font-bold text-white mb-6">Compute Requirements</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <GlassInput
            type="number"
            label="vCPUs"
            value={vcpus}
            onChange={(e) => setVcpus(Number(e.target.value))}
            min={1}
            max={128}
          />
          <GlassInput
            type="number"
            label="Memory (GB)"
            value={memory}
            onChange={(e) => setMemory(Number(e.target.value))}
            min={1}
            max={512}
          />
          <GlassInput
            type="number"
            label="Hours per Month"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min={1}
            max={730}
          />
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Matching Instances</h2>
        {matchingInstances.length === 0 ? (
          <div className="text-white/70 text-center py-8">
            No matching instances found. Try adjusting your requirements.
          </div>
        ) : (
          <div className="space-y-4">
            {['aws', 'gcp', 'azure'].map(provider => {
              const providerInstances = matchingInstances.filter(
                i => i.provider === provider
              ).slice(0, 3);
              
              if (providerInstances.length === 0) return null;

              return (
                <div key={provider}>
                  <h3 className="text-lg font-semibold text-white mb-3 uppercase">
                    {provider}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {providerInstances.map((instance, idx) => (
                      <GlassCard key={idx} className="p-4 space-y-2" hover>
                        <div className="font-semibold text-white">{instance.name}</div>
                        <div className="text-sm text-white/70">
                          {instance.vcpus} vCPUs, {instance.memory} GB RAM
                        </div>
                        <div className="text-xs text-white/50">{instance.region}</div>
                        <div className="pt-2 border-t border-white/10">
                          <div className="text-sm text-white/70">
                            ${instance.pricePerHour}/hour
                          </div>
                          <div className="text-xl font-bold text-white">
                            ${calculateCost(instance)}
                          </div>
                          <div className="text-xs text-white/50">
                            for {hours} hours
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-sm text-white/70">
          <strong>Note:</strong> Prices are estimates and may vary by region, commitment level, and additional features.
          Data last updated: {pricingData?.lastUpdated ? new Date(pricingData.lastUpdated).toLocaleString() : 'N/A'}
        </div>
      </GlassCard>
    </div>
  );
};

