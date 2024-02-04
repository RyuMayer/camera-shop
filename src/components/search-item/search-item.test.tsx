import { render, screen } from '@testing-library/react';

import { withRouter } from '../../utils/mock-component';
import { SearchItem } from './search-item';

describe('Component: Search item', () => {
  it('Should render correctly', () => {
    const firstCameraName = 'Camera 1';
    const withRouterComponent = withRouter(
      <SearchItem
        id={1}
        idx={1}
        inFocus
        name={firstCameraName}
        onFocus={() => ''}
      />,
    );

    render(withRouterComponent);

    expect(screen.getByText(firstCameraName)).toBeInTheDocument();
  });
});
