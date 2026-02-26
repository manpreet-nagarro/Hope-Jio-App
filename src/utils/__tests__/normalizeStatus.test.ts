import { normalizeStatus } from '../normalizeStatus';

describe('normalizeStatus', () => {
  it('returns Draft for undefined or unknown status', () => {
    expect(normalizeStatus()).toBe('Pg. Draft');
    expect(normalizeStatus('unknown')).toBe('Pg. Draft');
  });

  it('normalizes draft', () => {
    expect(normalizeStatus('draft')).toBe('Pg. Draft');
    expect(normalizeStatus('DRAFT')).toBe('Pg. Draft');
  });

  it('normalizes approved', () => {
    expect(normalizeStatus('approved')).toBe('Pg. Approved');
    expect(normalizeStatus('APPROVED')).toBe('Pg. Approved');
  });

  it('normalizes in review variants', () => {
    expect(normalizeStatus('in_review')).toBe('Pg. In Review');
    expect(normalizeStatus('in review')).toBe('Pg. In Review');
    expect(normalizeStatus('in-review')).toBe('Pg. In Review');
    expect(normalizeStatus('IN_REVIEW')).toBe('Pg. In Review');
  });

  it('normalizes archived', () => {
    expect(normalizeStatus('archived')).toBe('Pg. Archived');
    expect(normalizeStatus('ARCHIVED')).toBe('Pg. Archived');
  });

  it('normalizes published', () => {
    expect(normalizeStatus('published')).toBe('Pg. Published');
    expect(normalizeStatus('PUBLISHED')).toBe('Pg. Published');
  });
});
