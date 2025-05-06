
import { getMockData } from "./mockDatabaseHelper";

export const fetchAnalyticsData = (timeframe: string = "30days") => {
  // This is a mock implementation
  // In a real app, you would use the timeframe to filter the data
  
  // Mock analytics data
  const mockData = {
    impressions: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [4200, 3800, 5100, 4800],
    },
    clicks: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [320, 280, 350, 310],
    },
    conversions: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [42, 36, 48, 40],
    },
    platforms: {
      labels: ['Facebook', 'Google', 'Instagram', 'Twitter', 'LinkedIn'],
      data: [35, 25, 20, 10, 10],
    },
    devices: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      data: [45, 40, 15],
    },
    demographics: {
      age: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        data: [15, 30, 25, 20, 10],
      },
      gender: {
        labels: ['Male', 'Female', 'Other'],
        data: [48, 46, 6],
      },
    },
  };
  
  return mockData;
  
  // When database tables are set up, uncomment this code:
  /*
  // Use mock data helper for now
  const analyticsData = getMockData('analytics');
  
  // Add timeframe filter logic here
  
  return processAnalyticsData(analyticsData);
  */
};

// Helper function to process the analytics data
const processAnalyticsData = (data: any[]) => {
  // This would process your actual data structure
  // For now, we're using mock data so this returns mock data
  return {
    impressions: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [4200, 3800, 5100, 4800],
    },
    clicks: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [320, 280, 350, 310],
    },
    conversions: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [42, 36, 48, 40],
    },
    platforms: {
      labels: ['Facebook', 'Google', 'Instagram', 'Twitter', 'LinkedIn'],
      data: [35, 25, 20, 10, 10],
    },
    devices: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      data: [45, 40, 15],
    },
    demographics: {
      age: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        data: [15, 30, 25, 20, 10],
      },
      gender: {
        labels: ['Male', 'Female', 'Other'],
        data: [48, 46, 6],
      },
    },
  };
};
