import { Button, Input, WindmillContext } from "@windmill/react-ui";
import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import ImageLight from "@/assets/img/forgot-password-office.jpeg";
import ImageDark from "@/assets/img/forgot-password-office-dark.jpeg";
import logo from "@/assets/img/logo/logo-color.png";
import spinnerLoadingImage from "@/assets/img/spinner.gif";


const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mode } = useContext(WindmillContext);

  password.current = watch("newPassword");

  const submitHandler = ({ newPassword }) => {
    setLoading(true);

    AdminServices.resetPassword({ newPassword, token })
      .then((res) => {
        setLoading(false);
        notifySuccess(res.message);
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err.response.data.message : err.message);
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          {/* <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div> */}
          <main className="flex items-center justify-center p-6 sm:p-12 w-full">
            <div className="w-full">
              <div className="mb-6">
                {mode === "dark" ? (
                  <img src={logo} alt="Logo" width="100"/>
                ) : (
                  <img src={logo} alt="Logo" width="100"/>
                )}
              </div>

              <form onSubmit={handleSubmit(submitHandler)}>
                <LabelArea label="Password" />
                <Input
                  label="Password"
                  name="newPassword"
                  type="password"
                  placeholder="Password"
                  {...register("newPassword", {
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 10 characters",
                    },
                  })}
                />
                <Error errorName={errors.newPassword} />
                <div className="mt-6"></div>
                <LabelArea label="Confirm Password" />
                <Input
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  placeholder={t("ConfirmPassword")}
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                <Error errorName={errors.confirm_password} />
                {loading ? (
                  <Button
                  block
                    disabled={true}
                    type="submit"
                    className="mt-4 h-12"
                  >
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      {t("Processing")}
                    </span>
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    block 
                    className="mt-4 h-12"
                    >
                     {t("Reset")}
                  </Button>
                )}
              </form>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  to="/login"
                >
                  {t("AlreadyAccount")}
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
