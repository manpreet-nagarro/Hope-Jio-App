import { fetchUrls, createURL, editURL } from '../urlmanager.api';
import { apiFetch } from '../ApiFetcher';

jest.mock('../ApiFetcher');
jest.mock('../api-paths', () => ({
  WIREFRAMES_API_BASE_URL: 'http://mock-api-base-url',
}));
jest.mock('@auth/keycloak', () => ({ default: {} }));

describe('urlmanager.api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUrls', () => {
    it('calls apiFetch with correct URL and pagination params', async () => {
      const mockResponse = {
        data: [],
        pagination: {
          page: 1,
          size: 10,
          totalPages: 1,
          last: true,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchUrls(1, 10, {});

      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-api-base-url/api/urls?page=1&size=10'
      );
      expect(result).toEqual(mockResponse);
    });

    it('includes searchText filter in URL params', async () => {
      const mockResponse = {
        data: [],
        pagination: {
          page: 1,
          size: 10,
          totalPages: 1,
          last: true,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetchUrls(1, 10, { searchText: 'test-search' });

      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining('searchTerm=test-search')
      );
    });

    it('includes store filter in URL params', async () => {
      const mockResponse = {
        data: [],
        pagination: {
          page: 1,
          size: 10,
          totalPages: 1,
          last: true,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetchUrls(1, 10, { store: 'store-123' });

      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining('store=store-123')
      );
    });

    it('includes platform filter in URL params', async () => {
      const mockResponse = {
        data: [],
        pagination: {
          page: 1,
          size: 10,
          totalPages: 1,
          last: true,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetchUrls(1, 10, { platform: 'web' });

      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining('platform=web')
      );
    });

    it('includes userCohorts filter in URL params', async () => {
      const mockResponse = {
        data: [],
        pagination: {
          page: 1,
          size: 10,
          totalPages: 1,
          last: true,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetchUrls(1, 10, { userCohorts: 'cohort-1' });

      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining('userCohorts=cohort-1')
      );
    });

    it('includes all filters in URL params when provided', async () => {
      const mockResponse = {
        data: [],
        pagination: {
          page: 2,
          size: 20,
          totalPages: 5,
          last: false,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetchUrls(2, 20, {
        searchText: 'search',
        store: 'store-1',
        platform: 'mobile',
        userCohorts: 'cohort-1',
      });

      const callUrl = (apiFetch as jest.Mock).mock.calls[0][0];
      expect(callUrl).toContain('searchTerm=search');
      expect(callUrl).toContain('store=store-1');
      expect(callUrl).toContain('platform=mobile');
      expect(callUrl).toContain('userCohorts=cohort-1');
    });

    it('returns URL data with pagination info', async () => {
      const mockData = [
        {
          id: 1,
          wireframeId: 'wf-123',
          wireframeName: 'Homepage',
          slug: 'home',
          store: 'store-1',
          platform: 'web',
          scheduleStart: '2026-01-01',
          scheduleEnd: '2026-12-31',
        },
      ];
      const mockResponse = {
        data: mockData,
        pagination: {
          page: 1,
          size: 10,
          totalPages: 5,
          last: false,
        },
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchUrls(1, 10, {});

      expect(result.data).toEqual(mockData);
      expect(result.pagination.totalPages).toBe(5);
      expect(result.pagination.last).toBe(false);
    });

    it('throws error when apiFetch fails', async () => {
      const mockError = new Error('API Error');
      (apiFetch as jest.Mock).mockRejectedValue(mockError);

      await expect(fetchUrls(1, 10, {})).rejects.toThrow('API Error');
    });
  });

  describe('createURL', () => {
    it('calls apiFetch with POST method and correct payload', async () => {
      const payload = {
        id: null,
        wireframeId: 'wf-123',
        wireframeName: 'Homepage',
        slug: 'home',
        store: 'store-1',
        platform: 'web',
        userCohorts: [{ id: 'cohort-1', name: 'Cohort 1' }],
        scheduleStart: '2026-01-01',
        scheduleEnd: '2026-12-31',
      };

      const mockResponse = {
        id: 1,
        status: 'created',
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await createURL(payload);

      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-api-base-url/api/urls',
        {
          method: 'POST',
          body: JSON.stringify({
            wireframeId: 'wf-123',
            slug: 'home',
            platform: 'web',
            store: 'store-1',
            userCohorts: [{ id: 'cohort-1', name: 'Cohort 1' }],
            scheduleStart: '2026-01-01',
            scheduleEnd: '2026-12-31',
          }),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('sends only required fields in POST body', async () => {
      const payload = {
        id: null,
        wireframeId: 'wf-456',
        wireframeName: 'Product Page',
        slug: 'product',
        store: 'store-2',
        platform: 'mobile',
        scheduleStart: '2026-02-01',
        scheduleEnd: '2026-11-30',
      };

      (apiFetch as jest.Mock).mockResolvedValue({ id: 2 });

      await createURL(payload);

      const callArgs = (apiFetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body).toEqual({
        wireframeId: 'wf-456',
        slug: 'product',
        platform: 'mobile',
        store: 'store-2',
        scheduleStart: '2026-02-01',
        scheduleEnd: '2026-11-30',
      });
      expect(body).not.toHaveProperty('id');
      expect(body).not.toHaveProperty('wireframeName');
    });

    it('throws error when apiFetch fails', async () => {
      const payload = {
        id: null,
        wireframeId: 'wf-789',
        wireframeName: 'Test Page',
        slug: 'test',
        store: 'store-3',
        platform: 'tablet',
        scheduleStart: '2026-03-01',
        scheduleEnd: '2026-10-31',
      };

      const mockError = new Error('Failed to create URL');
      (apiFetch as jest.Mock).mockRejectedValue(mockError);

      await expect(createURL(payload)).rejects.toThrow('Failed to create URL');
    });
  });

  describe('editURL', () => {
    it('calls apiFetch with PUT method and correct payload', async () => {
      const payload = {
        id: 1,
        wireframeId: 'wf-123',
        wireframeName: 'Homepage',
        slug: 'home-updated',
        store: 'store-1',
        platform: 'web',
        userCohorts: [{ id: 'cohort-1', name: 'Cohort 1' }],
        scheduleStart: '2026-01-01',
        scheduleEnd: '2026-12-31',
      };

      const mockResponse = {
        id: 1,
        status: 'updated',
      };
      (apiFetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await editURL(payload);

      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-api-base-url/api/urls/1',
        {
          method: 'PUT',
          body: JSON.stringify({
            wireframeId: 'wf-123',
            slug: 'home-updated',
            platform: 'web',
            store: 'store-1',
            userCohorts: [{ id: 'cohort-1', name: 'Cohort 1' }],
            scheduleStart: '2026-01-01',
            scheduleEnd: '2026-12-31',
          }),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('uses correct URL with ID parameter in PUT request', async () => {
      const payload = {
        id: 42,
        wireframeId: 'wf-456',
        wireframeName: 'Product Page',
        slug: 'product',
        store: 'store-2',
        platform: 'mobile',
        scheduleStart: '2026-02-01',
        scheduleEnd: '2026-11-30',
      };

      (apiFetch as jest.Mock).mockResolvedValue({ id: 42 });

      await editURL(payload);

      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-api-base-url/api/urls/42',
        expect.any(Object)
      );
    });

    it('does not include id in request body', async () => {
      const payload = {
        id: 1,
        wireframeId: 'wf-123',
        wireframeName: 'Homepage',
        slug: 'home',
        store: 'store-1',
        platform: 'web',
        scheduleStart: '2026-01-01',
        scheduleEnd: '2026-12-31',
      };

      (apiFetch as jest.Mock).mockResolvedValue({ id: 1 });

      await editURL(payload);

      const callArgs = (apiFetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body).not.toHaveProperty('id');
      expect(body).not.toHaveProperty('wireframeName');
    });

    it('throws error when apiFetch fails', async () => {
      const payload = {
        id: 999,
        wireframeId: 'wf-999',
        wireframeName: 'Error Test',
        slug: 'error',
        store: 'store-999',
        platform: 'web',
        scheduleStart: '2026-01-01',
        scheduleEnd: '2026-12-31',
      };

      const mockError = new Error('Failed to update URL');
      (apiFetch as jest.Mock).mockRejectedValue(mockError);

      await expect(editURL(payload)).rejects.toThrow('Failed to update URL');
    });

    it('correctly formats multiple userCohorts in payload', async () => {
      const payload = {
        id: 5,
        wireframeId: 'wf-multi',
        wireframeName: 'Multi Cohort Page',
        slug: 'multi-cohort',
        store: 'store-1',
        platform: 'web',
        userCohorts: [
          { id: 'cohort-1', name: 'Cohort 1' },
          { id: 'cohort-2', name: 'Cohort 2' },
        ],
        scheduleStart: '2026-01-01',
        scheduleEnd: '2026-12-31',
      };

      (apiFetch as jest.Mock).mockResolvedValue({ id: 5 });

      await editURL(payload);

      const callArgs = (apiFetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.userCohorts).toHaveLength(2);
      expect(body.userCohorts[0]).toEqual({ id: 'cohort-1', name: 'Cohort 1' });
      expect(body.userCohorts[1]).toEqual({ id: 'cohort-2', name: 'Cohort 2' });
    });
  });
});
