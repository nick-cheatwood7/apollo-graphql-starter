declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CORS_ORIGIN: string;
      DATABASE_URL: string;
      TEST_DATABASE_URL: string;
      SESSION_SECRET: string;
      REDIS_URL: string;
    }
  }
}

export {}
