import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export function humanizeReviewDate(date: string) {
  return dayjs(date).locale('ru').format('DD MMMM');
}
