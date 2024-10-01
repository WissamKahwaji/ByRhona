import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useSignInMutation } from "../../api/user/queries";
import { useState } from "react";
import { SignInValues } from "../../api/user/type";
import { Form, Formik, FormikHelpers } from "formik";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("please_enter_your_email")),
    password: Yup.string()
      .required("please_enter_your_password")
      .min(8, t("password_check")),
  });

  const { mutate: signIn } = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: SignInValues = {
    email: "",
    password: "",
  };

  const handleSignIn = (
    values: SignInValues,
    { setSubmitting }: FormikHelpers<SignInValues>
  ) => {
    signIn(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2 mb-10 font-header">
      <div className="flex flex-col justify-center items-center w-full h-fit pb-3 bg-primary/10">
        <p className="mt-12 font-semibold text-black">{t("signin")}</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="mt-12 w-full md:w-1/2 lg:w-1/3 px-8 font-header"
          >
            <div>
              <input
                type="text"
                name="email"
                className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("your_email")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                style={{ direction: "ltr" }}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
              )}
            </div>
            <div style={{ direction: "ltr" }}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 bottom-2 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <FaEyeLowVision /> : <FaEye />}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}
            </div>
            <div className="w-full flex flex-row justify-between items-center text-xs underline text-primary mt-2">
              <Link to={`/signup`}>
                <p>{t("create_new_account")}</p>
              </Link>
            </div>
            <div className="mt-7 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sm w-full py-2 font-header bg-primary text-white  rounded-full font-medium hover:bg-primary/50 hover:text-black transform duration-200"
              >
                {isSubmitting ? (
                  <PulseLoader size={5} color="white" />
                ) : (
                  t("login")
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInPage;
