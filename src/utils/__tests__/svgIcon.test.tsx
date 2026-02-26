import SvgIcon from '../svgIcon';
import { render, screen, waitFor } from '@testing-library/react';

// Mock fetch and localStorage
global.fetch = jest.fn();
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; })
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('SvgIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (global.fetch as jest.Mock).mockReset();
  });

  it('renders nothing if no src is provided', () => {
    render(<SvgIcon src="" />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders SVG from fetch if not cached', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, text: () => Promise.resolve('<svg></svg>') });
    render(<SvgIcon src="/icon.svg" />);
    await waitFor(() => {
      expect(screen.getByText('', { selector: 'span' })).toContainHTML('<svg></svg>');
    });
  });

  it('renders SVG from memory cache if present', async () => {
    // Prime the memory cache by rendering once
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, text: () => Promise.resolve('<svg>mem</svg>') });
    render(<SvgIcon src="/icon-mem.svg" />);
    await waitFor(() => {
      expect(screen.getByText('', { selector: 'span' })).toContainHTML('<svg>mem</svg>');
    });
    // Now render again, should use memory cache
    render(<SvgIcon src="/icon-mem.svg" />);
    await waitFor(() => {
      expect(screen.getByText('', { selector: 'span' })).toContainHTML('<svg>mem</svg>');
    });
  });

  it('handles fetch failure gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
    render(<SvgIcon src="/fail.svg" />);
    await waitFor(() => {
      expect(screen.queryByText('', { selector: 'span' })).toBeNull();
    });
  });
});
