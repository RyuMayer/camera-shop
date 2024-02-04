import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchCameras } from '../../store/cameras/cameras.action';
import { dropCamerasData } from '../../store/cameras/cameras';

export function NotFound() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameras());

    return () => {
      dispatch(dropCamerasData());
    };
  }, [dispatch]);

  return (
    <main className="container">
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Catalog} className="btn">
        Перейти на главную
      </Link>
    </main>
  );
}
