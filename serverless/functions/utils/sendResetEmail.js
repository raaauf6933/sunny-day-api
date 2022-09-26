const mailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_CLIENT_SECRET,
  process.env.REACT_APP_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmail = async (type, params) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.REACT_APP_EMAIL,
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
      accessToken,
    },
  });

  const handleHeaders = () => {
    switch (type) {
      case "RESET_PASSWORD":
        return {
          from: "Sunny Day Residences <sunnydayresidencesofficial@gmail.com>",
          to: params.user.email,
          subject: `RESET PASSWORD | ${params.user.username}`,
          html: `<html>
            <span>Hi ${params.user.first_name},</span> <br/><br/>
            <span>Here's the link to create your new password</span><br/><br/>
            <a href="${process.env.REACT_APP_URL}/admin/reset-password/${params.token}" >Click Here</a>
            </html>
          `,
          // attachments: [
          //   {
          //     filename: "check_image.png",
          //     path: __dirname + "/emailTemplate/pending_image.png",
          //     cid: "logo", //same cid value as in the html img src
          //   },
          // ],
        };

      default:
        break;
    }
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(handleHeaders(), function (error, info) {
      if (error) {
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = sendEmail;
