import { AppRoute } from '../const';

export type TBreadcrumbsDataList = {
  id: string | number;
  title: string;
  href: (typeof AppRoute)[keyof typeof AppRoute] | null;
};
