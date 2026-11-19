import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors";
import { appConfig } from "./utils/app-config";
import { devGroupController } from "./controllers/dev-group-controller";
import { meetingController } from "./controllers/meeting-controller";
import { errorMiddleware } from "./middleware/error-middleware";

class App {

    public async start(): Promise<void> {

        // Connect to MongoDB before raising the server:
        await mongoose.connect(appConfig.mongodbConnectionString);
        console.log(colors.green("Connected to MongoDB."));

        // Create our server object:
        const server = express();

        // Allow requests coming from the React client only (both localhost and 127.0.0.1):
        server.use(cors({ origin: appConfig.clientUrls }));

        // Configure express to create request.body from a given JSON:
        server.use(express.json());

        // Connect controller routes:
        server.use(devGroupController.router);
        server.use(meetingController.router);

        // These two must be registered last, after all controllers:
        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        // Run server:
        server.listen(appConfig.port, () => console.log(colors.cyan(`Listening on port ${appConfig.port}...`)));
    }

}

const app = new App();
app.start();
