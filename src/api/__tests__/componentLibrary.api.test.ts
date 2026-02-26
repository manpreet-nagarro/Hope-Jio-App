import { fetchComponentLibrary } from '../componentLibrary.api';
import { apiFetch } from '../ApiFetcher';

jest.mock('../ApiFetcher');
jest.mock('../api-paths', () => ({
  WIREFRAMES_API_BASE_URL: 'http://mock-base-url',
}));
jest.mock('@auth/keycloak', () => ({ default: {} }));

describe('fetchComponentLibrary', () => {
  it('calls apiFetch with correct URL and returns response', async () => {
    const mockResponse = { categories: [], groups: [] };
    (apiFetch as jest.Mock).mockResolvedValue(mockResponse);
    const result = await fetchComponentLibrary();
    expect(apiFetch).toHaveBeenCalledWith('http://mock-base-url/api/components/library');
    expect(result).toBe(mockResponse);
  });

  it('throws if apiFetch rejects', async () => {
    (apiFetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    await expect(fetchComponentLibrary()).rejects.toThrow('Network error');
  });
});
