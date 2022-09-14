const passwordResetEmail = (email, name, ip, link) => {
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <!--[if mso]>
      <xml><o:officedocumentsettings><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml>
    <![endif]-->
    <title>Reset your Password</title>
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
      rel="stylesheet" media="screen">
    <style>
      .hover-underline:hover {
        text-decoration: underline !important;
      }
  
      @media (max-width: 600px) {
        .sm-w-full {
          width: 100% !important;
        }
  
        .sm-px-24 {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
  
        .sm-py-32 {
          padding-top: 32px !important;
          padding-bottom: 32px !important;
        }
      }
    </style>
  </head>
  
  <body
    style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
    <div style="font-family: 'Montserrat', sans-serif;  display: none;">A request to reset
      password was received from your Blitz Order Account</div>
    <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en"
      style="font-family: 'Montserrat', sans-serif; ">
      <table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
        cellspacing="0" role="presentation">
        <tr>
          <td align="center"
            style=" background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
            <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="sm-py-32 sm-px-24"
                  style=" padding: 48px; text-align: center; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                  <a href="" style="font-family: 'Montserrat', sans-serif; ">
                    <img src="https://blitz-order.s3.ap-southeast-1.amazonaws.com/Logo+Yellow+4x.png" width="155"
                      alt="Vuexy Admin" style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" class="sm-px-24"
                  style="font-family: 'Montserrat', sans-serif; ">
                  <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-24"
                        style=" border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin-bottom: 15px; font-size: 20px; font-weight: 600;">
                          Hey</p>
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin-top: 0; font-size: 24px; font-weight: 700; color: #04725d;">
                          ${name}!</p>
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin: 0; margin-bottom: 24px;">
                          A request to reset password was received from your
                          <span style="font-weight: 600;">Blitz Order</span> Account -
                          <a href="mailto:${email}" class="hover-underline"
                            style="font-family: 'Montserrat', sans-serif;  color: #04725d; text-decoration: none;">${email}</a>
                          from the IP - <span style="font-weight: 600; color: #04725d;">${ip}</span> .
                        </p>
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin: 0; margin-bottom: 24px;">
                          Use this link to reset your password and login.</p>
                        <a href="${link}"
                          style="font-family: 'Montserrat', sans-serif;  margin-bottom: 24px; display: block; font-size: 16px; line-height: 100%; color: #04725d; text-decoration: none;">${link}</a>
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td
                              style=" mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #04725d; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                              <a href="${link}"
                                style="font-family: 'Montserrat', sans-serif;  display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;">Reset
                                Password &rarr;</a>
                            </td>
                          </tr>
                        </table>
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin: 0; margin-top: 24px; margin-bottom: 24px;">
                          <span style="font-weight: 600;">Note:</span> This link is valid for 1 hour from the time it was
                          sent to you and can be used to change your password only once.
                        </p>
                        <p style="font-family: 'Montserrat', sans-serif;  margin: 0;">
                          If you did not intend to deactivate your account or need our help keeping the account, please
                          contact us at
                          <a href="mailto:support@blitz-order.com" class="hover-underline"
                            style="font-family: 'Montserrat', sans-serif;  color: #04725d; text-decoration: none;">support@blitz-order.com</a>
                        </p>
                        <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td
                              style="font-family: 'Montserrat', sans-serif;  padding-top: 32px; padding-bottom: 32px;">
                              <div
                                style="font-family: 'Montserrat', sans-serif;  height: 1px; background-color: #eceff1; line-height: 1px;">
                                &zwnj;</div>
                            </td>
                          </tr>
                        </table>
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin: 0; margin-bottom: 16px;">
                          Not sure why you received this email? Please
                          <a href="mailto:support@blitz-order.com" class="hover-underline"
                            style="font-family: 'Montserrat', sans-serif;  color: #04725d; text-decoration: none;">let
                            us know</a>.
                        </p>
                        <p
                          style="font-family: 'Montserrat', sans-serif;  margin: 0; margin-bottom: 16px;">
                          Thanks, <br>The Blitz Order Team</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family: 'Montserrat', sans-serif;  height: 20px;">
                      </td>
                    </tr>
                    <tr>
                      <td
                        style=" padding-left: 48px; padding-right: 48px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; color: #eceff1;">
                        <p style="font-family: 'Montserrat', sans-serif;  color: #263238;">
                          Use of our service and website is subject to our
                          <a href="https://pixinvent.com/" class="hover-underline"
                            style="font-family: 'Montserrat', sans-serif;  color: #04725d; text-decoration: none;">Terms
                            of Use</a> and
                          <a href="https://pixinvent.com/" class="hover-underline"
                            style="font-family: 'Montserrat', sans-serif;  color: #04725d; text-decoration: none;">Privacy
                            Policy</a>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family: 'Montserrat', sans-serif;  height: 16px;">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
  
  </html>
  `;
};

export default passwordResetEmail;