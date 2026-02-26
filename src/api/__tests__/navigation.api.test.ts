import { fetchNavigation } from '../navigation.api';
import { apiFetch } from '../ApiFetcher';

jest.mock('../ApiFetcher');
jest.mock('../api-paths', () => ({
  NAVIGATION_API_BASE_URL: 'http://mock-base-url',
}));
jest.mock('@auth/keycloak', () => ({ default: {} }));

describe('fetchNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls apiFetch with correct navigation API URL', async () => {
    const mockData = {
      data: {
        user: {
          tenant: 'test-tenant',
          team: 'test-team',
          role: 'admin',
          email: 'test@example.com',
          name: 'Test User',
        },
        privileges: ['read', 'write'],
        navigation: [
          {
            title: 'Dashboard',
            description: 'Main dashboard',
            iconUrl: '/icons/dashboard.svg',
            pageUrl: '/dashboard',
            priority: 1,
            permissions: {
              read: true,
              write: true,
              approve: false,
            },
          },
        ],
      },
      detailed_message: 'Navigation data fetched successfully',
      status_message: 'Success',
      status_code: 200,
      status: 'ok',
    };

    (apiFetch as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchNavigation();

    expect(apiFetch).toHaveBeenCalledWith(
      'http://mock-base-url/api/user/context'
    );
    expect(result).toEqual(mockData);
  });

  it('returns navigation data with user and privileges information', async () => {
    const mockData = {
      data: {
        user: {
          tenant: 'tenant-123',
          team: 'engineering',
          role: 'user',
          email: 'user@company.com',
          name: 'John Doe',
        },
        privileges: ['read'],
        navigation: [],
      },
      detailed_message: 'User context retrieved',
      status_message: 'OK',
      status_code: 200,
      status: 'ok',
    };

    (apiFetch as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchNavigation();

    expect(result.data.user.name).toBe('John Doe');
    expect(result.data.user.role).toBe('user');
    expect(result.data.privileges).toContain('read');
  });

  it('throws an error when apiFetch rejects', async () => {
    const mockError = new Error('Network error');
    (apiFetch as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchNavigation()).rejects.toThrow('Network error');
  });

  it('handles 401 unauthorized error', async () => {
    const mockError = new Error('Unauthorized');
    (apiFetch as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchNavigation()).rejects.toThrow();
  });

  it('returns data with multiple navigation items', async () => {
    const mockData = {
      data: {
        user: {
          tenant: 'test-tenant',
          team: 'test-team',
          role: 'admin',
          email: 'admin@example.com',
          name: 'Admin User',
        },
        privileges: ['read', 'write', 'approve'],
        navigation: [
          {
            title: 'Dashboard',
            description: 'Main dashboard',
            iconUrl: '/icons/dashboard.svg',
            pageUrl: '/dashboard',
            priority: 1,
            permissions: {
              read: true,
              write: true,
              approve: true,
            },
          },
          {
            title: 'Reports',
            description: 'Generate reports',
            iconUrl: '/icons/reports.svg',
            pageUrl: '/reports',
            priority: 2,
            permissions: {
              read: true,
              write: true,
              approve: false,
            },
          },
        ],
      },
      detailed_message: 'Navigation data fetched successfully',
      status_message: 'Success',
      status_code: 200,
      status: 'ok',
    };

    (apiFetch as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchNavigation();

    expect(result.data.navigation).toHaveLength(2);
    expect(result.data.navigation[0].title).toBe('Dashboard');
    expect(result.data.navigation[1].title).toBe('Reports');
  });

  it('returns promise that resolves to INavigationDataResponse type', async () => {
    const mockData = {
      data: {
        user: {
          tenant: 'test-tenant',
          team: 'test-team',
          role: 'user',
          email: 'test@example.com',
          name: 'Test User',
        },
        privileges: [],
        navigation: [],
      },
      detailed_message: 'Success',
      status_message: 'OK',
      status_code: 200,
      status: 'ok',
    };

    (apiFetch as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchNavigation();

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('status_code');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('detailed_message');
  });
});
