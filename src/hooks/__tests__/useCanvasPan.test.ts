import { renderHook, act } from '@testing-library/react';
import { useCanvasPan } from '../useCanvasPan';

// Mock React.MouseEvent with all required properties
const createMouseEvent = (type: string, x: number, y: number): React.MouseEvent => {
  return {
    // type property already set below
    clientX: x,
    clientY: y,
    altKey: false,
    bubbles: false,
    button: 0,
    buttons: 0,
    cancelable: false,
    ctrlKey: false,
    defaultPrevented: false,
    detail: 0,
    eventPhase: 0,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    relatedTarget: null,
    screenX: 0,
    screenY: 0,
    shiftKey: false,
    target: null,
    timeStamp: Date.now(),
    type,
    isTrusted: true,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    persist: jest.fn(),
    // Add any other required MouseEvent properties
  } as unknown as React.MouseEvent;
};

describe('useCanvasPan', () => {
  it('should initialize offset to {x:0, y:0}', () => {
    const { result } = renderHook(() => useCanvasPan(true));
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it('should not pan if dragEnabled is false', () => {
    const { result } = renderHook(() => useCanvasPan(false));
    act(() => {
      result.current.onMouseDown(createMouseEvent('mousedown', 10, 10));
      result.current.onMouseMove(createMouseEvent('mousemove', 20, 20));
      result.current.onMouseUp();
    });
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it('should update offset on mouse move when dragEnabled is true', () => {
    const { result } = renderHook(() => useCanvasPan(true));
    act(() => {
      result.current.onMouseDown(createMouseEvent('mousedown', 10, 10));
      result.current.onMouseMove(createMouseEvent('mousemove', 20, 25));
      result.current.onMouseUp();
    });
    expect(result.current.offset).toEqual({ x: 10, y: 15 });
  });

  it('should set isCurrentlyPanning true on mouse down and false on mouse up', () => {
    const { result } = renderHook(() => useCanvasPan(true));
    act(() => {
      result.current.onMouseDown(createMouseEvent('mousedown', 5, 5));
    });
    expect(result.current.getCursorStyle()).toBe('grabbing');
    act(() => {
      result.current.onMouseUp();
    });
    expect(result.current.getCursorStyle()).toBe('grab');
  });

  it('should return default cursor if dragEnabled is false', () => {
    const { result } = renderHook(() => useCanvasPan(false));
    expect(result.current.getCursorStyle()).toBe('default');
  });

  it('should cleanup panning state when dragEnabled becomes false', () => {
    const { result, rerender } = renderHook(({ enabled }: { enabled: boolean }) => useCanvasPan(enabled), {
      initialProps: { enabled: true },
    });
    act(() => {
      result.current.onMouseDown(createMouseEvent('mousedown', 0, 0));
    });
    expect(result.current.getCursorStyle()).toBe('grabbing');
    rerender({ enabled: false });
    // Wait for animation frame
    setTimeout(() => {
      expect(result.current.getCursorStyle()).toBe('default');
    }, 0);
  });
});
