import { render, screen } from '@testing-library/react';

import { Loading } from './loading';
import { LoadingStatus } from '../../const';

describe('Component: Loading', () => {
  it('Should render correctly when "isLoaded" is false, "LoadingStatus" is Idle', () => {
    const notExpectedText = 'Data loaded';
    const isLoaded = false;
    const loadingStatus = LoadingStatus.Idle;

    render(
      <Loading isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {notExpectedText}
      </Loading>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when "isLoaded" is false, "LoadingStatus" is Loading', () => {
    const notExpectedText = 'Data loaded';
    const isLoaded = false;
    const loadingStatus = LoadingStatus.Loading;

    render(
      <Loading isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {notExpectedText}
      </Loading>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when "isLoaded" is true, "LoadingStatus" is Idle', () => {
    const expectedText = 'Data loaded';
    const isLoaded = true;
    const loadingStatus = LoadingStatus.Idle;

    render(
      <Loading isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {expectedText}
      </Loading>,
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Should render correctly when "isLoaded" is false, "LoadingStatus" is Rejected', () => {
    const notExpectedText = 'Data loaded';
    const isLoaded = false;
    const loadingStatus = LoadingStatus.Rejected;

    render(
      <Loading isDataLoaded={isLoaded} loadingStatus={loadingStatus}>
        {notExpectedText}
      </Loading>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
