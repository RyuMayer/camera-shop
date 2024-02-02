export const FilterUrlParam = {
  Category: 'category',
  Type: 'type',
  Level: 'level',
} as const;

export const CategoryFilter = {
  Photocamera: 'pc',
  Videocamera: 'vc',
} as const;

export const CategoryFilterLocalized = {
  [CategoryFilter.Photocamera]: 'Фотоаппарат',
  [CategoryFilter.Videocamera]: 'Видеокамера',
} as const;

export const TypeFilter = {
  Digital: 'di',
  Film: 'fi',
  Instant: 'in',
  Сollectible: 'co',
} as const;

export const TypeFilterLocalized = {
  [TypeFilter.Digital]: 'Цифровая',
  [TypeFilter.Film]: 'Плёночная',
  [TypeFilter.Instant]: 'Моментальная',
  [TypeFilter.Сollectible]: 'Коллекционная',
} as const;

export const LevelFilter = {
  Zero: 'zr',
  Аmateur: 'am',
  Professional: 'pr',
} as const;

export const LevelFilterLocalized = {
  [LevelFilter.Zero]: 'Нулевой',
  [LevelFilter.Аmateur]: 'Любительский',
  [LevelFilter.Professional]: 'Профессиональный',
} as const;

export const ValidFilter = {
  [FilterUrlParam.Category]: Object.values(CategoryFilter) as string[],
  [FilterUrlParam.Type]: Object.values(TypeFilter) as string[],
  [FilterUrlParam.Level]: Object.values(LevelFilter) as string[],
} as const;
