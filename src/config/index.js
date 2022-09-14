import Joi from 'joi';

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(8080),
  MONGODB_URI: Joi.string().uri().required(),
  LOG_DIR: Joi.string().default('../../logs'),
  LOG_FORMAT: Joi.string().default('combined'),
  APP_DOMAIN_NAME: Joi.string().required(),
  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().required(),
  MAILER_USER: Joi.string().required(),
  MAILER_PASSWORD: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION_MINS: Joi.number().required(),
  JWT_REFRESH_EXPIRATION_MINS: Joi.number().required(),
  JWT_VERIFY_EMAIL_EXPIRATION_MINS: Joi.number().required(),
  JWT_RESET_PASSWORD_EXPIRATION_MINS: Joi.number().required()
}) .unknown();

const { value: envVars, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodbUri: envVars.MONGODB_URI,
  logDir: envVars.LOG_DIR,
  logFormat: envVars.LOG_FORMAT,
  appDomain: envVars.APP_DOMAIN_NAME,
  mailHost: envVars.MAILER_HOST,
  mailPort: envVars.MAILER_PORT,
  mailUser: envVars.MAILER_USER,
  mailPassword: envVars.MAILER_PASSWORD,
  jwt: {
    accessSecret: envVars.JWT_ACCESS_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    accessExpirationMins: envVars.JWT_ACCESS_EXPIRATION_MINS,
    refreshExpirationMins: envVars.JWT_REFRESH_EXPIRATION_MINS,
    verifyMailExpirationMins: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINS,
    resetPasswordExpirationMins: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINS
  }
};