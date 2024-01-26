import { ReactNode } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

import style from './loader.module.css';

import { TLoadingStatus } from '../../types/state';
import { LoadingStatus } from '../../const';

type TLoadingProps = {
  children: ReactNode;
  loadingStatus: TLoadingStatus;
  isDataLoaded: boolean;
};

export function Loader({
  children,
  isDataLoaded,
  loadingStatus,
}: TLoadingProps) {
  const isLoading = loadingStatus === LoadingStatus.Loading;

  //TODO: Когда-нибудь переделать на красивые скелеты!
  if (isLoading || !isDataLoaded) {
    return (
      <div className={style['loader']} data-testid="loading">
        <InfinitySpin width="200" color="#7575e2" />
      </div>
    );
  }

  return children as JSX.Element;
}
