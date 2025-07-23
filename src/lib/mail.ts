import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const {
  EMAIL_USER,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });

export async function sendEmail(to: string, subject: string, html: string) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL_USER,
      clientId: EMAIL_CLIENT_ID,
      clientSecret: EMAIL_CLIENT_SECRET,
      refreshToken: EMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token || ''
    }
  });

  const mailOptions = {
    from: `Masar Education <${EMAIL_USER}>`,
    to,
    subject,
    html
  };

  const result = await transport.sendMail(mailOptions);
  return result;
}
