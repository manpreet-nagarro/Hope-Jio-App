import * as wireframeApi from '../wireframe.api';
import { apiFetch } from '../ApiFetcher';
jest.mock('@auth/keycloak', () => ({ default: {} }));
jest.mock('../ApiFetcher');
jest.mock('../api-paths', () => ({
  WIREFRAMES_API_BASE_URL: 'http://mock-base-url',
}));

describe('wireframe.api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWireframes', () => {
    it('calls apiFetch with correct URL and returns data', async () => {
      (apiFetch as jest.Mock).mockResolvedValue({ data: 'mockData', pagination: 'mockPagination' });
      const result = await wireframeApi.fetchWireframes(1, 10, { searchText: 'foo', store: 's1', platform: 'p1', status: 'active', userCohorts: 'c1' });
      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-base-url/api/wireframes?page=1&size=10&search=foo&store=s1&platform=p1&status=active&userCohorts=c1'
      );
      expect(result).toEqual({ data: 'mockData', pagination: 'mockPagination' });
    });
  });

  describe('createWireframe', () => {
    it('calls apiFetch with correct payload for NEW', async () => {
      const payload = { wireframeName: 'n', slug: 's', platformName: 'p', store: 'st', actionType: 'NEW' as const, sourceWireframeid: '' };
      (apiFetch as jest.Mock).mockResolvedValue('created');
      const result = await wireframeApi.createWireframe(payload);
      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-base-url/api/wireframes',
        {
          method: 'POST',
          body: JSON.stringify({ wireframeName: 'n', slug: 's', platform: 'p', store: 'st', actionType: 'NEW', sourceWireframeid: '' })
        }
      );
      expect(result).toBe('created');
    });
    it('calls apiFetch with correct payload for COPY', async () => {
      const payload = { wireframeName: 'n', slug: 's', platformName: 'p', store: 'st', actionType: 'COPY' as const, sourceWireframeid: 'id123' };
      (apiFetch as jest.Mock).mockResolvedValue('copied');
      const result = await wireframeApi.createWireframe(payload);
      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-base-url/api/wireframes',
        {
          method: 'POST',
          body: JSON.stringify({ wireframeName: 'n', slug: 's', platform: 'p', store: 'st', actionType: 'COPY', sourceWireframeid: 'id123' })
        }
      );
      expect(result).toBe('copied');
    });
  });

  describe('duplicateWireframe', () => {
    it('calls apiFetch with correct payload', async () => {
      (apiFetch as jest.Mock).mockResolvedValue('duplicated');
      const result = await wireframeApi.duplicateWireframe({ wireframeId: 'id123', wireframeName: 'name' });
      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-base-url/api/wireframes',
        {
          method: 'POST',
          body: JSON.stringify({ actionType: 'COPY', sourceWireframeid: 'id123', wireframeName: 'name' })
        }
      );
      expect(result).toBe('duplicated');
    });
  });

  describe('deleteWireframe', () => {
    it('calls apiFetch with correct URL and method', async () => {
      (apiFetch as jest.Mock).mockResolvedValue('deleted');
      const result = await wireframeApi.deleteWireframe('id123');
      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-base-url/api/wireframes/id123',
        { method: 'DELETE' }
      );
      expect(result).toBe('deleted');
    });
  });

  describe('archiveWireframe', () => {
    it('calls apiFetch with correct URL and method', async () => {
      (apiFetch as jest.Mock).mockResolvedValue('archived');
      const result = await wireframeApi.archiveWireframe('id123');
      expect(apiFetch).toHaveBeenCalledWith(
        'http://mock-base-url/api/wireframes/id123/archive',
        { method: 'PUT' }
      );
      expect(result).toBe('archived');
    });
  });
});
