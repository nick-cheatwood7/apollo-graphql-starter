import { CorsOptions } from "cors";
import { CORS_ORIGIN, PORT, __prod__ } from "./constants";

function getConfig(): CorsOptions {
    if (!__prod__) {
        // allow requests from Apollo Explorer
        return {
            credentials: true,
            origin: [
                "https://studio.apollographql.com",
                `http://localhost:${PORT}/graphql`,
                CORS_ORIGIN,
            ],
        };
    } else {
        return {
            credentials: true,
            origin: [CORS_ORIGIN],
        };
    }
}

export const corsConfig = getConfig() as CorsOptions;
