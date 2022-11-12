const config = {
  isProduction: process.env.NODE_ENV === 'production',
  isDebug:
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true',
};

export default config;
