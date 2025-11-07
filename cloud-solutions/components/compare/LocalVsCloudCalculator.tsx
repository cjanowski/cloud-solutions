'use client';

import { useState, useEffect } from 'react';
import { GlassCard, GlassInput, GlassSelect } from '@/components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PricingData } from '@/lib/pricing-data';

export const LocalVsCloudCalculator = () => {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Storage parameters
  const [storageCapacityTB, setStorageCapacityTB] = useState(10);
  const [growthRatePercent, setGrowthRatePercent] = useState(20);
  const [yearsToProject, setYearsToProject] = useState(5);
  
  // Local storage costs
  const [hardwareCostPerTB, setHardwareCostPerTB] = useState(200);
  const [serverCost, setServerCost] = useState(5000);
  const [networkEquipmentCost, setNetworkEquipmentCost] = useState(2000);
  const [annualMaintenancePercent, setAnnualMaintenancePercent] = useState(15);
  const [powerCostPerYear, setPowerCostPerYear] = useState(1200);
  const [coolingCostPerYear, setCoolingCostPerYear] = useState(800);
  const [spaceCostPerYear, setSpaceCostPerYear] = useState(2400);
  const [staffCostPerYear, setStaffCostPerYear] = useState(60000);
  
  // Cloud provider selection
  const [cloudProvider, setCloudProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');

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

  const calculateTCO = () => {
    if (!pricingData) return { localData: [], cloudData: [], summary: null };

    const cloudPricePerGBMonth = pricingData.storage.find(
      s => s.provider === cloudProvider && s.storageType === 'object'
    )?.pricePerGBMonth || 0.023;

    const localData: Array<{ year: number; local: number; capacity: string }> = [];
    const cloudData: Array<{ year: number; cloud: number; capacity: string }> = [];
    let localCumulative = 0;
    let cloudCumulative = 0;

    for (let year = 0; year <= yearsToProject; year++) {
      const currentCapacityTB = storageCapacityTB * Math.pow(1 + growthRatePercent / 100, year);
      
      // Local costs
      let localYearlyCost = 0;
      if (year === 0) {
        // Initial investment
        const hardwareCost = currentCapacityTB * hardwareCostPerTB;
        localYearlyCost = hardwareCost + serverCost + networkEquipmentCost;
      } else {
        // Growth costs
        const additionalCapacityTB = currentCapacityTB - (storageCapacityTB * Math.pow(1 + growthRatePercent / 100, year - 1));
        const additionalHardwareCost = additionalCapacityTB * hardwareCostPerTB;
        localYearlyCost = additionalHardwareCost;
      }
      
      // Ongoing costs
      const maintenanceCost = (currentCapacityTB * hardwareCostPerTB) * (annualMaintenancePercent / 100);
      localYearlyCost += maintenanceCost + powerCostPerYear + coolingCostPerYear + spaceCostPerYear + staffCostPerYear;
      
      localCumulative += localYearlyCost;

      // Cloud costs
      const cloudMonthlyCost = (currentCapacityTB * 1024) * cloudPricePerGBMonth;
      const cloudYearlyCost = cloudMonthlyCost * 12;
      cloudCumulative += cloudYearlyCost;

      localData.push({
        year,
        local: Math.round(localCumulative),
        capacity: currentCapacityTB.toFixed(1)
      });

      cloudData.push({
        year,
        cloud: Math.round(cloudCumulative),
        capacity: currentCapacityTB.toFixed(1)
      });
    }

    // Combine data for chart
    const chartData = localData.map((item, idx) => ({
      year: `Year ${item.year}`,
      Local: item.local,
      Cloud: cloudData[idx].cloud,
      capacity: item.capacity
    }));

    const finalLocalCost = localCumulative;
    const finalCloudCost = cloudCumulative;
    const savings = finalLocalCost - finalCloudCost;
    const breakEvenYear = chartData.findIndex(d => d.Cloud > d.Local);

    return {
      chartData,
      summary: {
        finalLocalCost,
        finalCloudCost,
        savings,
        breakEvenYear: breakEvenYear === -1 ? 'Never' : breakEvenYear,
        recommendation: savings > 0 ? 'Cloud' : 'Local'
      }
    };
  };

  const { chartData, summary } = calculateTCO();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-black/80 border border-white/20 rounded-lg p-3">
          <p className="text-white font-semibold mb-2">{label}</p>
          <p className="text-sm text-white/70 mb-2">Capacity: {payload[0].payload.capacity} TB</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
        <h2 className="text-2xl font-bold text-white mb-6">Storage Parameters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <GlassInput
            type="number"
            label="Initial Storage Capacity (TB)"
            value={storageCapacityTB}
            onChange={(e) => setStorageCapacityTB(Number(e.target.value))}
            min={1}
            max={1000}
          />
          <GlassInput
            type="number"
            label="Annual Growth Rate (%)"
            value={growthRatePercent}
            onChange={(e) => setGrowthRatePercent(Number(e.target.value))}
            min={0}
            max={100}
          />
          <GlassInput
            type="number"
            label="Years to Project"
            value={yearsToProject}
            onChange={(e) => setYearsToProject(Number(e.target.value))}
            min={1}
            max={10}
          />
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-white mb-6">Local Storage Costs</h2>
          <div className="space-y-4">
            <GlassInput
              type="number"
              label="Hardware Cost per TB ($)"
              value={hardwareCostPerTB}
              onChange={(e) => setHardwareCostPerTB(Number(e.target.value))}
              min={0}
            />
            <GlassInput
              type="number"
              label="Server Cost ($)"
              value={serverCost}
              onChange={(e) => setServerCost(Number(e.target.value))}
              min={0}
            />
            <GlassInput
              type="number"
              label="Network Equipment ($)"
              value={networkEquipmentCost}
              onChange={(e) => setNetworkEquipmentCost(Number(e.target.value))}
              min={0}
            />
            <GlassInput
              type="number"
              label="Annual Maintenance (%)"
              value={annualMaintenancePercent}
              onChange={(e) => setAnnualMaintenancePercent(Number(e.target.value))}
              min={0}
              max={100}
            />
            <GlassInput
              type="number"
              label="Power Cost per Year ($)"
              value={powerCostPerYear}
              onChange={(e) => setPowerCostPerYear(Number(e.target.value))}
              min={0}
            />
            <GlassInput
              type="number"
              label="Cooling Cost per Year ($)"
              value={coolingCostPerYear}
              onChange={(e) => setCoolingCostPerYear(Number(e.target.value))}
              min={0}
            />
            <GlassInput
              type="number"
              label="Space Cost per Year ($)"
              value={spaceCostPerYear}
              onChange={(e) => setSpaceCostPerYear(Number(e.target.value))}
              min={0}
            />
            <GlassInput
              type="number"
              label="Staff Cost per Year ($)"
              value={staffCostPerYear}
              onChange={(e) => setStaffCostPerYear(Number(e.target.value))}
              min={0}
            />
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-white mb-6">Cloud Provider</h2>
          <GlassSelect
            label="Select Cloud Provider"
            value={cloudProvider}
            onChange={(e) => setCloudProvider(e.target.value as 'aws' | 'gcp' | 'azure')}
            options={[
              { value: 'aws', label: 'AWS S3' },
              { value: 'gcp', label: 'GCP Cloud Storage' },
              { value: 'azure', label: 'Azure Blob Storage' },
            ]}
          />
          
          {summary && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white">TCO Summary</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-white/70">Local Storage ({yearsToProject} years)</div>
                  <div className="text-2xl font-bold text-white">
                    ${summary.finalLocalCost.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-white/70">Cloud Storage ({yearsToProject} years)</div>
                  <div className="text-2xl font-bold text-white">
                    ${summary.finalCloudCost.toLocaleString()}
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${summary.savings > 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="text-sm text-white/70">
                    {summary.savings > 0 ? 'Savings with Cloud' : 'Savings with Local'}
                  </div>
                  <div className={`text-2xl font-bold ${summary.savings > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${Math.abs(summary.savings).toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-white/70">Break-even Point</div>
                  <div className="text-xl font-bold text-white">
                    {summary.breakEvenYear === 'Never' ? 'Never' : `Year ${summary.breakEvenYear}`}
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${summary.recommendation === 'Cloud' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-purple-500/10 border-purple-500/30'}`}>
                  <div className="text-sm text-white/70">Recommendation</div>
                  <div className="text-xl font-bold text-white">
                    {summary.recommendation} Storage
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Total Cost of Ownership Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="Local" stroke="#8b5cf6" strokeWidth={3} />
            <Line type="monotone" dataKey="Cloud" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-4">Cumulative cost in USD over time</p>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-sm text-white/70 space-y-2">
          <div>
            <strong>Considerations:</strong>
          </div>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Local storage requires upfront capital investment</li>
            <li>Cloud storage offers pay-as-you-go flexibility</li>
            <li>Local storage includes hidden costs (power, cooling, space, staff)</li>
            <li>Cloud storage scales automatically without hardware procurement</li>
            <li>Consider data transfer costs for cloud (egress fees)</li>
            <li>Compliance and data sovereignty requirements may favor local storage</li>
          </ul>
        </div>
      </GlassCard>
    </div>
  );
};

