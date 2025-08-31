const emailVerificationBody = (option) => {
    return `
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
  
  <head>
    <title>MSS</title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      p {
        display: block;
        margin: 13px 0;
      }
      #common_table {
        border: 1px solid lightgrey;
        border-collapse: collapse;
      }
    </style>
  
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
        .mj-column-per-50 {
          width: 50% !important;
          max-width: 50%;
        }
      }
    </style>
    <style media="screen and (min-width: 480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
      .moz-text-html .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }
        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>
  
  <body style="word-spacing:normal;background-color:#f2f3f8;">
    <div style="background-color:#f2f3f8; padding-bottom:100px;">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="background-color:#f2f3f8;"
      >
        
      </table>
  
      <div
        style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background:#ffffff;background-color:#ffffff;width:100%;"
        >
          <tbody>
            <tr>
              <td
                style="direction:ltr;font-size:0px;padding:0 0 20px;padding-left:15px;padding-right:15px;text-align:center;padding-top: 20px;"
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="font-size:15px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;background:#ffffff;background-color:#ffffff"
                >
                  <!--start email_template -->
  
                  <h2>Hello ${option.email},</h2>
                  <p>
                    Please enter the below mentioned OTP for logging in to your account on Medical & Surgical Solutions.
                  </p>
  
                  <p style="text-align:center;margin-top:40px;">
                    <strong>${option.otp}</strong>
                  </p>
  
                  <p style="margin-top: 50px;">
                    This OTP is valid for 10 minutes. Please do not share it with anyone for security reasons.
                  </p>
  
                  <p style="text-align:center;margin-top:40px;">
                    Thank you,<br />
                    <strong>Medical & Surgical Solutions Team</strong>
                  </p>
  
                  <!--end email_template -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div
        style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background:#ffffff;background-color:#ffffff;width:100%;"
        >
          <tbody>
            <tr>
              <td
                style="direction:ltr;font-size:0px;padding:0px;padding-left:15px;padding-right:15px;text-align:center;padding-top:0px;"
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="font-size:15px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;background:#ffffff;background-color:#ffffff"
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
  
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width:100%; margin-bottom:20px;"
        >
          <tbody>
            <tr>
              <td>
                <div style="margin:25px auto;max-width:600px;">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width:100%;"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="direction:ltr;font-size:0px;margin-top:40px 0;text-align:center; border-top: 1px solid lightgray;"
                        >
                          <div style="margin:0px auto;max-width:600px;">
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="width:100%;"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="direction:ltr;font-size:0px;padding:0px 25px;word-break:break-word;"
                                  >
                                    <div
                                      style="padding-top:0px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:16px;text-align:center;color:#8a8a8a;"
                                    >
                                      You are receiving this email because you
                                      registered with MSS and agreed to
                                      receive emails from us regarding new
                                      features, events, and special offers.
                                      <p
                                        style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:16px;text-align:center;color:#8a8a8a; padding-top:10px;"
                                      >
                                        &copy; 2024 Medical Surgical Solution Inc. All rights
                                        reserved.
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
  
  </html>
  
  `;
  };
  module.exports = { emailVerificationBody };
  