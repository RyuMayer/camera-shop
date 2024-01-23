import { TOTAL_RATING_COUNT } from '../../const';
import { TCamera } from '../../types/camera';

type TRatingProps = {
  rating: TCamera['rating'];
};

export function Rating({ rating }: TRatingProps) {
  return (
    <>
      {Array.from({ length: TOTAL_RATING_COUNT }, (_, idx) => (
        <svg
          key={idx}
          width={17}
          height={16}
          aria-hidden="true"
          data-testid="rating"
        >
          <use
            xlinkHref={rating > idx ? '#icon-full-star' : '#icon-star'}
            data-testid={rating > idx ? 'icon-full-star' : 'icon-star'}
          />
        </svg>
      ))}
    </>
  );
}
