
// This file contains helper functions to handle mock data while database tables are being set up

/**
 * Returns mock data for any database table
 * @param tableName The name of the table to get mock data for
 * @returns An array of mock data for the table
 */
export const getMockData = (tableName: string): any[] => {
  const mockData = window.__MOCK_DATA__ || {};
  return mockData[tableName] || [];
};

/**
 * Creates a mock database response object
 * @param data The data to include in the response
 * @returns An object with data and error properties mimicking Supabase response
 */
export const createMockResponse = (data: any) => {
  return {
    data,
    error: null,
  };
};

/**
 * A mock Supabase query builder that can be used in place of real queries while tables are being set up
 * @param tableName The name of the table to query
 * @returns An object with methods that mimic Supabase query builder methods
 */
export const mockQueryBuilder = (tableName: string) => {
  const data = getMockData(tableName);
  
  return {
    select: () => ({
      order: () => ({
        eq: () => createMockResponse(data.length > 0 ? data[0] : null),
        data: createMockResponse(data).data,
        error: null,
      }),
      eq: () => createMockResponse(data.length > 0 ? data[0] : null),
      data: createMockResponse(data).data,
      error: null,
    }),
    update: () => ({
      eq: () => createMockResponse({ success: true }),
    }),
    insert: () => createMockResponse({ success: true }),
    delete: () => ({
      eq: () => createMockResponse({ success: true }),
    }),
    order: () => ({
      data: createMockResponse(data).data,
      error: null,
    }),
  };
};

// Create a type definition for global window object to include our mock data
declare global {
  interface Window {
    __MOCK_DATA__: {
      [key: string]: any[];
    }
  }
}
