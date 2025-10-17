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
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirectUrl");

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

          // ✅ Redirect Logic
          let url = "/";

          // Check redirectUrl (if user came from protected page)
          if (redirectUrl) {
            if (redirectUrl.includes("checkout")) url = "/checkout";
            else if (redirectUrl.includes("dashboard")) url = "/dashboard";
            else if (redirectUrl.includes("my-orders")) url = "/my-orders";
            else if (redirectUrl.includes("recent-orders")) url = "/recent-orders";
            else if (redirectUrl.includes("update-profile") || redirectUrl.includes("my-account"))
              url = "/user/my-account";
            else url = redirectUrl; // fallback if custom
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
