import dotenv from 'dotenv';

dotenv.config();

export const config = {
  IS_DEV: process.env.NODE_ENV !== 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  DEBUG: {
    COMMON: process.env.DEBUG_COMMON === 'true',
  },
  LOGGER_USE_COLORS: process.env.LOGGER_USE_COLORS === 'true',
  PORT: Number(process.env.PORT) || 3000,
};