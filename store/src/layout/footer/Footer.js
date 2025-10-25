import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
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
        {/* Left Teal Section */}
        <div className="bg-[#0891B2] p-6 md:p-10 text-white">
          {storeCustomizationSetting?.footer?.block4_status && (
            <div>
              <Link href="/" className="block mb-5">
                <div className="relative w-40 h-12">
                  <Image
                    src={storeCustomizationSetting?.footer?.block4_logo || logo}
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              <p className="text-sm leading-7">
                <strong>Medical & Surgical Solutions, we take pride in being a trusted partner for healthcare professionals, hospitals, and institutions across the globe - providing reliable, high-quality medical supplies and equipment that empower better patient care.</strong>
                <br />
                <CMSkeleton
                  count={1}
                  height={10}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block4_address}
                />
                <br />
                <a
                  href={`tel:${storeCustomizationSetting?.footer?.block4_phone}`}
                  className="cursor-pointer hover:underline"
                >
                  Tel: {storeCustomizationSetting?.footer?.block4_phone}
                </a>
                <br />
                <a
                  href={`mailto:${storeCustomizationSetting?.footer?.block4_email}`}
                  className="cursor-pointer hover:underline"
                >
                  Email: {storeCustomizationSetting?.footer?.block4_email}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Right Dark Section */}
        <div className="bg-[#0f0f0f] p-6 md:p-10 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                        className="hover:text-[#0891B2] transition"
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
                        className="hover:text-[#0891B2] transition"
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
                        className="hover:text-[#0891B2] transition"
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

          {/* Bottom Inside Dark Section */}
          <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 text-sm text-center">
            <p>2025 © All rights reserved by RadiusTheme</p>
            <Image
              src="/payment-method/payment-logo.png"
              alt="Secure Payment"
              width={220}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
