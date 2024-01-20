import { MouseEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCardLoader } from '../../components/product-card-loader/product-card-loader';
import { ProductBreadcrumbs } from '../../components/product-breadcrumbs/product--breadcrumbs';
import { ProductSimilarLoader } from '../../components/product-similar-loader/product-similar-loader';
import { ProductReview } from '../../components/product-review/product-review';

export function Product() {
  const { productId } = useParams();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpBtnClick = (e: MouseEvent) => {
    e.preventDefault();
    scrollToTop();
  };

  useEffect(() => {
    if (productId) {
      scrollToTop();
    }
  }, [productId]);

  return (
    <>
      <main>
        <div className="page-content">
          <ProductBreadcrumbs />
          <div className="page-content__section">
            <ProductCardLoader />
          </div>
          <div className="page-content__section">
            <ProductSimilarLoader />
          </div>
          <div className="page-content__section">
            <ProductReview />
          </div>
        </div>
      </main>
      <a onClick={handleUpBtnClick} className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
    </>
  );
}
