import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 300 },
    });

    expect(result.current).toBe('a');

    rerender({ value: 'b', delay: 300 });
    expect(result.current).toBe('a'); // Should not update immediately

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('b');
  });

  it('should reset debounce timer if value changes quickly', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'x', delay: 200 },
    });

    rerender({ value: 'y', delay: 200 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: 'z', delay: 200 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('x'); // Still old value

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('z');
  });
});
