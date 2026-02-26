import { renderHook, act } from '@testing-library/react';
import { useDebouncedCallback } from '../useDebouncedCallback';

describe('useDebouncedCallback', () => {
  jest.useFakeTimers();

  it('should call callback after delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));
    act(() => {
      result.current[0]('foo');
    });
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(callback).toHaveBeenCalledWith('foo');
  });

  it('should reset timer if called again before delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 200));
    act(() => {
      result.current[0]('a');
      jest.advanceTimersByTime(100);
      result.current[0]('b');
      jest.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledWith('b');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cancel the debounced callback', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 150));
    act(() => {
      result.current[0]('x');
      result.current[1](); // cancel
      jest.advanceTimersByTime(200);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should update callback if it changes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const { result, rerender } = renderHook(({ cb }) => useDebouncedCallback(cb, 100), {
      initialProps: { cb: callback1 },
    });
    act(() => {
      result.current[0]('first');
      jest.advanceTimersByTime(100);
    });
    expect(callback1).toHaveBeenCalledWith('first');
    rerender({ cb: callback2 });
    act(() => {
      result.current[0]('second');
      jest.advanceTimersByTime(100);
    });
    expect(callback2).toHaveBeenCalledWith('second');
  });
});
