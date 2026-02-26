import { slugify } from '../slugify';

describe('slugify', () => {
  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });

  it('converts string to slug', () => {
    expect(slugify('Hello World')).toBe('/hello-world');
    expect(slugify('  Leading and trailing  ')).toBe('/leading-and-trailing');
    expect(slugify('Special!@# Chars')).toBe('/special-chars');
    expect(slugify('Multiple   Spaces')).toBe('/multiple-spaces');
    expect(slugify('UPPER lower')).toBe('/upper-lower');
    expect(slugify('Already-slugified')).toBe('/already-slugified');
  });

  it('handles numbers and dashes', () => {
    expect(slugify('Test 123')).toBe('/test-123');
    expect(slugify('foo-bar-123')).toBe('/foo-bar-123');
  });
});
