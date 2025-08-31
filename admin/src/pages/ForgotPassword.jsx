import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, WindmillContext } from "@windmill/react-ui";

//internal import
import Error from "@/components/form/others/Error";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import ImageLight from "@/assets/img/forgot-password-office.jpeg";
import ImageDark from "@/assets/img/forgot-password-office-dark.jpeg";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { useTranslation } from "react-i18next";
import logo from "@/assets/img/logo/logo-color.png";

const ForgotPassword = () => {
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

    const { t } = useTranslation();
    const { mode } = useContext(WindmillContext);


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

              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Email" />
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="verifyEmail"
                  type="email"
                  placeholder="john@doe.com"
                />
                <Error errorName={errors.verifyEmail} />

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
                    Recover password
                  </Button>
                )}
              </form>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
