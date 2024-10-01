import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  DeliveryDetailsInputModel,
  PaymentOrdersValue,
} from "../../api/order/type";
import { useTranslation } from "react-i18next";
import { useSubmitOrderDetailsMutation } from "../../api/order/queries";
import { useSelector } from "react-redux";
import { selectCartValues } from "../../features/cart/slice";

const PaymentOrdersDetailsPage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { cartValues } = useSelector(selectCartValues);

  const { mutate: submitOrderDetails } = useSubmitOrderDetailsMutation();

  const initialValues: DeliveryDetailsInputModel = {
    fullName: "",
    email: "",
    country: "",
    city: "",
    mobileNumber: "",
    building: "",
    floorNumber: "",
    note: "",
    street: "",
    unitNumber: "",
  };
  const handleSubmit = (
    values: DeliveryDetailsInputModel,
    { setSubmitting }: FormikHelpers<DeliveryDetailsInputModel>
  ) => {
    const finalValues: PaymentOrdersValue = {
      userId: userId ?? "",
      userName: values.fullName,
      email: values.email,
      userStreet: values.street ?? "",
      userBuilding: values.building ?? "",
      userFloorNo: values.floorNumber ?? "",
      userUnitNo: values.unitNumber ?? "",
      userMobileNumber: values.mobileNumber ?? "",
      city: values.city,
      country: values.country,
      userNote: values.note ?? "",
      cartItemsTotalPrice: cartValues.reduce(
        (acc, pre) => acc + Number(pre.price.priceAED) * pre.count,
        0
      ),

      paymentMethod: "cash",
      cartItems: cartValues.map(cart => ({
        id: cart._id,
        img: cart.img,
        title: cart.title,
        price: cart.price,
        quantity: cart.count,
        note: cart.note,
      })),
    };
    submitOrderDetails(finalValues, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="mx-4 max-w-6xl py-12 md:pb-24 md:pt-10 lg:m-auto">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className="space-y-5 lg:space-y-5">
            <h1 className="text-center text-2xl font-bold text-black">
              Check Out
            </h1>
            <div className="capitalize">
              <label htmlFor="fullName" className="text-xs">
                full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="enter your full name"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
              />
              {errors.fullName && touched.fullName && (
                <div className="text-red-500 text-xs">{errors.fullName}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="email" className="text-xs">
                your email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="enter your email"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="mobileNumber" className="text-xs">
                your mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder="enter your mobile Number"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNumber}
              />
              {errors.mobileNumber && touched.mobileNumber && (
                <div className="text-red-500 text-xs">
                  {errors.mobileNumber}
                </div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="country" className="text-xs">
                your country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="enter your country"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
              />
              {errors.country && touched.country && (
                <div className="text-red-500 text-xs">{errors.country}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="city" className="text-xs">
                your city
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="enter your city"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
              />
              {errors.city && touched.city && (
                <div className="text-red-500 text-xs">{errors.city}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="street" className="text-xs">
                your street / area
              </label>
              <input
                id="street"
                name="street"
                type="text"
                placeholder="enter your street / area"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
              />
              {errors.street && touched.street && (
                <div className="text-red-500 text-xs">{errors.street}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="building" className="text-xs">
                your building / nearest landmark
              </label>
              <input
                id="building"
                name="building"
                type="text"
                placeholder="enter your building / nearest landmark"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.building}
              />
              {errors.building && touched.building && (
                <div className="text-red-500 text-xs">{errors.building}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="floorNumber" className="text-xs">
                your floor no
              </label>
              <input
                id="floorNumber"
                name="floorNumber"
                type="text"
                placeholder="enter your floor Number"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.floorNumber}
              />
              {errors.floorNumber && touched.floorNumber && (
                <div className="text-red-500 text-xs">{errors.floorNumber}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="unitNumber" className="text-xs">
                your unit no
              </label>
              <input
                id="unitNumber"
                name="unitNumber"
                type="text"
                placeholder="enter your unit Number"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unitNumber}
              />
              {errors.unitNumber && touched.unitNumber && (
                <div className="text-red-500 text-xs">{errors.unitNumber}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="floorNumber" className="text-xs">
                your note
              </label>
              <textarea
                name="note"
                id="note"
                placeholder="enter your note"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.note}
                className="min-h-[100px] bg-background p-2  shadow-sm text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
              />
              {errors.floorNumber && touched.floorNumber && (
                <div className="text-red-500 text-xs">{errors.floorNumber}</div>
              )}
            </div>
            <div className="capitalize">
              <label htmlFor="floorNumber" className="text-xs">
                payment method
              </label>
              <div className="flex items-center mt-2">
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="home"
                  className="mr-2"
                  checked={true}
                />
                <label htmlFor="home" className="text-xs font-header">
                  Cash payment
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/50 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? t("loading....") : t("place_order")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentOrdersDetailsPage;
