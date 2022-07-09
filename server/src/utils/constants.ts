import "dotenv-safe/config";
export const __prod__ = process.env.NODE_ENV === "production";
export const __test__ = process.env.NODE_ENV === "test";

// env params
export const PORT = process.env.PORT;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const REDIS_URI = process.env.SESSION_URL;
