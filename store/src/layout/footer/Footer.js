<div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-gray-100 shadow-md border border-gray-200 rounded-lg">
  <div className="grid grid-cols-1 md:grid-cols-3 items-center py-8 gap-8 text-center md:text-left">

    {/* --- FOLLOW US SECTION --- */}
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

    {/* --- CALL US SECTION --- */}
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

    {/* --- SECURE PAYMENT SECTION --- */}
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
