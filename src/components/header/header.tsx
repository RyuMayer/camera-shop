import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Search } from '../search/search';

export function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link to={AppRoute.Catalog} className="header__logo" data-testid="logo">
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to={AppRoute.Catalog} className="main-nav__link">
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <Search />
        <a className="header__basket-link" href="#">
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </a>
      </div>
    </header>
  );
}
