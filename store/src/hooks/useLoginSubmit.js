import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

//internal import

import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";

const useLoginSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBtnName, setIsBtnName] = useState("Get Otp");
  const redirectUrl = useSearchParams().get("redirectUrl");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ phone, password, name }) => {
    setLoading(true);
    if(!isOpen){
      try{
        setLoading(true);
        const userInfo = await CustomerServices.loginCustomer({phone, password});
        notifySuccess(userInfo?.message);
        setIsOpen(true);
        setIsBtnName("Login")
      }catch(err){
        notifyError(err.message);
      }
      finally{
        setLoading(false);
      }
      }else{
        const result = await signIn("credentials", {
          redirect: false, // Changed to false to handle redirection manually
          phone,
          password,
          callbackUrl: "/user/dashboard",
        });
        setLoading(false);
        // console.log("First Log ", result);
        if (result?.error) {
          // console.error("SignIn Error: check", result.error);
          notifyError("Invalid OTP!");
        } 
        else if (result?.ok) {
          notifySuccess("Login Successfully");
          setIsOpen(true);
          const url = redirectUrl ? "/checkout" : result.url;
          await router.push(url);
        }
      }
  };

  return {
    register,
    errors,
    loading,
    isOpen,
    isBtnName,
    handleSubmit,
    submitHandler,
  };
};

export default useLoginSubmit;
