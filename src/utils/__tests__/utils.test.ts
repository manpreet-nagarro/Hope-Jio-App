import { normalizePlatformName, isTempId } from '../utils';

describe('normalizePlatformName', () => {
  it('returns lowercased, trimmed platform name', () => {
    expect(normalizePlatformName('  Android ')).toBe('android');
    expect(normalizePlatformName('IOS')).toBe('ios');
    expect(normalizePlatformName('')).toBe('');
    expect(normalizePlatformName()).toBe('');
  });
});

describe('isTempId', () => {
  it('returns true for temp id strings', () => {
    expect(isTempId('fe__id__slot__123')).toBe(true);
    expect(isTempId('fe__id__slot__abc')).toBe(true);
  });
  it('returns false for non-temp id strings', () => {
    expect(isTempId('abc')).toBe(false);
    expect(isTempId('fe_id_slot_123')).toBe(false);
    expect(isTempId('')).toBe(false);
    expect(isTempId(undefined)).toBe(false);
    expect(isTempId(null)).toBe(false);
    expect(isTempId(123)).toBe(false);
  });
});
