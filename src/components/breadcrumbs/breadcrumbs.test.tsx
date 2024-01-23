import { render, screen } from '@testing-library/react';

import { Breadcrumbs } from './breadcrumbs';
import { TBreadcrumbsDataList } from '../../types/breadcrumbs';
import { withRouter, withStore } from '../../utils/mock-component';

describe('Component: Breadcrumbs', () => {
  it('Should render correctly', () => {
    const expectedData: TBreadcrumbsDataList[] = [
      { href: '/product', id: '1', title: 'Главная' },
    ];
    const { withStoreComponent } = withStore(
      <Breadcrumbs items={expectedData} />,
    );

    render(withRouter(withStoreComponent));

    expect(screen.getByText(expectedData[0].title)).toBeInTheDocument();
    expect(screen.getAllByTestId('breadcrumbs-item').length).toBe(
      expectedData.length,
    );
  });
});
