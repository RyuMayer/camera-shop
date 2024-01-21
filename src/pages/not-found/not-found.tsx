import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export function NotFound() {
  return (
    <main className="container">
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Catalog} className="btn">
        Перейти на главную
      </Link>
    </main>
  );
}
