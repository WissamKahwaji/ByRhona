const CONTACT_US = {
  GET: "/contact",
};

const ABOUT_US = {
  GET: "/about",
};

const SLIDER = {
  GET: "/sliders",
};

const COLLECTIONS = {
  GET: "/collections",
};

const CATEGORIES = {
  GET_WITH_PRODUCTS: "/categories/category-products",
};

const DEPARTMENT = {
  GET: "/departments",
};

const PRODUCTS = {
  GET_BY_ID: (id: string | undefined) => `/products/${id}`,
  GET_LAST_SIX: "/products/get-last-six",
  GET_TOP_TEN_EXPENSIVE: "/products/get-top-ten-expensive",
  GET_TOP_TEN_CHEAPEST: "/products/get-top-ten-cheapest",
  GET_OFFERS_PRODUCTS: "/products/get-offers-products",
  CREATE_INTENT: "/products/create-payment",
  PAYMENT_CONFIG: "/products/config",
};

const USER = {
  SIGNIN: "/user/signin",
  SIGNUP: "/user/signup",
  REQUEST_VOUCHER: (userId: string | undefined) =>
    `/user/request-amount/${userId}`,
  BYID: (userId: string | undefined) => `/user/byId/${userId}`,
};

const ORDERS = {
  SUBMIT_DETAILS: "/order/submit",
  USER_ORDERS: (id: string) => `/order/user-orders/${id}`,
};

const VOUCHER = {
  GET_USER_VOUCHER: "/voucher/user-voucher",
  ADD: (userId: string) => `/voucher/add/${userId}`,
  EDIT_AMOUNT: (voucherId: string | undefined) => `/voucher/edit/${voucherId}`,
};

const API_ROUTES = {
  CONTACT_US,
  ABOUT_US,
  SLIDER,
  COLLECTIONS,
  CATEGORIES,
  DEPARTMENT,
  PRODUCTS,
  USER,
  ORDERS,
  VOUCHER,
};

export default API_ROUTES;
