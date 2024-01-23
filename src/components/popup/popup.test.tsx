import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popup } from './popup';

describe('Component: Popup', () => {
  it('Should render correctly', () => {
    const expectedText = 'Popup text';
    const mockHandle = vi.fn();

    render(<Popup onClose={mockHandle}>{expectedText}</Popup>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Should close btn enable', async () => {
    const expectedText = 'Popup text';
    const mockHandle = vi.fn();

    render(<Popup onClose={mockHandle}>{expectedText}</Popup>);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(mockHandle).toBeCalledTimes(1);
  });

  it('Should overlay click enable', async () => {
    const expectedText = 'Popup text';
    const mockHandle = vi.fn();

    render(<Popup onClose={mockHandle}>{expectedText}</Popup>);
    await userEvent.click(screen.getByTestId('modal-overlay'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(mockHandle).toBeCalledTimes(1);
  });
});
