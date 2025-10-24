import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { FaX, FaInstagram, FaYoutube } from "react-icons/fa";

// internal import
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import logo from "../../../public/logo/logo-color.png";
import { useRouter } from "next/router";

const Footer = () => {
  const { t } = useTranslation();
  const userInfo = getUserSession();
  const { showingTranslateValue } = useUtilsFunction();
  const { loading, storeCustomizationSetting } = useGetSetting();
  const router = useRouter();

  return (
    <div className="pb-16 lg:pb-0 xl:pb-0 bg-cyan-600">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
        {/* --- TOP FOOTER BLOCKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
          {/* --- Block 4: Logo and Contact --- */}
          {storeCustomizationSetting?.footer?.block4_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <Link href="/" className="mr-3 lg:mr-12 xl:mr-12" rel="noreferrer">
                <div className="relative w-32 h-10">
                  <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                    src={storeCustomizationSetting?.footer?.block4_logo || logo}
                    alt="logo"
                  />
                </div>
              </Link>
              <p className="leading-7 font-sans text-sm text-white mt-3">
                <span className="font-bold">Medical & Surgical Solutions</span>
                <br />
                <CMSkeleton
                  count={1}
                  height={10}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block4_address}
                />
                <br />
                <span>Tel : {storeCustomizationSetting?.footer?.block4_phone}</span>
                <br />
                <span>Email : {storeCustomizationSetting?.footer?.block4_email}</span>
              </p>
            </div>
          )}

          {/* --- Block 2: Links --- */}
          {storeCustomizationSetting?.footer?.block2_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg text-white font-bold mb-4 sm:mb-5 lg:mb-6 mt-4">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block2_title}
                />
              </h3>
              <ul className="text-sm lg:text-15px flex flex-col space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block2_sub_link${i}`]}`}
                      className="text-white hover:text-gray-200 transition"
                    >
                      <CMSkeleton
                        count={1}
                        height={10}
                        loading={loading}
                        data={storeCustomizationSetting?.footer?.[`block2_sub_title${i}`]}
                      />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="#" className="text-white tracking-wide hover:text-gray-200 transition">
                    Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-white tracking-wide hover:text-gray-200 transition">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* --- Block 3: Account or Login Links --- */}
          {storeCustomizationSetting?.footer?.block3_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg text-white font-bold mb-4 sm:mb-5 lg:mb-6 mt-4">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block3_title}
                />
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${
                        userInfo?.email
                          ? storeCustomizationSetting?.footer?.[`block3_sub_link${i}`]
                          : "/auth/login"
                      }`}
                      className="text-white hover:text-gray-200 transition"
                    >
                      <CMSkeleton
                        count={1}
                        height={10}
                        loading={loading}
                        data={storeCustomizationSetting?.footer?.[`block3_sub_title${i}`]}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* --- Block 1: Policy Links --- */}
          {storeCustomizationSetting?.footer?.block1_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg text-white font-bold mb-4 sm:mb-5 lg:mb-6 mt-4">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block1_title}
                />
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block1_sub_link${i}`]}`}
                      className="text-white hover:text-gray-200 transition"
                    >
                      <CMSkeleton
                        count={1}
                        height={10}
                        loading={loading}
                        data={storeCustomizationSetting?.footer?.[`block1_sub_title${i}`]}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* --- BOTTOM SECTION (Follow Us / Call Us / Secure Payment) --- */}
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-gray-100 shadow-md border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center py-8 gap-8 text-center md:text-left">
            {/* --- FOLLOW US --- */}
            <div className="flex flex-col items-center md:items-start">
              {storeCustomizationSetting?.footer?.social_links_status && (
                <div>
                  {(storeCustomizationSetting?.footer?.social_facebook ||
                    storeCustomizationSetting?.footer?.social_twitter ||
                    storeCustomizationSetting?.footer?.social_pinterest ||
                    storeCustomizationSetting?.footer?.social_linkedin ||
                    storeCustomizationSetting?.footer?.social_whatsapp) && (
                    <span className="text-lg font-semibold text-cyan-700 mb-3 block">
                      {t("common:footer-follow-us")}
                    </span>
                  )}
                  <ul className="flex flex-wrap justify-center md:justify-start gap-3">
                    {storeCustomizationSetting?.footer?.social_facebook && (
                      <li>
                        <Link
                          href={storeCustomizationSetting?.footer?.social_facebook}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Facebook"
                          className="bg-white shadow-md rounded-full p-2 hover:bg-cyan-600 transition"
                        >
                          <FacebookIcon size={32} round />
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href={storeCustomizationSetting?.footer?.social_twitter}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="YouTube"
                        className="bg-white shadow-md rounded-full p-2 hover:bg-red-600 transition"
                      >
                        <FaYoutube size={26} className="text-red-500 hover:text-white transition" />
                      </Link>
                    </li>
                    {storeCustomizationSetting?.footer?.social_pinterest && (
                      <li>
                        <Link
                          href={storeCustomizationSetting?.footer?.social_pinterest}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Instagram"
                          className="bg-white shadow-md rounded-full p-2 hover:bg-pink-500 transition"
                        >
                          <FaInstagram size={26} className="text-pink-600 hover:text-white transition" />
                        </Link>
                      </li>
                    )}
                    {storeCustomizationSetting?.footer?.social_linkedin && (
                      <li>
                        <Link
                          href={storeCustomizationSetting?.footer?.social_linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="LinkedIn"
                          className="bg-white shadow-md rounded-full p-2 hover:bg-blue-700 transition"
                        >
                          <LinkedinIcon size={32} round />
                        </Link>
                      </li>
                    )}
                    {storeCustomizationSetting?.footer?.social_whatsapp && (
                      <li>
                        <Link
                          href={storeCustomizationSetting?.footer?.social_whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="WhatsApp"
                          className="bg-white shadow-md rounded-full p-2 hover:bg-green-600 transition"
                        >
                          <WhatsappIcon size={32} round />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* --- CALL US --- */}
            {storeCustomizationSetting?.footer?.bottom_contact_status && (
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold text-cyan-700 mb-2">
                  {t("common:footer-call-us")}
                </p>
                <h5 className="text-2xl font-bold text-gray-800">
                  {storeCustomizationSetting?.footer?.bottom_contact}
                </h5>
              </div>
            )}

            {/* --- SECURE PAYMENT --- */}
            {storeCustomizationSetting?.footer?.payment_method_status && (
              <div className="flex flex-col items-center md:items-end">
                <h2 className="text-lg font-semibold text-cyan-700 mb-3">
                  Secure Payment
                </h2>
                <div className="border rounded-lg shadow-sm bg-white p-2 inline-flex justify-center">
                  <Image
                    width={274}
                    height={85}
                    className="w-auto h-20 object-contain"
                    src={
                      storeCustomizationSetting?.footer?.payment_method_img ||
                      "/payment-method/payment-logo.png"
                    }
                    alt="payment method"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- COPYRIGHT --- */}
      <div className="text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8 text-center md:text-left space-y-2 md:space-y-0">
          <div className="text-sm text-gray-300">
            Copyright © 2024 Medical Surgical Solutions.
          </div>
          <p className="text-sm text-gray-300 leading-6">
            Designed & Developed by{" "}
            <Link
              href="https://kanakdrishtiinfo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:underline"
            >
              Kanak Drishti Infotech
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
