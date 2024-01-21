import { SubmitHandler, useForm } from 'react-hook-form';
import { Fragment, useEffect } from 'react';
import cn from 'classnames';

import { FormStarRating } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { TReviewPostData } from '../../types/review';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCameraId } from '../../store/camera/camera.selector';
import { fetchPostReview } from '../../store/review/review.action';

type TFormInputs = {
  rating: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
};

export function ProductReviewPopup() {
  const dispatch = useAppDispatch();
  const productId = useAppSelector(selectCameraId) as number;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
    setFocus,
    trigger,
  } = useForm<TFormInputs>({ mode: 'all' });

  const ratingFieldValue = watch('rating');

  useEffect(() => {
    setFocus('userName');
    trigger('rating');
  }, [setFocus, trigger]);

  const handleFormSubmit: SubmitHandler<TFormInputs> = (data) => {
    const reviewData: TReviewPostData = {
      cameraId: productId,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      rating: Number(data.rating),
      review: data.review,
      userName: data.userName,
    };

    dispatch(fetchPostReview({ reviewData }));
  };

  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          onSubmit={(e) => {
            handleSubmit(handleFormSubmit)(e);
          }}
          method="post"
        >
          <div className="form-review__rate">
            <fieldset
              className={cn('rate form-review__item', {
                'is-valid': !errors.rating,
                'is-invalid': errors.rating,
              })}
            >
              <legend className="rate__caption">
                Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {Object.entries(FormStarRating)
                    .reverse()
                    .map(([value, title]) => (
                      <Fragment key={title}>
                        <input
                          className="visually-hidden"
                          id={`star-${value}`}
                          type="radio"
                          value={value}
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                            validate: (ratingValue) =>
                              (Number(ratingValue) >= 1 &&
                                Number(ratingValue) <= 5) ||
                              `Минимальное значение 1, максимальное 5`,
                          })}
                        />
                        <label
                          className="rate__label"
                          htmlFor={`star-${value}`}
                          title={title}
                        />
                      </Fragment>
                    ))}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{ratingFieldValue || 0}</span>{' '}
                  <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              {errors.rating && (
                <p className="rate__message">
                  {errors.rating.message || 'Ошибка'}
                </p>
              )}
            </fieldset>
            <div
              className={cn('custom-input form-review__item', {
                'is-valid': touchedFields.userName && !errors.userName,
                'is-invalid': touchedFields.userName && errors.userName,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  {...register('userName', {
                    required: 'Нужно указать имя',
                    minLength: {
                      value: 1,
                      message: 'От 1 до 15 символов',
                    },
                    maxLength: {
                      value: 15,
                      message: 'От 1 до 15 символов',
                    },
                  })}
                />
              </label>
              {errors.userName && (
                <p className="custom-input__error">
                  {errors.userName.message || 'Ошибка'}
                </p>
              )}
            </div>
            <div
              className={cn('custom-input form-review__item', {
                'is-valid': touchedFields.advantage && !errors.advantage,
                'is-invalid': touchedFields.advantage && errors.advantage,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register('advantage', {
                    required: 'Нужно указать достоинства',
                    minLength: {
                      value: 10,
                      message: 'От 10 до 160 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'От 10 до 160 символов',
                    },
                  })}
                />
              </label>
              {errors.advantage && (
                <p className="custom-input__error">
                  {errors.advantage.message || 'Ошибка'}
                </p>
              )}
            </div>
            <div
              className={cn('custom-input form-review__item', {
                'is-valid': touchedFields.disadvantage && !errors.disadvantage,
                'is-invalid': touchedFields.disadvantage && errors.disadvantage,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register('disadvantage', {
                    required: 'Нужно указать недостатки',
                    minLength: {
                      value: 10,
                      message: 'От 10 до 160 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'От 10 до 160 символов',
                    },
                  })}
                />
              </label>
              {errors.disadvantage && (
                <p className="custom-input__error">
                  {errors.disadvantage.message || 'Ошибка'}
                </p>
              )}
            </div>
            <div
              className={cn('custom-textarea form-review__item', {
                'is-valid': touchedFields.review && !errors.review,
                'is-invalid': touchedFields.review && errors.review,
              })}
            >
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  minLength={5}
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: 'Нужно добавить комментарий',
                    minLength: {
                      value: 10,
                      message: 'От 10 до 160 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'От 10 до 160 символов',
                    },
                  })}
                />
              </label>
              {errors.review && (
                <div className="custom-textarea__error">
                  {errors.review.message || 'Ошибка'}
                </div>
              )}
            </div>
          </div>
          <button
            disabled={!isValid}
            className="btn btn--purple form-review__btn"
            type="submit"
          >
            Отправить отзыв
          </button>
        </form>
      </div>
    </>
  );
}
