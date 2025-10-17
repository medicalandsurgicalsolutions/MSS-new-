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

    if (!isOpen) {
      // STEP 1: Request OTP
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
    } else {
      // STEP 2: Verify OTP
      try {
        const res = await CustomerServices.loginCustomer({ phone, password });

        if (res?.token) {
          notifySuccess("Login successful!");

          // Save token
          localStorage.setItem("mss_token", res.token);
          setToken(res.token);

          // ✅ Debug logs
          console.log("Raw redirectUrl:", redirectUrl);

          // ✅ Default redirect
          let finalUrl = "/";

          if (redirectUrl) {
            // Clean the redirectUrl (remove domain or /auth prefix)
            const cleanUrl = redirectUrl
              .replace(/^https?:\/\/[^/]+/i, "") // remove domain if present
              .replace(/^\/auth/, ""); // remove /auth prefix if present

            console.log("Cleaned redirectUrl:", cleanUrl);

            // Checkout redirect
            if (cleanUrl.startsWith("/checkout")) {
              finalUrl = "/checkout";
            }
            // User-related pages (from your data.js userSidebar)
            else if (
              cleanUrl.startsWith("/user/dashboard") ||
              cleanUrl.startsWith("/user/my-orders") ||
              cleanUrl.startsWith("/user/recent-orders") ||
              cleanUrl.startsWith("/user/update-profile") ||
              cleanUrl.startsWith("/user/change-password")
            ) {
              finalUrl = cleanUrl;
            }
            // Other pages like offers, contact, etc.
            else {
              finalUrl = "/";
            }
          }

          console.log("Redirecting to:", finalUrl);
          router.push(finalUrl);
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
