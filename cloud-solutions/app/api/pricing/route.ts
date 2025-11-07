import { NextResponse } from 'next/server';
import { PricingClient } from '@/lib/api-clients/pricing-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pricingData = await PricingClient.getPricing();
    
    return NextResponse.json(pricingData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
      { status: 500 }
    );
  }
}

