import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCardLoader } from '../../components/product-card-loader/product-card-loader';
import { ProductBreadcrumbs } from '../../components/product-breadcrumbs/product--breadcrumbs';
import { ProductSimilarLoader } from '../../components/product-similar-loader/product-similar-loader';
import { ProductReviewLoader } from '../../components/product-review-loader/product-review-loader';

export function Product() {
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      window.scrollTo(0, 0);
    }
  }, [productId]);

  console.log('here');

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
            <ProductReviewLoader />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
    </>
  );
}
