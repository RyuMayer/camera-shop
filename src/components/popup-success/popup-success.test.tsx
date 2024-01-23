import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PopupSuccess } from './popup-success';

describe('Component: Popup success', () => {
  it('Should render correctly', () => {
    const mockHandle = vi.fn();

    render(<PopupSuccess onClose={mockHandle} />);

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('Should close btn enable', async () => {
    const mockHandle = vi.fn();

    render(<PopupSuccess onClose={mockHandle} />);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
    expect(mockHandle).toBeCalledTimes(1);
  });
});
