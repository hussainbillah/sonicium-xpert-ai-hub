
// Sample data for SEO audit graphs
export const coreWebVitalsData = [
  { name: 'LCP', score: 2.4, threshold: 2.5, color: '#22c55e' },
  { name: 'FID', score: 18, threshold: 100, color: '#22c55e' },
  { name: 'CLS', score: 0.1, threshold: 0.1, color: '#f59e0b' },
];

export const pageSpeedData = [
  { name: 'Home', mobile: 65, desktop: 89 },
  { name: 'Products', mobile: 58, desktop: 82 },
  { name: 'Blog', mobile: 71, desktop: 94 },
  { name: 'Contact', mobile: 69, desktop: 91 },
];

export const crawlErrorsData = [
  { name: '404', count: 12 },
  { name: 'Server Error', count: 3 },
  { name: 'Redirect', count: 24 },
  { name: 'DNS', count: 1 },
];

export const schemaUsageData = [
  { name: 'Product', value: 45, color: "#3b82f6" },
  { name: 'Article', value: 20, color: "#22c55e" },
  { name: 'LocalBusiness', value: 15, color: "#f59e0b" },
  { name: 'FAQ', value: 10, color: "#8b5cf6" },
  { name: 'Other', value: 10, color: "#6b7280" },
];

export const bounceRateData = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  rate: 40 + Math.random() * 20,
}));
