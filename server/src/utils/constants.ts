import "dotenv-safe/config";
export const __prod__ = process.env.NODE_ENV === "production";
export const __test__ = process.env.NODE_ENV === "test";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";

// env params
export const PORT = process.env.PORT;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const REDIS_URL = process.env.REDIS_URL;
