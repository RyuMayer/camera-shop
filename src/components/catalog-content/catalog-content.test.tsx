import { render, screen } from '@testing-library/react';
import { CatalogContent } from './catalog-content';
import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';

describe('Component: Catalog content', () => {
  it('Should render correctly', () => {
    const expectedText = 'Каталог фото- и видеотехники';
    const { withStoreComponent } = withStore(<CatalogContent />, {
      CAMERAS: { data: [], isLoaded: true, loadingStatus: LoadingStatus.Idle },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
