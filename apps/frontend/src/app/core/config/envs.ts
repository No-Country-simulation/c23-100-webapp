import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;
}

const envsSchema = joi
  .object({
    FIREBASE_API_KEY: joi.string().required(),
    FIREBASE_AUTH_DOMAIN: joi.string().required(),
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_STORAGE_BUCKET: joi.string().required(),
    FIREBASE_MESSAGING_SENDER_ID: joi.string().required(),
    FIREBASE_APP_ID: joi.string().required(),
    FIREBASE_MEASUREMENT_ID: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Environment variables validation error: ${error}`);
}

const envVars: EnvVars = value;

export const envs = {
  firebase: {
    apiKey: envVars.FIREBASE_API_KEY,
    authDomain: envVars.FIREBASE_AUTH_DOMAIN,
    projectId: envVars.FIREBASE_PROJECT_ID,
    storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.FIREBASE_APP_ID,
    measurementId: envVars.FIREBASE_MEASUREMENT_ID,
  },
};
