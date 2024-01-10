import { TOTAL_RATING_COUNT } from '../../const';
import { TCamera } from '../../types/camera';

type TCardRatingProps = {
  rating: TCamera['rating'];
};

export function CardRating({ rating }: TCardRatingProps) {
  return (
    <>
      {Array.from({ length: TOTAL_RATING_COUNT }, (_, idx) => (
        <svg key={idx} width={17} height={16} aria-hidden="true">
          <use xlinkHref={rating > idx ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
    </>
  );
}
