import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const humanizeReviewDate = (date: string) => {
  return dayjs(date).locale('ru').format('DD MMMM');
};

export const humanizeDateTime = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};
