import dotenv from 'dotenv';
import { LogLevel } from '../enums';

dotenv.config();

let loggerLevel: keyof typeof LogLevel = (process.env.LOGGER_LEVEL ?? 'info').toUpperCase() as keyof typeof LogLevel;
if (!Object.keys(LogLevel).includes(loggerLevel)) {
  loggerLevel = 'INFO';
}

export const config: {
  IS_DEV: boolean,
  IS_TEST: boolean,
  DEBUG: {
    COMMON: boolean,
    TRACE: boolean,
  },
  LOGGER: {
    COLORED: boolean,
    LEVEL: keyof typeof LogLevel,
  },
  PORT: number
} = {
  IS_DEV: process.env.NODE_ENV !== 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  DEBUG: {
    COMMON: process.env.DEBUG_COMMON === 'true',
    TRACE: process.env.DEBUG_TRACE === 'true',
  },
  LOGGER: {
    COLORED: process.env.LOGGER_USE_COLORS === 'true',
    LEVEL: loggerLevel,
  },
  PORT: Number(process.env.PORT) || 3000,
};