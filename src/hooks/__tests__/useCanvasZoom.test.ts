import { renderHook, act } from '@testing-library/react';
import { useCanvasZoom } from '../useCanvasZoom';
import { ZOOM_CONFIG } from '../../components/slotEditorCanvas/mainSlotCanvas/mainSlotCanvas.constants';

describe('useCanvasZoom', () => {
  it('should initialize scale to 1', () => {
    const { result } = renderHook(() => useCanvasZoom());
    expect(result.current.scale).toBe(1);
  });

  it('should zoom in and not exceed max', () => {
    const { result } = renderHook(() => useCanvasZoom());
    act(() => {
      for (let i = 0; i < 20; i++) {
        result.current.zoomIn();
      }
    });
    expect(result.current.scale).toBeLessThanOrEqual(ZOOM_CONFIG.MAX);
  });

  it('should zoom out and not go below min', () => {
    const { result } = renderHook(() => useCanvasZoom());
    act(() => {
      for (let i = 0; i < 20; i++) {
        result.current.zoomOut();
      }
    });
    expect(result.current.scale).toBeGreaterThanOrEqual(ZOOM_CONFIG.MIN);
  });

  it('should reset zoom to 1', () => {
    const { result } = renderHook(() => useCanvasZoom());
    act(() => {
      result.current.zoomIn();
      result.current.resetZoom();
    });
    expect(result.current.scale).toBe(1);
  });
});
