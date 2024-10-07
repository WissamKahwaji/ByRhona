/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import voucherimage from "../../../assets/voucher.png";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useGetPaymentConfigQuery } from "../../../api/products/queries";
import { Form, Formik } from "formik";
import { useRequestVoucherAmountMutation } from "../../../api/user/queries";
import { createIntent } from "../../../api/products";

const VoucherSection = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { data: paymentConfig } = useGetPaymentConfigQuery();

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const [modal1Open, setModal1Open] = useState(false);

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

  const initialValues: { userId: string; amount?: number } = {
    userId: userId ?? "",
  };

  const handleSubmit = () => {
    setModal1Open(true);
  };

  return (
    <div className="w-full flex justify-center items-center my-9">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="relative   w-full flex justify-center items-center ">
              <img src={voucherimage} alt="" className="  md:w-1/2 w-[90%]" />
              <div className="absolute bottom-6 left-[90px] md:bottom-16 md:left-[520px] md:w-[270px]">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="voucher number"
                  min={1}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  className="text-xs md:text-base capitalize w-full font-header mb-2 rounded border bg-primary/20 border-primary md:px-2 md:py-2 p-1 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="absolute bottom-0  left-28 md:bottom-4 md:left-[580px] md:w-[270px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-xs md:text-base rounded p-1 md:px-2 md:py-1 bg-foreground font-body font-semibold capitalize hover:bg-primary hover:text-white duration-300 transform ease-in-out"
                >
                  {isSubmitting ? t("loading....") : t("get_your_voucher")}
                </button>
              </div>
            </div>
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
                      amount={values.amount ?? 0}
                      userId={userId ?? ""}
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
  userId: string;
}
const CheckoutForm = ({ amount, userId }: CheckoutFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();
  const { mutate: requestVoucher } = useRequestVoucherAmountMutation();

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

      if (userId) {
        requestVoucher({ userId: userId, amount: amount });
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

export default VoucherSection;
