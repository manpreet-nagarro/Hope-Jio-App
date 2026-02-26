import { render, screen } from '@testing-library/react';
import CompactListPopover from '../CompactListPopover';

jest.mock('../CompactListPopover.styles', () => ({
  PopoverListBox: (props: any) => <div {...props} />,
  PopoverListItemText: (props: any) => <div {...props} />,
  PrimaryText: (props: any) => <span {...props} />,
  CountBadgeText: (props: any) => <span {...props} />,
  HoverBox: (props: any) => <div {...props} />,
  HoverBoxScroll: (props: any) => <div {...props} />,
  Wrapper: (props: any) => <div {...props} />,
}));

describe('CompactListPopover', () => {
  it('renders primary text with first item', () => {
    render(<CompactListPopover items={[{ id: "A", name: "A" }, { id: "B", name: "B" }, { id: "C", name: "C" }]} visibleCount={1} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders dash if no items', () => {
    render(<CompactListPopover items={[]} visibleCount={1} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('shows count badge and popover for remaining items', () => {
    render(<CompactListPopover items={[{ id: "A", name: "A" }, { id: "B", name: "B" }, { id: "C", name: "C" }]} visibleCount={1} />);
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('does not show count badge or popover if all items are visible', () => {
    render(<CompactListPopover items={[{ id: "A", name: "A" }, { id: "B", name: "B" }]} visibleCount={2} />);
    expect(screen.queryByText('+1')).not.toBeInTheDocument();
  });

  it('applies className to Wrapper', () => {
    render(<CompactListPopover items={[{ id: "A", name: "A" }]} className="test-class" />);
    expect(screen.getByText('A').parentElement).toHaveClass('test-class');
  });
});
