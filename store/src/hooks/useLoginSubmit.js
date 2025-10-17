import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import { setToken } from "@services/httpServices";

const useLoginSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBtnName, setIsBtnName] = useState("Get OTP");
  const redirectUrl = useSearchParams()?.get("redirectUrl");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async ({ phone, password }) => {
    setLoading(true);

    // STEP 1: Request OTP
    if (!isOpen) {
      try {
        const res = await CustomerServices.loginCustomer({ phone });
        notifySuccess(res?.message || "OTP Sent Successfully!");
        setIsOpen(true);
        setIsBtnName("Login");
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }

    // STEP 2: Verify OTP
    } else {
      try {
        const res = await CustomerServices.loginCustomer({ phone, password });

        if (res?.token) {
          notifySuccess("Login successful!");

          // Save token
          localStorage.setItem("mss_token", res.token);
          setToken(res.token);

          // REDIRECTION LOGIC
          let url = "/"; // default homepage

          if (redirectUrl) {
            if (redirectUrl.includes("/checkout")) {
              url = "/checkout"; // always go to checkout
            } else if (
              redirectUrl.includes("user/dashboard") ||
              redirectUrl.includes("/user/user/my-orders") ||
              redirectUrl.includes("/user/update-profile") ||
              redirectUrl.includes("/user/change-password")
            ) {
              url = redirectUrl; // stay on the same user page
            } else {
              url = "/"; // fallback
            }
          }

          router.push(url);

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
