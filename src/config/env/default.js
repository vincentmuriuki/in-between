const dotenv = require('dotenv');

dotenv.config();
const config = {
  PORT: process.env.PORT || 3000,
  secret: process.env.SECRET,
  database: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  googleConfig: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/api/v1/auth/google/callback`
  },
  facebookConfig: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name'],
  },
  s3Config: {
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME
  },
  HASH_SALT_ROUNDS: 10,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  debug: false,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  twilioConfig: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONENUMBER: process.env.TWILIO_PHONENUMBER },
  env: process.env.NODE_ENV || 'development'
};

module.exports = config;
