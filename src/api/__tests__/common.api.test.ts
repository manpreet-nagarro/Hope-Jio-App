import { fetchFilters } from '../common.api';
import { apiFetch } from '../ApiFetcher';

jest.mock('../ApiFetcher');
jest.mock('../api-paths', () => ({
  WIREFRAMES_API_BASE_URL: 'http://mock-base-url',
}));
jest.mock('@auth/keycloak', () => ({ default: {} }));
jest.mock('../ApiFetcher');
jest.mock('../api-paths', () => ({
  WIREFRAMES_API_BASE_URL: 'http://mock-base-url',
}));

describe('fetchFilters', () => {
  it('calls apiFetch with correct URL and returns data', async () => {
    const mockData = { store: [], platform: [], status: [], userCohorts: [] };
    (apiFetch as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchFilters();

    expect(apiFetch).toHaveBeenCalledWith(
      'http://mock-base-url/api/wireframes/filter'
    );
    expect(result).toEqual(mockData);
  });

  it('throws if apiFetch rejects', async () => {
    (apiFetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    await expect(fetchFilters()).rejects.toThrow('Network error');
  });
});
