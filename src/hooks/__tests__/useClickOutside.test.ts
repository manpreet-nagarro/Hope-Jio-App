import { renderHook } from '@testing-library/react';
import { useClickOutsideMultiple, attachClickOutsideListeners } from '../useClickOutside';
import * as React from 'react';

// Helper to create refs for multiple elements
function createRefs(elements: HTMLElement[]): React.RefObject<HTMLElement[]> {
  return { current: elements } as React.RefObject<HTMLElement[]>;
}

describe('useClickOutsideMultiple', () => {
  it('should call handler when clicking outside', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    const refs = createRefs([el1, el2]);
    const handler = jest.fn();

    renderHook(() => useClickOutsideMultiple(refs, handler, true));

    // Simulate click outside
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).toHaveBeenCalled();

    // Cleanup
    el1.remove();
    el2.remove();
    outside.remove();
  });

  it('should not call handler when clicking inside', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    const refs = createRefs([el1, el2]);
    const handler = jest.fn();

    renderHook(() => useClickOutsideMultiple(refs, handler, true));

    // Simulate click inside
    el1.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    el2.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();

    // Cleanup
   el1.remove();
    el2.remove();
  });

  it('should not attach listeners if disabled', () => {
    const el1 = document.createElement('div');
    const refs = createRefs([el1]);
    const handler = jest.fn();

    renderHook(() => useClickOutsideMultiple(refs, handler, false));

    // Simulate click outside
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();

    outside.remove();
  });
});

describe('attachClickOutsideListeners', () => {
  it('should call handler when clicking outside (manual attach)', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const refs = createRefs([el]);
    const handler = jest.fn();
    const cleanup = attachClickOutsideListeners(refs, handler);

    // Simulate click outside
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).toHaveBeenCalled();

    cleanup();
    el.remove();
    outside.remove();
  });
});
