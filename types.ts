export interface PackageData {
  id: number;
  title: string;
  items: string[];
  price: number;
  oldPrice: number;
  iconType: 'general' | 'child' | 'diabetes' | 'thyroid' | 'thin' | 'obesity' | 'pregnancy' | 'hair' | 'minerals' | 'fertility';
  colorTheme: string;
}

export enum IconType {
  General = 'general',
  Child = 'child',
  Diabetes = 'diabetes',
  Thyroid = 'thyroid',
  Thin = 'thin',
  Obesity = 'obesity',
  Pregnancy = 'pregnancy',
  Hair = 'hair',
  Minerals = 'minerals',
  Fertility = 'fertility',
}