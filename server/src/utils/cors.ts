import { CorsOptions } from "cors";
import { PORT, __prod__ } from "./constants";

const frontendUrl = "http://localhost:3000" // or wherever your frontend code is located

function getConfig(): CorsOptions {
  if (!__prod__) {
    // allow requests from Apollo Explorer
    return {
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        `http://localhost:${PORT}/graphql`,
        frontendUrl
      ]
    }
  } else {
    return {
      credentials: true,
      origin: [frontendUrl]
    }
  }
}

export const corsConfig = getConfig() as CorsOptions