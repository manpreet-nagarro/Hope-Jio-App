import { STATUS_COLOR_MAP } from '../statusColor';
import type { WireframeStatus } from '../statusColor';

describe('STATUS_COLOR_MAP', () => {
  const cases: [WireframeStatus, { bg: string; text: string }][] = [
    ['Pg. Draft', { bg: '#F0E8FA', text: '#6D17CE' }],
    ['Pg. Approved', { bg: '#E5F7EE', text: '#03753C' }],
    ['Pg. In Review', { bg: '#FEF2E9', text: '#E65100' }],
    ['Pg. Archived', { bg: '#F5F5F5', text: '#595959' }],
    ['Pg. Published', { bg: '#E5F7EE', text: '#03753C' }],
    ['Pg. Rejected', { bg: '#F7E5E9', text: '#AA0023' }],
  ];

  it('contains all expected statuses with correct colors', () => {
    for (const [status, expected] of cases) {
      expect(STATUS_COLOR_MAP[status]).toEqual(expected);
    }
  });

  it('does not contain unexpected statuses', () => {
    expect(STATUS_COLOR_MAP['Unknown' as WireframeStatus]).toBeUndefined();
  });
});
