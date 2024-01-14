import { Outlet } from 'react-router-dom';

import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

export function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
