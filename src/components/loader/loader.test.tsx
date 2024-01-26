import { render, screen } from '@testing-library/react';

import { Loader } from './loader';
import { LoadingStatus } from '../../const';

describe('Component: Loading', () => {
  it('Should render correctly when "isLoaded" is false, "LoadingStatus" is Idle', () => {
    const notExpectedText = 'Data loaded';
    const isLoaded = false;
    const loadingStatus = LoadingStatus.Idle;

    render(
      <Loader isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {notExpectedText}
      </Loader>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when "isLoaded" is false, "LoadingStatus" is Loading', () => {
    const notExpectedText = 'Data loaded';
    const isLoaded = false;
    const loadingStatus = LoadingStatus.Loading;

    render(
      <Loader isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {notExpectedText}
      </Loader>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when "isLoaded" is true, "LoadingStatus" is Idle', () => {
    const expectedText = 'Data loaded';
    const isLoaded = true;
    const loadingStatus = LoadingStatus.Idle;

    render(
      <Loader isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {expectedText}
      </Loader>,
    );

    screen.debug();

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Should render correctly when "isLoaded" is false, "LoadingStatus" is Rejected', () => {
    const notExpectedText = 'Data loaded';
    const isLoaded = false;
    const loadingStatus = LoadingStatus.Rejected;

    render(
      <Loader isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {notExpectedText}
      </Loader>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
