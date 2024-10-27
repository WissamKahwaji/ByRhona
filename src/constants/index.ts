const CAROUSAL_RESPONSIVE = {
  xxl: {
    breakpoint: { max: 5000, min: 1536 },
    items: 3,
  },
  xl: {
    breakpoint: { max: 1536, min: 1280 },
    items: 3,
  },
  lg: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  md: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  sm: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  xs: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

const COLLECTION_CAROUSAL_RESPONSIVE = {
  xxl: {
    breakpoint: { max: 5000, min: 1536 },
    items: 4,
  },
  xl: {
    breakpoint: { max: 1536, min: 1280 },
    items: 4,
  },
  lg: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  md: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  sm: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  xs: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

const CART_TABLE_HEADER = [
  "products",
  "count",
  "note",
  "total_price",
  "delete",
];
const ORDERS_TABLE_HEADER = ["products", "count", "total_price"];

const UAE_EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

export {
  CAROUSAL_RESPONSIVE,
  COLLECTION_CAROUSAL_RESPONSIVE,
  CART_TABLE_HEADER,
  ORDERS_TABLE_HEADER,
  UAE_EMIRATES,
};
