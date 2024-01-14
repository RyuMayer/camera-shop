import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Catalog } from './pages/catalog/catalog';
import { AppRoute } from './const';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Product } from './pages/product/product';
import { Layout } from './layout/layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: AppRoute.Catalog,
    element: <Layout />,
    children: [
      {
        path: AppRoute.Catalog,
        element: <Catalog />,
      },
      {
        path: `${AppRoute.Product}/:productId`,
        element: <Product />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
