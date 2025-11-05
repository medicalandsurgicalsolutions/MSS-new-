import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "@styles/custom.css";
import { CartProvider } from "react-use-cart";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import Script from "next/script";
import Head from "next/head"; 

// internal imports
import store from "@redux/store";
import useAsync from "@hooks/useAsync";
import { handlePageView } from "@lib/analytics";
import { UserProvider } from "@context/UserContext";
import DefaultSeo from "@components/common/DefaultSeo";
import { SidebarProvider } from "@context/SidebarContext";
import SettingServices from "@services/SettingServices";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const {
    data: storeSetting,
    loading,
    error,
  } = useAsync(SettingServices.getStoreSetting);

  useEffect(() => {
    // Initialize Google Analytics
    if (!loading && !error && storeSetting?.google_analytic_status) {
      ReactGA.initialize(storeSetting?.google_analytic_key || "");

      // Initial page load
      handlePageView();

      // Track page view on route change
      const handleRouteChange = (url) => {
        handlePageView(`/${router.pathname}`, "Medical&SurgicalSolutions");
      };

      // Set up event listeners
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [storeSetting]);

  return (
    <>
     {/* ✅ Google Fonts Import (Montserrat) */}
      <Head>
        <link
           href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
         />
            <style>{`
          /* Apply Doppio One to all headings */
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Windsor', sans-serif !important;
          }
        `}</style>
      </Head>
      {/* Meta Pixel Script */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '497784453413104');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* NoScript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=497784453413104&ev=PageView&noscript=1"
        />
      </noscript>

      {!loading && !error && storeSetting?.tawk_chat_status && (
        <TawkMessengerReact
          propertyId={storeSetting?.tawk_chat_property_id || ""}
          widgetId={storeSetting?.tawk_chat_widget_id || ""}
        />
      )}

      {/* ✅ Correct Provider Order */}
      <CartProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>
              <UserProvider>
                <SidebarProvider>
                  <DefaultSeo />
                  <Component {...pageProps} />
                </SidebarProvider>
              </UserProvider>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </CartProvider>
    </>
  );
}

export default MyApp;
