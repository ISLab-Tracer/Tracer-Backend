import 'dotenv/config';

export default () => ({
  email: {
    transport: `smtps://${process.env.EMAIL_AUTH_ADDRESS}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
    default: {
      from: `"${process.env.EMAIL_FROM_USERNAME}" <${process.env.EMAIL_AUTH_ADDRESS}>`,
    },
  },
});
