import { createServer } from "./utils/helpers/createServer";
import { CORS_ORIGIN, PORT } from "./utils/constants";

const main = async () => {
    const { app, server } = await createServer();

    // init Apollo Server
    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: ["https://studio.apollographql.com", CORS_ORIGIN],
        }
    });

    // init Express app
    app.listen(PORT, () => {
        console.log(`✨ Express app listening on http://localhost:${PORT}`);
    });
};

main();
