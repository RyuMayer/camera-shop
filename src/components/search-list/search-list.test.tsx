import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import { SearchList } from './search-list';
import { TFoundCameras } from '../../types/search';

describe('Component: Search list', () => {
  it('Should render correctly', () => {
    const firstCameraName = 'Camera 1';
    const secondCameraName = 'Camera 2';
    const foundCameras: TFoundCameras[] = [
      {
        id: 1,
        name: firstCameraName,
      },
      {
        id: 1,
        name: secondCameraName,
      },
    ];
    const withRouterComponent = withRouter(
      <SearchList foundCameras={foundCameras} />,
    );

    render(withRouterComponent);

    expect(screen.getByText(firstCameraName)).toBeInTheDocument();
    expect(screen.getByText(secondCameraName)).toBeInTheDocument();
  });
});
