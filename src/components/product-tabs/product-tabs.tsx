import cn from 'classnames';

import { TCamera } from '../../types/camera';
import { useSearchParams } from 'react-router-dom';
import { TABS_URL_PARAM, TabUrlParam } from './product-tabs.const';

type TProductTabsProps = {
  camera: TCamera;
};

export function ProductTabs({ camera }: TProductTabsProps) {
  const [urlParams, setUrlParams] = useSearchParams();

  const currentParam = urlParams.get(TABS_URL_PARAM) || TabUrlParam.Description;
  const currentTab = Object.values(TabUrlParam).some(
    (item) => item === currentParam,
  )
    ? currentParam
    : TabUrlParam.Description;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          onClick={() =>
            setUrlParams({ [TABS_URL_PARAM]: TabUrlParam.Specification })
          }
          className={cn('tabs__control', {
            'is-active': currentTab === TabUrlParam.Specification,
          })}
          type="button"
        >
          Характеристики
        </button>
        <button
          onClick={() =>
            setUrlParams({ [TABS_URL_PARAM]: TabUrlParam.Description })
          }
          className={cn('tabs__control', {
            'is-active': currentTab === TabUrlParam.Description,
          })}
          type="button"
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div
          className={cn('tabs__element', {
            'is-active': currentTab === TabUrlParam.Specification,
          })}
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{camera.vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{camera.category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{camera.type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{camera.level}</p>
            </li>
          </ul>
        </div>
        <div
          className={cn('tabs__element', {
            'is-active': currentTab === TabUrlParam.Description,
          })}
        >
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
