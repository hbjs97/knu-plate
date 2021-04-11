import { NODE_ENV, PORT } from "./lib/config";
import { infoLog } from "./lib/log";
import app from "./server";

app.listen(PORT, () => {
  infoLog(
    `Express server '${NODE_ENV ?? "non mode"}' started on port: ${PORT}`
  );
});
