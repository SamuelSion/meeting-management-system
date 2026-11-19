import { Document, model, Schema, Types } from "mongoose";
import { MeetingRoom } from "./enums";
import { DevGroupModel } from "./dev-group-model";

// 1. Interface:
export interface IMeetingModel extends Document {
    _id: Types.ObjectId;
    devGroupId: Types.ObjectId;
    startDateTime: Date;
    endDateTime: Date;
    description: string;
    room: MeetingRoom;
}

// 2. Schema:
export const MeetingSchema = new Schema<IMeetingModel>({
    // _id is created automatically by MongoDB - a manual one is never provided.
    devGroupId: {
        type: Schema.Types.ObjectId,
        ref: "DevGroupModel",
        required: [true, "Development group is required."]
    },
    startDateTime: {
        type: Date,
        required: [true, "Meeting start date and time is required."]
    },
    endDateTime: {
        type: Date,
        required: [true, "Meeting end date and time is required."],
        validate: {
            // Note: Mongoose types 'this' here as Document | Query, since this validator can run
            // either on a real document or (if ever re-enabled) during a query-level update -
            // see the runValidators note in meeting-service.ts. A single explicit, local cast is
            // clearer here than typing the parameter as 'any'.
            validator: function (value: Date): boolean {
                const document = this as unknown as { startDateTime: Date };
                return value > document.startDateTime;
            },
            message: "Meeting end time must be later than the start time."
        }
    },
    description: {
        type: String,
        required: [true, "Meeting description is required."],
        trim: true,
        minlength: [2, "Meeting description must be at least 2 characters long."],
        maxlength: [300, "Meeting description must be at most 300 characters long."]
    },
    room: {
        type: String,
        required: [true, "Meeting room is required."],
        enum: {
            values: Object.values(MeetingRoom),
            message: "Meeting room must be one of the defined rooms."
        }
    }
}, {
    versionKey: false
});

// Virtual relation to the development group - the mongoose replacement for a SQL join:
MeetingSchema.virtual("devGroup", {
    ref: DevGroupModel,
    localField: "devGroupId",
    foreignField: "_id",
    justOne: true
});

MeetingSchema.set("toJSON", { virtuals: true });

// 3. Model:
export const MeetingModel = model<IMeetingModel>("MeetingModel", MeetingSchema, "meetings");
