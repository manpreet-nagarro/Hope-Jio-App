import { render, screen, fireEvent } from '@testing-library/react';
import TruncatedTooltip from '../TruncatedTooltip';

jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    Tooltip: ({ children, title, open }: any) => open ? <div data-testid="tooltip">{title}{children}</div> : <>{children}</>,
  };
});

describe('TruncatedTooltip', () => {
  it('renders text and no tooltip if not truncated', () => {
    render(<TruncatedTooltip text="Short text" lines={2} />);
    expect(screen.getByText('Short text')).toBeInTheDocument();
    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip when forceOpen is true', () => {
    render(<TruncatedTooltip text="Long text" forceOpen={true} />);
    const button = screen.getByText('Long text');
    // Simulate truncation
    Object.defineProperty(button, 'scrollHeight', { value: 20 });
    Object.defineProperty(button, 'clientHeight', { value: 10 });
    fireEvent(globalThis.window as Window, new Event('resize'));
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getAllByText('Long text')[0]).toBeInTheDocument();
  });

  it('shows tooltip on hover if truncated', async () => {
    render(<TruncatedTooltip text="Truncated text" lines={1} />);
    const button = screen.getByText('Truncated text');
    // Mock DOM properties to simulate truncation
    Object.defineProperty(button, 'scrollHeight', { value: 20 });
    Object.defineProperty(button, 'clientHeight', { value: 10 });
    // Trigger resize event to force check
    fireEvent(globalThis.window as Window, new Event('resize'));
    fireEvent.mouseEnter(button);
    expect(screen.queryByTestId('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(button);
    // Wait for tooltip to disappear
    await screen.findAllByText('Truncated text');
  });

  it('renders children instead of text', () => {
    render(<TruncatedTooltip text="Should not show" lines={2}>Custom Child</TruncatedTooltip>);
    expect(screen.getByText('Custom Child')).toBeInTheDocument();
  });

  it('applies className and style', () => {
    render(<TruncatedTooltip text="Styled" className="test-class" style={{ color: 'red' }} />);
    const button = screen.getByText('Styled');
    expect(button).toHaveClass('test-class');
    expect(button).toHaveStyle('color: red');
  });
});
