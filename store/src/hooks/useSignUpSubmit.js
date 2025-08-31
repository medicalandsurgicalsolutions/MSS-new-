import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";

const useSignUpSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const redirectUrl = useSearchParams().get("redirectUrl");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password, name, otp }) => {
    setLoading(true);

    try {
        const res = await CustomerServices.signUpCustomer({
            email,password,name,otp
        })
        if(res.status === 100){
          notifySuccess(res.message);
          router.push("/auth/login")
          setLoading(false);
        }else if(res.status === 300){
          notifyError(res.message);
          setLoading(false);
        }else{
          notifySuccess(res.message);
          setIsOpen(true);
          setLoading(false);
        }
    } catch (err) {
        notifyError(err ? err?.response?.data?.message : err?.message);
        setLoading(false);
        return
    }
  };

  return {
    register,
    errors,
    loading,
    isOpen,
    handleSubmit,
    submitHandler,
  };
};

export default useSignUpSubmit;
