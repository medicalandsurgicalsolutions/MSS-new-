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
                Tel: {storeCustomizationSetting?.footer?.block4_phone}
                <br />
                Email: {storeCustomizationSetting?.footer?.block4_email}
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
      <div className="bg-[#1a1a1a] border-t border-gray-700 ">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 grid grid-cols-1 md:grid-cols-3 items-center gap-3">
          {/* Social Icons */}
          <div>
            {storeCustomizationSetting?.footer?.social_links_status && (
              <div>
                <span className="text-base font-medium block mb-2">
                  {t("common:footer-follow-us")}
                </span>
                <div className="flex gap-3">
                  {storeCustomizationSetting?.footer?.social_facebook && (
                    <Link
                      href={storeCustomizationSetting?.footer?.social_facebook}
                      target="_blank"
                      className="hover:text-cyan-400"
                    >
                      <FacebookIcon size={28} round />
                    </Link>
                  )}
                  {storeCustomizationSetting?.footer?.social_pinterest && (
                    <Link
                      href={storeCustomizationSetting?.footer?.social_pinterest}
                      target="_blank"
                      className="hover:text-pink-500"
                    >
                      <FaInstagram size={24} />
                    </Link>
                  )}
                  {storeCustomizationSetting?.footer?.social_linkedin && (
                    <Link
                      href={storeCustomizationSetting?.footer?.social_linkedin}
                      target="_blank"
                      className="hover:text-blue-400"
                    >
                      <LinkedinIcon size={28} round />
                    </Link>
                  )}
                  {storeCustomizationSetting?.footer?.social_whatsapp && (
                    <Link
                      href={storeCustomizationSetting?.footer?.social_whatsapp}
                      target="_blank"
                      className="hover:text-green-400"
                    >
                      <WhatsappIcon size={28} round />
                    </Link>
                  )}
                  <Link
                    href={storeCustomizationSetting?.footer?.social_twitter || "#"}
                    target="_blank"
                    className="hover:text-red-500"
                  >
                    <FaYoutube size={24} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="text-center">
            {storeCustomizationSetting?.footer?.bottom_contact_status && (
              <>
                <p className="text-base font-medium">Call Us</p>
                <h5 className="text-2xl font-bold text-cyan-500">
                  {storeCustomizationSetting?.footer?.bottom_contact}
                </h5>
              </>
            )}
          </div>

          {/* Payment */}
          {storeCustomizationSetting?.footer?.payment_method_status && (
            <div className="text-center md:text-right">
              <h2 className="font-semibold mb-2">Secure Payment</h2>
              <Image
                width={180}
                height={20}
                className="inline-block"
                src={
                  storeCustomizationSetting?.footer?.payment_method_img ||
                  "/payment-method/payment-logo.png"
                }
                alt="payment"
              />
            </div>
          )}
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
