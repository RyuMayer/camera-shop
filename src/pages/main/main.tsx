import { CardPopup } from '../../components/card-popup/card-popup';
import CatalogContent from '../../components/catalog-content/catalog-content';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MainSlider } from '../../components/main-slider/main-slider';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectPopupOpenedStatus } from '../../store/card-popup/card-popup.selector';

export function Main() {
  const isPopupOpened = useAppSelector(selectPopupOpenedStatus);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <MainSlider />
        <CatalogContent />
        {isPopupOpened && <CardPopup />}
      </main>
      <Footer />
    </div>
  );
}
