import { PackageData, IconType } from './types';

export const LAB_PACKAGES: PackageData[] = [
  {
    id: 1,
    title: "باقة التحاليل الشاملة",
    items: ["صورة الدم", "وظائف الكبد", "وظائف الكلى", "الغدة الدرقية", "مستوى الكوليسترول", "فيروس سي", "سكر عشوائي", "بول وبراز"],
    price: 800,
    oldPrice: 950,
    iconType: "general",
    colorTheme: "blue"
  },
  {
    id: 2,
    title: "باقة اطمن على طفلك",
    items: ["صورة الدم", "سكر عشوائي", "سرعة الترسيب", "CRP", "كالسيوم", "بول وبراز"],
    price: 350,
    oldPrice: 550,
    iconType: "child",
    colorTheme: "green"
  },
  {
    id: 3,
    title: "باقة متابعة السكر",
    items: ["سكر صايم", "سكر فاطر", "سكر تراكمي"],
    price: 150,
    oldPrice: 210,
    iconType: "diabetes",
    colorTheme: "red"
  },
  {
    id: 4,
    title: "باقة هرمونات الغدة",
    items: ["TSH", "T3", "T4"],
    price: 300,
    oldPrice: 450,
    iconType: "thyroid",
    colorTheme: "purple"
  },
  {
    id: 5,
    title: "باقة النحافة",
    items: ["صورة الدم", "غدة درقية", "سكر عشوائي", "جرثومة المعدة", "براز"],
    price: 300,
    oldPrice: 460,
    iconType: "thin",
    colorTheme: "orange"
  },
  {
    id: 6,
    title: "باقة السمنة",
    items: ["صورة الدم", "غدة درقية", "وظائف الكبد", "ملف دهون كامل", "مقاومة الإنسولين", "فيتامين د"],
    price: 1000,
    oldPrice: 1250,
    iconType: "obesity",
    colorTheme: "amber"
  },
  {
    id: 7,
    title: "باقة متابعة الحمل",
    items: ["صورة الدم", "فصيلة الدم", "سكر عشوائي", "غدة درقية", "بول"],
    price: 300,
    oldPrice: 380,
    iconType: "pregnancy",
    colorTheme: "pink"
  },
  {
    id: 8,
    title: "باقة تساقط الشعر",
    items: ["صورة الدم", "مخزون الحديد", "غدة درقية", "فيتامين د"],
    price: 650,
    oldPrice: 800,
    iconType: "hair",
    colorTheme: "indigo"
  },
  {
    id: 9,
    title: "باقة المعادن",
    items: ["كالسيوم", "ماغنسيوم", "بوتاسيوم", "صوديوم", "فوسفور", "زينك"],
    price: 700,
    oldPrice: 950,
    iconType: "minerals",
    colorTheme: "teal"
  },
  {
    id: 10,
    title: "باقة تأخر الحمل",
    items: ["صورة الدم", "FSH", "LH", "TSH", "AMH", "PRL", "TESTO"],
    price: 1300,
    oldPrice: 1500,
    iconType: "fertility",
    colorTheme: "rose"
  }
];

export const CONTACT_INFO = {
  phone: "01096377849",
  address: "معمل كير لاب",
  slogan: "صحتك تهمنا",
  year: "2025"
};