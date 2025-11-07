'use client';

import { useState, useEffect } from 'react';
import { GlassCard, GlassInput, GlassSelect } from '@/components/ui';
import { PricingData, StoragePricing } from '@/lib/pricing-data';

export const StorageCalculator = () => {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [storageGB, setStorageGB] = useState(1000);
  const [storageType, setStorageType] = useState<'object' | 'block' | 'file'>('object');
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

  const calculateCost = (pricing: StoragePricing) => {
    return (pricing.pricePerGBMonth * storageGB).toFixed(2);
  };

  const getStorageOptions = () => {
    if (!pricingData) return [];
    return pricingData.storage.filter(s => s.storageType === storageType);
  };

  const storageOptions = getStorageOptions();

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
        <h2 className="text-2xl font-bold text-white mb-6">Storage Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <GlassInput
            type="number"
            label="Storage (GB)"
            value={storageGB}
            onChange={(e) => setStorageGB(Number(e.target.value))}
            min={1}
            max={1000000}
          />
          <GlassSelect
            label="Storage Type"
            value={storageType}
            onChange={(e) => setStorageType(e.target.value as 'object' | 'block' | 'file')}
            options={[
              { value: 'object', label: 'Object Storage (S3, Cloud Storage, Blob)' },
              { value: 'block', label: 'Block Storage (EBS, Persistent Disk, Managed Disk)' },
              { value: 'file', label: 'File Storage (EFS, Filestore, Files)' },
            ]}
          />
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Monthly Cost Comparison</h2>
        <div className="space-y-4">
          {['aws', 'gcp', 'azure'].map(provider => {
            const providerOptions = storageOptions.filter(s => s.provider === provider);
            
            if (providerOptions.length === 0) return null;

            return (
              <div key={provider}>
                <h3 className="text-lg font-semibold text-white mb-3 uppercase">
                  {provider}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {providerOptions.map((option, idx) => (
                    <GlassCard key={idx} className="p-4 space-y-2" hover>
                      <div className="font-semibold text-white">{option.serviceName}</div>
                      <div className="text-sm text-white/70">{option.region}</div>
                      <div className="pt-2 border-t border-white/10">
                        <div className="text-sm text-white/70">
                          ${option.pricePerGBMonth}/GB/month
                        </div>
                        <div className="text-xl font-bold text-white">
                          ${calculateCost(option)}
                        </div>
                        <div className="text-xs text-white/50">
                          for {storageGB} GB
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
            <strong>Storage Types:</strong>
          </div>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Object Storage:</strong> Best for unstructured data, backups, and media files</li>
            <li><strong>Block Storage:</strong> Best for databases and applications requiring low-latency access</li>
            <li><strong>File Storage:</strong> Best for shared file systems and legacy applications</li>
          </ul>
        </div>
      </GlassCard>
    </div>
  );
};

