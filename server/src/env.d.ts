declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      DATABASE_URL: string;
      TEST_DATABASE_URL: string;
    }
  }
}

export {}
