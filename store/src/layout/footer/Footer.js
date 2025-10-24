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
import { FaInstagram, FaYoutube } from "react-icons/fa";

// internal imports
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
        {/* Top Footer Section */}
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
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
                <span className="text-bold">Medical & Surgical Solutions</span>
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

          {storeCustomizationSetting?.footer?.block2_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg text-white lg:leading-7 font-bold mb-4 sm:mb-5 lg:mb-6 mt-4 pb-0.5">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block2_title}
                />
              </h3>
              <ul className="text-sm lg:text-15px flex flex-col space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-baseline">
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block2_sub_link${i}`]}`}
                      className="text-white inline-block w-full"
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
                  <Link href="#" className="text-white inline-block w-full tracking-wide">
                    Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-white inline-block w-full tracking-wide">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {storeCustomizationSetting?.footer?.block3_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg text-white lg:leading-7 font-bold mb-4 sm:mb-5 lg:mb-6 mt-4 pb-0.5">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block3_title}
                />
              </h3>
              <ul className="text-sm lg:text-15px flex flex-col space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-baseline">
                    <Link
                      href={`${
                        userInfo?.email
                          ? storeCustomizationSetting?.footer?.[`block3_sub_link${i}`]
                          : "/auth/login"
                      }`}
                      className="text-white inline-block w-full"
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

          {storeCustomizationSetting?.footer?.block1_status && (
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg text-white lg:leading-7 font-bold mb-4 sm:mb-5 lg:mb-6 mt-4 pb-0.5">
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
                      className="text-white inline-block w-full"
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

        {/* ================= BOTTOM SECTION ================= */}
        <div className="bg-gray-800 mt-8 rounded-lg">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">

              {/* ---- FOLLOW US ---- */}
              <div className="flex flex-col items-center md:items-start justify-center">
                <h4 className="text-base font-semibold text-white mb-3 tracking-wide">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <Link href="#" className="bg-white p-2 rounded-full shadow hover:bg-blue-600 transition">
                    <FacebookIcon size={32} round />
                  </Link>
                  <Link href="#" className="bg-white p-2 rounded-full shadow hover:bg-pink-500 transition">
                    <FaInstagram size={26} className="text-pink-600 hover:text-white transition" />
                  </Link>
                  <Link href="#" className="bg-white p-2 rounded-full shadow hover:bg-blue-700 transition">
                    <LinkedinIcon size={32} round />
                  </Link>
                  <Link href="#" className="bg-white p-2 rounded-full shadow hover:bg-green-600 transition">
                    <WhatsappIcon size={32} round />
                  </Link>
                  <Link href="#" className="bg-white p-2 rounded-full shadow hover:bg-red-600 transition">
                    <FaYoutube size={26} className="text-red-500 hover:text-white transition" />
                  </Link>
                </div>
              </div>

              {/* ---- CALL US ---- */}
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-base font-semibold text-white mb-2 tracking-wide">
                  Call Us Today
                </h4>
                <a
                  href="tel:+919643344588"
                  className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  +91 96433 44588
                </a>
              </div>

              {/* ---- SECURE PAYMENT ---- */}
              <div className="flex flex-col items-center md:items-end justify-center">
                <h4 className="text-base font-semibold text-white mb-3 tracking-wide">
                  Secure Payment
                </h4>
                <div className="flex items-center justify-center bg-white rounded-lg shadow px-3 py-2">
                  <Image
                    src="/payment-method/payment-logo.png"
                    alt="Secure Payment"
                    width={200}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="text-white py-4">
        <div className="container mx-auto md:flex lg:flex justify-between items-center px-8">
          <div className="text-sm text-gray-300">
            Copyright © 2024 Medical Surgical Solutions.
          </div>
          <p className="text-sm text-gray-300 leading-6">
            Designed & Developed by{" "}
            <Link
              href="https://kanakdrishtiinfo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
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
