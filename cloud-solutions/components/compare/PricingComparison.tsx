'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PricingData } from '@/lib/pricing-data';

export const PricingComparison = () => {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
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

  if (loading || !pricingData) {
    return (
      <GlassCard className="p-8">
        <div className="text-white text-center">Loading pricing data...</div>
      </GlassCard>
    );
  }

  const computeData = [
    {
      name: '2 vCPU, 4GB RAM',
      AWS: pricingData.compute.find(c => c.provider === 'aws' && c.vcpus === 2 && c.memory === 4)?.pricePerMonth || 0,
      GCP: pricingData.compute.find(c => c.provider === 'gcp' && c.vcpus === 2 && c.memory === 4)?.pricePerMonth || 0,
      Azure: pricingData.compute.find(c => c.provider === 'azure' && c.vcpus === 2 && c.memory === 4)?.pricePerMonth || 0,
    },
    {
      name: '2 vCPU, 8GB RAM',
      AWS: pricingData.compute.find(c => c.provider === 'aws' && c.vcpus === 2 && c.memory === 8)?.pricePerMonth || 0,
      GCP: pricingData.compute.find(c => c.provider === 'gcp' && c.vcpus === 2 && c.memory === 8)?.pricePerMonth || 0,
      Azure: pricingData.compute.find(c => c.provider === 'azure' && c.vcpus === 2 && c.memory === 8)?.pricePerMonth || 0,
    },
  ];

  const storageData = [
    {
      name: 'Object Storage',
      AWS: pricingData.storage.find(s => s.provider === 'aws' && s.storageType === 'object')?.pricePerGBMonth || 0,
      GCP: pricingData.storage.find(s => s.provider === 'gcp' && s.storageType === 'object')?.pricePerGBMonth || 0,
      Azure: pricingData.storage.find(s => s.provider === 'azure' && s.storageType === 'object')?.pricePerGBMonth || 0,
    },
    {
      name: 'Block Storage',
      AWS: pricingData.storage.find(s => s.provider === 'aws' && s.storageType === 'block')?.pricePerGBMonth || 0,
      GCP: pricingData.storage.find(s => s.provider === 'gcp' && s.storageType === 'block')?.pricePerGBMonth || 0,
      Azure: pricingData.storage.find(s => s.provider === 'azure' && s.storageType === 'block')?.pricePerGBMonth || 0,
    },
  ];

  const bandwidthData = [
    {
      name: 'Egress (per GB)',
      AWS: pricingData.bandwidth.find(b => b.provider === 'aws' && b.direction === 'egress')?.pricePerGB || 0,
      GCP: pricingData.bandwidth.find(b => b.provider === 'gcp' && b.direction === 'egress')?.pricePerGB || 0,
      Azure: pricingData.bandwidth.find(b => b.provider === 'azure' && b.direction === 'egress')?.pricePerGB || 0,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-black/80 border border-white/20 rounded-lg p-3">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ${entry.value.toFixed(3)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Compute Pricing Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={computeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="AWS" fill="#FF9900" />
            <Bar dataKey="GCP" fill="#4285F4" />
            <Bar dataKey="Azure" fill="#0078D4" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-4">Monthly cost in USD</p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Storage Pricing Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={storageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="AWS" fill="#FF9900" />
            <Bar dataKey="GCP" fill="#4285F4" />
            <Bar dataKey="Azure" fill="#0078D4" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-4">Price per GB per month in USD</p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Bandwidth Pricing Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bandwidthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="AWS" fill="#FF9900" />
            <Bar dataKey="GCP" fill="#4285F4" />
            <Bar dataKey="Azure" fill="#0078D4" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-4">Price per GB in USD</p>
      </GlassCard>
    </div>
  );
};

