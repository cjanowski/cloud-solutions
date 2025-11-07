// Type definitions for pricing data

export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'local';

export interface ComputeInstance {
  name: string;
  vcpus: number;
  memory: number;
  pricePerHour: number;
  pricePerMonth: number;
  provider: CloudProvider;
  region: string;
  instanceType: string;
}

export interface StoragePricing {
  provider: CloudProvider;
  storageType: 'object' | 'block' | 'file';
  pricePerGBMonth: number;
  region: string;
  serviceName: string;
}

export interface BandwidthPricing {
  provider: CloudProvider;
  region: string;
  pricePerGB: number;
  tier: string;
  direction: 'ingress' | 'egress' | 'inter-region';
}

export interface PricingData {
  compute: ComputeInstance[];
  storage: StoragePricing[];
  bandwidth: BandwidthPricing[];
  lastUpdated: string;
}

export interface ServiceMapping {
  category: string;
  aws: string;
  gcp: string;
  azure: string;
  description: string;
}

export interface LocalStorageOption {
  name: string;
  type: string;
  capacityTB: number;
  upfrontCost: number;
  annualMaintenanceCost: number;
  powerCostPerYear: number;
  lifespanYears: number;
}

export interface ComparisonMetric {
  name: string;
  aws: string | number;
  gcp: string | number;
  azure: string | number;
  winner?: CloudProvider;
}

