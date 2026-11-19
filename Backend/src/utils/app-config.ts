import dotenv from "dotenv"; // npm install dotenv

// Loads .env values into the process.env object:
dotenv.config({ quiet: true });

class AppConfig {

    public readonly port = process.env.PORT || 4000;
    public readonly mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING!;

    // Comma-separated list in .env, e.g. "http://localhost:5173,http://127.0.0.1:5173".
    // Both hostnames are allowed by default, since browsers treat them as different origins.
    public readonly clientUrls: string[] = (process.env.CLIENT_URLS || "http://localhost:5173,http://127.0.0.1:5173")
        .split(",")
        .map((url) => url.trim());

}

export const appConfig = new AppConfig();
