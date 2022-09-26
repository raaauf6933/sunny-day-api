const mailer = require("nodemailer");
const { google } = require("googleapis");
const createBookingEmail = require("./emailTemplate/createBookingEmail");
const confirmedBooking = require("./emailTemplate/confirmedBooking");

// const CLIENT_ID =
//   "610872631269-un4rljklhofn6415irm5b878c52kvgrv.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04OD03jJUv2rlCgYIARAAGAQSNwF-L9Irqgfx8OWwQi4a2q8Alq08lhwmzpU7-zmiM39bJjtopudZ8qgsfZsZlIpLA1quMGVRi8A";

const oAuth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_CLIENT_SECRET,
  process.env.REACT_APP_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
});

const sendEmail = async (booking, { type }) => {
  const { guest, booking_reference } = booking;
  const { email } = guest;

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

  // const smtpTransport = mailer.createTransport({
  //   // host: "smtp.mailtrap.io",
  //   // port: 2525,
  //   // auth: {
  //   //   user: "efe49df51426a0",
  //   //   pass: "68bb431bd5c235",
  //   // },
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  const handleHeaders = () => {
    switch (type) {
      case "PENDING":
        return {
          from: "Sunny Day Residences <sunnydayresidencesofficial@gmail.com>",
          to: "sunnydayresidencesofficial@gmail.com, " + email,
          subject: `BOOKING PENDING | ${booking_reference}`,
          html: createBookingEmail(booking),
          attachments: [
            {
              filename: "check_image.png",
              path: __dirname + "/emailTemplate/pending_image.png",
              cid: "logo", //same cid value as in the html img src
            },
          ],
        };
        break;
      case "CONFIRMED":
        return {
          from: "Sunny Day Residences <sunnydayresidencesofficial@gmail.com>",
          to: "sunnydayresidencesofficial@gmail.com, " + email,
          subject: `BOOKING CONFIRMED | ${booking_reference}`,
          html: confirmedBooking(booking),
          attachments: [
            {
              filename: "check_image.png",
              path: __dirname + "/emailTemplate/check_image.png",
              cid: "logo", //same cid value as in the html img src
            },
          ],
        };
        break;
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
