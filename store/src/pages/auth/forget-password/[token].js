import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

//internal import
import Error from "@components/form/Error";
import CustomerServices from "@services/CustomerServices";
import { notifyError, notifySuccess } from "@utils/toast";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const password = useRef("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  password.current = watch("newPassword");

  const submitHandler = ({ newPassword }) => {

    setLoading(true);
    if (newPassword) {
      CustomerServices.resetPassword({
        newPassword,
        token: router.query?.token,
      })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
          router.push("/auth/login")
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow max-w-md w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold ">
              {"Forget Password"}
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
              {"Reset Your Password"}
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 gap-5">
            {" "}
                  <div className="form-group">
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="New password"
                      {...register("newPassword", {
                        required: "You must specify a password",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-100 border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    />

                    <Error errorName={errors.newPassword} />
                  </div>
                  <div className="form-group">
                    <input
                      name="confirm_password"
                      type="password"
                      placeholder="Confirm password"
                      {...register("confirm_password", {
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-100 border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    />

                  <Error errorName={errors.confirm_password} />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full text-center py-3 rounded bg-emerald-500 font-medium text-sm text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
              >
                {"Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};


export default ForgetPassword;
