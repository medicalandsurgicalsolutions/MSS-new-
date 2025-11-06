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
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">

        {/* Left Teal Section */}
        <div className="bg-[#0891B2] w-full md:w-1/2 p-6 md:p-10 text-white flex flex-col gap-5">
          {storeCustomizationSetting?.footer?.block4_status && (
            <div className="flex flex-col gap-5">
              {/* Logo + Text Side by Side */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Logo */}
                <Link href="/" className="block flex-shrink-0">
                  <div className="relative w-32 h-16 md:w-40 md:h-20">
                    <Image
                      src={storeCustomizationSetting?.footer?.block4_logo || logo}
                      alt="logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>

                {/* Description */}
                <p className="text-sm leading-7 font-medium md:flex-1">
                  Medical & Surgical Solutions, we take pride in being a trusted partner for
                  healthcare professionals, hospitals, and institutions across the globe —
                  providing reliable, high-quality medical supplies and equipment that empower
                  better patient care.
                </p>
              </div>

              {/* Address */}
              <p className="text-sm leading-6 font-medium">
                <CMSkeleton
                  count={1}
                  height={10}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block4_address}
                />
              </p>

              {/* Help Line Section */}
              <div>
                <p className="text-base mb-1 font-medium">Our Help Line:</p>
                <a
                  href={`tel:${storeCustomizationSetting?.footer?.block4_phone}`}
                  className="text-2xl font-bold tracking-wide block mb-4"
                >
                  {storeCustomizationSetting?.footer?.block4_phone}
                </a>

                <p className="text-sm leading-6 mb-2 font-medium">
                  Monday to Saturday: Available 24/7
                </p>

                <a
                  href={`mailto:${storeCustomizationSetting?.footer?.block4_email}`}
                  className="text-sm block font-medium"
                >
                  {storeCustomizationSetting?.footer?.block4_email}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right Dark Section */}
        <div className="bg-[#0f0f0f] w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          {/* Grid Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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

          {/* Bottom Section */}
          <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-white text-sm text-center
                          mb-14 md:mb-6 lg:mb-0">
            <p>© {new Date().getFullYear()} All rights reserved by Medical & Surgical Solutions</p>
            <Image
              src="/payment-method/rupay.png"
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
