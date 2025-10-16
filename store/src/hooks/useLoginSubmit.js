import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import { setToken } from "@services/httpServices"; // Axios token setter

const useLoginSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBtnName, setIsBtnName] = useState("Get OTP");

  // ✅ Read redirect URL properly
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirectUrl") || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ phone, password }) => {
    setLoading(true);

    // 🟢 STEP 1: Request OTP
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

    // 🟢 STEP 2: Verify OTP
    } else {
      try {
        const res = await CustomerServices.loginCustomer({ phone, password });

        if (res?.token) {
          notifySuccess("Login successful!");

          // ✅ Save token in localStorage
          localStorage.setItem("token", res.token);

          // ✅ Set token globally for Axios requests
          setToken(res.token);

          // ✅ Redirect properly
          if (redirectUrl) {
            router.push(redirectUrl); // Go to checkout if coming from checkout flow
          } else {
            router.push("/user/dashboard"); // Fallback dashboard
          }
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
