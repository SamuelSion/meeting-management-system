import mongoose from "mongoose";
import colors from "colors";
import { appConfig } from "../utils/app-config";
import { DevGroupModel } from "../models/dev-group-model";
import { MeetingModel } from "../models/meeting-model";
import { MeetingRoom } from "../models/enums";

// One-time script that fills the database with initial development groups
// and a few sample meetings (all with a future start time), so the frontend
// has real data to display.
async function seed(): Promise<void> {

    await mongoose.connect(appConfig.mongodbConnectionString);
    console.log(colors.green("Connected to MongoDB."));

    // Clear existing data:
    await DevGroupModel.deleteMany({});
    await MeetingModel.deleteMany({});

    // Create the development groups:
    const qaTeam = await DevGroupModel.create({ name: "QA Team" });
    const rndTeam = await DevGroupModel.create({ name: "R&D Team" });
    const devOpsTeam = await DevGroupModel.create({ name: "DevOps Team" });

    console.log(colors.cyan("Development groups created."));

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Sample meetings - all with a future start time, one per development group:
    await MeetingModel.create([
        {
            devGroupId: qaTeam._id,
            startDateTime: new Date(now + 2 * oneHour),
            endDateTime: new Date(now + 3 * oneHour),
            description: "Test plan review for the payments module",
            room: MeetingRoom.GreenRoom
        },
        {
            devGroupId: rndTeam._id,
            startDateTime: new Date(now + oneHour),
            endDateTime: new Date(now + 2 * oneHour),
            description: "Architecture review for the new search service",
            room: MeetingRoom.OrangeRoom
        },
        {
            devGroupId: devOpsTeam._id,
            startDateTime: new Date(now + 5 * oneHour),
            endDateTime: new Date(now + 5.5 * oneHour),
            description: "Production deployment planning",
            room: MeetingRoom.GreenRoom
        }
    ]);

    console.log(colors.cyan("Sample meetings created."));
    console.log(colors.green("Seed completed successfully."));

    await mongoose.disconnect();
}

seed().catch((err) => {
    console.log(colors.red(err));
    process.exit(1);
});
