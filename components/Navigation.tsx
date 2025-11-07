'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassCard } from './ui';

export const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/calculators/compute', label: 'Compute' },
    { href: '/calculators/storage', label: 'Storage' },
    { href: '/calculators/bandwidth', label: 'Bandwidth' },
    { href: '/calculators/capacity', label: 'Capacity' },
    { href: '/quick-ref', label: 'Quick Ref' },
    { href: '/compare', label: 'Compare' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <GlassCard className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CloudSolutions
            </div>
          </Link>
          
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-4 py-2 rounded-lg transition-all duration-300
                  ${pathname === item.href 
                    ? 'bg-white/20 text-white font-medium' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </GlassCard>
    </nav>
  );
};

