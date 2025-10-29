import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log to console (replace with your analytics service)
    console.log('[Web Vitals]', {
      metric: body.name,
      value: body.value,
      rating: body.rating,
      route: body.route,
      device: body.deviceType,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send to analytics service (Google Analytics, Plausible, etc.)
    // await fetch('your-analytics-endpoint', { ... });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vitals logging error:', error);
    return NextResponse.json({ error: 'Failed to log vitals' }, { status: 500 });
  }
}
