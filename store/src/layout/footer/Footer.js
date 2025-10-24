import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";
import { FaInstagram, FaYoutube } from "react-icons/fa";

// internal imports
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import logo from "../../../public/logo/logo-color.png";

const Footer = () => {
  const { t } = useTranslation();
  const userInfo = getUserSession();
  const { showingTranslateValue } = useUtilsFunction();
  const { loading, storeCustomizationSetting } = useGetSetting();

  return (
    <footer className="bg-[#0f0f0f] text-white">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Blue Section */}
       <div className="bg-cyan-600 p-8 md:p-12">
  {storeCustomizationSetting?.footer?.block4_status && (
    <div>
      <Link href="/" className="block mb-5">
        <div className="relative w-36 h-10">
          <Image
            src={storeCustomizationSetting?.footer?.block4_logo || logo}
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <p className="text-sm leading-7">
        <strong>Medical & Surgical Solutions</strong>
        <br />
        <CMSkeleton
          count={1}
          height={10}
          loading={loading}
          data={storeCustomizationSetting?.footer?.block4_address}
        />
        <br />
        {/* Clickable Phone */}
        <a
          href={`tel:${storeCustomizationSetting?.footer?.block4_phone}`}
          className="cursor-pointer"
        >
          Tel: {storeCustomizationSetting?.footer?.block4_phone}
        </a>
        <br />
        {/* Clickable Email */}
        <a
          href={`mailto:${storeCustomizationSetting?.footer?.block4_email}`}
          className="cursor-pointer"
        >
          Email: {storeCustomizationSetting?.footer?.block4_email}
        </a>
      </p>
    </div>
  )}
</div>


        {/* Right Dark Section */}
        <div className="bg-[#0f0f0f] p-8 md:p-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Block 1 */}
          {storeCustomizationSetting?.footer?.block1_status && (
            <div>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block1_title}
                />
              </h3>
              <ul className="space-y-2 text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block1_sub_link${i}`]}`}
                      className="hover:text-cyan-400"
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

          {/* Block 2 */}
          {storeCustomizationSetting?.footer?.block2_status && (
            <div>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block2_title}
                />
              </h3>
              <ul className="space-y-2 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block2_sub_link${i}`]}`}
                      className="hover:text-cyan-400"
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
               
              </ul>
            </div>
          )}

          {/* Block 3 */}
          {storeCustomizationSetting?.footer?.block3_status && (
            <div>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block3_title}
                />
              </h3>
              <ul className="space-y-2 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${
                        userInfo?.email
                          ? storeCustomizationSetting?.footer?.[`block3_sub_link${i}`]
                          : "/auth/login"
                      }`}
                      className="hover:text-cyan-400"
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
        </div>
      </div>

      {/* Bottom Section */}

  <div className="bg-gray-800 mt-4 rounded-lg">
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-center md:text-left gap-8">

      {/* ---- FOLLOW US ---- */}
      <div className="flex flex-col items-center md:items-start justify-start w-full md:w-1/3">
        <h4 className="text-base font-semibold text-white mb-3 tracking-wide">
          Follow Us
        </h4>
         <div className="flex gap-2 justify-center md:justify-start">
          <Link href="https://www.facebook.com/share/1BKFiDnANi/" target="_blank" rel="noopener noreferrer"className="bg-white p-1 rounded-full shadow hover:bg-blue-100 transition">
            <FacebookIcon size={26} round />
          </Link>
          <Link href="https://www.instagram.com/mssofficial2011/" target="_blank" rel="noopener noreferrer"className="bg-white p-1 rounded-full shadow hover:bg-pink-100 transition">
            <FaInstagram size={24} className="text-pink-500 hover:text-pink-600 transition" />
          </Link>
          <Link href="https://www.linkedin.com/company/105331627/admin/page-posts/published/" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded-full shadow hover:bg-blue-100 transition">
            <LinkedinIcon size={26} round />
          </Link>
          <Link href="https://wa.me/9643344588" target="_blank" rel="noopener noreferrer"className="bg-white p-1 rounded-full shadow hover:bg-green-100 transition">
            <WhatsappIcon size={26} round />
          </Link>
          <Link href="https://www.youtube.com/@MEDICALANDSURGICALSOLUTIONS" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded-full shadow hover:bg-red-100 transition">
            <FaYoutube size={24} className="text-red-500 hover:text-red-600 transition" />
          </Link>
        </div>
      </div>

      {/* ---- CALL US ---- */}
      <div className="flex flex-col items-center justify-start w-full md:w-1/3">
        <h4 className="text-base font-semibold text-white mb-3 tracking-wide">
          Call Us Today
        </h4>
        <a
          href="tel:+919643344588"
         className="text-white font-bold text-xl transition hover:text-[#0891b2]"
        >
          +91 96433 44588
        </a>
      </div>

      {/* ---- SECURE PAYMENT ---- */}
      <div className="flex flex-col items-center md:items-end justify-start w-full md:w-1/3">
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

      {/* Copyright */}
      <div className="bg-black py-3 text-center text-gray-400 text-sm">
        © 2025 Medical & Surgical Solutions. All Rights Reserved.
      </div>
    </footer>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
