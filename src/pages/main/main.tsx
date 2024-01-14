import CatalogContent from '../../components/catalog-content/catalog-content';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MainSlider } from '../../components/main-slider/main-slider';

export function Main() {
  return (
    //TODO: Убрать в аутлет часть
    <div className="wrapper">
      <Header />
      <main>
        <MainSlider />
        <CatalogContent />
      </main>
      <Footer />
    </div>
  );
}
