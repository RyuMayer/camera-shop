import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Catalog } from './pages/catalog/catalog';
import { AppRoute } from './const';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Product } from './pages/product/product';
import { Layout } from './layout/layout';
import { NotFound } from './pages/not-found/not-found';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

export const router = createBrowserRouter([
  {
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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </HelmetProvider>,
);
