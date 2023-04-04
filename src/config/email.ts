import 'dotenv/config';

export default () => ({
  email: {
    transport: {
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.EMAIL_AUTH_ADDRESS,
        pass: process.env.EMAIL_AUTH_PASSWORD,
      },
    },
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3',
    },
    default: {
      from: `"${process.env.EMAIL_FROM_USERNAME}" <${process.env.EMAIL_AUTH_ADDRESS}>`,
    },
  },
});
