import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
//import { signIn } from "next-auth/react";

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

  const submitHandler = async ({ phone, password}) => {
    setLoading(true);
    if(!isOpen){
      try{
        //setLoading(true);
        const userInfo = await CustomerServices.loginCustomer({phone});
        notifySuccess(res.message || "OTP Sent Successfully!");
        setIsOpen(true);
        setIsBtnName("Login")
      }catch(err){
        notifyError(err?.response?.data?.message || err.message);
      }
      finally{
        setLoading(false);
      }
      }else {
      // STEP 2: Verify OTP
      try {
        const res = await CustomerServices.loginCustomer({ phone, password });

        if (res?.token) {
          notifySuccess("Login successful!");

          // Save token in localStorage
          localStorage.setItem("mss_token", res.token);

          // Redirect
          const url = redirectUrl ? "/checkout" : "/user/dashboard";
          await router.push(url);
        } else {
          notifyError(res?.message || "Invalid OTP!");
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
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

