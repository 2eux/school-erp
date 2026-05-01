import Joi from 'joi';

const optionalTcpPort = Joi.any().custom((value, helpers) => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = parseInt(String(value), 10);
  if (Number.isNaN(n) || n < 1 || n > 65535) {
    return helpers.error('any.invalid');
  }
  return n;
});

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'staging',
    'production',
    'test',
  ),
  HOST: Joi.string(),
  VERSION: Joi.string(),
  NAME: Joi.string(),
  PORT: optionalTcpPort,
  DATABASE_HOST: Joi.string().trim().min(1).required().messages({
    'string.empty': 'DATABASE_HOST is required',
    'any.required': 'DATABASE_HOST is required',
  }),
  DATABASE_PORT: optionalTcpPort,
  DATABASE_USERNAME: Joi.string().required().messages({
    'any.required': 'DATABASE_USERNAME is required',
  }),
  DATABASE_PASSWORD: Joi.string().required().messages({
    'any.required': 'DATABASE_PASSWORD is required',
  }),
  DATABASE_NAME: Joi.string().trim().min(1).required().messages({
    'string.empty': 'DATABASE_NAME is required',
    'any.required': 'DATABASE_NAME is required',
  }),
  JWT_SECRET: Joi.string().min(8).required().messages({
    'string.min': 'JWT_SECRET must be at least 8 characters',
    'any.required': 'JWT_SECRET is required',
  }),
  JWT_EXPIRES_IN: Joi.string(),
})
  .unknown(true)
  .prefs({ abortEarly: false });

export function validateEnv(config: Record<string, unknown>): Record<string, unknown> {
  const { error, value } = envValidationSchema.validate(config, {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
  });

  if (error) {
    const lines = error.details.map(
      (d) => `${d.path.filter(Boolean).join('.') || '(root)'}: ${d.message}`,
    );
    throw new Error(`Environment validation failed:\n${lines.join('\n')}`);
  }

  return value as Record<string, unknown>;
}
