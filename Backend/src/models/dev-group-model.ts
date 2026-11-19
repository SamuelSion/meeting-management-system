import { Document, model, Schema, Types } from "mongoose";

// 1. Interface:
export interface IDevGroupModel extends Document {
    _id: Types.ObjectId;
    name: string;
}

// 2. Schema:
export const DevGroupSchema = new Schema<IDevGroupModel>({
    name: {
        type: String,
        required: [true, "Development group name is required."],
        trim: true,
        unique: true,
        minlength: [2, "Development group name must be at least 2 characters long."],
        maxlength: [50, "Development group name must be at most 50 characters long."]
    }
}, {
    versionKey: false // Do not add a __v field to every document.
});

// 3. Model:
export const DevGroupModel = model<IDevGroupModel>("DevGroupModel", DevGroupSchema, "devGroups");
