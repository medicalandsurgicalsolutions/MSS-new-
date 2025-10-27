import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // ✅ REMOVE API CALL from getInitialProps
    // const setting = await SettingServices.getStoreSeoSetting(); // ❌ COMMENT/REMOVE THIS

    return { ...initialProps, setting: null }; // ✅ Return null for setting
  }

  render() {
    const setting = this.props.setting; // This will be null now
    return (
      <Html lang="en">
        <Head>  
          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-HLFFV5Z3MM"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HLFFV5Z3MM');
            `,
            }}
          />
          {/* Meta Pixel Code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1670629450459691');
              fbq('track', 'PageView');
            `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=1670629450459691&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
          {/* End Meta Pixel Code */}
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    (function(w,d,s,l,i){
                      w[l]=w[l]||[];
                      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                      var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                      j.async=true;
                      j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                      f.parentNode.insertBefore(j, f);
                    })(window,document,'script','dataLayer','GTM-WBJB2WV6');
                  `,
            }}
          />
          {/* End Google Tag Manager */}
          
          {/* ✅ Use fallback values instead of API data */}
          <link rel="icon" href="/favicon.png" />
          <meta
            property="og:title"
            content="Medical&SurgicalSolutions - Medical & Surgical Solutions"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="Medical & Surgical Solutions"
          />
          <meta
            name="keywords"
            content="ecommerce online store"
          />
          <meta
            property="og:url"
            content="https://medicalsurgicalsolutions.com/"
          />
          <meta
            property="og:image"
            content="https://medicalsurgicalsolutions.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdvqwfpmxo%2Fimage%2Fupload%2Fv1727785807%2Fundefined%2FAsset_1-transformed.png&w=1920&q=75"
          />
          
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="n40DpVFfwsZYKM5viRCSrc6KqKOinLtYHJqdv1RwVpE"
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WBJB2WV6"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
