import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

// internal import
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import NavBarTop from "./navbar/NavBarTop";
import MobileFooter from "@layout/footer/MobileFooter";
import useGetSetting from "@hooks/useGetSetting";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Layout = ({ title, description, children }) => {
  const { storeCustomizationSetting } = useGetSetting();
  const [showScroll, setShowScroll] = useState(false);

  // Show the scroll button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FQFCKJZ2DF"
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FQFCKJZ2DF');
          `,
        }}
      />
      <ToastContainer />

      <div className="font-serif">
        <Head>
          <title>
            {title
              ? `MSS | ${title}`
              : "Medical Supplies Online | India's No.1 Online Store For Hospital Supplies | MSS"}
          </title>
          {description && <meta name="description" content={description} />}
          <link rel="icon" href="/favicon.png" />
        </Head>

        <NavBarTop />
        <Navbar />
        <div className="bg-gray-50">{children}</div>
        <MobileFooter />
        <div className="w-full">
          <hr className="hr-line" />
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
    <div
        className="
          fixed 
          bottom-24 lg:bottom-20 right-3 
          bg-green-500 text-white rounded-full p-3 cursor-pointer shadow-lg 
          hover:bg-green-600 transition duration-300
        "
        style={{ zIndex: 1000 }}
      >
        <a
          href={`https://wa.me/${storeCustomizationSetting?.footer?.block4_phone?.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={20} />
        </a>
    </div>


      {/* Scroll to top button (below WhatsApp) */}
      {showScroll && (
        <div
        onClick={scrollToTop}
        className="
          fixed 
          bottom-[3.5rem] lg:bottom-4 right-3 
          bg-[#0891b2] text-white rounded-full p-3 cursor-pointer shadow-lg 
          hover:bg-[#b52228] transition duration-300
        "
        style={{ zIndex: 1000 }}
      >
        <FaArrowUp size={18} />
      </div>


      )}
    </>
  );
};

export default Layout;
