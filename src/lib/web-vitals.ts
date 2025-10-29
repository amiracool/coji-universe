import { onCLS, onFID, onLCP, onTTFB, onINP } from 'web-vitals';

interface VitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  route: string;
  deviceType: string;
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function sendToAnalytics(metric: VitalsData) {
  // Send to /api/vitals endpoint
  const body = JSON.stringify(metric);

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body);
  } else {
    fetch('/api/vitals', {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(console.error);
  }
}

export function initWebVitals() {
  const route = window.location.pathname;
  const deviceType = getDeviceType();

  onCLS((metric) => {
    sendToAnalytics({
      name: 'CLS',
      value: metric.value,
      rating: metric.rating,
      route,
      deviceType,
    });
  });

  onFID((metric) => {
    sendToAnalytics({
      name: 'FID',
      value: metric.value,
      rating: metric.rating,
      route,
      deviceType,
    });
  });

  onLCP((metric) => {
    sendToAnalytics({
      name: 'LCP',
      value: metric.value,
      rating: metric.rating,
      route,
      deviceType,
    });
  });

  onTTFB((metric) => {
    sendToAnalytics({
      name: 'TTFB',
      value: metric.value,
      rating: metric.rating,
      route,
      deviceType,
    });
  });

  onINP((metric) => {
    sendToAnalytics({
      name: 'INP',
      value: metric.value,
      rating: metric.rating,
      route,
      deviceType,
    });
  });
}
