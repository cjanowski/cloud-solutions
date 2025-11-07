import Link from 'next/link';
import { GlassCard } from '@/components/ui';
import { ServiceMappings } from '@/components/quick-ref/ServiceMappings';
import { CLICommands } from '@/components/quick-ref/CLICommands';
import { ArchitecturePatterns } from '@/components/quick-ref/ArchitecturePatterns';

export default function QuickRefPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
          Quick Reference Guide
        </h1>
        <p className="text-white/70">
          Fast access to service mappings, CLI commands, and architecture patterns
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/quick-ref/aws">
          <GlassCard className="p-6 text-center space-y-2" hover>
            <div className="text-4xl">☁️</div>
            <h3 className="text-xl font-bold text-white">AWS</h3>
            <p className="text-sm text-white/70">Amazon Web Services</p>
          </GlassCard>
        </Link>
        <Link href="/quick-ref/gcp">
          <GlassCard className="p-6 text-center space-y-2" hover>
            <div className="text-4xl">🌐</div>
            <h3 className="text-xl font-bold text-white">GCP</h3>
            <p className="text-sm text-white/70">Google Cloud Platform</p>
          </GlassCard>
        </Link>
        <Link href="/quick-ref/azure">
          <GlassCard className="p-6 text-center space-y-2" hover>
            <div className="text-4xl">☁️</div>
            <h3 className="text-xl font-bold text-white">Azure</h3>
            <p className="text-sm text-white/70">Microsoft Azure</p>
          </GlassCard>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/quick-ref/gpu-hpc">
          <GlassCard className="p-6 text-center space-y-2" hover>
            <div className="text-4xl">🚀</div>
            <h3 className="text-xl font-bold text-white">GPU & HPC</h3>
            <p className="text-sm text-white/70">High-performance computing & GPU acceleration</p>
          </GlassCard>
        </Link>
        <Link href="/quick-ref/ai-ml">
          <GlassCard className="p-6 text-center space-y-2" hover>
            <div className="text-4xl">🤖</div>
            <h3 className="text-xl font-bold text-white">AI/ML & LLMs</h3>
            <p className="text-sm text-white/70">Transformer architectures & generative AI</p>
          </GlassCard>
        </Link>
        <Link href="/quick-ref/data-analytics">
          <GlassCard className="p-6 text-center space-y-2" hover>
            <div className="text-4xl">📊</div>
            <h3 className="text-xl font-bold text-white">Data Analytics</h3>
            <p className="text-sm text-white/70">Data lakes & real-time platforms</p>
          </GlassCard>
        </Link>
      </div>

      <ServiceMappings />
      <CLICommands />
      <ArchitecturePatterns />
    </div>
  );
}

