import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home";
import LoadingPage from "./pages/loading-page";
import ContactPage from "./pages/contacts/ContactPage";
import AboutUsPage from "./pages/about-us/AboutUsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import ProductsListPage from "./pages/products/ProductsListPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import CartPage from "./pages/cart";
import Orders from "./pages/orders";
import PaymentOrdersDetailsPage from "./pages/payment-orders-details/PaymentOrdersDetailsPage";
import CollectionDetailsPage from "./pages/collections/CollectionDetailsPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="contacts" element={<ContactPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="products" element={<ProductsListPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="collections/:id" element={<CollectionDetailsPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="payment-order-details"
          element={<PaymentOrdersDetailsPage />}
        />
        <Route path="orders/user/:id" element={<Orders />} />
        <Route path="favorites/:id" element={<FavoritesPage />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
