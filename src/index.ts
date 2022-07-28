import "dotenv-safe/config";
import "dotenv/config";
import "./services/firebase";
import "./workers";

import app from "./config/app";
import render404 from "./middleware/render404";
import exampleRouter from "./routers/example";

app.use("/example", exampleRouter);
app.use((_, res) => render404(res));
