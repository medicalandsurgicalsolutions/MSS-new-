import Head from "next/head";
import { ToastContainer } from "react-toastify";

//internal import

import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import NavBarTop from "./navbar/NavBarTop";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import FeatureCard from "@components/feature-card/FeatureCard";
import useGetSetting from "@hooks/useGetSetting";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Layout = ({ title, description, children }) => {
  const { storeCustomizationSetting } = useGetSetting();
  return (
    <>
      <ToastContainer />

      <div className="font-serif">
        <Head>
          <title>
            {title
              ? `MSS | ${title}`
              : "Medical Supplies Online | India's No.1 Online Store For Hospital Supplies | MSS"}
          </title>
          {description && <meta name="description" content={description} />}
          <link ref="icon" href="/favicon.png" />
        </Head>
        <NavBarTop />
        <Navbar />
        <div className="bg-gray-50">{children}</div>
        <MobileFooter />
        <div className="w-full">
          {/* <FooterTop /> */}
          {/* <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeatureCard />
          </div> */}
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
      </div>
      <div
          className="fixed bottom-20 right-2 bg-green-500 text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-green-600 transition duration-300"
          style={{ zIndex: 1000 }} // Ensures it's on top of other content
        >
          <a href={`https://wa.me/${storeCustomizationSetting?.footer?.block4_phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={20} />
          </a>
      </div>
    </>
  );
};

export default Layout;
