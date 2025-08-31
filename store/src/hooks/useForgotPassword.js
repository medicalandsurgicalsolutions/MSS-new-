import { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ verifyEmail }) => {
    setLoading(true);
    try {
        const res = await CustomerServices.forgetPassword({
            verifyEmail
        })
        notifySuccess(res.message);
        setLoading(false);
    } catch (err) {       
        notifyError(err ? err?.response?.data?.message : err?.message);
        setLoading(false);
    }
  };

  return {
    register,
    errors,
    loading,
    handleSubmit,
    submitHandler,
  };
};

export default useForgotPassword;
