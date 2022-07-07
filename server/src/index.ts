import { createServer } from "./utils/helpers/createServer";
import { PORT } from "./utils/constants";

const main = async () => {
  const { app, server } = await createServer();

  // init Apollo Server
  await server.start();
  server.applyMiddleware({
    app,
    cors: false
  });

  // init Express app
  app.listen(PORT, () => {
    console.log(`✨ Express app listening on http://localhost:${PORT}`);
  });
};

main();
