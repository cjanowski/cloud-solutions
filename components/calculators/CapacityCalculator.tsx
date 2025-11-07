'use client';

import { useState } from 'react';
import { GlassCard, GlassInput, GlassSelect, GlassButton } from '@/components/ui';

export const CapacityCalculator = () => {
  // Load parameters
  const [dau, setDau] = useState(1000000);
  const [readWriteRatio, setReadWriteRatio] = useState(10);
  const [writesPerUser, setWritesPerUser] = useState(5);
  const [dataPerWrite, setDataPerWrite] = useState(1);
  const [dataUnit, setDataUnit] = useState<'KB' | 'MB' | 'GB'>('KB');
  const [retentionMonths, setRetentionMonths] = useState(12);
  const [precisionMode, setPrecisionMode] = useState(false);
  
  // Advanced parameters
  const [peakTrafficMultiplier, setPeakTrafficMultiplier] = useState(3);
  const [replicationFactor, setReplicationFactor] = useState(3);
  const [compressionRatio, setCompressionRatio] = useState(0.3);

  // Calculate results
  const calculateResults = () => {
    const secondsPerDay = precisionMode ? 86400 : 100000;
    const bytesMultiplier = precisionMode ? 1024 : 1000;
    
    // Convert data to bytes
    let dataInBytes = dataPerWrite;
    if (dataUnit === 'KB') dataInBytes *= bytesMultiplier;
    else if (dataUnit === 'MB') dataInBytes *= Math.pow(bytesMultiplier, 2);
    else if (dataUnit === 'GB') dataInBytes *= Math.pow(bytesMultiplier, 3);
    
    // Calculate RPS
    const totalReadsPerDay = dau * writesPerUser * readWriteRatio;
    const totalWritesPerDay = dau * writesPerUser;
    const readRPS = totalReadsPerDay / secondsPerDay;
    const writeRPS = totalWritesPerDay / secondsPerDay;
    const peakReadRPS = readRPS * peakTrafficMultiplier;
    const peakWriteRPS = writeRPS * peakTrafficMultiplier;
    
    // Calculate storage
    const dailyStorageBytes = totalWritesPerDay * dataInBytes;
    const compressedDailyStorage = dailyStorageBytes * (1 - compressionRatio);
    const monthlyStorageBytes = compressedDailyStorage * 30;
    const totalStorageBytes = monthlyStorageBytes * retentionMonths;
    const totalWithReplication = totalStorageBytes * replicationFactor;
    
    // Calculate bandwidth
    const readBandwidthBps = readRPS * dataInBytes * 8;
    const writeBandwidthBps = writeRPS * dataInBytes * 8;
    const peakReadBandwidthBps = peakReadRPS * dataInBytes * 8;
    const peakWriteBandwidthBps = peakWriteRPS * dataInBytes * 8;
    
    return {
      readRPS: Math.round(readRPS),
      writeRPS: Math.round(writeRPS),
      peakReadRPS: Math.round(peakReadRPS),
      peakWriteRPS: Math.round(peakWriteRPS),
      dailyStorage: formatBytes(compressedDailyStorage, precisionMode),
      monthlyStorage: formatBytes(monthlyStorageBytes, precisionMode),
      totalStorage: formatBytes(totalStorageBytes, precisionMode),
      totalWithReplication: formatBytes(totalWithReplication, precisionMode),
      readBandwidth: formatBandwidth(readBandwidthBps),
      writeBandwidth: formatBandwidth(writeBandwidthBps),
      peakReadBandwidth: formatBandwidth(peakReadBandwidthBps),
      peakWriteBandwidth: formatBandwidth(peakWriteBandwidthBps),
      totalRequests: Math.round(readRPS + writeRPS),
      peakTotalRequests: Math.round(peakReadRPS + peakWriteRPS)
    };
  };

  const formatBytes = (bytes: number, precision: boolean) => {
    const divisor = precision ? 1024 : 1000;
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= divisor && unitIndex < units.length - 1) {
      size /= divisor;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatBandwidth = (bps: number) => {
    const units = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    let bandwidth = bps;
    let unitIndex = 0;
    
    while (bandwidth >= 1000 && unitIndex < units.length - 1) {
      bandwidth /= 1000;
      unitIndex++;
    }
    
    return `${bandwidth.toFixed(2)} ${units[unitIndex]}`;
  };

  const results = calculateResults();

  const referenceData = {
    images: [
      { quality: 'Thumbnail', size: '10 KB', example: 'Small website images' },
      { quality: 'Low', size: '50 KB', example: 'Compressed photos' },
      { quality: 'Medium', size: '100 KB', example: 'Website photos' },
      { quality: 'High', size: '2 MB', example: 'Phone camera photo' },
      { quality: 'Very High', size: '20 MB', example: 'RAW photographer image' }
    ],
    videos: [
      { quality: '480p', size: '2 MB/min', example: 'Low quality streaming' },
      { quality: '720p', size: '5 MB/min', example: 'HD streaming' },
      { quality: '1080p', size: '20 MB/min', example: 'Full HD streaming' },
      { quality: '4K', size: '80 MB/min', example: 'Ultra HD streaming' }
    ],
    audio: [
      { quality: 'Low MP3', size: '700 KB', example: '3-minute song' },
      { quality: 'High MP3', size: '3 MB', example: '3-minute song' },
      { quality: 'Lossless', size: '30 MB', example: '3-minute song' }
    ],
    bandwidth: [
      { application: 'VoIP calling', bandwidth: '80 Kbps' },
      { application: 'Screen sharing', bandwidth: '150 Kbps' },
      { application: 'Live webinars', bandwidth: '0.5 Mbps' },
      { application: '720p video call', bandwidth: '3 Mbps' },
      { application: '1080p streaming', bandwidth: '5 Mbps' },
      { application: '4K streaming', bandwidth: '25 Mbps' }
    ],
    latency: [
      { storage: 'Memory (RAM)', latency: '0.01 ms', relative: 'Baseline' },
      { storage: 'SSD', latency: '0.2 ms', relative: '20x slower' },
      { storage: 'HDD', latency: '3 ms', relative: '300x slower' },
      { storage: 'Network (same DC)', latency: '0.5 ms', relative: '50x slower' },
      { storage: 'Network (cross-region)', latency: '50-100 ms', relative: '5000x+ slower' }
    ]
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">System Parameters</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">Precision Mode</span>
            <button
              onClick={() => setPrecisionMode(!precisionMode)}
              className={`
                relative w-14 h-7 rounded-full transition-colors duration-300
                ${precisionMode ? 'bg-blue-500' : 'bg-white/20'}
              `}
            >
              <div className={`
                absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300
                ${precisionMode ? 'translate-x-7' : 'translate-x-0'}
              `} />
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <GlassInput
            type="number"
            label="Daily Active Users (DAU)"
            value={dau}
            onChange={(e) => setDau(Number(e.target.value))}
            min={1}
          />
          <GlassInput
            type="number"
            label="Read:Write Ratio"
            value={readWriteRatio}
            onChange={(e) => setReadWriteRatio(Number(e.target.value))}
            min={1}
          />
          <GlassInput
            type="number"
            label="Writes per User per Day"
            value={writesPerUser}
            onChange={(e) => setWritesPerUser(Number(e.target.value))}
            min={1}
          />
          <GlassInput
            type="number"
            label="Data per Write"
            value={dataPerWrite}
            onChange={(e) => setDataPerWrite(Number(e.target.value))}
            min={0.001}
            step={0.1}
          />
          <GlassSelect
            label="Data Unit"
            value={dataUnit}
            onChange={(e) => setDataUnit(e.target.value as 'KB' | 'MB' | 'GB')}
            options={[
              { value: 'KB', label: 'Kilobytes (KB)' },
              { value: 'MB', label: 'Megabytes (MB)' },
              { value: 'GB', label: 'Gigabytes (GB)' }
            ]}
          />
          <GlassInput
            type="number"
            label="Data Retention (months)"
            value={retentionMonths}
            onChange={(e) => setRetentionMonths(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Advanced Parameters</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassInput
              type="number"
              label="Peak Traffic Multiplier"
              value={peakTrafficMultiplier}
              onChange={(e) => setPeakTrafficMultiplier(Number(e.target.value))}
              min={1}
              step={0.5}
            />
            <GlassInput
              type="number"
              label="Replication Factor"
              value={replicationFactor}
              onChange={(e) => setReplicationFactor(Number(e.target.value))}
              min={1}
            />
            <GlassInput
              type="number"
              label="Compression Ratio (0-1)"
              value={compressionRatio}
              onChange={(e) => setCompressionRatio(Number(e.target.value))}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </div>

        {!precisionMode && (
          <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm text-yellow-300">
              💡 Precision Mode is OFF: Using 100,000 seconds/day and 1000-byte units for quick estimates.
              Enable for exact calculations (86,400 seconds/day, 1024-byte units).
            </p>
          </div>
        )}
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Traffic & Load</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Average Read Requests/sec</div>
              <div className="text-3xl font-bold text-blue-400">{results.readRPS.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Average Write Requests/sec</div>
              <div className="text-3xl font-bold text-green-400">{results.writeRPS.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Total Average RPS</div>
              <div className="text-3xl font-bold text-white">{results.totalRequests.toLocaleString()}</div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-white/70 mb-2">Peak Traffic (×{peakTrafficMultiplier})</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-blue-500/20 text-center">
                  <div className="text-xs text-white/70">Peak Read</div>
                  <div className="text-lg font-bold text-blue-300">{results.peakReadRPS.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded bg-green-500/20 text-center">
                  <div className="text-xs text-white/70">Peak Write</div>
                  <div className="text-lg font-bold text-green-300">{results.peakWriteRPS.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Storage Requirements</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Daily Storage (compressed)</div>
              <div className="text-3xl font-bold text-purple-400">{results.dailyStorage}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Monthly Storage</div>
              <div className="text-3xl font-bold text-pink-400">{results.monthlyStorage}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Total Storage ({retentionMonths} months)</div>
              <div className="text-3xl font-bold text-white">{results.totalStorage}</div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-white/70 mb-2">With Replication (×{replicationFactor})</div>
              <div className="p-3 rounded bg-orange-500/20 text-center">
                <div className="text-2xl font-bold text-orange-300">{results.totalWithReplication}</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Bandwidth Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Average Bandwidth</h3>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Read Bandwidth</div>
              <div className="text-2xl font-bold text-blue-400">{results.readBandwidth}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Write Bandwidth</div>
              <div className="text-2xl font-bold text-green-400">{results.writeBandwidth}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Peak Bandwidth</h3>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Peak Read Bandwidth</div>
              <div className="text-2xl font-bold text-blue-400">{results.peakReadBandwidth}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-white/70">Peak Write Bandwidth</div>
              <div className="text-2xl font-bold text-green-400">{results.peakWriteBandwidth}</div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Reference Data</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Image Sizes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Quality</th>
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Size</th>
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {referenceData.images.map((img, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      <td className="py-2 px-4 text-white">{img.quality}</td>
                      <td className="py-2 px-4 text-blue-300">{img.size}</td>
                      <td className="py-2 px-4 text-white/70 text-sm">{img.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Video Sizes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Quality</th>
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Size</th>
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {referenceData.videos.map((vid, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      <td className="py-2 px-4 text-white">{vid.quality}</td>
                      <td className="py-2 px-4 text-green-300">{vid.size}</td>
                      <td className="py-2 px-4 text-white/70 text-sm">{vid.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Audio Sizes</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-4 text-white/70 text-sm">Quality</th>
                      <th className="text-left py-2 px-4 text-white/70 text-sm">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceData.audio.map((aud, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="py-2 px-4 text-white">{aud.quality}</td>
                        <td className="py-2 px-4 text-purple-300">{aud.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Bandwidth by Application</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-4 text-white/70 text-sm">Application</th>
                      <th className="text-left py-2 px-4 text-white/70 text-sm">Bandwidth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceData.bandwidth.map((bw, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="py-2 px-4 text-white text-sm">{bw.application}</td>
                        <td className="py-2 px-4 text-cyan-300">{bw.bandwidth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Storage Latency</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Storage Type</th>
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Latency</th>
                    <th className="text-left py-2 px-4 text-white/70 text-sm">Relative Speed</th>
                  </tr>
                </thead>
                <tbody>
                  {referenceData.latency.map((lat, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      <td className="py-2 px-4 text-white">{lat.storage}</td>
                      <td className="py-2 px-4 text-yellow-300">{lat.latency}</td>
                      <td className="py-2 px-4 text-white/70 text-sm">{lat.relative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>
        <div className="space-y-2 text-sm text-white/70">
          <div>• <strong>Compression:</strong> Reduces storage by {(compressionRatio * 100).toFixed(0)}% (e.g., gzip, zstd)</div>
          <div>• <strong>Replication:</strong> {replicationFactor}x copies for high availability and disaster recovery</div>
          <div>• <strong>Peak Traffic:</strong> Design for {peakTrafficMultiplier}x average load to handle traffic spikes</div>
          <div>• <strong>Read/Write Ratio:</strong> {readWriteRatio}:1 ratio influences caching strategy and database selection</div>
          <div>• <strong>Precision Mode:</strong> {precisionMode ? 'Exact calculations (86,400 sec/day, 1024-byte units)' : 'Quick estimates (100,000 sec/day, 1000-byte units)'}</div>
        </div>
      </GlassCard>
    </div>
  );
};

