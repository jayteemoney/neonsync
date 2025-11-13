/**
 * Production-safe logging utility
 *
 * Logs are only shown in development mode.
 * In production, only errors are logged to help with debugging.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },

  error: (...args: unknown[]) => {
    // Always log errors for debugging
    console.error(...args);
  },

  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
};
