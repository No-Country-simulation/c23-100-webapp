import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;

  FIREBASE_SERVICE_TYPE: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_CLIENT_ID: string;
  FIREBASE_AUTH_URI: string;
  FIREBASE_TOKEN_URI: string;
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
  FIREBASE_CLIENT_X509_cert_url: string;
  FIREBASE_UNIVERSE_DOMAIN: string;

  FRONTEND_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    FIREBASE_SERVICE_TYPE: joi.string().required(),
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_PRIVATE_KEY_ID: joi.string().required(),
    FIREBASE_PRIVATE_KEY: joi.string().required(),
    FIREBASE_CLIENT_EMAIL: joi.string().required(),
    FIREBASE_CLIENT_ID: joi.string().required(),
    FIREBASE_AUTH_URI: joi.string().required(),
    FIREBASE_TOKEN_URI: joi.string().required(),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: joi.string().required(),
    FIREBASE_CLIENT_X509_cert_url: joi.string().required(),
    FIREBASE_UNIVERSE_DOMAIN: joi.string().required(),

    FRONTEND_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Environment variables validation error: ${error}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  firebase: {
    type: envVars.FIREBASE_SERVICE_TYPE,
    project_id: envVars.FIREBASE_PROJECT_ID,
    private_key_id: envVars.FIREBASE_PRIVATE_KEY_ID,
    private_key: envVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: envVars.FIREBASE_CLIENT_EMAIL,
    client_id: envVars.FIREBASE_CLIENT_ID,
    auth_uri: envVars.FIREBASE_AUTH_URI,
    token_uri: envVars.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: envVars.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: envVars.FIREBASE_CLIENT_X509_cert_url,
    universe_domain: envVars.FIREBASE_UNIVERSE_DOMAIN,
  },
  frontend_url: envVars.FRONTEND_URL,
};
