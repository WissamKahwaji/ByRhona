/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  DeliveryDetailsInputModel,
  PaymentOrdersValue,
} from "../../api/order/type";
import { useTranslation } from "react-i18next";
import { useSubmitOrderDetailsMutation } from "../../api/order/queries";
import { useSelector } from "react-redux";
import { selectCartValues } from "../../features/cart/slice";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useGetPaymentConfigQuery } from "../../api/products/queries";
import { toast } from "react-toastify";
import { createIntent } from "../../api/products";
import { useGetUserVoucherQuery } from "../../api/voucher/queries";
import { useGetDeliveryFeeInfoQuery } from "../../api/delivery-fee/queries";
import { UAE_EMIRATES } from "../../constants";

const PaymentOrdersDetailsPage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { cartValues } = useSelector(selectCartValues);
  const { data: paymentConfig } = useGetPaymentConfigQuery();
  const { data: voucherInfo } = useGetUserVoucherQuery();
  const { data: feeInfo } = useGetDeliveryFeeInfoQuery();

  const { mutate: submitOrderDetails } = useSubmitOrderDetailsMutation();

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [voucherChecked, setVoucherChecked] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [deliveryFeeAmount, setDeliveryFeeAmount] = useState<number>(0);

  useEffect(() => {
    if (feeInfo) {
      setDeliveryFeeAmount(feeInfo.insideUae ?? 0);
    }
  }, [feeInfo]);

  useEffect(() => {
    const cartAmount = cartValues.reduce(
      (acc, pre) =>
        acc +
        Number(
          pre.isOffer && pre.priceAfterOffer
            ? pre.priceAfterOffer.priceAED
            : pre.price.priceAED
        ) *
          pre.count,
      0
    );

    let finalAmount;
    if (voucherChecked && voucherInfo?.amount) {
      finalAmount =
        Math.max(cartAmount - voucherInfo.amount, 0) + deliveryFeeAmount;
    } else {
      // If no voucher is applied, total is just the cart amount
      finalAmount = cartAmount + deliveryFeeAmount;
    }

    setTotalAmount(finalAmount);
  }, [cartValues, voucherChecked, voucherInfo?.amount, deliveryFeeAmount]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIntent = params.get("payment_intent");
    const redirectStatus = params.get("redirect_status");
    if (paymentIntent && redirectStatus) {
      window.location.replace("/");
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (paymentConfig) {
        const stripePromise = await loadStripe(paymentConfig.publicKey);
        setStripePromise(stripePromise);
      }
    })();
  }, [paymentConfig]);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 200,
    currency: "aed",
    appearance: {},
  };

  const initialValues: DeliveryDetailsInputModel = {
    fullName: "",
    email: "",
    country: "UAE",
    city: "Abu Dhabi",
    mobileNumber: "",
    building: "",
    floorNumber: "",
    note: "",
    street: "",
    unitNumber: "",
    paymentMethod: "cash",
    locationType: "insideUae",
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
        (acc, pre) =>
          acc +
          Number(
            pre.isOffer && pre.priceAfterOffer
              ? pre.priceAfterOffer.priceAED
              : pre.price.priceAED
          ) *
            pre.count,
        0
      ),

      paymentMethod: values.paymentMethod,
      cartItems: cartValues.map(cart => ({
        id: cart._id,
        img: cart.img,
        title: cart.title,
        price:
          cart.isOffer && cart.priceAfterOffer
            ? cart.priceAfterOffer
            : cart.price,
        quantity: cart.count,
        note: cart.note,
      })),
      isUseVoucher: voucherChecked,
      deliveryFee: deliveryFeeAmount,
    };
    if (values.paymentMethod === "cash") {
      submitOrderDetails(finalValues, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else if (values.paymentMethod === "card" && totalAmount === 0) {
      submitOrderDetails(finalValues, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else {
      setModal1Open(true);
    }
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
          setFieldValue,
          handleSubmit,
          setSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="space-y-5 lg:space-y-5">
            <h1 className="text-center text-2xl font-bold text-black">
              {t("check_out")}
            </h1>
            <p className="text-center text-primary">{t("delivery_policy")}</p>
            <div className="capitalize">
              <label htmlFor="fullName" className="text-xs">
                {t("full_name")}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder={t("enter_your_full_name")}
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
                {t("your_email")}
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder={t("enter_your_email")}
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
                {t("your_mobile_number")}
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder={t("enter_your_mobile_number")}
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
            <div>
              <label className="text-xs font-header">
                {t("you_want_to_deliver_to_inside_or_outside_uae")}
              </label>
              <div className="flex flex-row justify-start items-center gap-x-5 w-full mt-3">
                <div className="flex items-center">
                  <Field
                    type="radio"
                    name="locationType"
                    value="insideUae"
                    className="mr-2"
                    checked={values.locationType === "insideUae"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const { value } = event.target;
                      setFieldValue("locationType", value);

                      if (value === "insideUae") {
                        setDeliveryFeeAmount(feeInfo?.insideUae ?? 0);
                      } else if (value === "outsideUae") {
                        setDeliveryFeeAmount(feeInfo?.outsideUae ?? 0);
                      }
                    }}
                  />
                  <label htmlFor="home" className="text-xs font-header">
                    {t("inside_uae")}
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    type="radio"
                    name="locationType"
                    value="outsideUae"
                    className="mr-2"
                    checked={values.locationType === "outsideUae"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const { value } = event.target;
                      setFieldValue("locationType", value);

                      if (value === "insideUae") {
                        setDeliveryFeeAmount(feeInfo?.insideUae ?? 0);
                      } else if (value === "outsideUae") {
                        setDeliveryFeeAmount(feeInfo?.outsideUae ?? 0);
                      }
                    }}
                  />
                  <label htmlFor="work" className="text-xs font-header">
                    {t("outside_uae")}
                  </label>
                </div>
              </div>
            </div>
            <div className="capitalize">
              <label htmlFor="country" className="text-xs">
                {t("your_country")}
              </label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder={t("enter_your_country")}
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
                {t("your_city")}
              </label>
              {values.locationType == "insideUae" ? (
                <select
                  name="city"
                  id="city"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  required
                  onBlur={handleBlur}
                  onChange={e => {
                    const { value } = e.target;
                    setFieldValue("city", value);
                  }}
                  value={values.city}
                >
                  {UAE_EMIRATES.map((city, index) => (
                    <option key={index} value={city} className="text-xs">
                      {city}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder={t("enter_your_city")}
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                />
              )}

              {errors.city && touched.city && (
                <div className="text-red-500 text-xs">{errors.city}</div>
              )}
              <p className="text-sm text-primary">
                {t("your_delivery_fee_is")} {deliveryFeeAmount} {t("aed")}
              </p>
            </div>
            <div className="capitalize">
              <label htmlFor="street" className="text-xs">
                {t("your_street_area")}
              </label>
              <input
                id="street"
                name="street"
                type="text"
                placeholder={t("enter_your_street_area")}
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
                {t("your_building_nearest_landmark")}
              </label>
              <input
                id="building"
                name="building"
                type="text"
                placeholder={t("enter_your_building_nearest_landmark")}
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
                {t("your_floor_no")}
              </label>
              <input
                id="floorNumber"
                name="floorNumber"
                type="text"
                placeholder={t("enter_your_floor_no")}
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
                {t("your_unit_no")}
              </label>
              <input
                id="unitNumber"
                name="unitNumber"
                type="text"
                placeholder={t("enter_your_unit_no")}
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
                {t("your_note")}
              </label>
              <textarea
                name="note"
                id="note"
                placeholder={t("enter_your_note")}
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
                {t("payment_method")}
              </label>
              <div className="flex items-center mt-2">
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  className="mr-2"
                  checked={values.paymentMethod === "cash"}
                />
                <label htmlFor="home" className="text-xs font-header">
                  {t("cash_payment")}
                </label>
              </div>
              <div className="flex items-center mt-2">
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  className="mr-2"
                  checked={values.paymentMethod === "card"}
                />
                <label htmlFor="home" className="text-xs font-header">
                  {t("card_payment")}
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="floorNumber" className="text-xs">
                {t("your_voucher_amount")} : {voucherInfo?.amount} AED
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="voucher"
                  id="voucher"
                  className="mr-2 cursor-pointer"
                  checked={voucherChecked}
                  onChange={e => {
                    setVoucherChecked(e.currentTarget.checked);
                  }}
                />
                <label htmlFor="home" className="text-xs font-header">
                  {t("use_your_voucher")}
                </label>
              </div>
            </div>
            <div className="capitalize ">
              <label htmlFor="delivery_fee" className="text-lg">
                {t("delivery_fee")} : {deliveryFeeAmount} AED
              </label>
            </div>
            <div className="capitalize ">
              <label htmlFor="total_order_amount" className="text-lg">
                {t("total_order_amount")} : {totalAmount} AED
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/50 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? t("loading....") : t("place_order")}
            </button>
            <Modal
              centered
              style={{ top: 60 }}
              open={modal1Open}
              onOk={() => {
                setModal1Open(false);
                setSubmitting(false);
              }}
              onCancel={() => {
                setModal1Open(false);
                setSubmitting(false);
              }}
              footer
            >
              <div className="bg-white mx-auto rounded-lg shadow-lg max-w-sm w-full max-h-[450px] md:max-h-[500px] overflow-y-auto">
                {stripePromise ? (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                      amount={
                        totalAmount ??
                        cartValues.reduce(
                          (acc, pre) =>
                            acc +
                            Number(
                              pre.isOffer && pre.priceAfterOffer
                                ? pre.priceAfterOffer.priceAED
                                : pre.price.priceAED
                            ) *
                              pre.count,
                          0
                        )
                      }
                      paymentOrderValue={{
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
                          (acc, pre) =>
                            acc +
                            Number(
                              pre.isOffer && pre.priceAfterOffer
                                ? pre.priceAfterOffer.priceAED
                                : pre.price.priceAED
                            ) *
                              pre.count,
                          0
                        ),

                        paymentMethod: "card",
                        cartItems: cartValues.map(cart => ({
                          id: cart._id,
                          img: cart.img,
                          title: cart.title,
                          price:
                            cart.isOffer && cart.priceAfterOffer
                              ? cart.priceAfterOffer
                              : cart.price,
                          quantity: cart.count,
                          note: cart.note,
                        })),
                        isUseVoucher: voucherChecked,
                        deliveryFee: deliveryFeeAmount,
                      }}
                    />
                  </Elements>
                ) : null}
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

interface CheckoutFormProps {
  amount: number;
  paymentOrderValue: PaymentOrdersValue | undefined;
}
const CheckoutForm = ({ amount, paymentOrderValue }: CheckoutFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();
  const { mutate: submitOrderDetails } = useSubmitOrderDetailsMutation();

  const handlePaymentSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const { clientSecret } = await createIntent({
        amount: amount,
      });

      toast.success("Successfully processed payment");

      if (paymentOrderValue) {
        submitOrderDetails(paymentOrderValue);
      }
      const stripeRes = await stripe?.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}`,
        },
      });

      if (stripeRes?.error) {
        setErrorMessage(stripeRes?.error.message);
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      <div className=" m-auto max-w-sm px-4 py-20">
        <form onSubmit={handlePaymentSubmit}>
          <PaymentElement />
          <button
            className="mt-3 bg-primary px-3 py-1 rounded text-white w-full"
            type="submit"
            disabled={!stripe || !elements}
          >
            Pay
          </button>
          {/* Show error message to your customers */}
          {errorMessage && (
            <div className="text-destructive">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentOrdersDetailsPage;
