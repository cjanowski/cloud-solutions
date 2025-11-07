import { GlassCard } from '@/components/ui';
import Link from 'next/link';

export default function GPUHPCPage() {
  const gpuOptions = [
    {
      name: 'NVIDIA A100',
      memory: '40GB / 80GB',
      architecture: 'Ampere',
      performance: '312 TFLOPS (FP16)',
      bestFor: ['Training large models', 'Multi-instance GPU', 'HPC workloads'],
      providers: {
        aws: 'p4d.24xlarge (8x A100 80GB)',
        gcp: 'a2-highgpu-8g (8x A100 40GB)',
        azure: 'ND A100 v4-series'
      }
    },
    {
      name: 'NVIDIA H100',
      memory: '80GB',
      architecture: 'Hopper',
      performance: '1000 TFLOPS (FP8)',
      bestFor: ['LLM training', 'Transformer models', 'Cutting-edge AI'],
      providers: {
        aws: 'p5.48xlarge (8x H100)',
        gcp: 'a3-highgpu-8g (8x H100)',
        azure: 'ND H100 v5-series'
      }
    },
    {
      name: 'NVIDIA L40',
      memory: '48GB',
      architecture: 'Ada Lovelace',
      performance: '362 TFLOPS (FP16)',
      bestFor: ['Inference', 'Graphics + AI', 'Cost-effective training'],
      providers: {
        aws: 'g6.xlarge - g6.48xlarge',
        gcp: 'g2-standard series',
        azure: 'NC L40 v3-series'
      }
    },
    {
      name: 'NVIDIA V100',
      memory: '16GB / 32GB',
      architecture: 'Volta',
      performance: '125 TFLOPS (FP16)',
      bestFor: ['Legacy workloads', 'Cost-effective training', 'General AI'],
      providers: {
        aws: 'p3.2xlarge - p3dn.24xlarge',
        gcp: 'n1-standard with V100',
        azure: 'NC v3-series'
      }
    }
  ];

  const cloudAccelerators = [
    {
      name: 'AWS Inferentia',
      type: 'Inference',
      performance: 'Up to 2000 TOPS (INT8)',
      costBenefit: '70% lower cost vs GPU',
      bestFor: ['LLM inference', 'NLP models', 'Computer vision inference'],
      instances: ['inf1.xlarge', 'inf1.24xlarge', 'inf2.xlarge', 'inf2.48xlarge'],
      frameworks: ['PyTorch', 'TensorFlow', 'MXNet']
    },
    {
      name: 'AWS Trainium',
      type: 'Training',
      performance: 'Up to 6 petaFLOPS',
      costBenefit: '50% lower cost vs GPU',
      bestFor: ['LLM training', 'Foundation models', 'Large-scale training'],
      instances: ['trn1.2xlarge', 'trn1.32xlarge', 'trn1n.32xlarge'],
      frameworks: ['PyTorch', 'TensorFlow']
    },
    {
      name: 'Google TPU v4',
      type: 'Training & Inference',
      performance: '275 TFLOPS (BF16)',
      costBenefit: 'Optimized for TensorFlow',
      bestFor: ['TensorFlow models', 'JAX workloads', 'Large batch training'],
      instances: ['TPU v4 Pods (up to 4096 chips)'],
      frameworks: ['TensorFlow', 'JAX', 'PyTorch (XLA)']
    },
    {
      name: 'Google TPU v5e',
      type: 'Training & Inference',
      performance: '197 TFLOPS (BF16)',
      costBenefit: 'Cost-optimized TPU',
      bestFor: ['Cost-effective training', 'Inference at scale', 'Research'],
      instances: ['TPU v5e Pods'],
      frameworks: ['TensorFlow', 'JAX', 'PyTorch (XLA)']
    }
  ];

  const hpcPatterns = [
    {
      pattern: 'Distributed Training',
      description: 'Train large models across multiple GPUs/nodes',
      frameworks: ['Horovod', 'DeepSpeed', 'PyTorch DDP', 'TensorFlow MirroredStrategy'],
      considerations: ['Network bandwidth critical', 'Use NCCL for GPU communication', 'Consider gradient accumulation']
    },
    {
      pattern: 'Model Parallelism',
      description: 'Split model layers across multiple devices',
      frameworks: ['Megatron-LM', 'DeepSpeed', 'PyTorch FSDP', 'Alpa'],
      considerations: ['For models too large for single GPU', 'Pipeline parallelism for efficiency', 'Tensor parallelism for transformers']
    },
    {
      pattern: 'Mixed Precision Training',
      description: 'Use FP16/BF16 to accelerate training',
      frameworks: ['NVIDIA Apex', 'PyTorch AMP', 'TensorFlow mixed_precision'],
      considerations: ['2x faster training', 'Reduced memory usage', 'Loss scaling for stability']
    },
    {
      pattern: 'Inference Optimization',
      description: 'Optimize models for production inference',
      frameworks: ['TensorRT', 'ONNX Runtime', 'TorchScript', 'OpenVINO'],
      considerations: ['Quantization (INT8/INT4)', 'Model pruning', 'Knowledge distillation']
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/quick-ref" className="text-white/70 hover:text-white text-sm mb-2 inline-block">
          ← Back to Quick Reference
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          GPU & High-Performance Computing
        </h1>
        <p className="text-white/70">
          Deep dive into GPU acceleration, cloud accelerators, and HPC architectures
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">NVIDIA GPU Comparison</h2>
        <div className="space-y-6">
          {gpuOptions.map((gpu, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{gpu.name}</h3>
                  <p className="text-sm text-white/70">{gpu.architecture} Architecture</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/70">Memory</div>
                  <div className="text-lg font-semibold text-white">{gpu.memory}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/70 mb-2">Performance</div>
                  <div className="text-white font-medium">{gpu.performance}</div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-2">Best For</div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {gpu.bestFor.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm text-white/70 mb-3">Cloud Provider Instances</div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-blue-300 font-medium">AWS:</span>
                    <span className="text-white/80 text-sm ml-2">{gpu.providers.aws}</span>
                  </div>
                  <div>
                    <span className="text-green-300 font-medium">GCP:</span>
                    <span className="text-white/80 text-sm ml-2">{gpu.providers.gcp}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Azure:</span>
                    <span className="text-white/80 text-sm ml-2">{gpu.providers.azure}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Cloud-Specific Accelerators</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cloudAccelerators.map((acc, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-white">{acc.name}</h3>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                  {acc.type}
                </span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-white/70">Performance: </span>
                  <span className="text-sm text-white">{acc.performance}</span>
                </div>
                <div>
                  <span className="text-sm text-white/70">Cost Benefit: </span>
                  <span className="text-sm text-green-400">{acc.costBenefit}</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-2">Best For:</div>
                <ul className="text-sm text-white/80 space-y-1">
                  {acc.bestFor.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-xs text-white/70 mb-1">Instances:</div>
                <div className="text-xs text-white/80">{acc.instances.join(', ')}</div>
              </div>

              <div>
                <div className="text-xs text-white/70 mb-1">Frameworks:</div>
                <div className="flex gap-2 flex-wrap">
                  {acc.frameworks.map((fw, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/10 text-white text-xs">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">HPC Patterns & Best Practices</h2>
        <div className="space-y-4">
          {hpcPatterns.map((pattern, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">{pattern.pattern}</h3>
              <p className="text-white/70">{pattern.description}</p>
              
              <div>
                <div className="text-sm text-white/70 mb-2">Frameworks:</div>
                <div className="flex gap-2 flex-wrap">
                  {pattern.frameworks.map((fw, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-2">Key Considerations:</div>
                <ul className="text-sm text-white/80 space-y-1">
                  {pattern.considerations.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Tips</h3>
        <div className="space-y-2 text-sm text-white/70">
          <div>• <strong>A100 vs H100:</strong> H100 offers 3x performance for transformers, but A100 is more cost-effective for many workloads</div>
          <div>• <strong>Inferentia/Trainium:</strong> Best for AWS-native deployments with significant cost savings</div>
          <div>• <strong>TPUs:</strong> Optimal for TensorFlow/JAX, especially for research and large-scale training</div>
          <div>• <strong>L40:</strong> Great for inference and mixed graphics+AI workloads</div>
          <div>• <strong>Network:</strong> Use instances with high network bandwidth (400 Gbps+) for multi-node training</div>
        </div>
      </GlassCard>
    </div>
  );
}

