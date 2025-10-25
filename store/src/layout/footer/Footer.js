import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import useTranslation from "next-translate/useTranslation"

// internal imports
import { getUserSession } from "@lib/auth"
import useGetSetting from "@hooks/useGetSetting"
import CMSkeleton from "@components/preloader/CMSkeleton"
import useUtilsFunction from "@hooks/useUtilsFunction"
import logo from "../../../public/logo/logo-color.png"

const Footer = () => {
  const { t } = useTranslation()
  const userInfo = getUserSession()
  const { showingTranslateValue } = useUtilsFunction()
  const { loading, storeCustomizationSetting } = useGetSetting()

  return (
    <footer className="bg-black text-white">
      {/* Top Section - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Blue Section */}
        <div className="bg-blue-600 p-8 md:p-12">
          {storeCustomizationSetting?.footer?.block4_status && (
            <div>
              <Link href="/" className="block mb-6">
                <div className="relative w-40 h-12">
                  <Image
                    src={storeCustomizationSetting?.footer?.block4_logo || logo}
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-sm leading-7 text-white">
                <CMSkeleton
                  count={1}
                  height={10}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block4_address}
                />
              </p>

              {/* Our Help Line */}
              <div className="mt-6">
                <p className="text-sm font-semibold mb-2">Our Help Line:</p>
                <a
                  href={`tel:${storeCustomizationSetting?.footer?.block4_phone}`}
                  className="text-2xl font-bold hover:text-blue-200 transition"
                >
                  <CMSkeleton
                    count={1}
                    height={20}
                    loading={loading}
                    data={storeCustomizationSetting?.footer?.block4_phone}
                  />
                </a>
              </div>

              {/* Hours */}
              <div className="mt-4 text-sm">
                <p className="mb-1">Monday - Friday: 9:00 - 20:00</p>
                <p className="mb-3">Saturday: 11:00 - 15:00</p>
              </div>

              {/* Email */}
              <a
                href={`mailto:${storeCustomizationSetting?.footer?.block4_email}`}
                className="text-sm hover:text-blue-200 transition"
              >
                <CMSkeleton
                  count={1}
                  height={10}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block4_email}
                />
              </a>
            </div>
          )}
        </div>

        {/* Right Dark Section - Three Columns */}
        <div className="bg-gray-900 p-8 md:p-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Block 1 - Information */}
          {storeCustomizationSetting?.footer?.block1_status && (
            <div>
              <h3 className="text-base font-semibold mb-4 pb-2 border-b-2 border-yellow-500">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block1_title}
                />
              </h3>
              <ul className="space-y-3 text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block1_sub_link${i}`]}`}
                      className="hover:text-yellow-400 transition"
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

          {/* Block 2 - Custom Links */}
          {storeCustomizationSetting?.footer?.block2_status && (
            <div>
              <h3 className="text-base font-semibold mb-4 pb-2 border-b-2 border-yellow-500">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block2_title}
                />
              </h3>
              <ul className="space-y-3 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Link
                      href={`${storeCustomizationSetting?.footer?.[`block2_sub_link${i}`]}`}
                      className="hover:text-yellow-400 transition"
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

          {/* Block 3 - Newsletter */}
          {storeCustomizationSetting?.footer?.block3_status && (
            <div>
              <h3 className="text-base font-semibold mb-4 pb-2 border-b-2 border-yellow-500">
                <CMSkeleton
                  count={1}
                  height={20}
                  loading={loading}
                  data={storeCustomizationSetting?.footer?.block3_title}
                />
              </h3>
              <p className="text-sm mb-4 leading-6">
                You may unsubscribe at any moment. For that purpose, please find our contact.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your mail"
                  className="px-4 py-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                  SUBMIT NOW
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default dynamic(() => Promise.resolve(Footer), { ssr: false })
