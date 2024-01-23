import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { withRouter } from '../../utils/mock-component';

describe('Component: Pagination', () => {
  it('Should render correctly when currentPage = 1, totalPage = 1', () => {
    const currentPage = 1;
    const totalPage = 1;
    const preparedComponent = withRouter(
      <Pagination currentPage={currentPage} totalPage={totalPage} />,
    );

    render(preparedComponent);

    expect(screen.getAllByTestId('pagination-item').length).toBe(1);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('Should render correctly when currentPage = 1, totalPage = 3', () => {
    const currentPage = 1;
    const totalPage = 3;
    const preparedComponent = withRouter(
      <Pagination currentPage={currentPage} totalPage={totalPage} />,
    );

    render(preparedComponent);

    expect(screen.getAllByTestId('pagination-item').length).toBe(3);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('Should render correctly when currentPage = 1, totalPage = 4', () => {
    const currentPage = 1;
    const totalPage = 4;
    const preparedComponent = withRouter(
      <Pagination currentPage={currentPage} totalPage={totalPage} />,
    );

    render(preparedComponent);

    expect(screen.getAllByTestId('pagination-item').length).toBe(3);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });

  it('Should render correctly when currentPage = 4, totalPage = 4', () => {
    const currentPage = 4;
    const totalPage = 4;
    const preparedComponent = withRouter(
      <Pagination currentPage={currentPage} totalPage={totalPage} />,
    );

    render(preparedComponent);

    expect(screen.getAllByTestId('pagination-item').length).toBe(1);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
  });

  it('Should render correctly when currentPage = 4, totalPage = 7', () => {
    const currentPage = 4;
    const totalPage = 7;
    const preparedComponent = withRouter(
      <Pagination currentPage={currentPage} totalPage={totalPage} />,
    );

    render(preparedComponent);

    expect(screen.getAllByTestId('pagination-item').length).toBe(3);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('Should render correctly when currentPage = 4, totalPage = 5', () => {
    const currentPage = 4;
    const totalPage = 5;
    const preparedComponent = withRouter(
      <Pagination currentPage={currentPage} totalPage={totalPage} />,
    );

    render(preparedComponent);

    expect(screen.getAllByTestId('pagination-item').length).toBe(2);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
  });
});
