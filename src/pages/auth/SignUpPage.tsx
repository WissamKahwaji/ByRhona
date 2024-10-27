import { useTranslation } from "react-i18next";
import { useSignUpMutation } from "../../api/user/queries";
import * as Yup from "yup";
import { UserModel } from "../../api/user/type";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { t } = useTranslation();
  const { mutate: signUp } = useSignUpMutation();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Please enter your fullName"),
    email: Yup.string().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm your password"),
  });

  const initialValues: UserModel = {
    email: "",
    fullName: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (
    values: UserModel,
    { setSubmitting }: FormikHelpers<UserModel>
  ) => {
    signUp(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2 font-header">
      <div className="flex flex-col justify-center items-center w-full h-fit pb-3 bg-primary/10">
        <p className="mt-12 font-semibold text-black">{t("signup")}</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="mt-12 w-full md:w-1/2 lg:w-1/3 px-8 font-header space-y-3 py-2"
          >
            <div>
              <input
                type="text"
                name="fullName"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("full_name")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                style={{ direction: "ltr" }}
              />
              {errors.fullName && touched.fullName && (
                <div className="text-red-500 text-xs">{errors.fullName}</div>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
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
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute bottom-2 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <FaEyeLowVision /> : <FaEye />}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("confirm_password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute bottom-2 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? <FaEyeLowVision /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <div className="w-full flex flex-row justify-between items-center text-xs underline text-primary mt-2">
              <Link to={`/signin`}>
                <p>{t("login_here_if_you_have_account")}</p>
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/50 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? t("saving") : t("create_new_account")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
