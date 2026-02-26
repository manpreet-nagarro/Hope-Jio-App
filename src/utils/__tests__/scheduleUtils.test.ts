import { getScheduleStatus, formatScheduleRange } from '../scheduleUtils';

describe('getScheduleStatus', () => {
  it('returns null if schedule is missing or incomplete', () => {
    expect(getScheduleStatus()).toBeNull();
    expect(getScheduleStatus({ scheduleStart: '', scheduleEnd: '' } as any)).toBeNull();
    expect(getScheduleStatus({ scheduleStart: '2024-01-01T10:00:00Z', scheduleEnd: '' } as any)).toBeNull();
    expect(getScheduleStatus({ scheduleStart: '', scheduleEnd: '2024-01-01T10:00:00Z' } as any)).toBeNull();
  });

  it('returns "Expired" if end date is in the past', () => {
    const past = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    expect(getScheduleStatus({ scheduleStart: past, scheduleEnd: past } as any)).toBe('Expired');
    expect(getScheduleStatus({ scheduleStart: past, scheduleEnd: future } as any)).toBe('Scheduled');
  });

  it('returns "Scheduled" if end date is in the future', () => {
    const now = new Date();
    const start = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    const end = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    expect(getScheduleStatus({ scheduleStart: start, scheduleEnd: end } as any)).toBe('Scheduled');
  });
});

describe('formatScheduleRange', () => {
  it('formats the schedule range correctly', () => {
    const start = '2024-01-01T10:00:00Z';
    const end = '2024-01-01T12:30:00Z';
    const formatted = formatScheduleRange(start, end);
    expect(formatted).toMatch(/\d{2} \w{3}, \d{2}:\d{2}[AP]M - \d{2} \w{3}, \d{2}:\d{2}[AP]M/);
  });
});
