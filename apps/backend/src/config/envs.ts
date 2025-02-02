import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  FRONTEND_URL: string;
  SMTP_HOST: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
    SMTP_HOST: joi.string().required(),
    SMTP_USER: joi.string().required(),
    SMTP_PASSWORD: joi.string().required(),
    JWT_SECRET_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Environment variables validation error: ${error}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  frontend_url: envVars.FRONTEND_URL,
  mails: {
    host: envVars.SMTP_HOST,
    auth: {
      user: envVars.SMTP_USER,
      password: envVars.SMTP_PASSWORD,
    },
  },
  db: {
    url: envVars.DATABASE_URL,
  },
  jwtSecretKey: envVars.JWT_SECRET_KEY,
};
