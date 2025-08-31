import React, { useState, useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

//internal import
import Loading from "@components/preloader/Loading";
import CustomerServices from "@services/CustomerServices";
import useGetSetting from "@hooks/useGetSetting";
import logo from "../../../../public/logo/logo-color.png";
import Image from "next/image";
import { notifyError, notifySuccess } from "@utils/toast";
import { useRouter } from "next/router";


const EmailVerification = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const { storeCustomizationSetting } = useGetSetting();

  const router = useRouter()

  // console.log("params", params);

  const handleRegisterCustomer = async () => {
    setLoading(true);
    try {
      const res = await CustomerServices.registerCustomer(params?.token);
      setLoading(false);
      notifySuccess(res.message);
      router.push("/auth/login");
    } catch (err) {
      setLoading(false);
      notifyError(err ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="text-center w-full">
          <div className="relative w-full h-20 mb-2">
            <Image
              src={storeCustomizationSetting?.navbar?.logo || logo}
              alt="Company Logo"
              layout="fill" // Automatically adjusts the image size
              objectFit="contain" // Ensures the image fits within the div without distortion
              priority
            />
          </div>
          <p className="text-xl font-semibold">Click below to verify your Account!</p>
          <button 
          className="mt-4 bg-emerald-500 text-white p-2 rounded-md"
          onClick={handleRegisterCustomer}
          >   Verify Now </button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default EmailVerification;
