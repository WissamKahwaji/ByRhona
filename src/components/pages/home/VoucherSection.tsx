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
import { useGetUserByIdQuery } from "../../../api/user/queries";
import { createIntent } from "../../../api/products";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  useAddVoucherMutaion,
  useEditVoucherAmountMutaion,
  useGetUserVoucherQuery,
} from "../../../api/voucher/queries";
import { VoucherModel } from "../../../api/voucher/type";

const VoucherSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { data: paymentConfig } = useGetPaymentConfigQuery();
  const { data: userInfo, isError, isLoading } = useGetUserByIdQuery(userId!);
  const { data: voucherInfo } = useGetUserVoucherQuery();
  const { isAuthenticated } = useAuth();
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [increaseModalOpen, setincreaseModalOpen] = useState(false);
  // const [increaseAmount, setIncreaseAmount] = useState<number>();

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
    if (isAuthenticated) {
      setModal1Open(true);
    } else {
      toast.info("Please login first to get Your Voucher");
      navigate("/signin");
    }
  };

  if (isError || isLoading) return <></>;

  return (
    <div className="w-full flex flex-col justify-center items-center my-9">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setSubmitting,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center items-center"
            style={{ direction: "ltr" }}
          >
            <div className="relative   ">
              <img
                src={voucherimage}
                alt=""
                className=" mx-auto md:w-1/2 w-[90%]"
              />
              {!userInfo?.voucher ? (
                <div>
                  <div className="absolute bottom-6 left-[90px] md:bottom-16 md:left-[520px] md:w-[270px]">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="voucher amount"
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
              ) : (
                <div>
                  <div className="absolute bottom-6 left-[90px] md:bottom-16 md:left-[600px] md:w-[270px]">
                    <div className="text-xs md:text-base capitalize text-gray-600 w-full font-header mb-2 rounded border bg-primary/20 border-primary md:px-2 md:py-2 p-1 focus:outline-none focus:border-gray-400">
                      <p>you amount is {voucherInfo?.amount} AED</p>
                    </div>
                  </div>
                  <div className="absolute bottom-2  left-24 md:bottom-8 md:left-[600px] md:w-[270px]">
                    <p className="text-xs md:text-base text-primary font-header">
                      V.N : {voucherInfo?.voucherNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Modal
              centered
              style={{ top: 60 }}
              open={modal1Open}
              onOk={() => {
                setModal1Open(false);
                setSubmitting(false);
                setModal2Open(false);
              }}
              onCancel={() => {
                setModal1Open(false);
                setSubmitting(false);
                setModal2Open(false);
              }}
              footer
            >
              <div className="bg-white mx-auto rounded-lg shadow-lg max-w-sm w-full max-h-[450px] md:max-h-[500px] overflow-y-auto">
                {stripePromise ? (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                      amount={values.amount ?? 0}
                      userId={userId ?? ""}
                      isEdit={false}
                    />
                  </Elements>
                ) : null}
              </div>
            </Modal>
            {userInfo?.voucher && (
              <div className="mt-4">
                <div
                  className="text-xs md:text-base rounded p-1 md:px-2 md:py-1 bg-foreground font-header font-semibold capitalize hover:bg-primary hover:text-white duration-300 transform ease-in-out cursor-pointer"
                  onClick={() => {
                    setincreaseModalOpen(true);
                  }}
                >
                  {t("increase_your_voucher_amount")}
                </div>
              </div>
            )}

            <Modal
              centered
              style={{ top: 60 }}
              open={increaseModalOpen}
              onOk={() => {
                setincreaseModalOpen(false);
                setModal2Open(true);
                setModal1Open(false);
                setSubmitting(false);
              }}
              onCancel={() => {
                setincreaseModalOpen(false);
                setModal1Open(false);
                setSubmitting(false);
              }}
            >
              <div className="bg-white mx-auto max-w-sm w-full  overflow-y-auto">
                <div className="space-y-3">
                  <label htmlFor="increaseAmount">
                    {t("increase_your_voucher_amount")}
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="voucher amount"
                    min={1}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                    className="text-xs md:text-base capitalize w-full font-header mb-2 rounded border bg-primary/20 border-primary md:px-2 md:py-2 p-1 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </Modal>
            <Modal
              centered
              style={{ top: 60 }}
              open={modal2Open}
              onOk={() => {
                setincreaseModalOpen(false);
                setModal2Open(false);
                setSubmitting(false);
              }}
              onCancel={() => {
                setincreaseModalOpen(false);
                setModal2Open(false);
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
                      isEdit={true}
                      voucherId={voucherInfo?._id}
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
  isEdit: boolean;
  voucherId?: string;
}
const CheckoutForm = ({
  amount,
  userId,
  isEdit,
  voucherId,
}: CheckoutFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();
  const { mutate: addVoucher } = useAddVoucherMutaion();
  const { mutate: editVoucher } = useEditVoucherAmountMutaion();

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
        // requestVoucher({ userId: userId, amount: amount });

        if (isEdit) {
          const voucherParams: VoucherModel = {
            _id: voucherId,
            amount: amount,
            userId: userId,
          };
          editVoucher(voucherParams);
        } else {
          const voucherParams: VoucherModel = {
            amount: amount,
            userId: userId,
          };
          addVoucher(voucherParams);
        }
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
