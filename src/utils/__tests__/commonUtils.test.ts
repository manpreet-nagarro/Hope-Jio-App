import * as commonUtils from '../commonUtils';

describe('commonUtils', () => {
  describe('getNameInitials', () => {
    it('returns initials for a name', () => {
      expect(commonUtils.getNameInitials('John Doe')).toBe('JD');
      expect(commonUtils.getNameInitials('Jane')).toBe('J');
      expect(commonUtils.getNameInitials('')).toBe('U');
      expect(commonUtils.getNameInitials()).toBe('U');
    });
  });

  describe('getTeamInitials', () => {
    it('returns initials for a path', () => {
      expect(commonUtils.getTeamInitials('/alpha-beta')).toBe('B');
      expect(commonUtils.getTeamInitials('gamma-delta')).toBe('D');
      expect(commonUtils.getTeamInitials('')).toBe('');
      expect(commonUtils.getTeamInitials(undefined)).toBe('');
    });
  });

  describe('toTitleCase', () => {
    it('converts string to title case', () => {
      expect(commonUtils.toTitleCase('hello')).toBe('Hello');
      expect(commonUtils.toTitleCase('HELLO')).toBe('Hello');
      expect(commonUtils.toTitleCase('')).toBe('');
    });
  });

  describe('generateFECustomDetectId', () => {
    it('returns a string with prefix', () => {
      const id = commonUtils.generateFECustomDetectId();
      expect(typeof id).toBe('string');
      expect(id.startsWith('fe__id__')).toBe(true);
    });
  });

  describe('safeClone', () => {
    it('deep clones objects and arrays', () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = commonUtils.safeClone(obj) as typeof obj;
      expect(clone).not.toBe(obj);
      expect(clone).toEqual(obj);
      clone.b.c = 3;
      expect(obj.b.c).toBe(2);
    });
    it('returns primitives as is', () => {
      expect(commonUtils.safeClone(42)).toBe(42);
      expect(commonUtils.safeClone('abc')).toBe('abc');
    });
  });

  describe('urlToPascalCaseKey', () => {
    it('converts url to PascalCase key', () => {
      expect(commonUtils.urlToPascalCaseKey('foo-bar.svg')).toBe('FooBar');
      expect(commonUtils.urlToPascalCaseKey('baz.svg')).toBe('Baz');
      expect(commonUtils.urlToPascalCaseKey('folder/foo-bar.svg')).toBe('FooBar');
      expect(commonUtils.urlToPascalCaseKey('')).toBe('');
    });
  });
});
