import { ReactNode, isValidElement } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

import { TLoadingStatus } from '../../types/state';
import { LoadingStatus } from '../../const';

type TLoadingProps = {
  children: ReactNode;
  loadingStatus: TLoadingStatus;
  isDataLoaded: boolean;
};

export function Loading({
  children,
  isDataLoaded,
  loadingStatus,
}: TLoadingProps) {
  const isLoading = loadingStatus === LoadingStatus.Loading;

  //TODO: Когда-нибудь переделать на красивые скелеты!
  if (isLoading || !isDataLoaded) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-testid="loading"
      >
        <InfinitySpin width="200" color="#7575e2" />
      </div>
    );
  }

  return isValidElement(children) ? children : null;
}
